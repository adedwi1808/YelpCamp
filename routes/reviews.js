const express = require('express');
const router = express.Router({ mergeParams: true})

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const Review = require("../models/review");
const { validateReview, isLoggedIn } = require('../middleware.js');

router.post('/', validateReview, catchAsync(async(req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully Create New Review!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res, next) => {
    const { id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully Deleted Review!');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;