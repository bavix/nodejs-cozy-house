
const os = require('os');
const ip = require('ip');

class Machine {
    constructor(req, res) {
        const hrTime = process.hrtime();
        this.request_seconds = hrTime[0];
        this.request_nanoseconds = hrTime[1];
        this.os_hostname = os.hostname();
        this.hostname = req ? req.hostname : this.os_hostname;
        this.ip = ip.address();
        this.port = req ? req.app.settings.port : process.env.PORT;
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
