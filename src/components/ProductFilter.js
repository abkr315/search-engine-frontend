import React from 'react'
import {ProductContext} from '../context'
import {useContext} from 'react'

export default function ProductFilter() {
    const context = useContext(ProductContext)

    const {daraz,trend,goto,price,maxPrice,minPrice, handleChange} = context
    //let price = maxPrice
    console.log(price,minPrice,maxPrice)
    return (
        <section className='filter-container'>
            <div className='container'>
            <div className='row'>

                <div className='col-sm-4 col-md-5 col-lg-5'>
                <div className='form-group'>
                    <label htmlFor='price'>product price Rs.{price}</label>
                    <input type="range" name='price' min={minPrice} max={maxPrice} id='price'
                    value={price} onChange={handleChange} className='form-control' />
                </div>
                </div>

                <div className='col col-md-2 col-lg-1' >
                <div className='form-group'>
                        <input type='checkbox' name='daraz' 
                        id='daraz' checked={daraz} onChange={handleChange} />
                        <label htmlFor='daraz'>Daraz</label>
                </div> 
                </div>

                <div className='col col-md-2 col-lg-1' >
                <div className='form-group'>    
                        <input type='checkbox' name='goto' 
                        id='goto' checked={goto} onChange={handleChange} />
                        <label htmlFor='goto'>Goto</label>
                </div>
                </div>
                <div className='col col-md-3 col-lg-1' >
                <div className='form-group'>
                        <input type='checkbox' name='trend' 
                        id='trend' checked={trend} onChange={handleChange} />
                        <label htmlFor='trend'>Trend</label>
                </div>
                </div>

            </div>
            </div>
        </section>
    )
}
