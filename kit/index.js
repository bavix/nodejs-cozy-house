
import Session from "./sess";
const session = new Session();

export default {
    event(opts) {
        console.log(session);
    }
}
