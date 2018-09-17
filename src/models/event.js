
class Event {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    customer() {
        const hrTime = process.hrtime();
        this.consumer_request_seconds = hrTime[0];
        this.consumer_request_nanoseconds = hrTime[1];
        this.consumer_host_name = hrTime[0];
        this.consumer_ip = hrTime[0];
        this.consumer_port = this.req.app.settings.port;
        this.consumer_platform = process.platform;
        this.consumer_arch = process.arch;
        this.consumer_uptime = process.uptime();
        this.consumer_uid = process.getuid();
        this.consumer_gid = process.getgid();
        this.consumer_ppid = process.ppid;
        this.consumer_pid = process.pid;
    }
}
