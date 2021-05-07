import React from 'react'

function Suggestions(data) {
    
    return (
        <div>
                 <ul>
                 <li >{data.query}</li>
                 </ul>
            
        </div>
    )
}

export default Suggestions
