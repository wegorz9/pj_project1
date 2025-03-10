"use client"
import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "~/components/Navbar";

const sampleProperty = {
    price: 6000,
    title: 'Dom 6 pokoi Wrocław Ołtaszyn, Ułańska bezpośrednio',
    location: 'Ołtaszyn, Krzyki, Wrocław, dolnośląskie',
    size: '120m²',
    rooms: 6,
    type: 'wolnostojący',
    status: 'do zamieszkania',
    heating: 'gazowe',
    landlord: 'prywatny',
    images: [
        'https://tinyurl.com/4457spk8',
        'https://tinyurl.com/2uz9mva6',
        'https://tinyurl.com/3pppe3d2',
    ],
};

const PropertyListingPage = () => {
    return (
        <>
            <Navbar currentPage={2} isLoggedIn={false} user={{name: 'Guest', email: ''}} />
            <div className="container py-5 bg-light">

                {/* Carousel */}
                <div className="d-flex justify-content-center mb-4">
                    <div className="w-75 rounded overflow-hidden">
                        <Carousel showThumbs={false} infiniteLoop autoPlay>
                            {sampleProperty.images.map((img, idx) => (
                                <div key={idx} style={{ height: '400px' }} className="d-flex justify-content-center align-items-center">
                                    <Image
                                        src={img}
                                        alt={`Zdjęcie nieruchomości ${idx + 1}`}
                                        width={800}
                                        height={600}
                                        unoptimized
                                        className="img-fluid rounded"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <h1 className="display-5 fw-bold mb-3">{sampleProperty.title}</h1>
                <p className="h4 text-primary fw-semibold mb-4">
                    {sampleProperty.price} zł / miesiąc
                </p>
                <p className="text-muted mb-4">{sampleProperty.location}</p>

                <div className="bg-white p-4 rounded mb-4">
                    <h2 className="h4 fw-bold mb-3">Dom na wynajem</h2>
                    <div className="row">
                        <div className="col-6"><strong>Powierzchnia:</strong> {sampleProperty.size}</div>
                        <div className="col-6"><strong>Pokoje:</strong> {sampleProperty.rooms} pokoi</div>
                        <div className="col-6"><strong>Rodzaj zabudowy:</strong> {sampleProperty.type}</div>
                        <div className="col-6"><strong>Stan:</strong> {sampleProperty.status}</div>
                        <div className="col-6"><strong>Ogrzewanie:</strong> {sampleProperty.heating}</div>
                        <div className="col-6"><strong>Ogłoszeniodawca:</strong> {sampleProperty.landlord}</div>
                    </div>
                </div>

                <div className="bg-white p-4 shadow rounded">
                    <h2 className="h4 fw-bold mb-4">Skontaktuj się</h2>
                    <form className="d-flex flex-column gap-2">
                        <input type="text" placeholder="Imię" className="form-control" required />
                        <input type="email" placeholder="Email" className="form-control" required />
                        <input type="tel" placeholder="Telefon" className="form-control" required />
                        <textarea placeholder="Wiadomość" className="form-control" rows={4} required></textarea>
                        <button type="submit" className="btn btn-primary">Wyślij wiadomość</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PropertyListingPage;
