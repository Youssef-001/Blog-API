const post_queries = require("../queries/post_queries");

async function get_posts(req, res) {
  let posts;
  let page = req.query.page || 1;

  if (true)
    {posts = await post_queries.get_posts(page, req.query.author_id, false);}
  else {
    posts = await post_queries.get_posts(page, req.user.id, true);
  }

  
  res.json(posts);
}

async function create_post(req, res) {
  let title = req.body.title;
  let content = req.body.content;
  let file = req.file;
  console.log(file);

  if (req.user.isAuthor == false)
  {
    return res.status(403).json({ message: "You do not have permission to create a post" });
  
  }

  try {
    let posts = await post_queries.create_post(title, content, req.user.id, req.body.status || "PUBLISHED", file.filename);
    res.json(posts);

  } catch (err) {
    console.error(err);
    res.status(501).json({ message: "error creating post" });
  }

}

async function get_post(req, res) {
  let post_id = req.params.id;
  try {
    let post = await post_queries.get_post(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "post not found" });
  }
}

async function update_post(req, res) {
  let post_id = req.params.id;
  let title = req.body.title;
  let content = req.body.content;
  let edited_post = post_queries.get_post(post_id);
  let status = req.body.status || edited_post.status;

  try {
    let post = await post_queries.edit_post(title, content, post_id, status);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Error editing post" });
  }
}

async function delete_post(req, res) {
  let post_id = req.params.id;

  try {
    const post = await post_queries.get_post(post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // If the post does not exist, return 404
    }

    await post_queries.delete_post(post_id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting post" });
  }
}

module.exports = { get_posts, create_post, get_post, update_post, delete_post };
