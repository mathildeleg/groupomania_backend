const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// routes for content with image 
exports.createPost = async (req, res, next) => {
    const forumId = req.params.forumId;
    const userId = req.userId;
    const postMessage = req.body.postMessage;
    const newPost = await prisma.post.create({
        data: {
            content: {
                create: {
                    postMessage: postMessage,
                },
            },
            forum: {
                connect: {
                    forumId: Number(forumId),   
                }
            },
            user: {
                connect: {
                    userId: userId,
                }
            }
        },
    });
    return res.json(newPost);
}