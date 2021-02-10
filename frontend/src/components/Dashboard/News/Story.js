import React from 'react'

function Story({ story }) {
    return (
        <div className="story__container">
            <div className="story__text">
                <a href={story.url} target="_blank" rel="noopener noreferrer" >
                    <h2 className="story__headline">{story.headline}</h2>
                </a>
                <h4 className="story__summary">{story.summary}</h4>
            </div>
            <div className="story__image">
                <a href={story.url}>
                    <img src={story.image} alt="Story's Image" />
                </a>
            </div>
        </div>
    )
}

export default Story
