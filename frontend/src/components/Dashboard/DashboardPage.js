import React from 'react'
import { useSelector } from 'react-redux'
import PurchaseModal from '../PurchasePage/PurchaseModal'
import PortofolioLineGraph from './Graphs/PortofolioLineGraph'
import "./Dashboard.css"
import ListStocks from './Lists/ListStocks'


function DashboardPage() {
    const sessionUser = useSelector(state => state.session.user)
    
    if (!sessionUser) return null

    return (
        <div className="page-container">
                <div className="portofolioLineGraph">
                    <div className="purchaseModal">
                        <PurchaseModal />
                    </div>
                    <PortofolioLineGraph />
                </div>
                <div className="listStocks">
                    <ListStocks />
                </div>
        </div>
    )
}

export default DashboardPage
