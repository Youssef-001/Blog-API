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
    let post = await post_queries.create_post(title,content,req.user.id);

    res.json(post);
}

module.exports = {get_posts, create_post};  