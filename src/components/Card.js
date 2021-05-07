import React from "react";

import {ProductContext} from '../context'
import {useContext} from 'react'

import CardUI from '../layout/CardUI'
import Loading from '../layout/Loading'

export default function Card(){
    const context = useContext(ProductContext)

    const {allProducts,sortedData,loading} = context
    console.log(sortedData)
    console.log(loading)

     if (loading || allProducts === undefined || allProducts.length === 0 || sortedData === undefined) {
        return <Loading />;
      }
       if(Object.keys(sortedData).length>0) {
    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
            {sortedData.map((item,index)=> {
                
                    return (
                //  -md-4 col-lg-3 ml-2
                <div className='col-sm-4 '>
                    <CardUI key={item.id} data={item}/>
                </div>
                    )
                })}   
            </div>
            
        </div>
    )}
    else{
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    {/* {JSON.stringify(allProducts)} */}
                {allProducts.map((item,index)=> {
                    
                        return (
                     <div className='col-sm-4'>
                        <CardUI key={item.id} data={item}/>
                    </div>
                        )
                    })}   
                </div>
                
            </div>
        )
    }
    
}