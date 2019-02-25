var express = require('express');
var router = express.Router();
var mongoose = require('../mongoConnect');
var userInfo = require('../controller/getUsers');
var createUser = require('../controller/createUser');
var userRole = require('../controller/userRole');
var updateUser = require('../controller/registerUser');
var checkToken = require('../controller/checkToken');


/// User creation and user details fetch APIs calls

router.post('/createUser', function (req, res) {

  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        data = {
          UserName: req.body.UserName,
          EmailAddress: req.body.EmailAddress,
          roleName: req.body.roleName,
          Password: req.body.UserName + '@123'
        }
        createUser.createUser(data, (err, response) => {
          if (err) {
            res.send({ 'Error in user creation': err, statusCode: 403 })
          } else {
            res.send({ msg: 'User created successfully', statusCode: 200 });
          }
        })
      }
      else {
        res.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  })

});

router.post('/userRole', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {

        userRole.createRole(req.body, (err, res) => {
          if (err) {
            response.send({ 'Error in user role creation': err, statusCode: 403 });
          } else {
            response.send({ msg: 'User role created successfully', statusCode: 200 });
          }
        })
      }
      else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  })
})

router.post('/updateUser', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        data = {
          'UserId': req.headers.userid,
          'PersonalUniqueId': req.body.PersonalUniqueId,
          'FullName': {
            'fname': req.body.FullName.fname,
            'mname': req.body.FullName.mname,
            'lname': req.body.FullName.lname
          },
          'Gender': req.body.Gender,
          'DateOfBirth': req.body.DateOfBirth,
          'Age': req.body.Age,
          'Address': {
            'Addr1': req.body.Address.Addr1,
            'Addr2': req.body.Address.Addr2,
            'Addr3': req.body.Address.Addr3
          },
          'City': req.body.City,
          'State': req.body.State,
          'Pincode': req.body.Pincode,
          'Phone': req.body.Phone,
          'Mobile': req.body.Mobile,
          'PhysicalDisability': req.body.PhysicalDisability,
          'MaritalStatus': req.body.MaritalStatus,
          'EduStatus': req.body.EduStatus,
          'BirthSign': req.body.Birthsign
        }
        updateUser.updateUserDetails(data, (err, res) => {
          if (err) {
            response.send({ 'Error in user role creation': err, statusCode: 403 })
          } else {
            response.send({ msg: 'User updated successfully', statusCode: 200 });
          }
        })
      }
      else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  })
});

router.post('/updateUserTemp', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        data = {
          'UserId': req.headers.userid,
          'PersonalUniqueId': req.body.PersonalUniqueId,
          'FullName': {
            'fname': req.body.FullName.fname,
            'mname': req.body.FullName.mname,
            'lname': req.body.FullName.lname
          },
          'Gender': req.body.Gender,
          'DateOfBirth': req.body.DateOfBirth,
          'Age': req.body.Age,
          'Address': {
            'Addr1': req.body.Address.addr1,
            'Addr2': req.body.Address.addr2,
            'Addr3': req.body.Address.addr3
          },
          'City': req.body.City,
          'State': req.body.State,
          'Pincode': req.body.Pincode,
          'Phone': req.body.Phone,
          'Mobile': req.body.Mobile,
          'PhysicalDisability': req.body.PhysicalDisability,
          'MaritalStatus': req.body.MaritalStatus,
          'EduStatus': req.body.EduStatus,
          'BirthSign': req.body.Birthsign,
          'isApproved': 0
        }
        updateUser.updateTempUserDetails(data, (err, res) => {
          if (err) {
            response.send({ 'Error in user role creation': err, statusCode: 403 })
          } else {
            response.send({ msg: 'User updated successfully', statusCode: 200 });
          }
        })
      }
      else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
});

router.get('/getTemporaryUsers', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        userInfo.getAllTempUsersInformation((err, res) => {
          if (err) {
            response.send({ 'Error in fetching temporary data.': err, statusCode: 403 })
          }

          response.send({ msg: 'Data fetched successfully', data: res });
        })
      } else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
})
router.get('/getAllUsers', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        userInfo.getAllUserInformation((err, res) => {
          if (err) {
            response.send({ 'Error in fetching temporary data.': err, statusCode: 403 })
          }

          response.send({ msg: 'Data fetched successfully', data: res });
        })
      } else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
})

router.get('/getincompleteUsers', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        createUser.getAllUsers((err, res) => {
          if (err) {
            response.send({ 'Error in fetching record': err, statusCode: 500 });
          } else {
            response.send({ msg: 'Data fetched successfully', data: res });
          }
        })
      } else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
})

router.post('/registerUser', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        updateUser.registerUser(req.body, (err, res) => {
          if (err) {
            response.send({ 'Error in Storing data.': err, statusCode: 403 })
          } else {
            response.send({ msg: 'Data saved successfully', data: res });
          }
        })
      }
      else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
});

router.post('/registerUser1', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        updateUser.registerUserAdmin(req.body, (err, res) => {
          if (err) {
            response.send({ 'Error in Storing data.': err, statusCode: 403 })
          } else {
            response.send({ msg: 'Data saved successfully', data: res });
          }
        })
      }
      else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
});

router.post('/rejectUserRequest', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        updateUser.rejectUserRequest(req.body, (err, res) => {
          if (err) {
            response.send({ 'Error in reject update data.': err, statusCode: 403 })
          }
          else {
            response.send({ msg: 'Data saved successfully', data: res });
          }
        })
      }
      else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  })
});

router.get('/getUserRole', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        userRole.getAllRole((err, res) => {
          if (err) {
            response.send({ 'Error in fetching user role.': err, statusCode: 403 });
          }
          else {
            response.send({ msg: 'Data fetched successfully', data: res });
          }
        })
      } else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
})


router.post('/registerUserTemp', function (req, response) {
  checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
    if (err) {
      res.send({ 'User not authenticated': err, statusCode: 500 });
    }
    else {
      if (mongoose) {
        updateUser.registerUserTemporary(req.body, (err, res) => {
          if (err) {
            response.send({ 'Error in Storing data.': err, statusCode: 403 });
          } else {
            response.send({ msg: 'Data saved successfully', data: res });
          }
        })
      } else {
        response.send({ msg: 'not connected to database', statusCode: 500 });
      }
    }
  });
})

// router.post('/updateUserTemp', function (req, response) {
//   checkToken.checkToken({ UserId: req.headers.userid, token: req.headers.authorization }, (err, res1) => {
//     if (err) {
//       res.send({ 'User not authenticated': err, statusCode: 500 });
//     }
//     else {
//       if (mongoose) {
//         updateUser.updateTempUserDetails(req.body, (err, res) => {
//           if (err) {
//             response.send({ 'Error in Updating data.': err, statusCode: 403 })
//           } else {
//             response.send({ msg: 'Data updated successfully', data: res });
//           }
//         })
//       } else {
//         response.send({ msg: 'not connected to database', statusCode: 500 });
//       }
//     }
//   })
// })

module.exports = router;
