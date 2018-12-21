export default ctx => {
  return {
    method: null,
    language: null,
    secure: ctx.secure,
    ajax: ctx.state.xhr,
    route: null,
    domain: null,
    url: null,
    ip: ctx.ip,
    bot: false,
    userAgent: ctx.get('user-agent')
  }
}
