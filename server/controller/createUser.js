var mongo = require('../mongoConnect');
var userRole = require('./userRole');
var uniqid = require('uniqid');
const async = require('async');
//creating user model
var userModel = mongo.mongoose.model('User', mongo.userSchema, "users");
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoTemp");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
// api to create user
function createUser(data, callback) {
    userRole.getRole(data.roleName, function (getRoleErr, getRoleResult) {
        if (getRoleErr) {
            callback(getRoleErr)
        }
        else {
            let role = JSON.parse(getRoleResult.data);
            data.roleId = role.roleId;
            console.log("Userid", uniqid.process());
            data.UserId = uniqid.process();
            userModel.create(data, function (createUserErr, createUserResult) {
                if (createUserErr) {
                    callback({ status: 404, error: createUserErr });
                }
                else {
                    callback(null, 'User created successfully.')
                }
            })
        }
    })

};

// api to get user id by username
function getUser(data, callback) {
    userModel.findOne({ UserName: data }, function (getUserErr, getUserResult) {
        if (getUserErr) {
            callback({ status: 404, data: getUserErr })
        }
        else {
            let ans = JSON.stringify(getUserResult);
            console.log(ans);
            callback(null, ans)
        }
    })
}
//Get All access_users for admin purpose
function getAllUsers(callback) {
    let finalResult = [];
    userModel.find({ roleId: 3 }, function (getAllUserErr, getAllUserResult) {
        if (getAllUserErr) {
            callback({ status: 404, error: getAllUserErr });
        }
        else {
            getFormattedData(getAllUserResult, (getFormattedDataErr, getFormattedDataResult) => {
                if (getFormattedDataErr) {
                    callback(getFormattedDataErr);
                }
                else {
                    async.eachSeries(getFormattedDataResult, function (element, cb) {
                        personModel.find({ UserId: element.UserId }, function (findPersonalInfoErr, findPersonalInfoResult) {
                            if (findPersonalInfoErr) {
                                callback(findPersonalInfoErr);
                            } else {
                                personModelTemp.find({ UserId: element.UserId }, function (findPersonalInfoTempErr, findPersonalInfoTempResult) {
                                    if (findPersonalInfoTempErr) {
                                        callback(findPersonalInfoTempErr);
                                    }
                                    else {
                                        if ((findPersonalInfoResult.length == 0) && (findPersonalInfoTempResult.length == 0)) {
                                            finalResult.push(element);
                                            cb(null, finalResult);
                                        }
                                        else {
                                            cb(null, finalResult);
                                        }
                                    }
                                })

                            }
                        })

                    }, () => {
                        callback(null, finalResult);
                    })

                }
            })

        }
    })
}

function getFormattedData(data, callback) {
    let result = [];
    data.forEach(element => {
        result.push({
            UserId: element.UserId,
            UserName: element.UserName,
            roleId: element.roleId,
            EmailAddress: element.EmailAddress
        })
    })
    callback(null, result);
}

module.exports = {
    createUser,
    getUser,
    getAllUsers
}