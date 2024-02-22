const express = require('express');
const router = express.Router({ mergeParams: true})

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const Review = require("../models/review");
const { reviewSchemas } = require('../schemas.js');

const validateReview = (req, res, next) => {
    const { error } = reviewSchemas.validate(req.body);

    if( error) {
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

router.post('/', validateReview, catchAsync(async(req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res, next) => {
    const { id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;