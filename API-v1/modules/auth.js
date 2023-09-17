
module.exports = {
    name: 'auth',
    ErrorCodeRange: "020",
    run: async function () {   
        const fs = require('fs');
        const path = require('path');
        const User = require('../config/schema/user.js');
        global.cookiesAuth = async function (userID, sessionID) {
            if (!userID || !sessionID) return false;
            if (forbidden.includes(userID) || forbidden.includes(sessionID)) return false;
            let username;
            let usersearch = await User.findOne({userID: userID});
            if (usersearch == null) {
                return false;
            } else {
                username = usersearch.userName; 
            }
            if (!fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + username + "-" + sessionID + ".json"))) return false;
            return true;
        }
    }
}    