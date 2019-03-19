#!/usr/bin/env node
import { env } from '../library/env'
import amqp from '../queue/consume'
import dispatch from '../library/dispatch'
import bagger from '../library/bagger'
import processing from '../extends/event'

amqp(env.QUEUE_ENQUEUE, function(queue, message) {
  if (message.properties.type !== undefined) {
    return null
  }

  const { data, meta } = bagger.unpack(message.content.toString())
  const store = processing(data, meta)

  console.log(meta)
  console.log(store)

  dispatch(env.QUEUE_HANDLER, bagger.pack(store)).then(() => {
    this.ack(message)
  })
})
