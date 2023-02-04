module.exports = {
  Query: {
    allReviews: require("./resolvers/queries/allReviews"),
    reviewById: require("./resolvers/queries/reviewById"),
    reviewsByProductId: require("./resolvers/queries/reviewsByProductId"),
  },
  Mutation: {
    addNewReview: require("./resolvers/mutations/addNewReview"),
    updateReview: require("./resolvers/mutations/updateReview"),
    deleteReview: require("./resolvers/mutations/deleteReview"),
  },
};
