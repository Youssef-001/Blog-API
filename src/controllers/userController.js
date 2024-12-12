const bcrypt = require("bcryptjs");
const user_queries = require('../queries/user_queries');

function createUser(req,res,next){
    try {
        bcrypt.hash(req.body.password, 10, async(err,hashedPassword) => {
            if (err) return next(err);
            else {
                await user_queries.createUser(req.body.username, hashedPassword, req.body.email, Boolean(req.body.isAuthor) || false);
                res.redirect('/');
            }
        })
    } catch(err)
    {
        return next(err);
    }
}

module.exports = {createUser,}