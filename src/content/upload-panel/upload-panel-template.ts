import { VerbosityDom, VerbosityTemplate } from "verbosity-dom";
import { WillsCloudClient } from "../../clients/wills-cloud.client";
import { SessionService } from "../../services/session_service";
import { UploadPanelFieldDefinition, UploadPanelFieldTemplate } from "./upload-panel-field-template";

interface WillsCloudUploadPanelArgs {
  dom: VerbosityDom;
  source: string;
  defaultFileName?: string;
}

const USERNAME_FIELD : string = 'Username';
const PASSWORD_FIELD : string = 'Password';
const FILE_NAME_FIELD : string = 'File Name';
const LINK_FIELD : string = 'Link';

export class UploadPanelTemplate implements VerbosityTemplate<HTMLElement> {
  element : HTMLElement;

  private dom!: VerbosityDom;
  private source! : string;
  private defaultFileName : string | null;
  private inputMap! : Map<string, UploadPanelFieldTemplate>;

  private sessionService! : SessionService;
  private sessionToken : string;

  private fieldSpan : HTMLSpanElement;

  constructor(args : WillsCloudUploadPanelArgs) {
    this.dom = args.dom;
    this.source = args.source;
    this.defaultFileName = args.defaultFileName;
    this.inputMap = new Map();
    this.sessionService = new SessionService();
  }

  readTemplate(): string {
    return require('./upload-panel-template.html').default;
  }

  hasEventListeners(): boolean {
    return true;
  }

  hasAssignments(): boolean {
    return true;
  }

  beforeTemplateAdded(): void {
    require('./upload-panel-template.css');

    this.scrollTemplateIntoView();
    document.body.onscroll = this.scrollTemplateIntoView.bind(this);
    document.body.onkeydown = this.onEscapeKeyPress.bind(this);

    this.sessionService.getSession().then(sessionToken => {
      this.sessionToken = sessionToken;

      this.fieldDefinitions().forEach(fieldDefinition => {
        const fieldTemplate = new UploadPanelFieldTemplate(fieldDefinition);
        this.dom.appendChildTemplateToElement(this.fieldSpan, this, fieldTemplate);
        this.inputMap.set(fieldDefinition.displayName, fieldTemplate);
      })
    });
  }

  beforeTemplateRemoved(): void {
    document.body.onscroll = null;
    document.body.onkeydown = null;
  }

  private scrollTemplateIntoView() : void {
    this.element.style.top = `${window.scrollY}px`;
  }

  private onEscapeKeyPress(event : KeyboardEvent) {
    if (event.key !== 'Escape') return;

    this.dom.removeTemplate(this);
  }

  private fieldDefinitions() : UploadPanelFieldDefinition[] {
    let definitions : UploadPanelFieldDefinition[] = [];
    if (!this.sessionToken) {
      definitions = [
        {
          displayName: USERNAME_FIELD,
          placeholder: 'Enter your username',
          defaultValue: 'will'
        },
        {
          displayName: PASSWORD_FIELD,
          type: 'password',
          placeholder: 'Enter your password'
        }
      ]
    }

    return [...definitions, ...[
      {
        displayName: FILE_NAME_FIELD,
        placeholder: 'Enter the file name',
        defaultValue: this.defaultFileName
      },
      {
        displayName: LINK_FIELD,
        placeholder: 'The link to download the file from',
        defaultValue: this.source
      }
    ]];
  }

  private async onSubmitButtonClick() {
    const client = new WillsCloudClient();

    if (!this.sessionToken) {
      this.sessionToken = await client.login({
        username: this.inputMap.get(USERNAME_FIELD).getInputValue(),
        password: this.inputMap.get(PASSWORD_FIELD).getInputValue()
      });

      this.sessionService.setSession(this.sessionToken);
    }

    await client.upload(this.sessionToken, {
      file_name: this.inputMap.get(FILE_NAME_FIELD).getInputValue(),
      download_link: this.inputMap.get(LINK_FIELD).getInputValue()
    });

    this.dom.removeTemplate(this);
  }
}
