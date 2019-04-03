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

                    if (userInfoResult.length != 0 && userInfoTempResult.length != 0) {
                        userInfoResult[0].updateFlag = 1;
                        let userInformation = {
                            Address: {
                                addr1: userInfoResult[0].Address.addr1,
                                addr2: userInfoResult[0].Address.addr2,
                                addr3: userInfoResult[0].Address.addr3
                            },
                            Age: userInfoResult[0].Age,
                            birthsign: userInfoResult[0].birthsign,
                            City: userInfoResult[0].City,
                            DateOfBirth: userInfoResult[0].DateOfBirth,
                            edustatus: userInfoResult[0].edustatus,
                            FullName: {
                                fname: userInfoResult[0].FullName.fname,
                                mname: userInfoResult[0].FullName.mname,
                                lname: userInfoResult[0].FullName.lname
                            },
                            Gender: userInfoResult[0].Gender,
                            isApproved: userInfoResult[0].isApproved,
                            maritalstatus: userInfoResult[0].maritalstatus,
                            Mobile: userInfoResult[0].Mobile,
                            PersonalUniqueId: userInfoResult[0].PersonalUniqueId,
                            Phone: userInfoResult[0].Phone,
                            physicaldisability: userInfoResult[0].physicaldisability,
                            Pincode: userInfoResult[0].Pincode,
                            State: userInfoResult[0].State,
                            updateFlag: 1,
                            UserId: userInfoResult[0].UserId
                        }
                        callback(null, userInformation);
                    }
                    else if (userInfoResult.length === 0 && userInfoTempResult.length != 0) {
                        let userInformation = {
                            Address: {
                                addr1: userInfoTempResult[0].Address.addr1,
                                addr2: userInfoTempResult[0].Address.addr2,
                                addr3: userInfoTempResult[0].Address.addr3
                            },
                            Age: userInfoTempResult[0].Age,
                            birthsign: userInfoTempResult[0].birthsign,
                            City: userInfoTempResult[0].City,
                            DateOfBirth: userInfoTempResult[0].DateOfBirth,
                            edustatus: userInfoTempResult[0].edustatus,
                            FullName: {
                                fname: userInfoTempResult[0].FullName.fname,
                                mname: userInfoTempResult[0].FullName.mname,
                                lname: userInfoTempResult[0].FullName.lname
                            },
                            Gender: userInfoTempResult[0].Gender,
                            isApproved: userInfoTempResult[0].isApproved,
                            maritalstatus: userInfoTempResult[0].maritalstatus,
                            Mobile: userInfoTempResult[0].Mobile,
                            PersonalUniqueId: userInfoTempResult[0].PersonalUniqueId,
                            Phone: userInfoTempResult[0].Phone,
                            physicaldisability: userInfoTempResult[0].physicaldisability,
                            Pincode: userInfoTempResult[0].Pincode,
                            State: userInfoTempResult[0].State,
                            updateFlag: 1,
                            UserId: userInfoTempResult[0].UserId
                        }

                        callback(null, userInformation);
                    } else if (userInfoResult.length != 0 && userInfoTempResult.length === 0) {
                        let userInformation = {
                            Address: {
                                addr1: userInfoResult[0].Address.addr1,
                                addr2: userInfoResult[0].Address.addr2,
                                addr3: userInfoResult[0].Address.addr3
                            },
                            Age: userInfoResult[0].Age,
                            birthsign: userInfoResult[0].birthsign,
                            City: userInfoResult[0].City,
                            DateOfBirth: userInfoResult[0].DateOfBirth,
                            edustatus: userInfoResult[0].edustatus,
                            FullName: {
                                fname: userInfoResult[0].FullName.fname,
                                mname: userInfoResult[0].FullName.mname,
                                lname: userInfoResult[0].FullName.lname
                            },
                            Gender: userInfoResult[0].Gender,
                            isApproved: userInfoResult[0].isApproved,
                            maritalstatus: userInfoResult[0].maritalstatus,
                            Mobile: userInfoResult[0].Mobile,
                            PersonalUniqueId: userInfoResult[0].PersonalUniqueId,
                            Phone: userInfoResult[0].Phone,
                            physicaldisability: userInfoResult[0].physicaldisability,
                            Pincode: userInfoResult[0].Pincode,
                            State: userInfoResult[0].State,
                            updateFlag: 0,
                            UserId: userInfoResult[0].UserId
                        }

                        callback(null, userInformation);
                    }
                    else if (userInfoResult.length === 0 && userInfoTempResult.length === 0) {
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