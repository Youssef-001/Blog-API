const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(username, password, email, isAuthor = false)
{
    await prisma.users.create({
        data: {
            username: username,
            password: password,
            email: email,
            isAuthor: isAuthor
        }
    })
}


async function get_user(username)
{
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })

    return user;
}

module.exports = {createUser,get_user}