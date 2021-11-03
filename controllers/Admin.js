const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// route to delete a comment
exports.deleteComment = async (req, res, next) => {
    // get id of the comment
    const commentId = req.params.commentId;
    // delete comment
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
    // delete post
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

// format profiles to only have one object with strings instead of several objects
function formatProfiles(prismaProfile){
    return profile = prismaProfile.map(profile => {
        const { userId, userProfile } = profile;
        const email = userProfile.email;
        const firstName = userProfile.firstName;
        const lastName = userProfile.lastName;
        const avatar = userProfile.avatar;
        const newProfile = { email, firstName, lastName, avatar, userId }
        return newProfile
    })
}

// route to fetch profiles of all users in order to delete a user if he wants to
exports.getAllProfiles = async (req, res, next) => {
    const profile = await prisma.user.findMany({
        select: {
            userId: true,
            userProfile: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                }
            },
        },
    })
    return res.json(formatProfiles(profile))
}