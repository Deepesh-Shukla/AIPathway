import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null
    },//setUserData("deepesh")<={payload}
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        }
    }
})

export const {setUserData}=userSlice.actions
export default userSlice.reducer

// ✔ setUserData is a reducer (a function that updates state)
// ✔ action.payload -> This is the data you send when dispatching.
// ✔ userSlice.reducer -> Goes into the store.
// ✔ userSlice.actions -> Used by components to update state.

// How to update Redux state (useDispatch)
// dispatch(setUserData("Deepesh"))
// state.user.userData = "Deepesh"

// How to read Redux state (useSelector)
// const user = useSelector(state => state.user.userData);