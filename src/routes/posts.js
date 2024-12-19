const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
const postController = require('../controllers/postController');
const authenticateToken = require("../middlewares/authenticateToken");
const authenticatePostOwner = require('../middlewares/authenticatePostOwner')
// Get all posts

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/',(req,res,next) => {


    postController.get_posts(req,res,next);

}) 

// Create a post
router.post('/',upload.single('cover'), authenticateToken,(req,res) => {
    postController.create_post(req,res);
})


// Get a single post
router.get('/:id', async(req,res) => {
    await postController.get_post(req,res);
    


})

// Edit a post

router.put('/:id', authenticateToken, authenticatePostOwner, async(req,res) => {
    postController.update_post(req,res);
})

router.delete('/:id', authenticateToken, authenticatePostOwner, async(req,res) => {
    postController.delete_post(req,res);
})

router.post('/cover', authenticateToken,upload.single('cover'), function (req, res, next) {

    console.log(req.file);
    res.json(req.file.path);
  })


module.exports = router;