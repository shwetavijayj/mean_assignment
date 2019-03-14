var mongo = require('../mongoConnect');

var tokenmodel = mongo.mongoose.model('tokenstore', mongo.tokenSchema, "tokenStore");

function checkToken(userData, callback) {
    condition = {
        UserId: userData.UserId,
        token: userData.token
    }
    tokenmodel.find(condition, (checkTokenError, res) => {
        if (checkTokenError) {
            callback(checkTokenError)
        }
        else {
            callback(null, { statusCode: 200 });
        }
    })
};
function deleteToken(userData, callback) {
    tokenmodel.deleteOne(userData, (deleteTokenErr, res) => {
        if (deleteTokenErr) {
            callback(deleteTokenErr);
        }
        else {
            callback(null, res);
        }
    })
}

module.exports = {
    checkToken,
    deleteToken
}