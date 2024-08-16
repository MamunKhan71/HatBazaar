import React from 'react'

export default function Pagination({ handleNext, handlePage, handlePrevious, pages, currentPage }) {
    return (
        <div className='flex w-full items-center justify-end pt-12'>
            <div className="join">
                <button onClick={handlePrevious} className="join-item btn rounded-none">«</button>
                {
                    pages?.map(page => <button onClick={() => handlePage(page)} className={`join-item btn rounded-none ${page === currentPage && 'bg-black text-white'}`}>{page + 1}</button>)
                }
                <button onClick={handleNext} className="join-item btn rounded-none">»</button>
            </div>
        </div>
    )
}
