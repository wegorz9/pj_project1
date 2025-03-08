'use client';

import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Apartment {
    images: string[];
    price: number;
    shortDescription: string;
    location: string;
    rooms: number;
    meterage: number;
    longDescription: string;
}

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
                <Carousel showThumbs={false} infiniteLoop autoPlay>
                    {apartment.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Apartment ${index + 1}`} className="rounded-lg" />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold">{apartment.price} PLN</h2>
                    <p className="text-gray-600 mt-2">{apartment.shortDescription}</p>
                    <p className="text-gray-500 mt-2">
                        📍 {apartment.location} | 🛏 {apartment.rooms} pokoje | 📏 {apartment.meterage} m²
                    </p>
                </div>

                <div className="mt-4">
                    <p className={isExpanded ? "" : "line-clamp-3 text-gray-500"}>{apartment.longDescription}</p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 mt-2"
                    >
                        {isExpanded ? 'Zwiń' : 'Czytaj więcej'}
                    </button>
                </div>
            </div>
        </div>
    );
}
