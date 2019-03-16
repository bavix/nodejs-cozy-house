import moment from 'moment'
import recipient from '../dict/recipient'

/**
 * @return {Function}
 */
export default (ctx, next) => {
  const dataRecipient = recipient(ctx)

  const now = moment()
  const createdDate = now.format('YYYY-MM-DD')
  const createdTime = now.format('YYYY-MM-DD H:mm:ss')

  for (const data of ctx.request.body) {
    data.createdDate = createdDate
    data.createdTime = createdTime
    data.recipient = dataRecipient
  }

  return next()
}
