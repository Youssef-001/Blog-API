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

module.exports = {get_posts, create_post, get_post,edit_post}