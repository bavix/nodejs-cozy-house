#!/usr/bin/env node
import bagger from '../library/bagger'
import { env } from '../library/env'
import amqp from '../queue/consume'

// process.once('SIGTERM', _sigterm(conn));
// process.once('SIGINT', _sigint(conn));
// process.once('SIGHUP', _sighup(conn));

amqp(env.QUEUE_HANDLER, function(queue, message) {
  if (message.properties.type !== undefined) {
    return null
  }

  const events = bagger.unpack(message.content.toString())

  for (const event of events) {
    console.log(event)
  }

  this.ack(message)
})
