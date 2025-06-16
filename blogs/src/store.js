import { configureStore } from '@reduxjs/toolkit'

const creatingStore = () => {
    return configureStore({
        reducer : {}
    })
}

export default creatingStore