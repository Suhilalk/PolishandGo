import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />

      <section>
        <h1>Polish & Go Car Detailing</h1>
        <p>Premium mobile detailing in Milton.</p>
        <Link to="/quote">
          <button>Get a Quote</button>
        </Link>
      </section>

      <section>
        <h2>Our Services</h2>
      <div>
        <h3>Interior Detailing</h3>
        <p>
          Deep cleaning of carpets, seats, and all interior surfaces. We remove stains, odors, and restore your car’s interior to like-new condition.
        </p>
        <img src="/gallery/car1_after.jpeg" alt="Interior Detailing" style={{ width: "100%", maxWidth: 400 }} />
        <Link to="/quote">
          <button>Get Interior Quote</button>
        </Link>
      </div>
      
      <div>
        <h3>Exterior Detailing</h3>
        <p>
          Hand wash, clay bar treatment, waxing, and ceramic coatings. We bring back the shine and protect your car’s exterior.
        </p>
         <img src="/gallery/exterior.jpg" alt="exterior Detailing" style={{ width: "100%", maxWidth: 400 }} />
        <Link to="/quote">
          <button>Get Exterior Quote</button>
        </Link>
      </div>

      <div>
        <h3>full detail</h3>
        <p>
          combining interior and exterior detailing for a complete transformation. Your car will look and feel brand new.
        </p>
        <Link to="/quote">
          <button>Get Full Detail Quote</button>
        </Link>
      </div>
      </section>

      <section>
        <h2>Why Choose Us</h2>
        <p>
          Professional, reliable, and results that actually shine. We treat your car like it’s our own.
        </p>
      </section>

      <section>
        <h2>Ready to Book?</h2>
        <Link to="/quote">
          <button>Start Your Quote</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}