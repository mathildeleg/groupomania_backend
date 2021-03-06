const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const fs = require('fs');
const {responseSuccess, responseError, ErrorLabel} = require('../helpers/response')

// routes for content with image 
exports.createPost = async (req, res, next) => {
    // get forum id
    const forumId = req.params.forumId;
    // get user id
    const userId = req.userId;
    // get content of post
    const postMessage = req.body.postMessage;
    // create post inside correct forum
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
            return responseError(res, ErrorLabel.NotFound)
        } else {
            // add image url to post
            const contentId = newPost.contentId;
            const imagePath = req.body.imagePath;
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
            return responseSuccess(res, newContent);
        }
    } catch(error){
        return responseError(res, ErrorLabel.NotCreated)
    }
    return responseSuccess(res, newPost);
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
    // find the creator of the post
    const findPost = await prisma.post.findUnique({
        where: {
            postId: Number(postId),
        },
        select: {
            user: {
                select: {
                    userId: true,
                }
            }
        }
    });
    // only the creator can update the post
    if(findPost.user.userId === userId){
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
        return responseSuccess(res, updatedPost);
    // otherwise they're not allowed
    } else {
        return responseError(res, ErrorLabel.Unauthorised)
    }
}

// format posts to have one object containing strings, instead of several objects
function formatPost(prismaPost){
    const { postId, createdAt, user, content, _count } = prismaPost;
    const author = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
    const userId = user.userId;
    const contentMessage = content.postMessage;
    const contentImg = content.contentImg ? content.contentImg.imagePath : null;
    const commentsCount = _count.userComments;
    const likesCount = _count.userLikes;
    const newPost = { postId, createdAt, author, userId, contentMessage, contentImg, commentsCount, likesCount };
    return newPost
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
    return responseSuccess(res, formatPost(post));
}

// format posts to have one object containing strings, instead of several objects
function formatAllPosts(prismaAllPosts){
    return prismaAllPosts.map(post => {
        const { postId, createdAt, user, content, _count } = post;
        const author = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
        const userId = user.userId;
        const contentMessage = content.postMessage;
        const contentImg = content.contentImg ? content.contentImg.imagePath : null;
        const commentsCount = _count.userComments;
        const likesCount = _count.userLikes;
        const newPost = { postId, createdAt, author, userId, contentMessage, contentImg, commentsCount, likesCount };
        return newPost
    });
}

// routes to get all posts
exports.getAllPosts = async (req, res, next) => {
    // in order to only show/download a couple of posts at a time
    const skip = parseInt(req.query.start) ?? 0;
    const take = req.query.end ? parseInt(req.query.end) - skip : undefined ;
    // find posts and display their contents, their comments and their likes
    const posts = await prisma.post.findMany({
        skip,
        take,
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
    return responseSuccess(res, formatAllPosts(posts));
}

// route to delete a post
exports.deletePost = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // get user id
    const userId = req.userId;
    // find creator of post
    const findPost = await prisma.post.findUnique({
        where: {
            postId: Number(postId),
        },
        select: {
            user: {
                select: {
                    userId: true,
                }
            }
        }
    });
    // only creator of post can delete their post
    if(findPost.user.userId === userId){
        const deletePost = await prisma.post.delete({
            where: {
                postId: Number(postId),
            }
        })
        return responseSuccess(res, deletePost)
    // otherwise they're not allowed
    } else {
        return responseError(res, ErrorLabel.Unauthorised)
    }
};

// route to create a like
exports.likePost = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // get user id
    const userId = req.userId;
    // find creator of post
    const findPost = await prisma.post.findUnique({
        where: {
            postId: Number(postId),
        },
        select: {
            user: {
                select: {
                    userId: true,
                }
            }
        }
    });
    // check to see if user has already liked the post or not
    const hasLiked = await prisma.userLike.findMany({
        where: {
            postId: Number(postId),
            likerId: userId,
        },
        select: {
            postId: true,
        }
    });
    // if it's not the creator of the post and if they haven't already liked it, they can like the post
    if(findPost.user.userId !== userId && !hasLiked.length > 0){
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
        return responseSuccess(res, like);
    // otherwise they're not allowed
    } else {
        return responseError(res, ErrorLabel.Unauthorised)
    }
}

exports.hasLiked = async (req, res, next) => {
    // get post id
    const postId = req.params.postId;
    // get user id
    const userId = req.userId;
    // check if user has liked post
    const hasLiked = await prisma.userLike.findMany({
        where: {
            postId: Number(postId),
            likerId: userId,
        },
        select: {
            postId: true,
        }
    });
    return responseSuccess(res, {data: hasLiked.length > 0});
}

