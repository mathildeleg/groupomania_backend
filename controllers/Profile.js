const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

function formatProfile(prismaProfile, isAdmin){
    const { email, firstName, lastName, avatar } = prismaProfile.userProfile;
    const userId = prismaProfile.userId;
    const newProfile = { email, firstName, lastName, avatar, userId, isAdmin };
    return newProfile;
}

// route to get a user profile
exports.getOneProfile = async (req, res, next) => {
    // get id of user currently connected
    const id = req.userId;
    // check if user is admin
    const admin = await prisma.administrator.findMany({
        where: {
            userId: Number(id),
        },
    })
    // get profile of user connected
    const profile = await prisma.user.findUnique({
        where: { 
            userId: Number(id),
        },
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
    });
    // return profile with correct format
    res.json(formatProfile(profile, admin.length > 0));
};

// route to update a profile
exports.updateProfile = async (req, res, next) => {
    // get id of profile
    const id = req.userId;
    const { email, avatar, firstName, lastName } = req.body;
    // update only email and avatar of profile
    const updatedProfile = await prisma.user.update({
        where: {
            userId: Number(id),
        },
        data: {
            userProfile: {
                update: {
                    email,
                    firstName,
                    lastName,
                    avatar,
                }
            }
        },
    });
    res.json(updatedProfile);
}

// route to delete a profile
exports.deleteProfile = async (req, res, next) => {
    // get id of profile
    const id = req.userId;
    const findUser = await prisma.user.findUnique({
        where: {
            userId: Number(id),
        },
        select: {
            userId: true,
            profileId: true,
        }
    })
    // delete profile corresponding
    const deleteProfile = prisma.user.delete({
        where: {
            userId: Number(findUser.userId),
        },
    });
    const deleteUserProfile = prisma.userProfile.delete({
        where: {
            profileId: Number(findUser.profileId),
        }
    })
    await prisma.$transaction([deleteProfile, deleteUserProfile])
}