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
    loginModel.create(userDetails, (loginInfoErr, loginInfoResult) => {
        if (loginInfoErr) {
            callback(loginInfoErr);
        }
        else {
            console.log(loginInfoResult);
            tokenmodel.create(tokenDetails, (createTokenErr, createTokenResult) => {
                if (createTokenErr) {
                    callback(createTokenErr)
                } else {
                    callback(null, { msg: 'Data store successfully.', result: createTokenResult });
                }
            })

        }
    });

}



module.exports = {
    enterLoginDetails
}