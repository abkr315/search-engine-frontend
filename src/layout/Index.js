import React from 'react'

import Card from '../components/Card'
import Search from '../components/Search'
import ProductFilter from '../components/ProductFilter'

export default function Index() {
    return (
        <>
            <Search />
            <ProductFilter />
            <Card />
        </>
    )
}
