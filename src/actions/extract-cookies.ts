import { ACTION_EXTRACT_COOKIES, BROWSER } from "../constants";

const extractCookies = (request : any, _sender : any, sendResponse : any) => {
  if (request?.type !== ACTION_EXTRACT_COOKIES) return;

  let cookies = '# Netscape HTTP Cookie File\n';
  for (const raw_cookie of document.cookie.split(';')) {
    const cookie = raw_cookie.trim();
    const separator = cookie.indexOf('=');
    const name = cookie.substring(0, separator);
    const value = cookie.substring(separator + 1);

    let domain = window.location.hostname;
    domain = domain.replace('www.', '.');
    if (domain[0] !== '.') {
      domain = '.' + domain;
    }

    cookies += `${domain}\tTRUE\t/\tTRUE\t0\t${name}\t${value}\n`
  }

  sendResponse({ cookies });
}

BROWSER.runtime.onMessage.addListener(extractCookies);
