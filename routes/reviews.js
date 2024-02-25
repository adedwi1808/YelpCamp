const express = require('express');
const router = express.Router({ mergeParams: true})

const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews.js')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const campground = require('../models/campground.js');

router.post('/', validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;