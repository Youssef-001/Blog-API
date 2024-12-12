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

module.exports = {create_comment}