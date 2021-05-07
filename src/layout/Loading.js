import React from 'react'
import loadingGif from '../loading-arrow.gif'

export default function Loading() {
    return (
        <div className='loading text-center'>
            <h4>Data loading...</h4>   
            <img src={loadingGif} alt='gif'/>         
        </div>
    )
}
