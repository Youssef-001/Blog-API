const { PrismaClient } = require("@prisma/client");
const { get } = require("express/lib/response");
const prisma = new PrismaClient();


async function get_posts()
{
    let posts = await prisma.posts.findMany({})
}

async function create_post(title,content,id)
{

    let post = await prisma.posts.create({
        data: {
            title: title,
            content: content,
            authorId: id
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


async function edit_post(title,content,id)
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
            updated_at: now
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


async function get_author_posts(author_id)
{
    try {
        const posts = await prisma.posts.findMany({
            where: {
                authorId:author_id
            }
        })

        if (!posts)
        {
            throw new Error('Posts not found');
        }

        return posts;
    }
    catch(err)
    {
        console.error("Error getting posts ", err.message);
        throw new Error(`Couldn't get posts by author ${author_id}`)
    }
}

module.exports = {get_posts, create_post, get_post,edit_post, delete_post,get_author_posts}