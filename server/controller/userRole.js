var mongo = require('../mongoConnect');

//creating model
var roleModel = mongo.mongoose.model("Role", mongo.roleSchema, "roles");


//api to create new role only by admin
function createRole(data, callback) {
    roleModel.create(data, function (createRoleErr, createRoleResult) {
        if (createRoleErr) {
            callback({ status: 404, error: createRoleErr });
        }
        callback(null, 'User Role created successfully.')
    })
}


//api to get roleid by given role name
function getRole(data, callback) {
    roleModel.findOne({ roleName: data }, function (getRoleErr, getRoleResult) {
        if (getRoleErr) {
            callback({ status: 404, data: getRoleErr })
        }
        else {
            let ans = JSON.stringify(getRoleResult);
            console.log(ans);
            callback(null, { status: 200, data: ans })
        }
    })
}

function getAllRole(callback) {
    roleModel.find(function (getAllRoleErr, getAllRoleResult) {
        if (getAllRoleErr) {
            callback({ status: 404, data: getAllRoleErr })
        }
        else {
            console.log(getAllRoleResult);
            callback(null, { status: 200, data: getAllRoleResult });
        }
    })
}

module.exports = {
    createRole,
    getRole,
    getAllRole
}