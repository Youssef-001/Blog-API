const comment_queries = require('../queries/comment_queries');
const post_queries = require('../queries/post_queries')

async function authenticateCommentDeletion(req,res,next)
{

    let post_id = req.params.post_id;
    let comment_id = req.params.comment_id;

    let user = req.user;

    let post = await post_queries.get_post(post_id);

    let comment = await comment_queries.get_comment(comment_id);


    if (post.authorId == user.id  || comment.authorId == user.id)
    {
        next();
    }

    else {
        res.status(401, res.json("Unauthorized"));
    }

}

module.exports = authenticateCommentDeletion;