import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'

const creatingStore = () => {
    return configureStore({
        reducer : {
            notification: notificationReducer
        }
    })
}

export default creatingStore