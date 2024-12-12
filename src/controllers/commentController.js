const comment_queries = require('../queries/comment_queries');

async function create_comment(req,res)
{


if (req.body.content == "")
{
    throw new Error("Comment is empty");
}

try {
let content = req.body.content;
let author_name = req.user.username;
let authorId = req.user.id;
let post_id = req.params.post_id;
let comment = await comment_queries.create_comment(content, author_name, authorId, post_id);
res.json (comment);}

catch(err)
{
    console.error(`Error `, err.message);
    res.status(500).json("Error creating comment");

}

}


async function get_comments(req,res)
{
    let post_id = req.params.post_id;

    try {
        let comments = await comment_queries.get_comments(post_id);
        
        res.status(200).json(comments);
    }

    catch(err)
    {
        console.error(err.message);
        res.status(500).json("Error getting comments");
    }
}

module.exports = {create_comment,get_comments}