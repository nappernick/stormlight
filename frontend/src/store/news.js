import { newsFetch } from "../utils"

const SET_NEWS = "stocks/setNews"

export const setNews = (stories) => {
    return {
        type: SET_NEWS,
        payload: stories
    }
}

export const initializeNews = () => async (dispatch) => {
    let res = await newsFetch()
    // res = await res.json()
    console.log(res.data.news)
    for (let index = 0; index < 3; index++) {


    }
}

const newsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_NEWS:
            return [...action.payload]
        default:
            return state
    }
}

export default newsReducer
