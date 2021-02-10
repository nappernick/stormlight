import React from 'react'
import styled from "styled-components"
import NumberFormat from 'react-number-format';

function PortfolioValue({ intraDayEnd, intraDayStart, startEndDiff }) {
    const HeaderContainer = styled.div`
        display: flex;
        flex-direction: column;
        `
    const ChangeContainer = styled.div`
        font-size: 15px;
        color: #5a6571;
        display: flex;
        margin-left: 12px;
        min-width: 120px
        `
    return (
        <HeaderContainer>
            <NumberFormat
                style={{ marginLeft: '10px' }}
                value={intraDayEnd ? intraDayEnd : 0}
                displayType={'text'}
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator={true}
                prefix={'$'}
                className="portfolio_value__num"
            />
            <ChangeContainer>
                <div className={`portfolio_change___dollar ${startEndDiff >= 0 ? Math.abs(startEndDiff) === 0 ? "" : "positive" : "negative"}`}>
                    {startEndDiff === "NaN" ? "" : `${startEndDiff > 0 ? "" : "-"}$${Math.abs(startEndDiff).toFixed(2)}`}
                </div>
                <div className={`portfolio_change___percentage ${startEndDiff >= 0 ? Math.abs(startEndDiff) === 0 ? "" : "positive" : "negative"}`}>
                    {startEndDiff === "NaN" ? "" : `(${(startEndDiff / intraDayStart * 100).toFixed(2)}%)`}
                </div>
            </ChangeContainer>
        </HeaderContainer>
    )
}

export default PortfolioValue
