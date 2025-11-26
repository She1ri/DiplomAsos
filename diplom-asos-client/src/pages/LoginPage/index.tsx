import {useGoogleLogin} from "@react-oauth/google";
import {useLoginByGoogleMutation} from "../../features/account/apiAccount.ts";
import { IoLogoGoogle } from "react-icons/io5";


const LoginPage = () => {

    const [apiLoginGoogle] = useLoginByGoogleMutation();

    // console.log("Loading", isLoading);
    // console.log("Error", error);

    const loginByGoogle = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const {access_token} = tokenResponse;
            try {
                const result = await apiLoginGoogle({
                    token: access_token,
                });

                if(result.error) {
                    console.error("Error", result.error);
                }
                //console.log("Result", result);
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
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => {
                    loginByGoogle();
                }}
            >
                Login By Google
                <IoLogoGoogle color="yellow" className="ml-2" size={20} />
            </button>

        </>
    )
}

export default LoginPage;