import { BROWSER } from "../constants";
import { ActionManager } from "./action-manager";

const CONTEXT_MENU_ID_UPLOAD_MEDIA = 'UPLAOD_MEDIA';
BROWSER.contextMenus.create({
  id: CONTEXT_MENU_ID_UPLOAD_MEDIA,
  title: "To Will's Cloud",
  contexts: ["image", "video"]
});

const actionManager = new ActionManager();

BROWSER.contextMenus.onClicked.addListener(async (info: any, tab: any) : Promise<void> =>  {
  if (info.menuItemId !== CONTEXT_MENU_ID_UPLOAD_MEDIA) return;

  const directory = info.mediaType == 'image' ? 'pictures/' : 'videos/';

  await actionManager.uploadItem(tab, info.srcUrl, directory);
});


const COMMAND_SAVE_VIDEO = 'save-video';

const getCurrentTab = async () : Promise<any> => {
  return BROWSER.tabs.query({
    currentWindow: true,
    active: true
  }).then((tabs : any) => tabs[0]);
}

const onCommand_saveVideo = async (command : string) : Promise<void> =>  {
  if (command !== COMMAND_SAVE_VIDEO) return;

  const currentTab = await getCurrentTab();
  const link = await actionManager.getVideoUrl(currentTab);
  await actionManager.uploadItem(currentTab, link, 'videos/');
}

BROWSER.commands.onCommand.addListener(onCommand_saveVideo);
