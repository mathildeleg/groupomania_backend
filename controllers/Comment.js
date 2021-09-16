const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// route to comment a post
exports.commentPost = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.userId;
    const commentMessage = req.body.commentMessage;
    const newComment = await prisma.comment.create({
        data: {
            commentMessage: commentMessage,
            post: {
                connect: {
                    postId: Number(postId),   
                }
            },
            user: {
                connect: {
                    userId: userId,
                }
            }
        },
    });
    return res.json(newComment);
};

// route to get one comment of a post
exports.getOneComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const comment = await prisma.comment.findUnique({
        where: {
            commentId: Number(commentId),
        },
    });
    return res.json(comment);
};

// route to get comments of a post
exports.getAllComments = async (req, res, next) => {;
    const comments = await prisma.comment.findMany();
    return res.json(comments);
}

// route to update a comment
exports.updateComment = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.userId;
    const commentMessage = req.body.commentMessage;
    const commentId = req.params.commentId;
    const updatedComment = await prisma.comment.update({
        where: {
            commentId: Number(commentId),
        },
        data: {
            commentMessage: commentMessage,
            post: {
                connect: {
                    postId: Number(postId),   
                }
            },
            user: {
                connect: {
                    userId: userId,
                }
            }
        },
    });
    return res.json(updatedComment);
};

// route to delete a comment
exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const comment = await prisma.comment.delete({
        where: {
            commentId: Number(commentId),
        },
    });
    return res.json(comment);
}