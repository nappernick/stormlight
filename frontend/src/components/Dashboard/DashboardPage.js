import React from 'react'
import { useSelector } from 'react-redux'
import PortofolioLineGraph from './Portfolio/PortofolioLineGraph'
import "./Dashboard.css"
import ListStocks from './Lists/ListStocks'
import News from './News/News'


function DashboardPage() {
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return null

    return (
        <>
            <div className="page-container-upper">
                <div className="portofolioLineGraph">
                    <PortofolioLineGraph />
                </div>
            </div>
            <div className="list-stocks">
                <div className="listStocks">
                    <ListStocks />
                </div>
            </div>
            <div className="page-container-lower">
                <div className="news">
                    <News />
                </div>
            </div>
        </>
    )
}

export default DashboardPage
