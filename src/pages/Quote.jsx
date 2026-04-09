import { useState } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { calculateQuote } from "../utils/pricing";
import "./quote.css";

export default function Quote() {
  const [answers, setAnswers] = useState({
    name: "",
    phone: "",
    email: "",

    vehicleType: "",
    detailType: "",
    seatRows: "",
    serviceLocation: "",

    interiorCondition: "",
    exteriorCondition: "",

    petHairRemoval: "no",
    protection: "no",

    biohazard: "no",
    biohazardNote: "",

    timing: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [finalPrice, setFinalPrice] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [emailStatus, setEmailStatus] = useState("idle");

  function setField(name, value) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setEmailStatus("idle");
    setMissingFields([]);
    setFinalPrice(null);

    const q = calculateQuote(answers);

    if (!q || !q.ok) {
      setMissingFields(q?.missing ?? ["Unknown error"]);
      return;
    }

    const priceString = Number(q.price).toFixed(2);
    setFinalPrice(priceString);

    setEmailStatus("sending");

    const templateParams = {
      to_email: import.meta.env.VITE_QUOTE_TO_EMAIL || "polishngomilton@gmail.com",

      customer_name: answers.name,
      customer_phone: answers.phone,
      customer_email: answers.email,

      vehicle_type: answers.vehicleType,
      detail_type: answers.detailType,
      seat_rows: answers.seatRows,
      service_location: answers.serviceLocation,

      interior_condition: answers.interiorCondition || "n/a",
      exterior_condition: answers.exteriorCondition || "n/a",
      pet_hair: answers.petHairRemoval,
      protection: answers.protection,

      biohazard: answers.biohazard,
      biohazard_note: answers.biohazardNote || "",

      timing: answers.timing || "",
      notes: answers.notes || "",

      price: priceString,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setEmailStatus("sent");
    } catch (error) {
      console.log(error);
      setEmailStatus("failed");
    }
  }

  return (
    <div className="quote-page">
      <NavBar />

      <div className="quote-container">
        <div className="quote-hero">
          <p className="quote-eyebrow">Polish & Go Car Detailing</p>
          <h1>Instant Quote</h1>
          <p className="quote-subtext">
            Get a fast estimate for your detail. Fill this out and we’ll send your quote through right away.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="quote-form">
          <div className="quote-card">
            <h2>Customer Info</h2>
            <div className="quote-grid quote-grid-3">
              <input
                type="text"
                placeholder="Full Name"
                value={answers.name}
                onChange={(e) => setField("name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={answers.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={answers.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>
          </div>

          <div className="quote-card">
            <h2>Vehicle</h2>
            <div className="radio-group">
              <label className={`radio-pill ${answers.vehicleType === "sedan" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="vehicleType"
                  value="sedan"
                  checked={answers.vehicleType === "sedan"}
                  onChange={(e) => setField("vehicleType", e.target.value)}
                />
                Sedan
              </label>

              <label className={`radio-pill ${answers.vehicleType === "suv" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="vehicleType"
                  value="suv"
                  checked={answers.vehicleType === "suv"}
                  onChange={(e) => setField("vehicleType", e.target.value)}
                />
                SUV
              </label>

              <label className={`radio-pill ${answers.vehicleType === "truck" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="vehicleType"
                  value="truck"
                  checked={answers.vehicleType === "truck"}
                  onChange={(e) => setField("vehicleType", e.target.value)}
                />
                Truck
              </label>

              <label className={`radio-pill ${answers.vehicleType === "van" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="vehicleType"
                  value="van"
                  checked={answers.vehicleType === "van"}
                  onChange={(e) => setField("vehicleType", e.target.value)}
                />
                Van
              </label>
            </div>
          </div>

          <div className="quote-card">
            <h2>Detail Type</h2>
            <div className="radio-group">
              <label className={`radio-pill ${answers.detailType === "interior" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="detailType"
                  value="interior"
                  checked={answers.detailType === "interior"}
                  onChange={(e) => setField("detailType", e.target.value)}
                />
                Interior
              </label>

              <label className={`radio-pill ${answers.detailType === "exterior" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="detailType"
                  value="exterior"
                  checked={answers.detailType === "exterior"}
                  onChange={(e) => setField("detailType", e.target.value)}
                />
                Exterior
              </label>

              <label className={`radio-pill ${answers.detailType === "full" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="detailType"
                  value="full"
                  checked={answers.detailType === "full"}
                  onChange={(e) => setField("detailType", e.target.value)}
                />
                Full Detail
              </label>
            </div>
          </div>

          <div className="quote-card">
            <h2>Seat Rows</h2>
            <div className="radio-group">
              <label className={`radio-pill ${answers.seatRows === "2" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="seatRows"
                  value="2"
                  checked={answers.seatRows === "2"}
                  onChange={(e) => setField("seatRows", e.target.value)}
                />
                2 Rows
              </label>

              <label className={`radio-pill ${answers.seatRows === "3" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="seatRows"
                  value="3"
                  checked={answers.seatRows === "3"}
                  onChange={(e) => setField("seatRows", e.target.value)}
                />
                3 Rows
              </label>
            </div>
          </div>

          <div className="quote-card">
            <h2>Service Location</h2>
            <div className="radio-group">
              <label className={`radio-pill ${answers.serviceLocation === "mobile" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="serviceLocation"
                  value="mobile"
                  checked={answers.serviceLocation === "mobile"}
                  onChange={(e) => setField("serviceLocation", e.target.value)}
                />
                Mobile
              </label>

              <label className={`radio-pill ${answers.serviceLocation === "dropoff" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="serviceLocation"
                  value="dropoff"
                  checked={answers.serviceLocation === "dropoff"}
                  onChange={(e) => setField("serviceLocation", e.target.value)}
                />
                Drop Off
              </label>
            </div>
          </div>

          {(answers.detailType === "interior" || answers.detailType === "full") && (
            <div className="quote-card">
              <h2>Interior Condition</h2>
              <div className="radio-group">
                <label className={`radio-pill ${answers.interiorCondition === "light" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="interiorCondition"
                    value="light"
                    checked={answers.interiorCondition === "light"}
                    onChange={(e) => setField("interiorCondition", e.target.value)}
                  />
                  Light
                </label>

                <label className={`radio-pill ${answers.interiorCondition === "moderate" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="interiorCondition"
                    value="moderate"
                    checked={answers.interiorCondition === "moderate"}
                    onChange={(e) => setField("interiorCondition", e.target.value)}
                  />
                  Moderate
                </label>

                <label className={`radio-pill ${answers.interiorCondition === "heavy" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="interiorCondition"
                    value="heavy"
                    checked={answers.interiorCondition === "heavy"}
                    onChange={(e) => setField("interiorCondition", e.target.value)}
                  />
                  Heavy
                </label>
              </div>
            </div>
          )}

          {(answers.detailType === "exterior" || answers.detailType === "full") && (
            <div className="quote-card">
              <h2>Exterior Condition</h2>
              <div className="radio-group">
                <label className={`radio-pill ${answers.exteriorCondition === "light" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="exteriorCondition"
                    value="light"
                    checked={answers.exteriorCondition === "light"}
                    onChange={(e) => setField("exteriorCondition", e.target.value)}
                  />
                  Light
                </label>

                <label className={`radio-pill ${answers.exteriorCondition === "moderate" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="exteriorCondition"
                    value="moderate"
                    checked={answers.exteriorCondition === "moderate"}
                    onChange={(e) => setField("exteriorCondition", e.target.value)}
                  />
                  Moderate
                </label>

                <label className={`radio-pill ${answers.exteriorCondition === "heavy" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="exteriorCondition"
                    value="heavy"
                    checked={answers.exteriorCondition === "heavy"}
                    onChange={(e) => setField("exteriorCondition", e.target.value)}
                  />
                  Heavy
                </label>
              </div>
            </div>
          )}

          <div className="quote-card">
            <h2>Add Ons</h2>
            <div className="quote-grid quote-grid-2">
              <div className="field-group">
                <label>Pet Hair Removal</label>
                <select
                  value={answers.petHairRemoval}
                  onChange={(e) => setField("petHairRemoval", e.target.value)}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="field-group">
                <label>Protection</label>
                <select
                  value={answers.protection}
                  onChange={(e) => setField("protection", e.target.value)}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="quote-card">
            <h2>Biohazard</h2>
            <div className="radio-group">
              <label className={`radio-pill ${answers.biohazard === "no" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="biohazard"
                  value="no"
                  checked={answers.biohazard === "no"}
                  onChange={(e) => setField("biohazard", e.target.value)}
                />
                No
              </label>

              <label className={`radio-pill ${answers.biohazard === "yes" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="biohazard"
                  value="yes"
                  checked={answers.biohazard === "yes"}
                  onChange={(e) => setField("biohazard", e.target.value)}
                />
                Yes
              </label>
            </div>

            {answers.biohazard === "yes" && (
              <div className="field-group bio-note">
                <label>Brief Note</label>
                <textarea
                  placeholder="Tell us what needs special attention"
                  value={answers.biohazardNote}
                  onChange={(e) => setField("biohazardNote", e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>

          <div className="quote-card">
            <h2>Timing and Notes</h2>
            <div className="quote-grid quote-grid-1">
              <div className="field-group">
                <label>Preferred Timing</label>
                <textarea
                  placeholder="When would you like the service?"
                  value={answers.timing}
                  onChange={(e) => setField("timing", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="field-group">
                <label>Additional Notes</label>
                <textarea
                  placeholder="Anything else we should know?"
                  value={answers.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <button className="quote-submit-btn" type="submit" disabled={emailStatus === "sending"}>
            {emailStatus === "sending" ? "Sending..." : "Get My Quote"}
          </button>
        </form>

        <div className="quote-results">
          {submitted && missingFields.length > 0 && (
            <div className="quote-message quote-error">
              <h3>Missing Information</h3>
              <p>{missingFields.join(", ")}</p>
            </div>
          )}

          {submitted && finalPrice && (
            <div className="quote-message quote-success">
              <h2>Your Quote</h2>
              <div className="quote-price">${finalPrice}</div>
              <p>This is an estimated quote. Final pricing may vary depending on the vehicle condition.</p>
              {emailStatus === "sent" && <p className="status-text success-text">Your quote was sent successfully.</p>}
              {emailStatus === "failed" && <p className="status-text error-text">Quote calculated, but email failed to send.</p>}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}