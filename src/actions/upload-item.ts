import { VerbosityDom } from "verbosity-dom";
import { ACTION_UPLOAD_ITEM, BROWSER } from "../constants";
import { UploadPanelTemplate } from "../content/upload-panel/upload-panel-template";

const addUploadPanel = (request : any, _sender : any, _responder : any) => {
  if (request?.type !== ACTION_UPLOAD_ITEM) return;

  const dom : VerbosityDom = new VerbosityDom();

  dom.appendTemplateToElement(document.body, new UploadPanelTemplate({
    source: request.link,
    defaultFileName: request.defaultFileName,
    dom: dom,
    cookies: request.cookies
  }));
}

BROWSER.runtime.onMessage.addListener(addUploadPanel);
