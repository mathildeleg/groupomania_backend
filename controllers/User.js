const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.signup = async (req, res) => {
    const userProfile = req.body.userProfile;
        const { email, password, firstName, lastName, avatar } = userProfile;
        const hashedPassword = await bcrypt.hash(userProfile.password, 10)
        try {
        const newUser = await prisma.user.create({
            data: {
                userProfile: {
                    create: {
                        email: email,
                        password: hashedPassword,
                        firstName: firstName,
                        lastName: lastName,
                        avatar: avatar,
                    },
                },
            },
        });
        return res.json(newUser);
    } catch(error) {
        console.log(error);
    }
};



