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
    personModel.find(condition, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            personModelTemp.find(condition, function (error, res1) {
                if (error) {
                    callback(error)
                } else {
                    // callback(null, res1);
                    if (res != null && res1 != null) {
                        res.updateFlag = 1;
                        callback(null, res);
                    }
                    else if (res == null && res1 != null) {
                        res1.updateFlag = 0;
                        callback(null, res1);
                    } else if (res != null && res1 == null) {
                        res.updateFlag = 0;
                        callback(null, res);
                    }
                }
            })

            // callback(null, res);

        }
    });
}


/*
Admin purpose
this api will return information of all users
*/
function getAllUserInformation(callback) {
    personModel.find(function (err, res) {
        if (err) {
            callback(err);
        } else {
            getFormattedData(res, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result);
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
    personModelTemp.find(function (err, res) {
        if (err) {
            callback(err);
        } else {
            getFormattedData(res, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result);
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