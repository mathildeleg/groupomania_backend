const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// routes for content with image 
exports.createPost = async (req, res, next) => {
    const forumId = req.params.forumId;
    const userId = req.userId;
    const postMessage = req.body.postMessage;
    const imagePath = req.body.imagePath;
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
    try {
        if(!newPost){
            return res.status(401).json({ error: 'Post non trouvé !' })
        } else {
            const contentId = newPost.contentId;
            const newContent = await prisma.contentImage.create({
                data: {
                    imagePath: imagePath,
                    content: {
                        connect: {
                            contentId: contentId,
                        }
                    }
                }
            });
            console.log(newContent);
        }
    } catch(error){
        console.log(error);
    }
    return res.json(newPost);
}

exports.updatePost = async (req, res, next) => {
    const postId = req.params.id;
    const forumId = req.params.forumId;
    const userId = req.userId;
    const postMessage = req.body.postMessage;
    const updatedPost = await prisma.post.update({
        where: {
            postId: Number(postId),
        },
        data: {
            content: {
                update: {
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
    return res.json(updatedPost);
}

exports.getOnePost = async (req, res, next) => {
    const postId = req.params.id;
    const post = await prisma.post.findUnique({
        where: {
            postId: Number(postId),
        },
        select: {
            content: {
                select: {
                    postMessage: true,
                    contentImg: true,
                }
            }
        }
    });
    return res.json(post);
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id;
    const post = await prisma.post.delete({
        where: {
            postId: Number(postId),
        }
    });
    return res.json(post);
}
