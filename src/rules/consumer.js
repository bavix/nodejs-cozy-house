export default {
  requestSeconds: {
    type: Number,
    required: true
  },
  requestNanoseconds: {
    type: Number,
    required: true
  },
  osHostname: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  arch: {
    type: String,
    required: true,
    enum: [
      'arm',
      'arm64',
      'ia32',
      'mips',
      'mipsel',
      'ppc',
      'ppc64',
      's390',
      's390x',
      'x32',
      'x64'
    ]
  },
  uptime: {
    type: Number,
    required: true
  },
  uid: {
    type: Number,
    required: true
  },
  gid: {
    type: Number,
    required: true
  },
  ppid: {
    type: Number,
    required: true
  },
  pid: {
    type: Number,
    required: true
  }
}
