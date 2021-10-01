const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const fs = require('fs');

// routes for content with image 
exports.createPost = async (req, res, next) => {
    // get forum id
    const forumId = req.params.forumId;
    // get user id
    const userId = req.userId;
    // get content of post
    const postMessage = req.body.postMessage;
    const imagePath = req.body.imagePath;
    // create post
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
        // check if post exists
        if(!newPost){
            return res.status(401).json({ error: 'Post non trouvé !' })
        } else {
            // add image url to post
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

// route to update a post (only message of the post, not the image)
exports.updatePost = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // get forum id
    const forumId = req.params.forumId;
    // get user id
    const userId = req.userId;
    // get content of the post
    const postMessage = req.body.postMessage;
    // update the post
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

// route to get one post
exports.getOnePost = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // find post and display its content, its comments and its likes
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

function formatAllPosts(prismaAllPosts){
    return prismaAllPosts.map(post => {
        const { postId, createdAt, user, content, _count } = post;
        const author = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
        const contentMessage = content.postMessage;
        const contentImg = content.contentImg ? content.contentImg.imagePath : null;
        const commentsCount = _count.userComments;
        const likesCount = _count.userLikes;
        const newPost = { postId, createdAt, author, contentMessage, contentImg, commentsCount, likesCount };
        return newPost;
    });
}

// routes to get all posts
exports.getAllPosts = async (req, res, next) => {
    // find posts and display their contents, their comments and their likes
    const posts = await prisma.post.findMany({
        select: {
            postId: true,
            createdAt: true,
            user: {
                select: {
                    userId: true,
                    userProfile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            },
            content: {
                select: {
                    postMessage: true,
                    contentImg: true,
                }
            },
            _count: {
                select: {
                    userComments: true,
                    userLikes: true,
                }
            }
        }
    });
    return res.json(formatAllPosts(posts));
}

// route to delete a post
exports.deletePost = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // get image from post
    const filename = post.imagePath.split('/images/')[1];
    // delete image as well as the post
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
    // get post id
    const postId = req.params.postId;
    // get user id
    const userId = req.userId;
    // user likes post
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