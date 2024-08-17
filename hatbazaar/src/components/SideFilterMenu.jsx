import React from 'react'
import { BiFilter } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbBrandAbstract } from "react-icons/tb";


export default function SideFilterMenu({ brands, maxPrice, price, category, handlePriceChange, handleMouseUp, handleCategoryClick,handleBrandClick }) {
    return (
        <div className='w-full lg:w-96 lg:p-4 space-y-4'>
            <h1 className='inline-flex gap-2 items-center font-semibold '><BiFilter />Filter by</h1>
            <div className='bg-gray-50 p-4 space-y-2'>
                <p className='inline-flex gap-2 items-center font-semibold'><MdOutlineAttachMoney />Price</p>
                <div>
                    <input
                        onChange={handlePriceChange}
                        onMouseUp={handleMouseUp}
                        onTouchEnd={handleMouseUp}
                        type="range" 
                        min={0}
                        max={maxPrice}
                        value={price}
                        className="range range-xs"
                        step="5"
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
    )
}
