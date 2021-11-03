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

// format comments to only have one object 
function formatComment(prismaComment){
    const { postId, createdAt, user, commentMessage, commentId } = prismaComment;
    const author = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
    const userId = user.userId;
    const newComment = { postId, createdAt, author, commentMessage, commentId, userId };
    return newComment;
}

// route to get one comment of a post
exports.getOneComment = async (req, res, next) => {
    // get comment id 
    const commentId = req.params.commentId;
    // find comment according to its id
    const comment = await prisma.comment.findUnique({
        where: {
            commentId: Number(commentId),
        },
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
            commentId: true,
        }
    });
    return res.json(formatComment(comment));
};

// format comments to only have one object 
function formatCommentsOfPost(prismaPost){
    const { userComments } = prismaPost;
    const comment = userComments.map(comment => {
        const { commentMessage, createdAt, user, commentId, postId } = comment;
        const author = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
        const userId = user.userId;
        const newComment = {createdAt, author, commentMessage, commentId, postId, userId }
        return newComment
    })
    const newPost = { comment };
    return newPost
}

// route to get comments of a post
exports.getAllComments = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // find post and display its content, its comments and its likes
    const post = await prisma.post.findUnique({
        where: {
            postId: Number(postId),
        },
        select: {
            userComments: {
                select: {
                    commentMessage: true,
                    createdAt: true,
                    postId: true,
                    commentId: true,
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
                    }
                }
            },
        }
    });
    return res.json(formatCommentsOfPost(post));
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
    // find creator of the comment
    const findComment = await prisma.comment.findUnique({
        where: {
            commentId: Number(commentId),
        },
        select: {
            user: {
                select: {
                    userId: true,
                }
            }
        }
    });
    // allow creator of comment to update it
    if(findComment.user.userId === userId){
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
    // otherwise not allowed
    } else {
        res.status(401).json({error: error | "Unauthorised"});
    }
};

// route to delete a comment
exports.deleteComment = async (req, res, next) => {
    // get id of the comment
    const commentId = req.params.commentId;
    // get id of commenter 
    const userId = req.userId;
    // find creator of the comment
    const findComment = await prisma.comment.findUnique({
        where: {
            commentId: Number(commentId),
        },
        select: {
            user: {
                select: {
                    userId: true,
                }
            }
        }
    });
    // check if user is the commenter, if he is he can delete the comment, otherwise he's not allowed
    if(findComment.user.userId === userId){
        const comment = await prisma.comment.delete({
            where: {
                commentId: Number(commentId),
            },   
        });
        return res.json(comment);
    } else {
        res.status(401).json({error: error | "Unauthorised"});
    }
}