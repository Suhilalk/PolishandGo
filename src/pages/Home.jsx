import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />  

      <div className="container">
        <section className="hero">
          <div className="heroGrid">
            <div>
              <div className="badge">Mobile detailing in Milton</div>
              <h1 className="h1">Polish and Go Car Detailing</h1>
              <p className="p">
                Quick quotes, clean results, and professional service. Get your estimate in under a minute.
              </p>

              <div className="actions">
                <Link to="/quote">
                  <button className="btn btnPrimary">Get Quote</button>
                </Link>
                <a href="mailto:polishngomilton@gmail.com">
                  <button className="btn btnGhost">Contact</button>
                </a>
              </div>
            </div>

            <div className="heroCard">
              <img className="heroImage" src="/gallery/Polish Logo.jpeg" alt="Logo" />
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="title">Services</h2>

          <div className="cards">
            <div className="card">
              <h3>Interior Detail</h3>
              <p>Seats, carpets, panels, and deep clean based on condition.</p>
              <Link to="/quote?service=interior">
                <button className="btn btnPrimary">Quote Interior</button>
              </Link>
            </div>

            <div className="card">
              <h3>Exterior Wash</h3>
              <p>Wash, wheels, and exterior clean based on condition.</p>
              <Link to="/quote?service=exterior">
                <button className="btn btnPrimary">Quote Exterior</button>
              </Link>
            </div>

            <div className="card">
              <h3>Full Detail</h3>
              <p>Interior plus exterior with add ons as needed.</p>
              <Link to="/quote?service=full">
                <button className="btn btnPrimary">Quote Full</button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="title">Recent work</h2>

          <div className="galleryGrid">
            <img className="photo" src="/gallery/car1_before.jpeg" alt="Before 1" />
            <img className="photo" src="/gallery/car1_after.jpeg" alt="After 1" />
            <img className="photo" src="/gallery/car2_before.jpeg" alt="Before 2" />
            <img className="photo" src="/gallery/car2_after.jpeg" alt="After 2" />
            <img className="photo" src="/gallery/car3_before.jpeg" alt="Before 3" />
            <img className="photo" src="/gallery/car3_after.jpeg" alt="After 3" />
            <img className="photo" src="/gallery/car4_before.jpeg" alt="Before 4" />
            <img className="photo" src="/gallery/car4_after.jpeg" alt="After 4" />
          </div>

          <div className="actions" style={{ marginTop: 18 }}>
            <Link to="/quote">
              <button className="btn btnPrimary">Get Quote</button>
            </Link>
            <a href="tel:5198355580">
              <button className="btn btnGhost">Call 519 835 5580</button>
            </a>
          </div>
        </section>

        <div className="footerBar">
          <div className="container">
            Polish and Go Car Detailing. Milton, Ontario. Email polishngomilton@gmail.com
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}