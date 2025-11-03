import {useGoogleLogin} from "@react-oauth/google";

const LoginPage = () => {

    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            const {access_token} = tokenResponse;
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