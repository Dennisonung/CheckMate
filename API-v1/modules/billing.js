
module.exports = {
    name: 'Billing',
    description: 'billing management module',
    ErrorCodeRange: "300",
    run: async function (app, path, fs, sha512,Config) {   
        const User = require('../config/schema/user.js');
        app.get(api + "/",async function (req, res) {
            console.log("API has been Accessed from /api/v1/ and the IP is " + req.ip);
            //accepts a group invitation.
            //requires a groupID and a userID
            //returns a 200 if successful
            //returns a 400 if bad request
            //returns a 500 if internal server error
        });
        app.post(api + "/getBalance",async function (req, res) {
            console.log("API has been Accessed from /api/v1/ and the IP is " + req.ip);
            //get sessionID and userID from cookies
            //check if sessionID is valid
            //check if userID is valid
            //return balance

            let userID = req.cookies.userID;
            let sessionID = req.cookies.sessionID;
            if (!userID || !sessionID) {
                return res.status(400).send("Bad Request");
            }

            if (forbidden.includes(userID) || forbidden.includes(sessionID)) {
                return res.status(403).send("Forbidden");
            }
            //check if user exists
            let username;
            let usersearch = await User.findOne({userID: userID});
            if (usersearch == null) {
                return res.status(400).send("Bad Request");
            } else {
                username = usersearch.userName; 
            }
            //check if session exists
            console.log( username + "-" + sessionID + ".json")
            if (!fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + username + "-" + sessionID + ".json"))) {
                return res.status(403).send("Forbidden");
            }

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