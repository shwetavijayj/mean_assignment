var mongo = require('../mongoConnect');

var uniqid = require('uniqid');

var loginModel = mongo.mongoose.model('LoginStatus', mongo.loginStatusSchema, "loginStatus");
var tokenmodel = mongo.mongoose.model('tokenstore', mongo.tokenSchema, "tokenStore");
function enterLoginDetails(userData, callback) {
    userDetails = {
        LoginStatusId: uniqid.process(),
        UserName: userData.UserName,
        DateTime: userData.DateTime,
        IPAddress: userData.IPAddress
    }
    tokenDetails = {
        UserId: userData.UserId,
        token: userData.token
    }
    loginModel.create(userDetails, (err, res) => {
        if (err) {
            callback(err);
        }
        else {
            tokenmodel.create(tokenDetails, (err1, res1) => {
                if (err1) {
                    callback(err1)
                } else {
                    callback(null, { msg: 'Data store successfully.', result: res1 });
                }
            })

        }
    });

}



module.exports = {
    enterLoginDetails
}