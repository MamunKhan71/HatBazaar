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
            <div className='w-full h-full grid grid-cols-4 gap-6 pt-12'>
                {
                    products?.map(product => (
                        <div className="card bg-base-100 shadow-xl rounded-none">
                            <figure className='relative'>
                                <img className='h-96 object-cover w-full'
                                    src={product.productImage}
                                    alt="Shoes" />
                                <span className='absolute bottom-4 left-4 bg-black text-white py-2 px-4 text-xs'>{product.category}</span>
                            </figure>
                            <div className="card-body">
                                <h2 className="text-xl font-bold">{product.productName}</h2>
                                <p className=' truncate'>{product.description}</p>
                                <p className='font-semibold'>$ {product.price}</p>
                                <div className="card-actions justify-start">
                                    <a href="#_" class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-black rounded-none hover:bg-black text-white group w-full">
                                        <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span class="relative w-full transition-colors duration-300 ease-in-out group-hover:text-white text-center">Buy Now</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
