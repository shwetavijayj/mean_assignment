var mongo = require('../mongoConnect');
var createuser = require('../controller/createUser');
var uniqid = require('uniqid');
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoPortalTemp");
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
// api to store user at temporary location 
function registerUserTemporary(data, callback) {
    //1. before passing data to this function make sure that UserId is added to data object which will be fetched seperate by getUserId api.
    //then add data to temp collection

    createuser.getUser(data.UserId, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            data.isApproved = 0;
            personModelTemp.create(data, function (err, res1) {
                if (err) {
                    callback(err);
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
    personModel.create(data, function (err1, resp) {
        if (err1) {
            callback(err1)
        }
        else {
            callback(null, 'Requested data saved successfully and removed from temporary storage..')

        }
    })
}

//api to store user at permanant location and deleting it from temp location after admin approval
function registerUser(data, callback) {
    personModelTemp.findOne({ UserId: data.UserId }, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            let userData = {
                UserId: res.UserId,
                PersonalUniqueId: uniqid.process(),
                FullName: {
                    fname: res.FullName.fname,
                    mname: res.FullName.mname,
                    lname: res.FullName.lname
                },
                Gender: res.Gender,
                DateOfBirth: res.DateOfBirth,
                Age: res.Age,
                Address: {
                    Addr1: res.Address.addr1,
                    Addr2: res.Address.addr2,
                    Addr3: res.Address.addr3
                },
                City: res.City,
                State: res.State,
                Pincode: res.Pincode,
                Phone: res.Phone,
                Mobile: res.Mobile,
                PhysicalDisability:res.PhysicalDisability,
                MaritalStatus: res.MaritalStatus,
                EduStatus: res.EduStatus,
                Birthsign:res.Birthsign
            }
            console.log(userData);
            personModel.create(userData, function (err1, resp) {
                if (err1) {
                    callback(err1)
                }
                else {
                    console.log("data", data);
                    personModelTemp.deleteOne({ UserId: data.UserId }, function (error, response) {
                        if (error) {
                            callback({ error: 'Error while deleting records from temp storage' });
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
    personModelTemp.updateOne({ UserId: data.UserId }, { $set: { isApproved: 0 } }, (err, res) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log(res);
        }
    })
}

function getDatafromTempStore(callback) {
    personModelTemp.find(function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, res);
        }
    });
};


// updation of details after admin's approval
function updateUserDetails(data, callback) {
    condition = {
        PersonalUniqueId: data.PersonalUniqueId
    }
    personModel.findOne(condition, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            if (res != null) {
                personModel.updateOne(condition, data, function (err, res1) {
                    if (err) {

                    }
                    else {
                        personModelTemp.deleteOne(condition, function (error, response) {
                            if (error) {
                                callback({ error: 'Error while deleting records from temp storage' });
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
    createuser.getUser(data.UserId, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            CheckUser = {
                PersonalUniqueId: data.PersonalUniqueId
            }
            personModel.findOne(CheckUser, (error, res) => {
                if (err) {
                    callback(error)
                }
                else {
                    if (res != null) {
                        personModelTemp.create(data, function (err, res1) {
                            if (err) {
                                callback(err);
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