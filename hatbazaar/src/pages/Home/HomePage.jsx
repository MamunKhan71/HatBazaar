import React, { useEffect, useState } from 'react'
import 'animate.css';
import axios from 'axios';
import TopFilterMenu from '../../components/TopFilterMenu';
import SideFilterMenu from '../../components/SideFilterMenu';
import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';
import Pagination from '../../components/Pagination';
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
    // To handdle the category
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

    // To sort
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
    // To handle the price change
    const handlePriceChange = (e) => {
        const newPrice = Number(e.target.value);
        const finalPrice = newPrice + 25;
        setPrice(finalPrice);
    };

    // Mouse Event Tracking for price changing...
    const handleMouseUp = () => {
        filterProducts(selectedBrands, selectedCategory, price, search);
    };

    // To handle the search
    const handleSearch = (e) => {
        const search = e.target.value
        setSearch(search)
        filterProducts(selectedBrands, selectedCategory, price, search);
    }

    // Implemented the search functionality using all the searching criteria
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

    // To handle the page
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

    useEffect(() => {
        axios.get('https://hatbazaar.vercel.app/product-categories-brands')
            .then(res => {
                setCategory(res.data.categories)
                setBrands(res.data.brands)
            })
    }, [products])

    // To handle the pagination
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
    
    return (
        <div className='space-y-4'>
            <h1 className='mt-12 text-center font-bold text-3xl'>Products</h1>
            <TopFilterMenu handleSearch={handleSearch} filterBy={filterBy} />
            <div className='flex flex-col lg:flex-row gap-5 pt-12'>
                <SideFilterMenu brands={brands} maxPrice={maxPrice} price={price} category={category} handlePriceChange={handlePriceChange} handleMouseUp={handleMouseUp} handleCategoryClick={handleCategoryClick} handleBrandClick={handleBrandClick} />
                {
                    loading ? <div className='flex w-full justify-center items-center'>
                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn'>
                            {([...Array(10)].map(item => <>
                                <Skeleton />
                            </>))}
                        </div>
                    </div>
                        :
                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn'>
                            {
                                filteredProducts?.map(product => (
                                    <Card product={product} />
                                ))
                            }
                        </div>
                }

            </div>
            <Pagination pages={pages} handleNext={handleNext} handlePage={handlePage} handlePrevious={handlePrevious} currentPage={currentPage} />
        </div>
    )
}
