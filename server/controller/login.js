var mongo = require('../mongoConnect');
var userModel = mongo.mongoose.model('User', mongo.userSchema, "users");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoTemp");
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
                    personModel.findOne(id, function (error, result1) {
                        if (error) {
                            callback(error);
                        }
                        else {
                            personModelTemp.find(id, function (error1, result2) {
                                if (error1) {
                                    callback(error1);
                                }
                                else {
                                    if (result1 == null && result2 != null) {
                                        res.isApproved = null;
                                        res.PersonalUniqueId = null;
                                        callback(null, res);
                                    }
                                    else if (result1 != null && result2 == null) {
                                        res.isApproved = 1;
                                        res.PersonalUniqueId = result1.PersonalUniqueId;
                                        callback(null, res);
                                    } else if (result1 != null && result2 != null) {
                                        res.PersonalUniqueId = result1.PersonalUniqueId;
                                        res.isApproved = 1;
                                        callback(null, res);
                                    }
                                }
                            });
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