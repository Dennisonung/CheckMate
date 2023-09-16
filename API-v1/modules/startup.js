
module.exports = {
    name: 'run',
    ErrorCodeRange: "010",
    run: async function (fs,path) {   
        // make directory "nonpersistent" in the root directory
        
        if (!fs.existsSync(path.join(__dirname, "../nonpersistent"))) {
            fs.mkdirSync(path.join(__dirname, "../nonpersistent"));
            fs.mkdirSync(path.join(__dirname, "../nonpersistent/ActiveSessions"));
        }
        if (!fs.existsSync(path.join(__dirname, "../persistent"))) {
            await fs.mkdirSync(path.join(__dirname, "../persistent"));
        }
    }
}    