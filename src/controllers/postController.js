const post_queries = require('../queries/post_queries');

async function get_posts(req,res)
{

    let posts = await post_queries.get_posts();
    res.json(posts);
    
}

async function create_post(req,res)
{
    let title = req.body.title;
    let content = req.body.content;

    try {
        
        let posts = await post_queries.create_post(title,content,req.user.id);
    }
    catch(err)
    {
        console.error(err);
        res.status(501).json({message: "error creating post"});
    }

    res.json(posts);
}

async function get_post(req,res)
{
    let post_id = req.params.id;
    try {
        let post = await post_queries.get_post(req.params.id)
        res.json(post);
    }
    catch(err)
    {
        console.error(err);
        res.status(404).json({message: "post not found"})
    }
}

async function update_post(req,res)
{
    let post_id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;

    try {
        let post = await post_queries.edit_post(title,content, post_id);
        res.json(post);
    }
    catch(err)
    {
        console.error(err);
        res.status(403).json({message: "Error editing post"})
    }
}

module.exports = {get_posts, create_post, get_post,update_post};  