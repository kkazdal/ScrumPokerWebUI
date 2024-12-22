import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        username: null,
        roomUniqId: null,
        selectedRadio: null,
        userId: null
    }
]

const userInfoSlice = createSlice({
    name: "userInfoSlice",
    initialState,
    reducers: {
        addInfoUser: (state, action) => {
            const findIndex: any = state.findIndex((item: any) => item?.roomUniqId == action.payload.roomUniqId);

            if (findIndex == -1 || findIndex == 0) {
                state.push(action.payload);
            } else {
                state[findIndex] = {
                    ...state[findIndex],
                    username: action.payload.username,
                    userId: action.payload.userId,

                }
            }

        },
        removeInfoUser: (state, action) => {
            return state.filter((user: any) => user.roomUniqId !== action.payload.roomUniqId);
        }
    },
});

export const { addInfoUser, removeInfoUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;