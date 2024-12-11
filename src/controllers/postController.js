const post_queries = require('../queries/post_queries');

async function get_posts(req,res)
{

    let posts = await post_queries.get_posts();
    
}