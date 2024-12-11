const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
const postController = require('../controllers/postController');
// Get all posts

router.get('/', (res,res) => {

    postController.get_posts(req,res);

}) 