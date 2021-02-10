import React, { useEffect, useState } from 'react'
import { intradayfetchapi } from '../../../utils'

function CompanyDetail({ ticker }) {
    const [companyIntraDayData, setCompanyIntraDayData] = useState([])

    useEffect((interval) => {
        if (!interval) interval = "15min"
        let res = intradayfetchapi(ticker, interval)
        console.log(res)
    }, [])

    return (
        <div>

        </div>
    )
}

export default CompanyDetail
