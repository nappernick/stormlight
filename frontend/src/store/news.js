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
    const stories = []
    for (let index = 0; stories.length < 3; index++) {
        const story = res.data.news[index]
        if (story.category === "top news") {
            console.log(story)
            stories.push(story)
        }
    }
    dispatch(setNews(stories))
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
