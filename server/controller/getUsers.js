var mongo = require('../mongoConnect');
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoTemp");


/*
    this api will return information of user to display it on home-page from permanent or temporary location.
*/
function getUserInfo(data, callback) {
    condition = {
        UserId: data.UserId
    }
    personModel.find(condition, function (userInfoErr, userInfoResult) {
        if (userInfoErr) {
            callback(userInfoErr);
        }
        else {
            personModelTemp.find(condition, function (userInfoTempErr, userInfoTempResult) {
                if (userInfoTempErr) {
                    callback(userInfoTempErr)
                } else {
                    // callback(null, userInfoTempResult);
                    if (userInfoResult != null && userInfoTempResult != null) {
                        userInfoResult.updateFlag = 1;
                        callback(null, userInfoResult);
                    }
                    else if (userInfoResult == null && userInfoTempResult != null) {
                        userInfoTempResult.updateFlag = 0;
                        callback(null, userInfoTempResult);
                    } else if (userInfoResult != null && userInfoTempResult == null) {
                        userInfoResult.updateFlag = 0;
                        callback(null, userInfoResult);
                    }
                }
            })

            // callback(null, userInfoResult);

        }
    });
}


/*
Admin purpose
this api will return information of all users
*/
function getAllUserInformation(callback) {
    personModel.find(function (getAllUserInfoErr, getAllUserInfoRes) {
        if (getAllUserInfoErr) {
            callback(getAllUserInfoErr);
        } else {
            getFormattedData(getAllUserInfoRes, (formattedDataErr, formattedDataResult) => {
                if (formattedDataErr) {
                    callback(formattedDataErr);
                }
                else {
                    callback(null, formattedDataResult);
                }
            })

        }
    })
}

/*
Admin purpose
this api will return information of all users from temporary user
*/
function getAllTempUsersInformation(callback) {
    personModelTemp.find(function (getAllTempUserErr, getAllTempUserResult) {
        if (getAllTempUserErr) {
            callback(getAllTempUserErr);
        } else {
            getFormattedData(getAllTempUserResult, (formattedDataErr, formattedDataResult) => {
                if (formattedDataErr) {
                    callback(formattedDataErr);
                }
                else {
                    callback(null, formattedDataResult);
                }
            })

        }
    })
}

function getFormattedData(data, callback) {
    console.log(data);
    let result = [];
    data.forEach(element => {
        result.push({
            UserId: element.UserId,
            PersonalUniqueId: element.PersonalUniqueId,
            FullName: {
                fname: element.FullName.fname,
                mname: element.FullName.mname,
                lname: element.FullName.lname
            },
            Gender: element.Gender,
            DateOfBirth: element.DateOfBirth,
            Age: element.Age,
            Address: {
                addr1: element.Address.addr1,
                addr2: element.Address.addr2,
                addr3: element.Address.addr3
            },
            City: element.City,
            State: element.State,
            Pincode: element.Pincode,
            Phone: element.Phone,
            Mobile: element.Mobile,
            physicaldisability: element.physicaldisability,
            maritalstatus: element.maritalstatus,
            edustatus: element.edustatus,
            birthsign: element.birthsign,
            isApproved: element.isApproved
        })

    });
    console.log(result);
    callback(null, result);
}

module.exports = {
    getUserInfo,
    getAllUserInformation,
    getAllTempUsersInformation
}