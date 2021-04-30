var express = require('express');
var router = express.Router();

var usersModel = require('../models/users')

var bcrypt = require('bcrypt');
const uid2 = require('uid2');
const { startSession } = require('../models/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;




//SIGN UP
router.post('/sign-up', async function (req, res, next) {
  
  //CTRL NO EXIST
  let tabWarning = []
  if(req.body.emailFromFront === '' || req.body.usernameFromFront === '' || req.body.passwordFromFront === '') {
    tabWarning.push('Fill in the fields !')
    res.json({login:false, tabWarning})
  }

  var exist = false
  var userInDb = await usersModel.findOne({email: req.body.emailFromFront})
  console.log("req.body.emailFromFront ",req.body.emailFromFront)
  console.log("useremailBDD ",userInDb)
  
  if(userInDb) {
    exist = true
    tabWarning.push('User already exists !')
  }
    
  if(exist === true) {
    res.json({login:false, tabWarning})
  } else {
  
  //CREATE
if(tabWarning.length === 0) {

  const cost = 10
  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

   
    var user = new usersModel(
      {
        name: req.body.usernameFromFront,
        email: req.body.emailFromFront,
        password: hash,
        token: uid2(32)
      }
    );
  
    var newUser = await user.save()
    console.log("newUser---", newUser)
  
  
  }

    res.json({login:true, tabWarning, newUser})
  }
  });
  
  //SIGN IN
  router.post('/sign-in', async function (req, res, next) {
  let tabWarning = []
  if(req.body.emailFromFront === '' || req.body.passwordFromFront === '') {tabWarning.push('Fill in the fields !')}

  var isLogin = false
  var user = await usersModel.findOne({email: req.body.emailFromFront})
  if (user) {
    
  if(bcrypt.compareSync(req.body.passwordFromFront, user.password)) {isLogin = true} else {tabWarning.push("Wrong password !")}
    
  } else {tabWarning.push('No email found !')}
  
  if(isLogin === true) {
    res.json({login:true, tabWarning, user})
  } else {
      res.json({login:false, tabWarning})
  }
  
  }
  );

