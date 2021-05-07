import React from 'react'

export default function CardUI({data}){

    let{image_url,title,price,rating,no_review,url}=data
    rating = parseInt(rating)

    return(
    <div className="card rounded" style={{ width: "20rem"}}>
            <img src={image_url} className="thumbnail" alt="Card cap" />
            <div className="price-top">
                        <h6>Rs.{price}</h6>
                        <p>Price</p>
                    </div>
            <div className="profile-overview">
            <div className="card-body" >
                <h5 className="card-title">{title}</h5>
                <div className="row text-center">
                    <div className="col-xs-4 ml-4">
                        <h3>{rating}</h3>
                        <p>Rating</p>
                    </div>
                    <div className="col-xs-4 ml-4">
                        <h3>{no_review}</h3>
                        <p>Reviews</p>
                    </div>
                </div>
                
            </div>
            <a href={ url } className="btn-primary card-link">View</a>
            </div>
            
        </div>
      
    )
}