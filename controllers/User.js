// add bcrypt package to hash password 
const bcrypt = require('bcrypt');
// add jsonwebtoken package to get token for user
const jwt = require('jsonwebtoken');
// add password-validator package to check if password has a valid schema
const passwordValidator = require('password-validator');
// add email-validator package to check if email is valid
const emailValidator = require("email-validator");
const {responseSuccess, responseError, ErrorLabel} = require('../helpers/response')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// create token that only lasts for 24h
const token = (userId) => {
    return jwt.sign(
        { userId: userId },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '24h' }
    )
}

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
        return responseError(res, ErrorLabel.UnvalidPassword)
    }
    // check if email is valid
    if(!emailValidator.validate(email)){
        return responseError(res, ErrorLabel.UnvalidEmail)
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
        // give token to user upon signing in
        return responseSuccess(res, {
            userId: newUser.userId,
            token: token(newUser.userId),
        })
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
            return responseError(res, ErrorLabel.NotFound)
        } 
        // check if password entered is the same as password upon signing up
        const matchedPassword = await bcrypt.compare(req.body.password, userProfile.password)
        try {
            if (!matchedPassword){
                return responseError(res, ErrorLabel.UnvalidEmail)
            }
        } finally {
            // if password is matched, then give token to user upon logging in
            return responseSuccess(res, {
                userId: userProfile.user.userId,
                token: token(userProfile.user.userId),
            })
        }
    } catch(error) {
        console.log(error);
    }
};