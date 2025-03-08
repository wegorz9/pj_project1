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

export default function Home() {
  return (
      <>
        <Navbar currentPage={1} isLoggedIn={false} user={mockUser} />

        <ApartmentCard
            apartment={{
              images: ['https://tinyurl.com/4sjeubv4', 'https://tinyurl.com/yszmf8jt'],
              price: 500000,
              shortDescription: 'Nowoczesne mieszkanie w centrum',
              location: 'Warszawa, Śródmieście',
              rooms: 3,
              meterage: 75,
              longDescription: 'Przestronne mieszkanie w nowym apartamentowcu z pięknym widokiem na miasto...'
            }}
        />
      </>
  );
}
