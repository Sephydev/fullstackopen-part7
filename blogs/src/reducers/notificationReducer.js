import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotificationAction(state, action) {
            return action.payload
        },
        removeNotification() {
            return null
        }
    }
})

export const setNotification = text => {
    return dispatch => {
        dispatch(setNotificationAction(text))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export const { setNotificationAction, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer