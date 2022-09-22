import { ACTION_GET_VIDEO_URL, BROWSER } from "../constants";

const identifyVideoLink = (request : any, _sender : any, sendResponse : any) => {
  if (request?.type !== ACTION_GET_VIDEO_URL) return;

  let link = null;

  if (window.location.hostname.includes('tiktok')) {
    const dataElement = document.getElementById('SIGI_STATE');
    const data = JSON.parse(dataElement.textContent);
    const itemModule = data['ItemModule'];
    link = itemModule[Object.keys(itemModule)[0]]['video']['downloadAddr'];
  } else {
    link = window.location.href;
  }

  sendResponse({ link: link });
}

BROWSER.runtime.onMessage.addListener(identifyVideoLink);
