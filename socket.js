import { JSON } from './serialization';

class Socket {
  url = "ws://localhost/ws"
  marshaler = new JSON()
  reconnect = false
  constructor() {
    this.handlers = { default: data => { console.log('unhandled websocket message', data) } }
    this._onopen = () => { }
    this._onclose = (e) => { console.log(e) }
  }

  connect() {
    this.socket = new WebSocket(wsUrl)
    this.socket.onopen = () => {
      console.log("Websocket open")
      this._onopen()
      console.log("Websocket open complete")
    }
    this.socket.onmessage = this.onMessage
    this.socket.onclose = (e) => {
      console.log("socket closed", e)
      this._onclose(e)
    }
    this.socket.onerror = (e) => {
      console.log("socket error", e)
    }
  }
 
  disconnect() {
    this.socket.close(1000, 'closed by disconnect()', { keepClosed: true })

    if (this.reconnect) {
      // TODO: add reconnect logic
    }
  }

  send({ type = "", data = "", id = "" }) {
      console.log("websocket send", type, data)
      this.socket.send(type.length + ":" + type + data)
  }

  onMessage = msg => {
    const packet = this.marshaler.deserialize(msg)
    if (typeof this.handlers[packet.type] === 'undefined') {
      this.handlers.default(packet)
    } else {
      this.handlers[packet.type].map(fn => fn(packet))
    }
  }
  onError(e) {
    console.log('websocket container: websocket error:', e)
  }

  onOpen(fn) {
    this._onopen = fn
  }
  onClose(fn) {
    this._onclose = fn
  }

  register(type, messageHandler) {
    if (!!!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type] = [
      ...this.handlers[type],
      messageHandler,
    ]
  }
  unregister(type, messageHandler) {
    this.handlers[type] = this.handlers[type].filter(fn => fn != messageHandler)
  }
}

export default new Socket()



