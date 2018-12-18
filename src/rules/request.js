export default {
  method: {
    type: String,
    enum: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'COPY',
      'HEAD',
      'OPTIONS',
      'LINK',
      'UNLINK',
      'PURGE',
      'LOCK',
      'UNLOCK',
      'PROPFIND',
      'VIEW'
    ]
  },
  language: {
    type: String
  },
  secure: {
    type: Boolean
  },
  ajax: {
    type: Boolean
  },
  route: {
    type: String
  },
  domain: {
    type: String
  },
  url: {
    type: String
  },
  ip: {
    type: String
  },
  bot: {
    type: Boolean
  },
  userAgent: {
    type: String
  }
}
