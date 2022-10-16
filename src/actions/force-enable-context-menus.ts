class ContextMenuEnabler {
  enableContextMenu(aggressive = false) {
    void(document.ondragstart=null);
    void(document.onselectstart=null);
    void(document.onclick=null);
    void(document.onmousedown=null);
    void(document.onmouseup=null);
    void(document.body.oncontextmenu=null);

    this.enableRightClickLight(document);

    if (aggressive) {
      this.enableRightClick(document);
      this.removeContextMenuOnAll("body");
      this.removeContextMenuOnAll("img");
      this.removeContextMenuOnAll("td");
    }
  }

  enableRightClickLight(el : Document | Element) {
    el ||= document;
    el.addEventListener("contextmenu", this.bringBackDefault.bind(this), true);
  }

  removeContextMenuOnAll(tagName : string) {
    const elements = document.getElementsByTagName(tagName);
    for (var i = 0; i < elements.length; i++) {
      this.enableRightClick(elements[i]);
    }
  }


  enableRightClick(el: Document | Element) {
    el || (el = document);
    el.addEventListener("contextmenu", this.bringBackDefault.bind(this), true);
    el.addEventListener("dragstart", this.bringBackDefault.bind(this), true);
    el.addEventListener("selectstart", this.bringBackDefault.bind(this), true);
    el.addEventListener("click", this.bringBackDefault.bind(this), true);
    el.addEventListener("mousedown", this.bringBackDefault.bind(this), true);
    el.addEventListener("mouseup", this.bringBackDefault.bind(this), true);
  }

  restoreRightClick(el : Document | Element) {
    el || (el = document);
    el.removeEventListener("contextmenu", this.bringBackDefault.bind(this), true);
    el.removeEventListener("dragstart", this.bringBackDefault.bind(this), true);
    el.removeEventListener("selectstart", this.bringBackDefault.bind(this), true);
    el.removeEventListener("click", this.bringBackDefault.bind(this), true);
    el.removeEventListener("mousedown", this.bringBackDefault.bind(this), true);
    el.removeEventListener("mouseup", this.bringBackDefault.bind(this), true);
  }

  bringBackDefault(event : any) {
    event.returnValue = true;
    (typeof event.stopPropagation === 'function') && event.stopPropagation();
    (typeof event.cancelBubble === 'function') && event.cancelBubble();
  }
}

new ContextMenuEnabler().enableContextMenu();
