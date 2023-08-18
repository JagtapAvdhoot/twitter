const { Router } = require('express');


const tweetRouter = Router()


// GET /api/tweets/:tweetId: Get a specific tweet by ID.
tweetRouter.get('/tweets/single');
// GET /api/tweets/following: Get tweets from users the authenticated user is following.
tweetRouter.get('/tweets/following');
// GET /api/tweets/:username: Get tweets by a specific user.
tweetRouter.get('tweets');

// POST /api/tweets: Create a new tweet/post.
tweetRouter.post('tweets');
// POST /api/tweets/:tweetId/like: Like a tweet.
tweetRouter.post('tweets');
// POST /api/tweets/:tweetId/unlike: Unlike a tweet.
tweetRouter.post('tweets');
// POST /api/tweets/:tweetId/comment: Comment on a tweet.
tweetRouter.post('tweets');

// DELETE /api/tweets/:tweetId/comment/:commentId: Delete a comment on a tweet.
tweetRouter.delete('tweets');
// DELETE /api/tweets/:tweetId: Delete a specific tweet.
tweetRouter.delete('tweets');

// PUT /api/tweets/:tweetId: Update a specific tweet.
tweetRouter.put('tweets');

module.exports = tweetRouter;
