import { Switch, Route, NavLink, useHistory } from "react-router-dom"
import LineGraph from './LineGraph';
import styled, { useTheme } from "styled-components"
import { useSelector } from 'react-redux';
import PieChart from './PieChart';
import { useEffect, useState } from "react";
import PortfolioValue from "./PortfolioValue";


function PortofolioLineGraph({ user }) {
    const history = useHistory()
    const intraDayData = useSelector(state => state.intradayData)
    const [intraDayStart, setIntraDayStart] = useState(0)
    const [intraDayEnd, setIntraDayEnd] = useState(0)
    const [startEndDiff, setStartEndDiff] = useState(0)
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

    const handleClick = (e) => setIntraDayEnd(parseFloat(Object.values(intraDayData)[0]).toFixed(2))

    useEffect(() => {
        setIntraDayEnd(parseFloat(Object.values(intraDayData)[0]).toFixed(2))
        setIntraDayStart(parseFloat(Object.values(intraDayData)[Object.values(intraDayData).length - 1]).toFixed(2))
    }, [intraDayData])

    useEffect(() => {
        if (intraDayStart && intraDayEnd) setStartEndDiff((intraDayEnd - intraDayStart).toFixed(2))
    }, [intraDayStart, intraDayEnd])

    return (
        <div className="line_graph_container">
            <StyledValueContainer>
                <PortfolioValue
                    intraDayEnd={intraDayEnd}
                    intraDayStart={intraDayStart}
                    startEndDiff={startEndDiff}
                />
                {history.location.pathname !== "/dashboard" && <NavLink
                    to="/dashboard"
                    className="chart-button override"
                    onClick={handleClick}
                >
                    Line Graph</NavLink>}
                {history.location.pathname === "/dashboard" && <NavLink
                    to="/dashboard/pie"
                    className="chart-button override"
                    onClick={handleClick}
                >
                    Pie Graph</NavLink>}
            </StyledValueContainer>
            <Switch>
                <Route exact path="/dashboard" render={() => (
                    <LineGraph setIntraDayEnd={setIntraDayEnd} />
                )} />
                <Route path="/dashboard/pie" component={PieChart} />
            </Switch>
        </div>
    )
}

export default PortofolioLineGraph
