const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

function formatProfile(prismaProfile){
    const { email, firstName, lastName, avatar } = prismaProfile.userProfile;
    const newProfile = { email, firstName, lastName, avatar };
    return newProfile;
}

// route to get a user profile
exports.getOneProfile = async (req, res, next) => {
    // get id of user currently connected
    const id = req.userId;
    // get profile of user connected
    const profile = await prisma.user.findUnique({
        where: { 
            userId: Number(id),
        },
        select: {
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
    res.json(formatProfile(profile));
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
    // delete profile corresponding
    const deletedProfile = await prisma.user.delete({
        where: {
            userId: Number(id),
        },
    });
    res.json(deletedProfile);
}