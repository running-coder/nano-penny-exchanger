class ConnectionClass {
  _ws: WebSocket | null;
  constructor() {
    this._ws = null;
  }
  get ws() {
    return this._ws;
  }

  set ws(ws) {
    this._ws = ws;
  }
}

export const Connection = new ConnectionClass();
