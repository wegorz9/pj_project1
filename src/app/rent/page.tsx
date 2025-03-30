'use client';

import Navbar from "~/components/Navbar";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApartmentCard from "~/components/ApartmentCard";
import { api } from "~/utils/api"; // Ensure api.ts is correctly configured

export default function SearchPage() {
    const [category, setCategory] = useState('Domy');
    const [location, setLocation] = useState('Wrocław');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [sizeMin, setSizeMin] = useState('');
    const [sizeMax, setSizeMax] = useState('');
    const [rooms, setRooms] = useState<(string | number)[]>([]);

    const { data: apartments, isLoading } = api.rentals.getAll.useQuery();

    const cities = [
        'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice'
    ];

    return (
        <div>
            <Navbar currentPage={1} isLoggedIn={false} user={{ name: 'Guest', email: '' }} />

            <header className="bg-gray-100 p-4 shadow-md">
                <div className="container mx-auto flex flex-wrap gap-2 items-center">
                    <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>Domy</option>
                        <option>Mieszkania</option>
                        <option>Działki</option>
                    </select>

                    <select
                        className="p-2 border rounded w-48"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        className="p-2 border rounded w-20"
                        placeholder="Cena od"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded w-20"
                        placeholder="Cena do"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                    />

                    <input
                        type="number"
                        className="p-2 border rounded w-20"
                        placeholder="m² od"
                        value={sizeMin}
                        onChange={(e) => setSizeMin(e.target.value)}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded w-20"
                        placeholder="m² do"
                        value={sizeMax}
                        onChange={(e) => setSizeMax(e.target.value)}
                    />

                    <div className="flex flex-col gap-2">
                        <span className="font-medium">Liczba pokoi:</span>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5, '6+'].map((num) => (
                                <button
                                    key={num}
                                    className={`p-2 border rounded ${rooms.includes(num) ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                    onClick={() =>
                                        setRooms((prev) =>
                                            prev.includes(num) ? prev.filter((r) => r !== num) : [...prev, num]
                                        )
                                    }
                                >
                                    {num}
                                </button>
                            ))}
                            <button className="p-2 border rounded bg-black text-white">Wyszukaj</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto mt-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    apartments?.map((apartment) => (
                        <ApartmentCard
                            key={apartment.id}
                            apartment={{
                                images: apartment.images.map(img => img.image),
                                price: apartment.price,
                                rent: apartment.rent,
                                title: apartment.title,
                                location: apartment.location,
                                rooms: apartment.rooms,
                                meterage: apartment.meterage,
                                longDescription: apartment.description,
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
