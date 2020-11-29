import React, { useState } from 'react'
import LineGraph from './LineGraph';
import NumberFormat from 'react-number-format';
import styled from "styled-components"


function PortofolioLineGraph({ user }) {
    const [currValue, setCurrValue] = useState("0")
    const PortfolioValue = styled.h2`
    display: flex;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 22pt;
    color: #215C8A;
    margin-top: 0px;
    margin-left: 20px;
    margin-bottom: 10px;
    `
    return (
        <div>
            <PortfolioValue>
                <div>{`Current Portfolio Value: `}</div>
                <NumberFormat style={{ marginLeft: '20px' }} value={currValue} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </PortfolioValue>
            <LineGraph setCurrValue={setCurrValue} currValue={currValue} />
        </div>
    )
}

export default PortofolioLineGraph
