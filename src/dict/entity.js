// const { URL } = require('url');
// let os = require('os');
// const ip = require('ip');
// const platform = require('platform');
// const isBot = require('isbot');
// const _ = require('lodash');
// const Referrer = require('referer-parser');

import recipient from './recipient'

export default ctx => {
  return {
    recipient: recipient()
  }
}
