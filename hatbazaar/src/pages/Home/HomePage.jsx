import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
export default function HomePage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('product.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className='space-y-4'>
            <h1 className='text-center font-bold text-3xl'>Products</h1>
            <div className='border rounded-xl w-full h-full p-4 grid grid-cols-4 gap-4'>
                {
                    products?.map(product => (
                        <div className="card bg-base-100 shadow-xl">
                            <figure>
                                <img className='h-96 object-cover w-full'
                                    src={product.productImage}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
