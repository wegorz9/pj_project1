import Link from "next/link";
import Navbar from "../components/Navbar";
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApartmentCard from "~/components/ApartmentCard";
// coś ne tak z tym
// import 'bootstrap/dist/js/bootstrapped.js';

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
};

const sampleApartment = {
    images: [
        "https://tinyurl.com/4457spk8", // Replace with real image URLs
        "https://tinyurl.com/2uz9mva6",
        "https://tinyurl.com/3pppe3d2",
    ],
    price: 9000,
    rent: 1500,
    title: "Dom wolnostojący al. Lipowa, Wrocław",
    location: "al. Lipowa, Borek, Krzyki, Wrocław, dolnośląskie",
    rooms: 5,
    meterage: 200,
    longDescription:
        "Piękny dom wolnostojący w spokojnej okolicy. W pełni umeblowany, gotowy do zamieszkania. Duży ogród i taras.",
    url: "https://example.com/oferta", // Replace with a real offer link
};

export default function Home() {
  return (
      <>
        <Navbar currentPage={1} isLoggedIn={false} user={mockUser} />

          <ApartmentCard apartment={sampleApartment} />;
          <ApartmentCard apartment={sampleApartment} />;
      </>
  );
}
