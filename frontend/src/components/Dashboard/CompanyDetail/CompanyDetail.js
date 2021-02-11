import React, { useEffect, useState } from 'react'
import LineGraph from '../Portfolio/LineGraph'
import styled, { useTheme } from "styled-components"
import { fetchCoData } from '../../../utils'
import { useParams } from 'react-router-dom'
import PortfolioValue from '../Portfolio/PortfolioValue'

function CompanyDetail() {
    const { stockTicker } = useParams()
    const [intraDayStart, setIntraDayStart] = useState(0)
    const [intraDayEnd, setIntraDayEnd] = useState(0)
    const [startEndDiff, setStartEndDiff] = useState(0)
    const [interval, setInterval] = useState("15min")
    const [companyIntraDayData, setCompanyIntraDayData] = useState({})

    useEffect(() => {
        fetchCoData(setCompanyIntraDayData, stockTicker, interval)
    }, [])
    useEffect(() => {
        setIntraDayEnd(parseFloat(Object.values(companyIntraDayData)[0]).toFixed(2))
        setIntraDayStart(parseFloat(Object.values(companyIntraDayData)[Object.values(companyIntraDayData).length - 1]).toFixed(2))
    }, [companyIntraDayData])

    useEffect(() => {
        const numEnd = intraDayEnd
        const numStart = intraDayStart
        if (intraDayStart && intraDayEnd) setStartEndDiff((intraDayEnd - intraDayStart).toFixed(2))
    }, [intraDayStart, intraDayEnd])

    return (
        <div>
            <div className="value_container">
                <PortfolioValue
                    intraDayEnd={intraDayEnd}
                    intraDayStart={intraDayStart}
                    startEndDiff={startEndDiff}
                />
            </div>
            <LineGraph setIntraDayEnd={setIntraDayEnd} companyIntraDayData={companyIntraDayData} />
        </div>
    )
}

export default CompanyDetail
