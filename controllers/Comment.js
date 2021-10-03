const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// route to comment a post
exports.commentPost = async (req, res, next) => {
    // get id of the post
    const postId = req.params.id;
    // get userid
    const userId = req.userId;
    // get content of the comment
    const commentMessage = req.body.commentMessage;
    // create the comment w/ post id and user id
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
    // get comment id 
    const commentId = req.params.commentId;
    // find comment according to its id
    const comment = await prisma.comment.findUnique({
        where: {
            commentId: Number(commentId),
        },
    });
    return res.json(comment);
};

function formatAllComments(prismaAllComments){
    return prismaAllComments.map(comment => {
        const { postId, createdAt, user, commentMessage } = comment;
        const author = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
        const newComment = { postId, createdAt, author, commentMessage };
        return newComment;
    });
}

// route to get comments of a post
exports.getAllComments = async (req, res, next) => {
    // get all comments
    const comments = await prisma.comment.findMany({
        select: {
            postId: true,
            createdAt: true,
            user: {
                select: {
                    userId: true,
                    userProfile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            },
            commentMessage: true,
        }
    });
    return res.json(formatAllComments(comments));
}

// route to update a comment
exports.updateComment = async (req, res, next) => {
    // get id of the post
    const postId = req.params.id;
     // get userid
    const userId = req.userId;
    // get content of the comment
    const commentMessage = req.body.commentMessage;
    // get id of the comment 
    const commentId = req.params.commentId;
    // update the content of the comment according to its id w/ post id and user id
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
    // get id of the comment
    const commentId = req.params.commentId;
    // delete corresponding comment
    const comment = await prisma.comment.delete({
        where: {
            commentId: Number(commentId),
        },
    });
    return res.json(comment);
}