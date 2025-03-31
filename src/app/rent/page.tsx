/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import Navbar from "~/components/Navbar";
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApartmentCard from "~/components/ApartmentCard";
import {pool} from "~/app/api/data/data"

// "data:image/jpeg;charset=utf-8;base64,"
type Apartment ={
    id: number;
    images: string[];
    price: number;
    rent: number;
    title: string;
    location: string;
    rooms: number;
    meterage: number;
    description: string;
}

const sampleApartment = {
    images: [
        "https://tinyurl.com/4457spk8",
        "https://tinyurl.com/2uz9mva6",
        "https://tinyurl.com/3pppe3d2",
    ],
    price: 9000,
    rent: 1500,
    title: "Dom wolnostojący al. Lipowa, Wrocław",
    location: "al. Lipowa, Borek, Krzyki, Wrocław, dolnośląskie",
    rooms: 5,
    meterage: 200,
    description: `
        Zapraszamy do zapoznania się z ofertą wyjątkowego domu wolnostojącego położonego przy al. Lipowej w dzielnicy Borek, Krzyki, Wrocław. 
        Ten przestronny dom o powierzchni 200 m² składa się z 5 pokoi, oferując idealne warunki zarówno dla dużej rodziny, jak i osób ceniących przestrzeń i komfort. 

        Dom jest w pełni umeblowany i gotowy do zamieszkania — wnętrza zostały urządzone z dbałością o każdy szczegół, łącząc elegancję z funkcjonalnością. 
        Atutem nieruchomości jest duży ogród, zapewniający prywatność i przestrzeń do relaksu, a także taras — doskonałe miejsce na poranną kawę czy letnie spotkania z przyjaciółmi. 

        Lokalizacja nieruchomości to kolejna zaleta — spokojna i zielona okolica, a jednocześnie doskonałe połączenie komunikacyjne z centrum Wrocławia. 
        W pobliżu znajdują się sklepy, szkoły, restauracje oraz tereny rekreacyjne, które ułatwią codzienne życie.

        Cena: 9000 PLN  
        Czynsz: 1500 PLN  
        Zapraszamy do kontaktu oraz na prezentację tej wyjątkowej nieruchomości.  
    `,
};


export default function SearchPage() {
    const apartments: Apartment[] = []

    async function refresh() {
        try {
            const result = await pool.query("select id,price,rent,title,location,rooms,meterage,description from rentals");

            for (const row of result.rows) {
                const result = await pool.query("select image from rental_images where rental_id = $1", 1);
                apartments.push(
                    {
                        id: row.id,
                        description: row.description,
                        location: row.location,
                        meterage: row.meterage,
                        price: row.price,
                        rent: row.rent,
                        rooms: row.rooms,
                        title: row.title,
                        images: [...result.rows]

                    }
                );
            }
        } catch (e) {

        }
    }

    const [category, setCategory] = useState('Domy');
    const [location, setLocation] = useState('Wrocław');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [sizeMin, setSizeMin] = useState('');
    const [sizeMax, setSizeMax] = useState('');
    const [rooms, setRooms] = useState<(string | number)[]>([]);

    const cities = [
        'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice'
    ];

    return (
        <div>
            <Navbar currentPage={1} isLoggedIn={false} user={{name: 'Guest', email: ''}}/>

            <header className="bg-gray-100 p-4 shadow-md">
                <div className="container mx-auto flex flex-wrap gap-2 items-center">
                    <select className="p-2 border rounded" value={category}
                            onChange={(e) => setCategory(e.target.value)}>
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
                        <span className="font-medium">liczba pokoji:</span>
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
            {apartments.map((e)=><ApartmentCard key={e.id} apartment={e}/>)}

        </div>
    );
}
