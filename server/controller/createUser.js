var mongo = require('../mongoConnect');
var userRole = require('./userRole');
var uniqid = require('uniqid');
const async = require('async');
//creating user model
var userModel = mongo.mongoose.model('User', mongo.userSchema, "users");
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoPortalTemp");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
// api to create user
function createUser(data, callback) {
    userRole.getRole(data.roleName, function (error, res1) {
        if (error) {
            callback(error)
        }
        else {
            let role = JSON.parse(res1.data);
            data.roleId = role.roleId;
            console.log("Userid", uniqid.process());
            data.UserId = uniqid.process();
            userModel.create(data, function (err, res) {
                if (err) {
                    callback({ status: 404, error: err });
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
    userModel.findOne({ UserName: data }, function (err, res) {
        if (err) {
            callback({ status: 404, data: err })
        }
        else {
            let ans = JSON.stringify(res);
            console.log(ans);
            callback(null, ans)
        }
    })
}
//Get All access_users for admin purpose
function getAllUsers(callback) {
    let finalResult = [];
    userModel.find({ roleId: 3 }, function (err, res) {
        if (err) {
            callback({ status: 404, error: err });
        }
        else {
            getFormattedData(res, (error, result) => {
                if (error) {
                    callback(error);
                }
                else {
                    async.eachSeries(result, function (element, cb) {
                        personModel.find({ UserId: element.UserId }, function (error1, result1) {
                            if (error1) {
                                callback(error1);
                            } else {
                                personModelTemp.find({ UserId: element.UserId }, function (error2, result2) {
                                    if (error2) {
                                        callback(error2);
                                    }
                                    else {
                                        if ((result1.length == 0) && (result2.length == 0)) {
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