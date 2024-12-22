const comment_queries = require('../queries/comment_queries');

async function create_comment(req,res)
{


if (req.body.content == "")
{
    throw new Error("Comment is empty");
}

try {
let content = req.body.content;
let author_name = req.body.name;
let post_id = req.params.post_id;
let comment = await comment_queries.create_comment(content, author_name, post_id);
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


async function delete_comment(req,res)
{
    let comment_id = req.params.comment_id;

    try {
      let comment =  await comment_queries.delete_comment(comment_id);
        res.status(200).json({comment,message:"Comment deleted successfully"});
    }

    catch(err)
    {
        res.status(500).json("Error deleting comment");

    }
}

module.exports = {create_comment,get_comments, delete_comment}