import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbCalendarCode } from "react-icons/tb";
import { BiFilter } from "react-icons/bi";
import { TbBrandAbstract } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import 'animate.css';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
export default function HomePage() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [price, setPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [itemsCount, setItemsCount] = useState(0)
    const numberOfPages = Math.ceil(itemsCount / itemsPerPage)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = [...Array(numberOfPages).keys()]
    const [loading, setLoading] = useState(true)
    const [filterTrigger, setFilterTrigger] = useState(false);
    const handleBrandClick = (e) => {
        const { value, checked } = e.target;
        let updatedSelectedBrands = [];
        if (checked) {
            updatedSelectedBrands = [...selectedBrands, value];
        } else {
            updatedSelectedBrands = selectedBrands.filter((brand) => brand !== value);
        }
        setSelectedBrands(updatedSelectedBrands);
        filterProducts(updatedSelectedBrands, selectedCategory, maxPrice, search);
    };
    console.log(pages);
    const handleCategoryClick = (e) => {
        const { value, checked } = e.target;
        let updatedCategory = [];

        if (checked) {
            updatedCategory = [...selectedCategory, value];
        } else {
            updatedCategory = selectedCategory.filter(category => category !== value);
        }

        setSelectedCategory(updatedCategory);
        filterProducts(selectedBrands, updatedCategory, maxPrice, search);
    };

    console.log(selectedCategory);
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
            const sortedProducts = [...filteredProducts].sort((a, b) => new Date(b.creationDateTime) - new Date(a.creationDateTime))
            setFilteredProducts(sortedProducts)
        }
    }
    const handlePriceChange = (e) => {
        const newPrice = Number(e.target.value);
        const finalPrice = newPrice + 25;
        setPrice(finalPrice);
    };

    const handleMouseUp = () => {
        // Call filterProducts only when the mouse is released
        filterProducts(selectedBrands, selectedCategory, price, search);
    };
    const handleSearch = (e) => {
        const search = e.target.value
        setSearch(search)
        filterProducts(selectedBrands, selectedCategory, price, search);
    }
    const filterProducts = (brands, categories, maxPrice, search) => {
        const filtered = products.filter(product =>
            (brands.length === 0 || brands.includes(product.brandName)) &&
            (maxPrice === 0 || product.price <= maxPrice) &&
            (categories.length === 0 || categories.includes(product.category)) &&
            product.productName.toLowerCase().includes(search.toLowerCase())
        );
        axios.get(`https://hatbazaar.vercel.app/filtered-products?brands=${brands}&maxPrice=${maxPrice}&categories=${categories}&search=${search}&page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                setFilteredProducts(res.data.result)
                setItemsCount(res.data.totalDocuments)
            })
    };

    console.log(search);
    const handlePage = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        axios.get('https://hatbazaar.vercel.app/count')
            .then(res => setItemsCount(res.data.result))
    }, [])

    useEffect(() => {
        axios.get(`https://hatbazaar.vercel.app/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                setProducts(res.data)
                setFilteredProducts(res.data)
                setMaxPrice(Math.max(...res.data.map(result => result.price)))
                setLoading(false)
            })
    }, [currentPage])

    console.log(itemsCount);
    useEffect(() => {
        axios.get('https://hatbazaar.vercel.app/product-categories-brands')
            .then(res => {
                setCategory(res.data.categories)
                setBrands(res.data.brands)
            })
        // setCategory([...new Set(products.map((product) => product.category))]);
        // setBrands([...new Set(products.map(product => product.brandName))])
    }, [products])


    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    console.log(currentPage);
    return (
        <div className='space-y-4'>
            <h1 className='mt-12 text-center font-bold text-3xl'>Products</h1>
            <div className='w-full flex flex-wrap gap-5 justify-center lg:justify-end items-center'>
                <label className="input bg-base-200 flex items-center gap-2 rounded-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                    <input onChange={e => handleSearch(e)} type="text" className="grow" placeholder="Search..." />
                </label>
                <details className="dropdown dropdown-end">
                    <summary className="btn m-1 rounded-none"><RxDropdownMenu /> Sort by</summary>
                    <ul className="menu dropdown-content bg-base-100 z-[1] w-52 p-2 rounded-none shadow font-semibold">
                        <li><button onClick={() => filterBy('price', 'htl')}><MdOutlineAttachMoney />High to Low</button></li>
                        <li><button onClick={() => filterBy('price', 'lth')}><TbCalendarCode />Low to High</button></li>
                    </ul>
                </details>
                <button className='btn rounded-none' onClick={() => filterBy('date')}><TbCalendarCode />Date Added</button>
            </div>
            <div className='flex flex-col lg:flex-row gap-5 pt-12'>
                <div className='w-full lg:w-96 lg:p-4 space-y-4'>
                    <h1 className='inline-flex gap-2 items-center font-semibold '><BiFilter />Filter by</h1>
                    <div className='bg-gray-50 p-4 space-y-2'>
                        <p className='inline-flex gap-2 items-center font-semibold'><MdOutlineAttachMoney />Price</p>
                        <div>
                            <input
                                onChange={handlePriceChange}
                                onMouseUp={handleMouseUp}
                                type="range"
                                min={0}
                                max={maxPrice}
                                value={price}
                                className="range range-xs"
                                step="25"
                            />
                            <div className="flex w-full justify-between px-2 text-xs">
                                <span>0</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>{maxPrice}</span>
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
                                            <input type="checkbox" className="checkbox checkbox-sm" value={category} onClick={(e) => handleCategoryClick(e)} />
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
                                            <input onChange={(e) => handleBrandClick(e)} type="checkbox" className="checkbox" value={brand} />
                                            <span className="label-text">{brand}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    loading ? <div className='flex w-full justify-center items-center'>
                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn'>
                            {([...Array(10)].map(item => <>
                                <div role="status" class="p-4 rounded shadow md:p-6 ">
                                    <div class="flex items-center justify-center h-96 mb-4 bg-gray-300 rounded">

                                    </div>
                                    <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                                    <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full"></div>
                                    <div class="flex items-center mt-4">
                                        <div>
                                            <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                                            <div class="w-48 h-2 bg-gray-200 rounded-full "></div>
                                        </div>
                                    </div>
                                    <span class="sr-only">Loading...</span>
                                </div>

                            </>))}
                        </div>
                    </div>
                        :
                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn'>
                            {
                                filteredProducts?.map(product => (
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
                                ))
                            }
                        </div>
                }

            </div>
            <div className='flex w-full items-center justify-end pt-12'>
                <div className="join">
                    <button onClick={handlePrevious} className="join-item btn rounded-none">«</button>
                    {
                        pages?.map(page => <button onClick={() => handlePage(page)} className={`join-item btn rounded-none ${page === currentPage && 'bg-black text-white'}`}>{page + 1}</button>)
                    }
                    <button onClick={handleNext} className="join-item btn rounded-none">»</button>
                </div>
            </div>
        </div>
    )
}
