import React, { useEffect, useState } from 'react'
import LineGraph from '../Portfolio/LineGraph'
import { fetchCoData } from '../../../utils'
import { useParams } from 'react-router-dom'
import PortfolioValue from '../Portfolio/PortfolioValue'
import CompanySideBar from './CompanySideBar'
import News from '../News/News'
import styled from 'styled-components'

const StyledValueContainer = styled.div`
display: flex;
justify-content: space-between;
font-family: 'DM Sans', sans-serif;
font-weight: 700;
font-size: 22pt;
color: rgb(0, 78, 171);
margin-top: 0px;
margin-left: 30px;
margin-bottom: 20px;
`

function CompanyDetail() {
    const { stockTicker } = useParams()
    const [intraDayStart, setIntraDayStart] = useState(0)
    const [intraDayEnd, setIntraDayEnd] = useState(0)
    const [startEndDiff, setStartEndDiff] = useState(0)
    const [interval, setInterval] = useState("15min")
    const [companyIntraDayData, setCompanyIntraDayData] = useState({})

    useEffect(() => {
        fetchCoData(setCompanyIntraDayData, stockTicker, interval)
    }, [stockTicker, interval])
    useEffect(() => {
        setIntraDayEnd(parseFloat(Object.values(companyIntraDayData)[0]).toFixed(2))
        setIntraDayStart(parseFloat(Object.values(companyIntraDayData)[Object.values(companyIntraDayData).length - 1]).toFixed(2))
    }, [companyIntraDayData])

    useEffect(() => {
        if (intraDayStart && intraDayEnd) setStartEndDiff((intraDayEnd - intraDayStart).toFixed(2))
    }, [intraDayStart, intraDayEnd])

    return (
        <>
            <div className="page-container-upper">
                <div className="company-line-graph">
                    <StyledValueContainer>
                        <PortfolioValue
                            intraDayEnd={intraDayEnd}
                            intraDayStart={intraDayStart}
                            startEndDiff={startEndDiff}
                        />
                    </StyledValueContainer>
                    <div className="line_graph">
                        <LineGraph setIntraDayEnd={setIntraDayEnd} companyIntraDayData={companyIntraDayData} />
                    </div>
                </div>
                <div className="company-stock-side-bar">
                    <CompanySideBar />
                </div>
            </div>
            <div className="page-container-lower">
                <div className="news">
                    <News />
                </div>
            </div>
        </ >
    )
}

export default CompanyDetail
