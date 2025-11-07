import {useGoogleLogin} from "@react-oauth/google";
import {useLoginByGoogleMutation} from "../../features/account/apiAccount.ts";

const LoginPage = () => {

    const [apiLoginGoogle, {isLoading, error}] = useLoginByGoogleMutation();

    console.log("Loading", isLoading);
    console.log("Error", error);

    const loginByGoogle = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const {access_token} = tokenResponse;
            try {
                const result = await apiLoginGoogle({
                    token: access_token,
                });
                console.log("Result", result);
            }
            catch (e) {
                console.log("Problem", e);
            }
            console.log("Gogole result", access_token);
        }
    });

    return (
        <>
            <h1>Вхід на сайт</h1>
            <button onClick={() => { loginByGoogle(); }}>Login By GOOGLE</button>
        </>
    )
}

export default LoginPage;