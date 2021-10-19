const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// route to delete a comment
exports.deleteComment = async (req, res, next) => {
    // get id of the comment
    const commentId = req.params.commentId;
    // get id of commenter
    const comment = await prisma.comment.delete({
        where: {
            commentId: Number(commentId),
        },
    });
    return res.json(comment);
}