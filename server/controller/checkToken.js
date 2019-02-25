var mongo = require('../mongoConnect');

var tokenmodel = mongo.mongoose.model('tokenstore', mongo.tokenSchema, "tokenStore");

function checkToken(userData, callback) {
    condition = {
        UserId: userData.UserId,
        token: userData.token
    }
    tokenmodel.find(condition, (err, res) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, { statusCode: 200 });
        }
    })
};
function deleteToken(userData, callback) {
    tokenmodel.deleteOne(userData, (err, res) => {
        if (err) {
            callback(err);
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