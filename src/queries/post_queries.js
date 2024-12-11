const { PrismaClient } = require("@prisma/client");
const { get } = require("express/lib/response");
const prisma = new PrismaClient();


async function get_posts()
{
    let posts = await prisma.posts.findMany({})
}



module.exports = {get_posts}