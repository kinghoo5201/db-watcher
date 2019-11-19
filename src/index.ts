function cc() {
  console.log(this.d);
}
export class dbWatcher {
  private d: number = 1;
  constructor() {}
  public cc = cc;
}
