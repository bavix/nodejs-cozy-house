import os from 'os'
import ip from 'ip'

export default () => {
  const hrTime = process.hrtime()
  return {
    requestSeconds: hrTime[0],
    requestNanoseconds: hrTime[1],
    osHostname: os.hostname(),
    ip: ip.address(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: process.uptime(),
    uid: process.getuid(),
    gid: process.getgid(),
    ppid: process.ppid,
    pid: process.pid
  }
}
