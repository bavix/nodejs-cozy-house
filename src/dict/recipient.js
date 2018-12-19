import consumer from './consumer'

export default ctx => {
  return {
    ...consumer(),
    hostname: ctx.hostname,
    port: Number(ctx.request.socket.localPort)
  }
}
