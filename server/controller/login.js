var mongo = require('../mongoConnect');
var userModel = mongo.mongoose.model('User', mongo.userSchema, "users");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
//authenticate user while sign-in and generate token
function authenticateUser(data, callback) {
    console.log(data);
    userModel.findOne({ UserName: data.UserName, Password: data.Password }, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            if (res != null) {

                let id = {
                    UserId: res.UserId
                }
                if (res.roleId == 3) {
                    personModel.findOne(id, function (error, res2) {
                        if (error) {
                            callback(error);
                        }
                        else {
                            if (res2 === null) {
                                res.PersonalUniqueId = null;
                                callback(null, res);
                            } else {
                                res.PersonalUniqueId = res2.PersonalUniqueId;
                                callback(null, res);
                            }

                        }
                    })
                }
                else {
                    res.PersonalUniqueId = null;
                    callback(null, res);
                }
            }
            else {
                callback(null, null);
            }
        }
    })
};

module.exports = {
    authenticateUser
}