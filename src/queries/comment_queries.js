const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function create_comment(content, author_name, post_id)
{
    try{
    let comment  = await prisma.comments.create({
        data: {
            content: content,
            authorName: author_name,
            post_id: post_id
        }
    })

    return comment;}

    catch(err)
    {
        console.error("Error creating comment:", err.message); // Log the error for debugging

    }
}

async function get_comments(post_id)
{
    try {
        let comments = await prisma.comments.findMany({
            where: {post_id: post_id}
        })
        return comments;
    }

    catch(err)
    {
        console.error("Error retrieving comments ", err.message);
    }
}

async function get_comment(comment_id)
{
    try {
        let comment = await prisma.comments.findUnique({
            where: {id:comment_id}
        })

        return comment;
    }

    catch(err)
    {
        console.error("Error getting comment", err.message);
    }
}

async function delete_comment(comment_id)
{
    try {
        let comment = await prisma.comments.delete({
            where: {id:comment_id}
        })
        return comment;
    }

    catch(err)
    {
        console.error("Error deleting comment", err.meessage);
    }
}

module.exports = {create_comment,get_comments,get_comment,delete_comment}