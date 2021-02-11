import React, { useState } from 'react'
import LineGraph from '../Portfolio/LineGraph'

function CompanyDetail() {
    const [intraDayEnd, setIntraDayEnd] = useState(0)
    return (
        <div>
            <LineGraph setIntraDayEnd={setIntraDayEnd} />
        </div>
    )
}

export default CompanyDetail
