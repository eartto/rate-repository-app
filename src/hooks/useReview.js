import { useMutation } from "@apollo/client";
import { REVIEW } from "../graphql/mutations";

const useReview = () => {
    const [mutate, result] = useMutation(REVIEW);

    const review = async ({ text, repositoryName, rating, ownerName }) => {
        rating = Number(rating)
        const data = await mutate({ variables: { review: { text, repositoryName, rating, ownerName } } })

        return data
    };

    return [review, result];
};

export default useReview
