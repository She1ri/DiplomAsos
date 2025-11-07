import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from "../../utils/createBaseQuery.ts";
import type {IGoogleLogin} from "./types/IGoogleLogin.ts";
import type {ILoginResult} from "./types/ILoginResult.ts";
import type {Dispatch} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {loginSuccess} from "../../store/authSlice.ts";


const handleAuthSuccess = async (
    queryFulfilled: Promise<{ data: ILoginResult }>,
    dispatch: Dispatch,
    getState: () => RootState
) => {
    try {
        const { data } = await queryFulfilled;
        if (data?.token) {
            console.log("Root state", getState());
            // console.log("Finish auth ---Token---", data.token);
            dispatch(loginSuccess(data.token));
            //
            // const localCart = getState().localCart.items;
            // if (localCart.length > 0) {
            //     //@ts-ignore
            //     await dispatch(apiCart.endpoints.addToCartsRange.initiate(localCart)).unwrap();
            // }
            //
            // dispatch(clearCart());
        }
    } catch (error) {
        console.error('Auth error:', error);
    }
};


export const apiAccount = createApi({
    reducerPath: "apiAccount",
    baseQuery: createBaseQuery("account"),
    endpoints: (builder) => ({
        loginByGoogle: builder.mutation<ILoginResult[], IGoogleLogin>({
            query: (model) => ({
                url: 'googleLogin',
                method: 'POST',
                body: model
            }),
            onQueryStarted: async (_arg, { dispatch, getState, queryFulfilled }) =>
                handleAuthSuccess(queryFulfilled, dispatch, getState)
        })
    }),
});

export const {useLoginByGoogleMutation} = apiAccount;