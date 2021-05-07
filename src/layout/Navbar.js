import React from 'react'

import {Link} from 'react-router-dom'

function refreshPage(){ 
    window.location.reload(); 
}

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark mb-3">''
            <div className='container'>
        <span className="navbar-brand mb-0 h1">
        <Link to="/" type='button' onClick={refreshPage} style={{textDecoration:'none', color:'whitesmoke'}}> BuyFashion</Link>
            </span>
            </div>
      </nav>
    )
}
