class Session {
  constructor() {
    this._mainWindow = null;
    this._balance = 0;
    this._price = 0;
    this._rate = 0;
    this._address = "";
    this._store = null;
  }

  static reset() {
    this._balance = 0;
    this._address = "";
  }

  get mainWindow() {
    return this._mainWindow;
  }

  set mainWindow(mainWindow) {
    this._mainWindow = mainWindow;
  }

  get balance() {
    return this._balance;
  }

  set balance(balance) {
    this._balance = balance;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    this._price = price;
  }

  get rate() {
    return this._rate;
  }

  set rate(rate) {
    this._rate = rate;
  }

  get address() {
    return this._address;
  }

  set address(address) {
    this._address = address;
  }

  get store() {
    return this._store;
  }

  set store(store) {
    this._store = store;
  }
}

exports.Session = new Session();
