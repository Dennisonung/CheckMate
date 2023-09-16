module.exports = {
    name: 'users',
    description: 'user management module',
    ErrorCodeRange: 100,
    run: async function (app, path, fs, sha512,Config) {   
        const User = require('../config/schema/user.js');

        //Register a new user
        app.post(api + "/NewUserRegister",async function (req, res) {
            console.log("API has been Accessed from /api/v1/NewUserRegister and the IP is " + req.ip);
            try {
                const username = req.body.username;
                const password = req.body.password;
                const email = req.body.email;
                const FirstName = req.body.FirstName;
                const LastName = req.body.LastName;

                if (!username || !password || !email || !FirstName || !LastName) {
                    return res.status(400).send("Bad Request");
                }
        
                const newUser = new User({
                    userID: sha512(username + Config.salt),
                    userName: username,
                    userPassword: sha512(password + Config.salt),
                    email: email,
                    userFirstName: FirstName,
                    userLastName: LastName,
                    userGroups: [],
                    userBalance: 0,
                    paymentMethods: []
                });
        
                await newUser.save().catch(e => {
                    console.log(`Failed to create user: ${e}`)
                    return res.status(500).send("Internal Server Error")
                });
        
                res.status(200).send({
                    "success": true,
                    "userID" : userID,
                    "userName" : username
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        });

        //Login a user
        app.post(api + "/UserLogin",async function (req, res) {
            console.log("API has been Accessed from /api/v1/UserLogin and the IP is " + req.ip);
            try {
                const username = req.body.username;
                const password = req.body.password;
                const email = req.body.email;
                const FirstName = req.body.FirstName;
                const LastName = req.body.LastName;

                if (!username || !password || !email || !FirstName || !LastName) {
                    return res.status(400).send("Bad Request");
                }

                const user = await User.findOne({ userName: username }).catch(e => {
                    console.log(`Failed to find user: ${e}`)
                    return res.status(400).send("Bad Request")
                });

                if (!user) {
                    return res.status(400).send("Bad Request");
                }

                if (user.userPassword !== sha512(password + Config.salt)) {
                    return res.status(400).send("Bad Request");
                }
                //create sessionID from random numbers up to 16 length and check if it exists in the database if so regenerate it
                let sessionID = Math.floor(Math.random() * 10000000000000000);
                //check if sessionID exists in the nonpersistent/ActiveSessions folder
                while (fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + sessionID + ".json"))) {
                    sessionID = Math.floor(Math.random() * 10000000000000000);
                }
                //create session file
                fs.writeFileSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + sessionID + ".json"), JSON.stringify({
                    "userID": user.userID,
                    "userName": user.userName,
                    "userFirstName": user.userFirstName,
                    "userLastName": user.userLastName,
                    "userGroups": user.userGroups,
                    "userBalance": user.userBalance,
                    "paymentMethods": user.paymentMethods
                }));
                //send sessionID to user
                res.status(200).send({
                    "success": true,
                    "userID" : userID,
                    "userName" : username,
                    "sessionID" : sessionID
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        });
    }
}    