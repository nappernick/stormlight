import React from 'react'

function Story({ story }) {
    return (
        <div className="story__container">
            <div className="story__text">
                <h2 className="story__headline">{story.headline}</h2>
                <h4 className="story__summary">{story.summary}</h4>
            </div>
            <div className="story__image">
                <img src={story.image} alt="Story's Image" />
            </div>
        </div>
    )
}

export default Story
