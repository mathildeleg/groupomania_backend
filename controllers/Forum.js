const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// routes to create a forum
exports.createForum = async (req, res, next) => {
    const forum = req.body;
    const { title, description } = forum;
    const newForum = await prisma.forum.create({
        data: {
            title: title,
            description: description,
        },
    });
    return res.json(newForum);
}

exports.getOneForum = async (req, res, next) => {
    const id = req.params.id;
    const forum = await prisma.forum.findUnique({
        where: {
            forumId: Number(id),
        }
    });
    res.json(forum);
};

exports.getAllForums = async (req, res, next) => {
    const forums = await prisma.forum.findMany();
    res.json(forums);
};

exports.updateForum = async (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const updatedForum = await prisma.forum.update({
        where: {
            forumId: Number(id),
        },
        data: {
                title,
                description,
        },
    });
    res.json(updatedForum);
}

exports.deleteForum = async (req, res, next) => {
    const id = req.params.id;
    const deletedForum = await prisma.forum.delete({
        where: {
            forumId: Number(id),
        },
    });
    res.json(deletedForum);
}