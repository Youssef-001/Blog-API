const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
const postController = require('../controllers/postController');
const authenticateToken = require("../middlewares/authenticateToken");
const authenticatePostOwner = require('../middlewares/authenticatePostOwner')
// Get all posts

router.get('/', authenticateToken,(req,res) => {

    postController.get_posts(req,res);

}) 

// Create a post
router.post('/', authenticateToken,(req,res) => {
    postController.create_post(req,res);
})


// Get a single post
router.get('/:id', authenticateToken, async(req,res) => {
    try {
    let post = await postController.get_post(req,res);
    res.json(post);
    }
    catch(err)
    {
        console.error(err);
        res.status(403).json({message: "post not found"});
    }

})

// Edit a post

router.put('/:id', authenticateToken, authenticatePostOwner, async(req,res) => {
    postController.update_post(req,res);
})

router.delete('/:id', authenticateToken, authenticatePostOwner, async(req,res) => {
    postController.delete_post(req,res);
})

module.exports = router;