import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';


// src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`}

export function StagingList({stagingData, publicData}: any) {

    const [ view, setView ] = useState<string>('staging')

    console.log("Staging Recipes Public: ", publicData)

    if (!stagingData) {
        return (
        <div className="text-center p-10">
            <p className="text-lg text-gray-600">No recipes ready to be added</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add New Recipe
            </button>
          </div>
        );
      }

    return (
        <div className="p-6 bg-white rounded-3xl border shadow mt-2 lg:w-[750px]">
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Recipe
          </button>
        </div>
        <div className="mt-4">
          <input type="text" placeholder="Search..." className="p-2 w-full border rounded" />
        </div>
        <div className="flex justify-start gap-4 mt-4">
          <button onClick={() => setView('staging')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded">
            Staging
          </button>
          <button onClick={() => setView('public')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded">
            Public
          </button>
        </div>
        <div className="mt-6">
            {view == 'staging' ? 
            stagingData.map((item: any) => (
            <div key={item.id} className="group relative border border-gray-200 p-4 rounded-2xl hover:bg-gray-100">
                <div className="flex items-center">
                <div className="flex-none h-[120px] w-[90px] relative mr-4">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} alt={item.name}  className="rounded-lg" />
                </div>
                <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.id}</p>
                </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-lg hover:animate-fadeInExtraFast">
                <Link href={'/'}>
                    <PencilIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1 mr-2" />
                </Link>
                <Link href={"/"}>
                    <TrashIcon className="text-white h-10 w-10 hover:bg-red-500 bg-red-600 rounded-xl p-1" />
                </Link>
                </div>
            </div>
            ))
            : view == 'public' ? 
                publicData.map((item: any) => (
                    <div key={item.id} className="group relative border border-gray-200 p-4 rounded-2xl hover:bg-gray-100">
                        <div className="flex items-center">
                        <div className="flex-none h-[120px] w-[90px] relative mr-4">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} alt={item.name}  className="rounded-lg" />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="text-gray-600">{item.id}</p>
                        </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-lg hover:animate-fadeInExtraFast">
                        <Link href={'/'}>
                            <PencilIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1 mr-2" />
                        </Link>
                        <Link href={"/"}>
                            <TrashIcon className="text-white h-10 w-10 hover:bg-red-500 bg-red-600 rounded-xl p-1" />
                        </Link>
                        </div>
                    </div>
                ))
            :
            <></>
            }
      </div>
      </div>
    );
}