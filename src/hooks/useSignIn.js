import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import AuthStorage from "../utils/authStorage";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE);
    const apolloClient = useApolloClient()
    const authStorage = new AuthStorage()

    const signIn = async ({ username, password }) => {
        const data =  await mutate({ variables: { credentials: { username, password } } })
        await authStorage.setAccessToken(data.data.authenticate.accessToken)
        apolloClient.resetStore();
        return data
    };

    return [signIn, result];
};

export default useSignIn