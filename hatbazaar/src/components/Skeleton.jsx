import React from 'react'

export default function Skeleton() {
    return (
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
    )
}
