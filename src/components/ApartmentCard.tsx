'use client';

import { useState, useRef, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

interface Apartment {
    price: number;
    rent?: number;
    title: string;
    location: string;
    rooms: number;
    meterage: number;
    longDescription: string;
    url?: string;
    images: string[];
}

interface ApartmentCardProps {
    apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > 96); // 96px for ~4 lines
        }
    }, [apartment.longDescription]);

    return (
        <div className="container d-flex justify-content-center">
            <div className="row w-60 mt-5">
                <div className="col-md-8 p-4 d-flex flex-column">
                    <div>
                        <h2 className="text-2xl font-bold">{apartment.price} PLN</h2>
                        {apartment.rent && (
                            <p className="text-gray-500 text-sm">+ czynsz: {apartment.rent} PLN/miesiąc</p>
                        )}
                        <p className="text-gray-700 mt-2 font-semibold">{apartment.title}</p>
                        <p className="text-gray-500 text-sm">{apartment.location}</p>
                    </div>

                    <div className="text-gray-500 mt-2">
                        <p>🛏 {apartment.rooms} pokoje · 📏 {apartment.meterage} m²</p>
                    </div>

                    <div
                        className={`relative text-gray-600 text-sm leading-relaxed cursor-pointer overflow-hidden transition-all duration-500 ease-in-out`}
                        style={{ maxHeight: isExpanded ? 'none' : '96px' }}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <p ref={contentRef} className="whitespace-pre-line">
                            {apartment.longDescription}
                        </p>

                        {!isExpanded && isOverflowing && (
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent flex justify-center items-end pointer-events-none"></div>
                        )}
                    </div>


                    {apartment.url && (
                        <div className="mt-4">
                            <Link
                                href={apartment.url}
                                className="text-white bg-blue-600 px-4 py-2 rounded-lg inline-block text-center"
                            >
                                Zobacz ofertę
                            </Link>
                        </div>
                    )}
                </div>

                <div className="col-md-4 p-4 d-flex justify-content-center align-items-center">
                    <div className="relative rounded-lg overflow-hidden w-100" style={{ maxHeight: '300px' }}>
                        <Carousel showThumbs={false} infiniteLoop autoPlay>
                            {apartment.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`Apartment ${index + 1}`}
                                        className="rounded-lg w-100"
                                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                            {apartment.images.length} zdjęć
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
