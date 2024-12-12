const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function create_comment(content, author_name, authorId, post_id)
{
    try{
    let comment  = await prisma.comments.create({
        data: {
            content: content,
            authorName: author_name,
            authorId: authorId,
            post_id: post_id
        }
    })

    return comment;}

    catch(err)
    {
        console.error("Error creating comment:", err.message); // Log the error for debugging

    }
}

module.exports = {create_comment}