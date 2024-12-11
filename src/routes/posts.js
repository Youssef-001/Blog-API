const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
const postController = require('../controllers/postController');
const authenticateToken = require("../middlewares/authenticateToken");
// Get all posts

router.get('/', authenticateToken,(req,res) => {

    postController.get_posts(req,res);

}) 

router.post('/', authenticateToken,(req,res) => {
    postController.create_post(req,res);
})

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

module.exports = router;