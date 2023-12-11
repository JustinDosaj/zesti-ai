import { Container } from "../shared/container"
import React, { useEffect } from "react";
import Image from "next/image";

export function RecipePageAmazonProduct({ad}: any){

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 mb-36"}>
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white border rounded-lg p-4 md:p-12 gap-4 items-center w-full">
                <div className="md:col-span-1 flex justify-center max-w-[150px] sm:max-w-[200px]">
                    <Image layout="responsive" objectFit="cover" src={ad?.image} height={9} width={16} alt={ad?.name} className=""/>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-lg font-bold text-black">{ad?.name}</h2>
                    <p className="text-sm text-gray-600">{ad?.desc}</p>
                    <p className="text-md font-bold text-green-600 mt-2">{ad?.price}</p>
                    <button 
                        onClick={() => window.open(ad?.href)}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Buy on Amazon
                    </button>
                </div>
            </div>
      </Container>
    )
}

