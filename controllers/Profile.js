const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// route to get a user profile
exports.getOneProfile = async (req, res, next) => {
    // get id of profile
    const id = req.params.id;
    // find profile with its id
    const profile = await prisma.userProfile.findUnique({
        where: {
            profileId: Number(id),
        }
    });
    res.json(profile);
};

// route to update a profile
exports.updateProfile = async (req, res, next) => {
    // get id of profile
    const id = req.params.id;
    const { email, avatar } = req.body;
    // update only email and avatar of profile
    const updatedProfile = await prisma.userProfile.update({
        where: {
            profileId: Number(id),
        },
        data: {
                email,
                avatar,
        },
    });
    res.json(updatedProfile);
}

// route to delete a profile
exports.deleteProfile = async (req, res, next) => {
    // get id of profile
    const id = req.params.id;
    // delete profile corresponding
    const deletedProfile = await prisma.userProfile.delete({
        where: {
            profileId: Number(id),
        },
    });
    res.json(deletedProfile);
}