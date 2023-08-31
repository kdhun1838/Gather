const express = require('express');
const router = express.Router();
const {users} = require("../models");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/user', async (req, res) => {
  try{
    const user = await users.findAll({});
    res.status(200).json(user);
    console.log(user);
  } catch(err){
    console.error(err);
  }
});

module.exports = router;
