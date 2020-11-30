import React, { useState } from 'react'
import { Switch, Route, NavLink, useHistory } from "react-router-dom"
import LineGraph from './LineGraph';
import NumberFormat from 'react-number-format';
import styled from "styled-components"
import { useSelector } from 'react-redux';
import PieChart from './PieChart';


function PortofolioLineGraph({ user }) {
    const history = useHistory()
    const intraDayData = useSelector(state => state.intradayData)
    const PortfolioValue = styled.h2`
    display: flex;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 22pt;
    color: rgb(0, 78, 171);
    margin-top: 0px;
    margin-left: 20px;
    margin-bottom: 10px;
    `
    return (
        <div>
            <PortfolioValue>
                <div className="headerContainer">
                    <div>{`Portfolio Value: `}</div>
                    <NumberFormat style={{ marginLeft: '20px' }} value={Object.values(intraDayData)[0]} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
                {history.location.pathname !== "/dashboard" && <NavLink to="/dashboard" className="chart-button override">Line Graph</NavLink>}
                {history.location.pathname === "/dashboard" && <NavLink to="/dashboard/pie" className="chart-button override">Pie Graph</NavLink>}
            </PortfolioValue>
            <Switch>
                <Route exact path="/dashboard" component={LineGraph} />
                <Route path="/dashboard/pie" component={PieChart} />
            </Switch>
        </div>
    )
}

export default PortofolioLineGraph
