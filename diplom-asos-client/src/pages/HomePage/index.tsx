import LoginPage from "../LoginPage";
import {useAppDispatch, useAppSelector} from "../../store";
import {logout} from "../../store/authSlice.ts";

const HomePage = () => {

    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const logoutHandler = async () => {
        dispatch(logout());
    }

    return (
        <>
            <h1>
                Hello my friends! {user?.name}
            </h1>
            <button onClick={logoutHandler}>Logout</button>

        </>

    );
}

export default HomePage;