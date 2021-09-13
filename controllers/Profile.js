const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.getOneProfile = async (req, res, next) => {
    const id = req.params.id;
    const profile = await prisma.userProfile.findUnique({
        where: {
            profileId: Number(id),
        }
    });
    res.json(profile);
};

exports.updateProfile = async (req, res, next) => {
    const id = req.params.id;
    const { email, avatar } = req.body;
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

exports.deleteProfile = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const deletedProfile = await prisma.userProfile.delete({
        where: {
            profileId: Number(id),
        },
    });
    console.log(deletedProfile);
    res.json(deletedProfile);
}