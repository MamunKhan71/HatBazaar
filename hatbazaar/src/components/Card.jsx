import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Card({product}) {
    return (
        <div className="card bg-base-100 shadow-xl rounded-none">
            <figure className='relative'>
                <img className='h-96 object-cover w-full'
                    src={product.productImage}
                    alt="Shoes" />
                <span className='absolute bottom-4 left-4 bg-black text-white py-2 px-4 text-xs'>{product.category}</span>
            </figure>
            <div className="card-body p-4">
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-bold">{product.productName}</h2>
                    <h2 className="text-sm font-bold inline-flex gap-2 items-center"><FaStar className='text-yellow-400' />{product.ratings}</h2>
                </div>
                <p className=' truncate'>{product.description}</p>
                <div className='flex justify-between items-center'>
                    <p className='font-black'>$ {product.price}</p>
                    <span className="font-semibold text-gray-500 text-right inline-flex gap-2 items-center">
                        <FaRegCalendarAlt />
                        {new Date(product.creationDateTime).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </span>
                </div>
                <div className="card-actions justify-start">
                    <a href="#_" class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-black rounded-none hover:bg-black text-white group w-full">
                        <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span class="relative w-full transition-colors duration-300 ease-in-out group-hover:text-white text-center">Buy Now</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
