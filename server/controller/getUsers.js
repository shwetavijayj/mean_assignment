var mongo = require('../mongoConnect');
personModel = mongo.mongoose.model("personalSchema", mongo.personalSchema, "PersonalInfo");
personModelTemp = mongo.mongoose.model("personalSchemaTemp", mongo.personalSchemaTemp, "PersonalInfoPortalTemp");


/*
    this api will return information of user to display it on home-page
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
            callback(null, res);
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
                Addr1: element.Address.Addr1,
                Addr2: element.Address.Addr2,
                Addr3: element.Address.Addr3
            },
            City: element.City,
            State: element.State,
            Pincode: element.Pincode,
            Phone: element.Phone,
            Mobile: element.Mobile,
            PhysicalDisability: element.PhysicalDisability,
            MaritalStatus: element.MaritalStatus,
            EduStatus: element.EduStatus,
            Birthsign: element.Birthsign,
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