const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// route to delete a comment
exports.deleteComment = async (req, res, next) => {
    // get id of the comment
    const commentId = req.params.commentId;
    const comment = await prisma.comment.delete({
        where: {
            commentId: Number(commentId),
        },
    });
    return res.json(comment);
}

// route to delete a post
exports.deletePost = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    const deletePost = await prisma.post.delete({
        where: {
            postId: Number(postId),
        }
    })
    return res.json(deletePost)
};

// route to delete a profile
exports.deleteUser = async (req, res, next) => {
    // get id of profile
    const id = req.params.userId;
    console.log(id)
    // delete profile corresponding
    const deletedProfile = await prisma.user.delete({
        where: {
            userId: Number(id),
        },
    });
    res.json(deletedProfile);
}