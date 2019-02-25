var mongo = require('../mongoConnect');

//creating model
var roleModel = mongo.mongoose.model("Role", mongo.roleSchema, "roles");


//api to create new role only by admin
function createRole(data, callback) {
    roleModel.create(data, function (err, res) {
        if (err) {
            callback({ status: 404, error: err });
        }
        callback(null, 'User Role created successfully.')
    })
}


//api to get roleid by given role name
function getRole(data, callback) {
    roleModel.findOne({ roleName: data }, function (err, res) {
        if (err) {
            callback({ status: 404, data: err })
        }
        else {
            let ans = JSON.stringify(res);
            console.log(ans);
            callback(null, { status: 200, data: ans })
        }
    })
}

function getAllRole(callback) {
    roleModel.find(function (err, res) {
        if (err) {
            callback({ status: 404, data: err })
        }
        else {
            console.log(res);
            callback(null, { status: 200, data: res });
        }
    })
}

module.exports = {
    createRole,
    getRole,
    getAllRole
}