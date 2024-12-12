const express = require("express"); // Import express
const router = express.Router(); // Create a router instance

const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authenticateToken');
const authenticateCommentDeletion = require('../middlewares/authenticateCommentDeletion')

router.post('/:post_id', authenticateToken,(req,res) => {

    commentController.create_comment(req,res);

    
})

router.get('/:post_id', authenticateToken, (req,res) => {
    commentController.get_comments(req,res);
})


router.delete('/:post_id/:comment_id', authenticateToken, authenticateCommentDeletion, (req,res) => {

    commentController.delete_comment(req,res);

})

module.exports = router;