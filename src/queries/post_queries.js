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

module.exports = {get_posts, create_post}