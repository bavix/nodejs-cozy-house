import { Bristol } from 'bristol'
import palin from 'palin'
import path from 'path'
import env from './env'

export const logger = new Bristol()

if (!env.equal('LOG_LEVEL', 'off')) {
  logger.addTarget('console').withFormatter(palin, {
    rootFolderName: path.basename(process.cwd())
  })
}
