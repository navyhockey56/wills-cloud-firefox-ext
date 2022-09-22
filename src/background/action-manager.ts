import { BROWSER, ACTION_GET_VIDEO_URL, ACTION_UPLOAD_ITEM } from "../constants";

export class ActionManager {
  async getVideoUrl(tab : any) : Promise<string> {
    const response = await BROWSER.tabs.sendMessage(tab.id, {
      type: ACTION_GET_VIDEO_URL
    });

    return response.link as string;
  }

  async uploadItem(tab : any, link: string, defaultFileName: string) : Promise<void> {
    return await BROWSER.tabs.sendMessage(tab.id, {
      link,
      type: ACTION_UPLOAD_ITEM,
      defaultFileName
    });
  }
}
