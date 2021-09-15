const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.signup = async (req, res) => {
    const userProfile = req.body.userProfile;
    const { email, password, firstName, lastName, avatar } = userProfile;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
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
        const userForum1 = await prisma.userForum.create({
            data: {
                forumId: 1,
                userId: newUser.userId,
            }
        });
        const userForum2 = await prisma.userForum.create({
            data: {
                forumId: 2,
                userId: newUser.userId,
            }
        });
        console.log(userForum1);
        console.log(userForum2);
        return res.json(newUser);
    } catch(error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    const userProfile = await prisma.userProfile.findUnique({
        where: { 
            email: req.body.email,
        },
        select: {
            user: {
                select: {
                    userId: true,
                }
            },
            password: true,
        },
    });
    try {
        if (!userProfile){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        } 
        const matchedPassword = await bcrypt.compare(req.body.password, userProfile.password)
        try {
            if (!matchedPassword){
                return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
        } finally {
            return res.json({
                userId: userProfile.user.userId,
                token: jwt.sign(
                    { userId: userProfile.user.userId },
                    process.env.JWT_PRIVATE_KEY,
                    { expiresIn: '24h' }
                )
            })
        }
    } catch(error) {
        console.log(error);
    }
};