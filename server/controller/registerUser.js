var mongo = require('../mongoConnect');
var createuser = require('../controller/createUser');
var uniqid = require('uniqid');
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoTemp");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
// api to store user at temporary location 
function registerUserTemporary(data, callback) {
    //1. before passing data to this function make sure that UserId is added to data object which will be fetched seperate by getUserId api.
    //then add data to temp collection

    createuser.getUser(data.UserId, function (registerTempUserErr, registerTempUserResult) {
        if (registerTempUserErr) {
            callback(registerTempUserErr);
        }
        else {
            data.isApproved = 0;
            personModelTemp.create(data, function (saveDataErr, saveDataResult) {
                if (saveDataErr) {
                    callback(saveDataErr);
                }
                else {
                    callback(null, 'Your Data saved successfully.')
                }
            })
        }
    });
}

//direct per. storage
function registerUserAdmin(data, callback) {
    data.PersonalUniqueId = uniqid.process();
    personModel.create(data, function (saveDataErr, saveDataResult) {
        if (saveDataErr) {
            callback(saveDataErr)
        }
        else {
            callback(null, 'Requested data saved successfully and removed from temporary storage..')

        }
    })
}

//api to store user at permanant location and deleting it from temp location after admin approval
function registerUser(data, callback) {
    personModelTemp.findOne({ UserId: data.UserId }, function (findDataErr, findDataResult) {
        if (findDataErr) {
            callback(findDataErr);
        }
        else {
            let userData = {
                UserId: findDataResult.UserId,
                PersonalUniqueId: uniqid.process(),
                FullName: {
                    fname: findDataResult.FullName.fname,
                    mname: findDataResult.FullName.mname,
                    lname: findDataResult.FullName.lname
                },
                Gender: findDataResult.Gender,
                DateOfBirth: findDataResult.DateOfBirth,
                Age: findDataResult.Age,
                Address: {
                    addr1: findDataResult.Address.addr1,
                    addr2: findDataResult.Address.addr2,
                    addr3: findDataResult.Address.addr3
                },
                City: findDataResult.City,
                State: findDataResult.State,
                Pincode: findDataResult.Pincode,
                Phone: findDataResult.Phone,
                Mobile: findDataResult.Mobile,
                physicaldisability: findDataResult.physicaldisability,
                maritalstatus: findDataResult.maritalstatus,
                edustatus: findDataResult.edustatus,
                birthsign: findDataResult.birthsign,
                isApproved: 1
            }
            console.log(userData);
            personModel.create(userData, function (saveDataErr, saveDataResult) {
                if (saveDataErr) {
                    callback(saveDataErr)
                }
                else {
                    console.log("data", data);
                    personModelTemp.deleteOne({ UserId: data.UserId }, function (deleteDataErr, deleteDataResult) {
                        if (deleteDataErr) {
                            callback({ deleteDataErr: 'Error while deleting records from temp storage' });
                        }
                        else {
                            callback(null, 'Requested data saved successfully and removed from temporary storage..')
                        }
                    })
                }
            })
        }
    })
}
//api to reject user by admin
function rejectUserRequest(data, callback) {
    console.log("data", data);
    personModelTemp.updateOne({ UserId: data.UserId }, { $set: { isApproved: 0 } }, (updateDataErr, updateDataResult) => {
        if (updateDataErr) {
            console.log("Error", updateDataErr);
        } else {
            console.log(updateDataResult);
        }
    })
}

function getDatafromTempStore(callback) {
    personModelTemp.find(function (getDataTempStoreErr, getDataTempStoreResult) {
        if (getDataTempStoreErr) {
            callback(getDataTempStoreErr);
        }
        else {
            callback(null, getDataTempStoreResult);
        }
    });
};


// updation of details after admin's approval
function updateUserDetails(data, callback) {
    condition = {
        PersonalUniqueId: data.PersonalUniqueId
    }
    personModel.findOne(condition, function (findDataErr, findDataRes) {
        if (findDataErr) {
            callback(findDataErr);
        }
        else {
            if (findDataRes != null) {
                personModel.updateOne(condition, data, function (updateDataErr, updateDataRes) {
                    if (updateDataErr) {
                        callback(updateDataErr);
                    }
                    else {
                        personModelTemp.deleteOne(condition, function (deleteErr, deleteResult) {
                            if (deleteErr) {
                                callback({ deleteErr: 'Error while deleting records from temp storage' });
                            }
                            else {
                                callback(null, 'Requested data saved successfully and removed from temporary storage..')
                            }
                        })
                    }
                })
            }
        }
    })
}

// store data at temporary location after user updates their data.
function updateTempUserDetails(data, callback) {
    condition = {
        UserId: data.UserId
    }
    createuser.getUser(data.UserId, function (getUserErr, getUserResult) {
        if (getUserErr) {
            callback(getUserErr);
        }
        else {
            CheckUser = {
                PersonalUniqueId: data.PersonalUniqueId
            }
            personModel.findOne(CheckUser, (findUserErr, findUserRes) => {
                if (findUserErr) {
                    callback(findUserErr)
                }
                else {
                    if (findUserRes != null) {
                        personModelTemp.create(data, function (updateUserErr, updateUserRes) {
                            if (updateUserErr) {
                                callback(updateUserErr);
                            }
                            else {
                                callback(null, 'Your Data Updated successfully and reflected after admin approval process.')
                            }
                        })
                    }
                    else {
                        callback("Previous User details not exist")
                    }
                }
            })
        }
    });
}




module.exports = {
    registerUserTemporary,
    registerUser,
    getDatafromTempStore,
    updateUserDetails,
    updateTempUserDetails,
    rejectUserRequest,
    registerUserAdmin
}