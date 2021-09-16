const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const fs = require('fs');

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
                    imagePath: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    const postId = req.params.postId;
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
    const postId = req.params.postId;
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
            },
            userComments: {
                select: {
                    commentMessage: true,
                    createdAt: true,
                }
            },
            userLikes: true,
        }
    });
    return res.json(post);
}

exports.getAllPosts = async (req, res, next) => {
    const posts = await prisma.post.findMany({
        select: {
            content: {
                select: {
                    postMessage: true,
                    contentImg: true,
                }
            },
            userComments: {
                select: {
                    commentMessage: true,
                    createdAt: true,
                }
            },
            userLikes: true,
        }
    });
    return res.json(posts);
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    const filename = post.imagePath.split('/images/')[1];
    fs.unlink(`images/${filename}`, async () => { 
        await prisma.post.delete({
            where: {
                postId: Number(postId),
            }
        });
    });
};

// route to create a like
exports.likePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    const like = await prisma.userLike.create({
        data: {
            post: {
                connect: {
                    postId: Number(postId),   
                }
            },
            user: {
                connect: {
                    userId: userId,
                }
            }
        },
    });
    return res.json(like);
}