export default ctx => {
  return {
    method: null,
    language: null,
    secure: ctx.secure,
    ajax: ctx.request.get('X-Requested-With') === 'XMLHttpRequest',
    route: null,
    domain: null,
    url: null,
    ip: ctx.ip,
    bot: 0,
    userAgent: ctx.get('user-agent')
  }
}
