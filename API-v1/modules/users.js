module.exports = {
    name: 'users',
    description: 'user management module',
    ErrorCodeRange: 200,
    run: async function (app, path, fs, sha512,Config) {   
        const User = require('../config/schema/user.js');
        const axios = require('axios');

        //Register a new user
        app.post(api + "/NewUserRegister",async function (req, res) {
            console.log("API has been Accessed from /api/v1/NewUserRegister and the IP is " + req.ip);
            try {
                let error = false;
                const username = req.body.username;
                const password = req.body.password;
                const email = req.body.email;
                const FirstName = req.body.FirstName;
                const LastName = req.body.LastName;
                if (!username || !password || !email || !FirstName || !LastName) return res.status(400).send("Bad Request");
                let newUserID = sha512(username + Config.salt)
                const newUser = new User({
                    userID: newUserID,
                    userName: username,
                    userPassword: sha512(password + Config.salt),
                    email: email,
                    userFirstName: FirstName,
                    userLastName: LastName,
                    userGroups: [],
                    userBalance: 0,
                    paymentMethods: []
                });
                axios.post('http://money-request-app.canadacentral.cloudapp.azure.com:8080/api/v1/client', {
                    "name": FirstName + " " + LastName,
                    "emailAddress": email
                }).catch(e => {});
                if (await User.findOne({ username: username })) return res.status(400).send("Bad Request");
                if (await User.findOne({ email: email })) return res.status(400).send("Bad Request");
                await newUser.save().catch(e => {
                    return res.status(500).send("Internal Server Error");
                });
                res.status(200).send({
                    "success": true,
                    "userID" : newUserID,
                    "userName" : username
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        });
        app.post(api + "/UserLogin",async function (req, res) {
            console.log("API has been Accessed from /api/v1/UserLogin and the IP is " + req.ip);
            try {
                const username = req.body.username;
                const password = req.body.password;
                const email = req.body.email;
                if (!username || !password || !email) return res.status(400).send("Bad Request");
                const user = await User.findOne({ userName: username }).catch(e => {
                    console.log(`Failed to find user: ${e}`)
                    return res.status(400).send("Bad Request")
                });
                if (!user) return res.status(400).send("Bad Request");
                if (user.userPassword !== sha512(password + Config.salt)) return res.status(400).send("Bad Request");
                
                let sessionID = Math.floor(Math.random() * 10000000000000000);
                while (fs.existsSync(path.join(__dirname, "../nonpersistent/ActiveSessions/" + sessionID + ".json"))) {
                    sessionID = Math.floor(Math.random() * 10000000000000000);
                }
                fs.writeFileSync(path.join(__dirname, "../nonpersistent/ActiveSessions/"+username+"-"+sessionID + ".json"), JSON.stringify({
                    "userID": user.userID,
                    "userName": user.userName,
                }));
                res.cookie('sessionID', sessionID, { expires: new Date(Date.now() + 604800), httpOnly: true })
                res.cookie('userID', user.userID, { expires: new Date(Date.now() + 604800), httpOnly: true })
                res.status(200).send({
                    "success": true,
                    "userID" : user.userID,
                    "userName" : username,
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        });
    }
}    