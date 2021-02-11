import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function CompanySideBar() {
    const { stockTicker } = useParams()
    const SideBarDiv = styled.div``
    return (
        <SideBarDiv>
            <div className="side-bar-container">
                <div className="header">
                    Buy {stockTicker}
                </div>
                <div className="purchase-details">
                    <div className="shares">
                        <div className="shares-title">
                            Shares
                        </div>
                        <div className="shares-input">
                            <input type="number" />
                        </div>
                    </div>
                    <div className="market-price">
                        <div className="market-price-title">
                            Market Price
                        </div>
                        <div className="market-price-value">
                            {/*// ! COMING SOON */}
                        </div>
                    </div>
                    <div className="estimated-cost">
                        <div className="estimated-cost-title">
                            Estimated Cost
                        </div>
                        <div className="estimated-cost-value">
                            {/*// ! COMING SOON */}
                        </div>
                    </div>
                </div>
                <div className="interactions">
                    <div className="purchase">

                    </div>
                    <div className="sell-stock">
                        {/*// ! SHOULD BE INVISIBLE IF NOT OWNED  */}
                    </div>
                    <div className="buying-power">
                        {/*// ! WILL NEED A NEW TABLE  */}
                    </div>
                    <div className="watch-list">
                        {/* // ! WILL ALSO NEED A NEW TABLE */}
                    </div>
                </div>
            </div>
        </SideBarDiv>
    )
}

export default CompanySideBar
