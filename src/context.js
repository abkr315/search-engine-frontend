import React, { Component } from 'react'
import axios from 'axios'

const ProductContext = React.createContext()

const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_PRODUCTS':
        return{
            ...state,
            allProducts:action.payload,
        }
        case 'SEARCH_MAX':
        return{
            maxPrice:action.payload,
        }
        case 'SEARCH_PRICE':
        return{
            price:action.payload,
        }
        case 'EMPTY_ARRAY':
        return{
            sortedData:action.payload,
        }
        case 'Loader':
        return{
            loading:action.payload,
        }
        default:
            return state
    }
}

class ProductProvider extends Component {
    state={
        allProducts:[],
        sortedData:[],
        loading:true,
        price:0,
        minPrice:0,
        maxPrice:0,
        queries:[],
        daraz:false,
        goto:false,
        trend:false,
        dispatch: action => this.setState(state=> reducer(state, action))
    }

    componentDidMount() {
        let url = 'http://127.0.0.1:8000/api/data/'
         axios.get(url)
             .then(res => {
                 let data = [...res.data.daraz, ...res.data.goto, ...res.data.trend]
                 this.setState({
                     allProducts:data,
                     loading:false
                 })

                 axios.get('http://127.0.0.1:8000/api/query/')
                        .then(res => {
                            this.setState({
                                queries:res.data
                            },this.queryForamte)
             })

             .catch(err=>console.log(err))
             })             
         }
    
        handleChange= event =>{
        let target = event.target
        let value = target.type === 'checkbox' ?
        target.checked:target.value
        let name = event.target.name
        this.setState({
            [name]:value
        },this.filterProducts)
    }

    queryForamte(){
        let {queries,allProducts} = this.state
        const maxPrice = Math.max(...allProducts.map(item=>item.price))
        //let query = queries.map((item,index)=>item.query)
        this.setState({
            //queries:query,
            price:maxPrice,
            maxPrice,
        })
    }

    filterProducts = () =>{
        let{ daraz,goto,trend,price,allProducts} = this.state
// all the products
        let tempproducts = [...allProducts]
// filter by price
        tempproducts = tempproducts.filter(item => item.price<=price)
// filter by daraz
        if(daraz){
            tempproducts = tempproducts.filter(item=> item.daraz==='true')
            }
// filter by goto
        if(goto){
            tempproducts = tempproducts.filter(item=> item.goto==='true')
            }
// filter by trend
        if(trend){
            tempproducts = tempproducts.filter(item=> item.trend==='true')
            }
// change state
        this.setState({
            sortedData:tempproducts
        }) 
        //console.log(allProducts)
    }

    render() {
        //console.log(this.state.allProducts)
        //console.log(this.state.queries)

        return (
            <ProductContext.Provider value={{...this.state,handleChange:this.handleChange}}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductContext, ProductConsumer}