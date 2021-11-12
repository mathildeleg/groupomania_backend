const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const {responseSuccess} = require('../helpers/response')

// routes to create a forum
exports.createForum = async (req, res, next) => {
    // get forum with its title and description
    const forum = req.body;
    const { title, description } = forum;
    // create forum
    const newForum = await prisma.forum.create({
        data: {
            title: title,
            description: description,
        },
    });
    return responseSuccess(res, newForum);
}

// route to get one forum
exports.getOneForum = async (req, res, next) => {
    // get forum id
    const id = req.params.id;
    // find forum based on its id
    const forum = await prisma.forum.findUnique({
        where: {
            forumId: Number(id),
        }
    });
    return responseSuccess(res, forum);
};

// route to get all forums
exports.getAllForums = async (req, res, next) => {
    // find all forums
    const forums = await prisma.forum.findMany();
    return responseSuccess(res, forums);
};

// route to update a forum - only accessible to admins
exports.updateForum = async (req, res, next) => {
    // get forum id
    const id = req.params.id;
    // get forum profile
    const { title, description } = req.body;
    // update forum
    const updatedForum = await prisma.forum.update({
        where: {
            forumId: Number(id),
        },
        data: {
                title,
                description,
        },
    });
    return responseSuccess(res, updatedForum);
}

// route to delete a forum - only accessible to admins
exports.deleteForum = async (req, res, next) => {
    // get forum id
    const id = req.params.id;
    // delete forum corresponding
    const deletedForum = await prisma.forum.delete({
        where: {
            forumId: Number(id),
        },
    });
    return responseSuccess(res, deletedForum);
}