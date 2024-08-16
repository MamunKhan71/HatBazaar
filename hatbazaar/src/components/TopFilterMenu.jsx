import React from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { TbCalendarCode } from "react-icons/tb";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function TopFilterMenu({ handleSearch, filterBy }) {
    return (
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
    )
}
