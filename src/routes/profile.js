const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const authenticateToken = require('../middlewares/authenticateToken');

router.get('/avatar', (req,res)=>{});

router.post('/avatar', authenticateToken,upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
  })

  module.exports = router;