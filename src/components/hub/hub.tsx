import React, { useState } from 'react';
import ChatComponent from './chat';
import VideoComponent from './video';
import UrlComponent from './url';
import { Container } from '../shared/container';
// Import your feature components here
export default function Hub() {
    // State to track the selected feature
    const [selectedFeature, setSelectedFeature] = useState('chat');

    // Handler to change the selected feature
    const selectFeature = (feature: any) => {
        setSelectedFeature(feature);
    };

    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <div className="rounded border p-4 mx-auto mt-4 w-full max-w-7xl">
                <nav className="flex justify-center space-x-2 sm:space-x-6 lg:space-x-16 mb-4 border-b-2">
                    <div className={`py-2 ${selectedFeature === 'chat' ? 'border-b-2 border-primary-main' : ' hover:text-gray-500 hover:border-b-2 hover:border-primary-alt'}`} onClick={() => selectFeature('chat')}>
                        <button className="w-24 md:w-48 text-center text-gray-600">Recipe Ideas</button>
                    </div>
                    <div className={`py-2 ${selectedFeature === 'video' ? 'border-b-2 border-primary-main' : ' hover:text-gray-500 hover:border-b-2 hover:border-primary-alt'}`} onClick={() => selectFeature('video')}>
                        <button className="w-24 md:w-48 text-center text-gray-600">Video to Recipe</button>
                    </div>
                    {/*<div className={`py-2 ${selectedFeature === 'url' ? 'border-b-2 border-primary-main' : ' hover:text-gray-500 hover:border-b-2 hover:border-primary-alt'}`} onClick={() => selectFeature('url')}>
                        <button className="w-24 md:w-48 text-center text-gray-600">Get Website Recipe</button>
                    </div>*/}
                </nav>
                <div className="min-h-[275px]">
                    {/* Conditional rendering based on selectedFeature */}
                    {selectedFeature === 'chat' && <ChatComponent />}
                    {selectedFeature === 'video' && <VideoComponent />}
                    {/*selectedFeature === 'url' && <UrlComponent />*/}
                </div>
            </div>
        </Container>
    );
};
