const express = require('express'); // Import express
const router = express.Router();   // Create a router instance
require('dotenv').config();
const user_queries = require('../queries/user_queries')

router.post('/', async(req,res,next) => {

    let user = await user_queries.get_user(req.body.username);
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({access_token});
})

module.exports = router;