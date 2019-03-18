export default meta => {
  return {
    method: null,
    language: null,
    secure: meta.secure,
    ajax: meta.ajax,
    route: null,
    domain: null,
    url: null,
    ip: meta.ip,
    bot: 0,
    userAgent: meta.userAgent
  }
}
