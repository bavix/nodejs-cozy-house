
const os = require('os');
const ip = require('ip');

class Machine {
    constructor(ctx, consumer = false) {
        const hrTime = process.hrtime();
        this.request_seconds = hrTime[0];
        this.request_nanoseconds = hrTime[1];
        this.os_hostname = os.hostname();
        this.ip = ip.address();
        if (!consumer) {
            const port = ctx.request.socket.localPort;
            this.hostname = ctx.hostname;
            this.port = Number(port);
        }
        this.platform = os.platform();
        this.arch = os.arch();
        this.uptime = process.uptime();
        this.uid = process.getuid();
        this.gid = process.getgid();
        this.ppid = process.ppid;
        this.pid = process.pid;
    }
}

module.exports = Machine;
