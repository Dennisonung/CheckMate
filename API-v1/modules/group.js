
module.exports = {
    name: 'group',
    description: 'group management module',
    ErrorCodeRange: 100,
    run: async function (app, path, fs, sha512) {   
        app.get(api + "/groups/list",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/list and the IP is " + req.ip);

        });
        app.get(api + "/groups/join",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/join and the IP is " + req.ip);

        });
        app.post(api + "/groups/create",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/create and the IP is " + req.ip);

        });
        app.post(api + "/groups/createInvite",async function (req, res) {
            console.log("API has been Accessed from /api/v1/groups/createInvite and the IP is " + req.ip);

        });

    }
}    