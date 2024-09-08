import React from "react"
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Container } from '../shared/container';
import { useState } from "react";

export function GeneratorInput() {

    const [ input, setInput ] = useState<string>("");

    return(
        <Container className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center"> {/* Center aligned like your design example */}
                <div className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                    border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                    <MagnifyingGlassIcon className="text-gray-600 w-6 h-6" />
                    <input 
                        type="text" 
                        value={input} 
                        placeholder="Search your saved recipes..." 
                        className="text-base w-full text-gray-500 py-3 outline-none bg-transparent" 
                        onChange={(e) => setInput(e.target.value)} 
                    />
                </div>
            </div>
        </Container>
    )
}