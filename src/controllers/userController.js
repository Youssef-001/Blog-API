const bcrypt = require("bcryptjs");
const user_queries = require('../queries/user_queries');

function createUser(req,res,next){
    try {
        bcrypt.hash(req.body.password, 10, async(err,hashedPassword) => {
            if (err) return next(err);
            else {
                let isAuthor = (req.body.isAuthor === 'true');
               let user =  await user_queries.createUser(req.body.username, hashedPassword, req.body.email, Boolean(isAuthor));
                res.status(200).json(user);
            }
        })
    } catch(err)
    {
        return next(err);
    }
}

module.exports = {createUser,}