'use client';

import { useState, useRef, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import {useRouter} from "next/navigation";

interface Property {
    price: number;
    title: string;
    location: string;
    rooms: number;
    meterage: number;
    longDescription: string;
    url?: string;
    images: string[];
}

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > 96);
        }
    }, [property.longDescription]);
const navigateToDetail = () => {
    router.push(`/detail-view`);
    // router.push(`/property/${apartment.title.replace(/\s+/g, '-').toLowerCase()}`);
};
    return (
        <div
            className="container d-flex justify-content-center cursor-pointer"
            onClick={navigateToDetail}
        >
            <div className="row w-60 mt-5">
                <div className="col-md-8 p-4 d-flex flex-column">
                    <h2 className="text-2xl font-bold">{property.price.toLocaleString()} PLN</h2>
                    <p className="text-gray-700 mt-2 font-semibold">{property.title}</p>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                    <p className="text-gray-500 mt-2">🛏 {property.rooms} pokoje · 📏 {property.meterage} m²</p>

                    <div
                        className={`relative text-gray-600 text-sm leading-relaxed overflow-hidden transition-all duration-500 ease-in-out`}
                        style={{maxHeight: isExpanded ? 'none' : '96px'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        <p ref={contentRef} className="whitespace-pre-line">
                            {property.longDescription}
                        </p>

                        {!isExpanded && isOverflowing && (
                            <div
                                className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent flex justify-center items-end pointer-events-none"></div>
                        )}
                    </div>

                    {property.url && (
                        <div className="mt-4">
                            <Link href={property.url}
                                  className="text-white bg-blue-600 px-4 py-2 rounded-lg inline-block">
                                Zobacz ofertę
                            </Link>
                        </div>
                    )}
                </div>

                <div
                    className="col-md-4 p-4 d-flex justify-content-center align-items-center"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="relative rounded-lg overflow-hidden w-100" style={{maxHeight: '300px'}}>
                        <Carousel showThumbs={false} infiniteLoop autoPlay>
                            {property.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`Apartment ${index + 1}`}
                                        className="rounded-lg w-100"
                                        style={{maxHeight: '300px', objectFit: 'cover'}}
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                            {property.images.length} zdjęć
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
