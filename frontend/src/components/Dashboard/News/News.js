import React from 'react'
import { useSelector } from 'react-redux'

function News() {
    const news = useSelector(store => store.news)
    return (
        <div className="news__container">
            <div className="news__header_container">
                <h2>Recent News:</h2>
            </div>
            <div className="news__stories_container">
                {news && news.forEach(story => {
                    
                })}
            </div>
        </div>
    )
}

export default News
