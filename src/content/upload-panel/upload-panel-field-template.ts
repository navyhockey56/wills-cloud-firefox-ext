import { VerbosityTemplate } from "verbosity-dom";

export interface UploadPanelFieldDefinition {
  displayName: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}

export class UploadPanelFieldTemplate implements VerbosityTemplate<HTMLElement> {
  element: HTMLElement;

  private fieldDefinition! : UploadPanelFieldDefinition;

  private labelElement : HTMLLabelElement;
  private inputElement : HTMLInputElement;

  constructor(fieldDefinition : UploadPanelFieldDefinition) {
    this.fieldDefinition = fieldDefinition;
  }

  readTemplate(): string {
    return require('./upload-panel-field-template.html').default;
  }

  beforeTemplateAdded(): void {
    this.labelElement.htmlFor = this.fieldDefinition.displayName;
    this.labelElement.textContent = this.fieldDefinition.displayName;

    this.inputElement.name = this.fieldDefinition.displayName;
    if (this.fieldDefinition.placeholder)  this.inputElement.placeholder = this.fieldDefinition.placeholder;
    if (this.fieldDefinition.type)         this.inputElement.type = this.fieldDefinition.type;
    if (this.fieldDefinition.defaultValue) this.inputElement.value = this.fieldDefinition.defaultValue;
  }

  hasAssignments(): boolean {
    return true;
  }

  getInputValue() : string {
    return this.inputElement.value;
  }
}
