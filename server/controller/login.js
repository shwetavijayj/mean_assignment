var mongo = require('../mongoConnect');
var userModel = mongo.mongoose.model('User', mongo.userSchema, "users");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoTemp");
//authenticate user while sign-in and generate token
function authenticateUser(data, callback) {
    console.log(data);
    userModel.findOne({ UserName: data.UserName, Password: data.Password }, function (findUserErr, findUserResult) {
        if (findUserErr) {
            callback(findUserErr);
        }
        else {
            if (findUserResult != null) {

                let id = {
                    UserId: findUserResult.UserId
                }
                if (findUserResult.roleId == 3) {
                    personModel.findOne(id, function (findInfoErr, findInfoResult) {
                        if (findInfoErr) {
                            callback(findInfoErr);
                        }
                        else {
                            personModelTemp.find(id, function (findInfoTempErr, findInfoTempResult) {
                                if (findInfoTempErr) {
                                    callback(findInfoTempErr);
                                }
                                else {
                                    if (findInfoResult == null && findInfoTempResult.length != 0) {
                                        findUserResult.isApproved = null;
                                        findUserResult.PersonalUniqueId = null;
                                        callback(null, findUserResult);
                                    }
                                    else if (findInfoResult != null && findInfoTempResult.length == 0) {
                                        findUserResult.isApproved = 1;
                                        findUserResult.PersonalUniqueId = findInfoResult.PersonalUniqueId;
                                        callback(null, findUserResult);
                                    } else if (findInfoResult != null && findInfoTempResult.length != 0) {
                                        findUserResult.PersonalUniqueId = findInfoResult.PersonalUniqueId;
                                        findUserResult.isApproved = 1;
                                        callback(null, findUserResult);
                                    }
                                    else if (findInfoResult == null && findInfoTempResult.length == 0) {
                                        findUserResult.PersonalUniqueId = null;
                                        findUserResult.isApproved = 0;
                                        callback(null, findUserResult);
                                    }
                                }
                            });
                        }
                    })
                }
                else {
                    findUserResult.PersonalUniqueId = null;
                    callback(null, findUserResult);
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