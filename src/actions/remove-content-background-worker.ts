export interface RemoveContentBackgroundWorkerArgs {
  classNames?: string[];
  ids?: string[];
}

export class RemoveContentBackgroundWorker {
  private args! : RemoveContentBackgroundWorkerArgs;
  private isStopping! : boolean;

  constructor(args : RemoveContentBackgroundWorkerArgs) {
    this.args = args;
    this.isStopping = false;
  }

  start() {
    this.args.classNames?.forEach(className => {
      const elements = Array.from(document.getElementsByClassName(className));
      this.removeElements(elements);
    });

    if (this.args.ids) this.removeElements(Array.from(this.args.ids.map(id => document.getElementById(id))));

    if (!this.isStopping) setTimeout(this.start.bind(this), 1000);
  }

  stop() {
    this.isStopping = true;
  }

  private removeElements(elements: Element[]) {
    elements.forEach((element) => element?.remove());
  }
}
