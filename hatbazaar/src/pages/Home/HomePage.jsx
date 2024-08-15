import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbCalendarCode } from "react-icons/tb";
import { BiFilter } from "react-icons/bi";
import { TbBrandAbstract } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import axios from 'axios';
export default function HomePage() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const handleClick = (e) => {
        const { value, checked } = e.target;
        let updatedSelectedBrands = [];
        if (checked) {
            updatedSelectedBrands = [...selectedBrands, value]
        } else {
            updatedSelectedBrands = selectedBrands.filter((brand) => brand !== value);
        }
        setSelectedBrands(updatedSelectedBrands);

        if (updatedSelectedBrands.length === 0) {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter((product) =>
                updatedSelectedBrands.includes(product.brandName)
            );
            setFilteredProducts(filtered)
        }
    }
    const filterBy = (type, sortType) => {
        if (type === "price") {
            if (sortType === 'htl') {
                const sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
                setFilteredProducts(sortedProducts);
            } else if (sortType === 'lth') {
                const sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
                setFilteredProducts(sortedProducts);
            }
        } else {
            const sortedProducts = [...filteredProducts].sort((a, b) => new Date(a.creationDateTime) - new Date(b.creationDateTime))
            setFilteredProducts(sortedProducts)
        }
    }
    console.log(filteredProducts);
    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => {
                setProducts(res.data)
                setFilteredProducts(res.data)
            })
    }, [])
    useEffect(() => {
        setCategory([...new Set(products.map((product) => product.category))]);
        setBrands([...new Set(products.map(product => product.brandName))])
    }, [products])

    return (
        <div className='space-y-4'>
            <h1 className='text-center font-bold text-3xl'>Products</h1>
            <div className='w-full flex justify-end items-center'>
                <details className="dropdown dropdown-end">
                    <summary className="btn m-1 rounded-none"><RxDropdownMenu /> Sort by</summary>
                    <ul className="menu dropdown-content bg-base-100 z-[1] w-52 p-2 rounded-none shadow font-semibold">
                        <li><button onClick={() => filterBy('price', 'htl')}><MdOutlineAttachMoney />High to Low</button></li>
                        <li><button onClick={() => filterBy('date', 'lth')}><TbCalendarCode />Low to High</button></li>
                    </ul>
                </details>
                <button className='btn rounded-none' onClick={() => filterBy('date')}><TbCalendarCode />Date Added</button>
            </div>
            <div className='flex gap-5 pt-12'>
                <div className='w-96 p-4 space-y-4'>
                    <h1 className='inline-flex gap-2 items-center font-semibold '><BiFilter />Filter by</h1>
                    <div className='bg-gray-50 p-4 space-y-2'>
                        <p className='inline-flex gap-2 items-center font-semibold'><MdOutlineAttachMoney />Price</p>
                        <div>
                            <input type="range" min={0} max="100" value="25" className="range range-xs" step="50" />
                            <div className="flex w-full justify-between px-2 text-xs">
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='bg-gray-50 p-4 space-y-2'>
                        <p className='inline-flex gap-2 items-center font-semibold'><BiCategoryAlt />Category</p>
                        <div>
                            <ul className='space-y-2'>
                                {
                                    category?.map(category => (
                                        <li className='flex items-center gap-2'>
                                            <input type="checkbox" className="checkbox checkbox-sm" />
                                            <span className="label-text font-medium">{category}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className='bg-gray-50 p-4 space-y-2'>
                        <p className='inline-flex gap-2 items-center font-semibold'><TbBrandAbstract />Brand Name</p>
                        <div>
                            <ul className='space-y-2'>
                                {
                                    brands?.map(brand => (
                                        <li className='flex items-center gap-2 font-medium'>
                                            <input onChange={(e) => handleClick(e)} type="checkbox" className="checkbox" value={brand} />
                                            <span className="label-text">{brand}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full grid grid-cols-3 gap-6'>
                    {
                        filteredProducts?.map(product => (
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
        </div>
    )
}
