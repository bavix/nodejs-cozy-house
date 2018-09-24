
import Cookie from 'js-cookie';
import uuid4 from './uuid4'

// sessions
const NODE_SESSION_ID = 'connect.sid';
const PHP_SESSION_ID = 'PHPSESSID';
const JAVA_SESSION_ID = 'JSESSIONID';
const ASP_SESSION_ID = 'ASPSESSIONID';

// analytics
const STUDY_UUID = 'study_uuid';
const YM_UID = '_ym_uid';
const GA = '_ga';
const GID = '_gid';

// get cookies
function cookie(names, callback) {
    for (const name of names) {
        const value = Cookie.get(name);
        if (value !== undefined) {
            return value;
        }
    }

    if (callback !== undefined) {
        return callback(...names);
    }
}

class Session {
    constructor() {
        // priority session id
        this.sid = cookie([
            PHP_SESSION_ID,
            NODE_SESSION_ID,
            JAVA_SESSION_ID,
            ASP_SESSION_ID,
        ]);

        // sessions
        this.phpsessid = Cookie.get(PHP_SESSION_ID);
        this.nodesessid = Cookie.get(NODE_SESSION_ID);
        this.javasessid = Cookie.get(JAVA_SESSION_ID);
        this.aspsessid = Cookie.get(ASP_SESSION_ID);

        // yandex uid
        this.ym_uid = Cookie.get(YM_UID);
        this.ga = Cookie.get(GA);
        this.gid = Cookie.get(GID);

        // local uuid (analytics)
        this.uuid = cookie([STUDY_UUID], (name) => {
            const result = uuid4();

            Cookie.set(name, result, {
                expires: 365 * 3, // 3 years
                path: '',
            });

            return result;
        });
    }
}

export default Session;
