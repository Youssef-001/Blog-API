const express = require("express"); // Import express
const router = express.Router(); // Create a router instance

const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/:post_id', authenticateToken,(req,res) => {

    commentController.create_comment(req,res);

    
})

module.exports = router;