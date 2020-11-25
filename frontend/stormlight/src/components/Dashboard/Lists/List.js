import React from 'react'
import { useSelector } from 'react-redux'
import { fetch } from '../../../store/csrf'
import ListItem from './ListItem'

async function List({ intraDayData }) {
    const intraDay = useSelector(state => state.intraday)
    const userId = useSelector(state => state.session.user.id)
    const res = await fetch(`/api/stocks/${userId}`)
    console.log(res.data.stock.length)
    let listItems
    console.log(intraDay.length)
    // if (intraDay.length === res.data.stock.length) {
    //     listItems = intraDay.map((el, idx) => <div key={idx}><ListItem intraDayData={intraDayData} ticker={Object.keys(el)} /></div>)
    // }
    return (
        <>
            {
                // listItems
            }
        </>
    )
}

export default List
