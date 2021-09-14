const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// routes for content with image 
exports.createPost = async (req, res, next) => {
    const content = req.body.content;
    const { postMessage } = content;
    console.log(content);
    // const forum = await prisma.forum.findUnique({
    //     where: {
    //         forumId: 1,
    //     }
    // })
    const newPost = await prisma.post.create({
        data: {
            content: {
                create: {
                    postMessage: postMessage,
                },
            },
        //     forumId: {
        //         connect: {
        //             forumId: 1,   
        //         }
        //     },
        //     creatorId: {
        //         connect: {
        //             userId: userId,
        //         }
        //     }
        },
    
    });
    console.log(newPost);
    return res.json(newPost);
}