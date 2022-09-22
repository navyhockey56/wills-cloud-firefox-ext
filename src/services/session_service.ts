import { BROWSER } from "../constants";

export class SessionService {
  async getSession() : Promise<string> {
    const storage = await BROWSER.storage.local.get('TOKEN');
    return storage.TOKEN;
  }

  setSession(token : string) {
    BROWSER.storage.local.set({ TOKEN: token });
  }
}
