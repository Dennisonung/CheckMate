
module.exports = {
    name: 'group',
    description: 'group management module',
    ErrorCodeRange: 100,
    run: async function (app, path, fs, sha512,Config) {  
        const group = require('../config/schema/group.js');
        const user = require('../config/schema/user.js');
        const axios = require('axios');

        app.get(api + "/groups/list",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/list and the IP is " + req.ip);
            try {
                const userID = req.query.userID;
                const sessionID = req.query.sessionID;

                if (!userID || !sessionID) {
                    return res.status(400).send("Bad Request");
                }

                if (forbidden.includes(userID) || forbidden.includes(sessionID)) {
                    return res.status(403).send("Forbidden");
                }
                //check if user exists
                let username;
                if (user.findOne({userID: userID}) == null) {
                    return res.status(400).send("Bad Request");
                } else {
                    username = user.findOne({userID: userID}).userName;
                }
                //check if session exists
                if (!fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + username + "-" + sessionID + ".json"))) {
                    return res.status(403).send("Forbidden");
                }

                let userGroups = await group.find({groupMembers: userID});
                let groupList = [];
                for (let i = 0; i < userGroups.length; i++) {
                    groupList.push({
                        "groupID": userGroups[i].groupID,
                        "groupName": userGroups[i].groupName,
                        "groupBalance": userGroups[i].groupBalance,
                        "groupAdmin": userGroups[i].groupAdmin
                    });
                }
                return res.status(200).send(groupList);
            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        });
        app.get(api + "/groups/join",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/join and the IP is " + req.ip);
            let userID = req.cookies.userID;
            let sessionID = req.cookies.sessionID;
            if (!userID || !sessionID) return res.status(400).send("Bad Request");
            if (forbidden.includes(userID) || forbidden.includes(sessionID)) return res.status(403).send("Forbidden");
            let username;
            let usersearch = await User.findOne({userID: userID});
            if (usersearch == null) {
                return res.status(400).send("Bad Request");
            } else {
                username = usersearch.userName; 
            }
            if (!fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + username + "-" + sessionID + ".json"))) return res.status(403).send("Forbidden");
            














        });
        app.post(api + "/groups/create",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/create and the IP is " + req.ip);
            let userID = req.cookies.userID;
            let sessionID = req.cookies.sessionID;
            if (!userID || !sessionID) return res.status(400).send("Bad Request");
            if (forbidden.includes(userID) || forbidden.includes(sessionID)) return res.status(403).send("Forbidden");
            let username;
            let usersearch = await User.findOne({userID: userID});
            if (usersearch == null) {
                return res.status(400).send("Bad Request");
            } else {
                username = usersearch.userName; 
            }
            if (!fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + username + "-" + sessionID + ".json"))) return res.status(403).send("Forbidden");






        });
        app.post(api + "/groups/createInvite",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/createInvite and the IP is " + req.ip);
            let userID = req.cookies.userID;
            let sessionID = req.cookies.sessionID;
            if (!userID || !sessionID) return res.status(400).send("Bad Request");
            if (forbidden.includes(userID) || forbidden.includes(sessionID)) return res.status(403).send("Forbidden");
            let username;
            let usersearch = await User.findOne({userID: userID});
            if (usersearch == null) {
                return res.status(400).send("Bad Request");
            } else {
                username = usersearch.userName; 
            }
            if (!fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + username + "-" + sessionID + ".json"))) return res.status(403).send("Forbidden");








        });

    }
}    