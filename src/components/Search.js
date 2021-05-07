import React, {Component} from 'react'
import axios from 'axios'

import {ProductConsumer} from '../context'
import Suggestions from '../layout/Suggestions'

export default class Search extends Component{
    constructor(props){
        super(props)
    }

    state={
        q:'',
        queries:[],
        suggestions:[],
        visibility:false
    }

    componentDidMount() {
                 axios.get('http://127.0.0.1:8000/api/query/')
                        .then(res => {
                            this.setState({
                                queries:res.data
                            })
             })

             .catch(err=>console.log(err))          
         }

    formSubmit = (dispatch, e) =>{
        e.preventDefault()

         axios.get(`http://127.0.0.1:8000/api/search/?q=${this.state.q}`)
             .then(res => {
                let loading = false
                 let data = [...res.data.daraz, ...res.data.goto, ...res.data.trend]
                 let maxPrice = Math.max(...data.map(item=>item.price))
                 let price = maxPrice
                 let empty = 0

                //fifth dispatch
                dispatch({
                    type: 'Loader',
                    payload: loading
                })
                dispatch({
                    type: 'SEARCH_PRODUCTS',
                    payload: data
                })
                console.log(maxPrice)
                //second dispatch
                dispatch({
                    type: 'SEARCH_MAX',
                    payload: maxPrice
                })
                //third dispatch
                dispatch({
                    type: 'SEARCH_PRICE',
                    payload: price
                })
                //fourth dispatch
                dispatch({
                    type: 'EMPTY_ARRAY',
                    payload: empty
                })
                
             })
             .catch(err => console.log(err))
    }

    handleQuery = (e) =>{
        const query = e.target.value
        let suggestions = []
        if (query.length > 0){
            const regex = new RegExp(`^${query}`, 'i')
            suggestions = this.state.queries.sort().filter(v => regex.test(v.query))
        }

        this.setState(()=>({ 
            q: query,
            suggestions,
        }))
    }

    suggestionSelected(value){
        this.setState(()=>({
            q:value,
            suggestions:[]
        }))
    }

    renderSuggestions(){
        const { suggestions } = this.state
        if (suggestions.length===0){
                return null
        }

        return(
            <div className='search-result'>
                <ul className='list-group'>
                {suggestions.map((item,index)=>
                    <li className='list-group-item' onClick={()=>this.suggestionSelected(item.query)}>
                        <div className="row">
                        <div className="col text-left">
                            <p className="mb-0 font-weight-bold line-height-1">
                                {item.query}
                            </p>
                        </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }

    render(){
    return (
        <ProductConsumer>
            {value =>{
                const { dispatch } = value
                return(
                    <>
                        <div className="row">
                <div className="col text-center">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="search-bar-container">
                        <div style={{ height: "100%" }}>
                        <form onSubmit={this.formSubmit.bind(this, dispatch)}>

                            <input
                                type="text"
                                name="q"
                                className="search-bar"
                                autoComplete="off"
                                placeholder="Search here ..."
                                value={this.state.q}
                                onChange={this.handleQuery}
                                ref={this.inputref}
                            />
                            <button className="fas fa-search search-bar-icon" type='submit'></button>
                            </form>
                            {this.renderSuggestions()}
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
                    </>
        )
            }}
        </ProductConsumer>
    )
}
}