import React from 'react'
import { useSelector } from 'react-redux'
import PurchaseModal from '../PurchasePage/PurchaseModal'
import PortofolioLineGraph from './Graphs/PortofolioLineGraph'
import "./Dashboard.css"

function DashboardPage() {
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) return null
    return (
        <div className="page-container">
            <div className="modals-container">
                <div className="purchaseModal">
                    <PurchaseModal />
                </div>
                <div className="addFundsModal">
                    {/* create table of acounts & in modal link to account creation */}
                </div>
            </div>
            <div className="portofolioLineGraph">
                <PortofolioLineGraph />
            </div>
            <div className="portofolioPieChart">
                {/* create piechart of each stock's total, updates every minute */}
            </div>
            <div className="listStocks">
                {/* list of stocks with mini chart & current prices */}
            </div>
        </div>
    )
}

export default DashboardPage
