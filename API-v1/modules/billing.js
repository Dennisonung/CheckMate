const user = require('../config/schema/user.js');

module.exports = {
    name: 'Billing',
    description: 'billing management module',
    ErrorCodeRange: "300",
    run: async function (app, path, fs, sha512,Config) {   
        const User = require('../config/schema/user.js');
        const Group = require('../config/schema/group.js');
        const axios = require('axios');
        app.post(api + "/PayGroupBill",async function (req, res) {
            console.log("API has been Accessed from /api/v1/ and the IP is " + req.ip);
            //Charge selected group members
            //Requires a groupID, multiple userID, and a sessionID
            //Returns a 200 if successful
            //Returns a 400 if bad request
            //Returns a 403 if forbidden
            //Returns a 500 if internal server error
            try {
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
                let groupID = req.body.groupID;
                let groupMembers = req.body.groupMembers; //array of userIDs
                let billAmount = req.body.billAmount;
                let billDescription = req.body.billDescription;
                let billID = sha512(groupID + billAmount + Config.salt);
                let splitAmount = req.body.splitAmount;

                //check if group exists
                let group = Group.findOne({groupID: groupID});
                if (group == null) {
                    return res.status(400).send("Bad Request");
                }
                //check if users is in group
                for (let i = 0; i < groupMembers.length; i++) {
                    user = User.findOne({userID: groupMembers[i]});
                    if (user == null) {
                        i = groupMembers.length + 1;
                        return res.status(400).send("Forbidden");
                    }
                    if(!user.userGroups.includes(groupID)) {
                        i = groupMembers.length + 1;
                        return res.status(400).send("Forbidden");
                    }
                }


                //charge users
                for (let i = 0; i < groupMembers.length; i++) {
                    user = User.findOne({userID: groupMembers[i]});
                    axios.get('http://money-request-app.canadacentral.cloudapp.azure.com:8080/api/v1/client?email=' +  user.email).then((res) => {
                        axios.post('http://money-request-app.canadacentral.cloudapp.azure.com:8080/api/v1/request', {
                            "expirationDate": Date.now(),
                            "amount": splitAmount[i],
                            "requesteeId": res.data.id,
                            "invoiceNumber": billID,
                            "message": billDescription
                        }).catch(e => {});

                    });
                }
                return res.status(200).send("OK");

            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        });
        app.get(api + "/getBalance",async function (req, res) {
            console.log("API has been Accessed from /api/v1/getBalance and the IP is " + req.ip);
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
            let balance;
            if (usersearch.userBalance.toString().includes(".")) {
                let balanceString = usersearch.userBalance.toString();
                let decimalIndex = balanceString.indexOf(".");
                let decimalPlaces = balanceString.length - decimalIndex - 1;
                if (decimalPlaces == 1) {
                    balance = usersearch.userBalance + "0";
                } else if (decimalPlaces >= 3) {
                    balance = usersearch.userBalance.toFixed(2);
                } else {
                    balance = usersearch.userBalance;
                }
            } else {
                balance = usersearch.userBalance + ".00";
            }
            res.send({
                "balance": balance
            })
        });
    }
}    