// add bcrypt package to hash password 
const bcrypt = require('bcrypt');
// add jsonwebtoken package to get token for user
const jwt = require('jsonwebtoken');
// add password-validator package to check if password has a valid schema
const passwordValidator = require('password-validator');
// add email-validator package to check if email is valid
const emailValidator = require("email-validator");

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// schema for password validation to ensure password has those conditions
const schema = new passwordValidator();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// route so that user can sign up
exports.signup = async (req, res) => {
    // when signing up, user fills in user profile 
    const userProfile = req.body.userProfile;
    const { email, password, firstName, lastName, avatar } = userProfile;
    // check if password follows valid schema
    if(!schema.validate(password)){
        return res.status(400).json({ error: 'Mot de passe non valide !' })
    }
    // check if email is valid
    if(!emailValidator.validate(email)){
        return res.status(400).json({ error: 'Email non valide !' })
    }
    // create hash for password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        // create user with its user profile
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
        // give access to forum by creating user forums
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

// route for user to log into account
exports.login = async (req, res) => {
    // find user through its user profile
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
        // check if user exists
        if (!userProfile){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        } 
        // check if password entered is the same as password upon signing up
        const matchedPassword = await bcrypt.compare(req.body.password, userProfile.password)
        try {
            if (!matchedPassword){
                return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
        } finally {
            // if password is matched, then give token to user
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