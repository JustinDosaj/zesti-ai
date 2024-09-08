import React from "react"
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Container } from '../shared/container';
import { useState } from "react";
import { PlusIcon } from '@heroicons/react/20/solid';

interface MyRecipeSearchProps {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export function GeneratorInput() {

    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        setInputValue(""); // Reset after submit
      }
    };

    return(
        <Container className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="py-1 pl-6 pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary w-full max-w-md"
                >
                    <MagnifyingGlassIcon className="text-gray-600 w-7 h-7" />
                    <input
                        type="text"
                        value={inputValue}
                        placeholder={'placeholder'}
                        className="text-base w-full text-gray-500 py-2 outline-none bg-transparent"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="min-w-max text-white bg-primary px-4 py-2 rounded-full flex items-center justify-center"
                    >
                    <PlusIcon className="h-5 w-5 text-white" />
                    </button>
                </form>
            </div>
        </Container>
    )
}