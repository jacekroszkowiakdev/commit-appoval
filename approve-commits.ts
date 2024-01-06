// Exercise:

//   Create a function named `checkPullRequestApproval` that examines the approval status of a pull request.

//   Input:
//   - The timestamp of the latest commit.
//   - An array of review objects, each containing:
//     - userId: User ID
//     - timestamp: Timestamp of the review
//     - reviewType: Review type, which can be either "COMMENT" or "APPROVAL".

//   Output:
//    - Return true if there are at least two "APPROVAL" reviews from different users and the approvals timestamps are greater than or equal to the latest commit timestamp.
//    - Otherwise, return false.

// STEPS TO SOLVE:
// 1. create array of approvedReviews that dates are more recent than the latest commit
// 2. check if the approved reviews are from at least two different users:
// - create empty array (storage) to save unique id's;
// - check if the user ID is not already in the array;
// - add the user ID to the storage array;
// - check if there are at least two unique users with approvals - if yes return true,
// - otherwise return false.

interface IReview {
    userId: string;
    timestamp: number;
    reviewType: string;
}

const latestCommitTimestamp = Date.now();
const reviews: IReview[] = [
    { userId: "user1", timestamp: Date.now() - 1000, reviewType: "APPROVAL" },
    { userId: "user2", timestamp: Date.now() + 10, reviewType: "COMMENT" },
    { userId: "user1", timestamp: Date.now() + 10, reviewType: "APPROVAL" },
    { userId: "user2", timestamp: Date.now() + 20, reviewType: "COMMENT" },
    { userId: "user1", timestamp: Date.now() + 30, reviewType: "APPROVAL" },
    { userId: "user3", timestamp: Date.now() + 35, reviewType: "APPROVAL" },
];

const result = checkPullRequestApproval(latestCommitTimestamp, reviews);
console.log(result);

function checkPullRequestApproval(latestCommitTimestamp, reviews) {
    const approvedReviewsArray: IReview[] = reviews.filter(
        (review: IReview) =>
            review.reviewType === "APPROVAL" &&
            review.timestamp >= latestCommitTimestamp
    );

    const uniqueUsers: string[] = [];

    for (let review of approvedReviewsArray) {
        if (!uniqueUsers.includes(review.userId)) {
            uniqueUsers.push(review.userId);

            if (uniqueUsers.length >= 2) {
                return true;
            }
        }
    }
    return false;
}
