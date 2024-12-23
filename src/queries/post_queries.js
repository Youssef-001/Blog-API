const { PrismaClient } = require("@prisma/client");
const { get } = require("express/lib/response");
const prisma = new PrismaClient();


async function get_posts(page=1, author_id, isAuthor) {
    let offset = (page - 1) * 10;

    // Build query dynamically
    const query = {
        skip: offset,
        take: 10,
    };

    if (author_id) {
        query.where = { authorId: author_id };
    }
    if (isAuthor == false)
    {
        query.where = {...query.where, status: 'PUBLISHED'};
    }

    let posts = await prisma.posts.findMany(query);

    return posts; // Optionally return the posts
}
async function create_post(title,content,id, status='PUBLISHED', cover)
{

    let post = await prisma.posts.create({
        data: {
            title: title,
            content: content,
            authorId: id,
            status: status,
            cover:cover
        }
    })
    
    return post;

}


async function get_post(id)
{
    let post = await prisma.posts.findUnique({
        where: {id:id}
    })

    return post;
}


async function edit_post(title,content,id,status, cover)
{
    let now = new Date();
    let formattedNow = now.toISOString().slice(0, 19).replace("T", " ");

    console.log(now.getDate());
    let post = await prisma.posts.update({

        where: {
            id:id
        },
        data: {
            title:title,
            content: content,
            updated_at: now,
            status: status,
            cover: cover
        }
    })

    return post;
}


async function delete_post(id) {
    try {
        const post = await prisma.posts.delete({
            where: { id: id }
        });

        if (!post) {
            throw new Error('Post not found');
        }

        return post; // You could return the deleted post if needed
    } catch (error) {
        console.error('Error deleting post:', error.message);
        throw new Error('Could not delete the post');
    }
}




module.exports = {get_posts, create_post, get_post,edit_post, delete_post}