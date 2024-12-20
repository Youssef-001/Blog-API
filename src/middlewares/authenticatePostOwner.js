const post_queries = require('../queries/post_queries');

async function authenticatePostOwner(req,res, next)
{
    let post_id = req.params.id;
    let post = await post_queries.get_post(post_id);


    if (post.authorId != req.user.id)
    {
        res.status(401).json("Unauthorized");
    }
    else {
        next();
    }

}

module.exports = authenticatePostOwner;