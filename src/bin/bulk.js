#!/usr/bin/env node
import sigterm from '../queue/signals/sigterm'
import sigint from '../queue/signals/sigint'
import sighup from '../queue/signals/sighup'
import bagger from '../library/bagger'
import { env } from '../library/env'
import amqp from '../queue/consume'

let store = []

process.once('SIGTERM', sigterm(store))
process.once('SIGINT', sigint(store))
process.once('SIGHUP', sighup(store))

amqp(env.QUEUE_HANDLER, function(queue, message) {
  if (message.properties.type !== undefined) {
    return null
  }

  const unpack = bagger.unpack(message.content.toString())
  store.push(...unpack)
  this.ack(message)

  console.log(`store length: ${store.length}`)
})
