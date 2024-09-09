import React from "react"
import { TbSearch } from "react-icons/tb";
import { Container } from '../shared/container';

interface MyRecipeSearchProps {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export function MyRecipeSearch({searchQuery, setSearchQuery}: MyRecipeSearchProps) {
    return(
        <Container className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center"> {/* Center aligned like your design example */}
                <div className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                    border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                    <TbSearch className="text-gray-600 w-6 h-6" />
                    <input 
                        type="text" 
                        value={searchQuery} 
                        placeholder="Search your saved recipes..." 
                        className="text-base w-full text-gray-500 py-3 outline-none bg-transparent" 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </div>
            </div>
        </Container>
    )
}