// src/pages/Quote.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { calculateQuote } from "../utils/pricing";

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
  const [finalPrice, setFinalPrice] = useState(null); // string like "140.00"
  const [missingFields, setMissingFields] = useState([]);
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | sending | sent | failed

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
    <div>
      <NavBar />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
        <h1>Instant Quote</h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <h2>Customer info</h2>
            <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
              <input
                type="text"
                placeholder="Name"
                value={answers.name}
                onChange={(e) => setField("name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                value={answers.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={answers.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>
          </div>

          <div>
            <h2>Vehicle</h2>
            <label>
              <input
                type="radio"
                name="vehicleType"
                value="sedan"
                checked={answers.vehicleType === "sedan"}
                onChange={(e) => setField("vehicleType", e.target.value)}
              />
              Sedan
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="vehicleType"
                value="suv"
                checked={answers.vehicleType === "suv"}
                onChange={(e) => setField("vehicleType", e.target.value)}
              />
              SUV
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="vehicleType"
                value="truck"
                checked={answers.vehicleType === "truck"}
                onChange={(e) => setField("vehicleType", e.target.value)}
              />
              Truck
            </label>
            <label style={{ marginLeft: 12 }}>
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

          <div>
            <h2>Detail Type</h2>
            <label>
              <input
                type="radio"
                name="detailType"
                value="interior"
                checked={answers.detailType === "interior"}
                onChange={(e) => setField("detailType", e.target.value)}
              />
              Interior
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="detailType"
                value="exterior"
                checked={answers.detailType === "exterior"}
                onChange={(e) => setField("detailType", e.target.value)}
              />
              Exterior
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="detailType"
                value="full"
                checked={answers.detailType === "full"}
                onChange={(e) => setField("detailType", e.target.value)}
              />
              Full
            </label>
          </div>

          <div>
            <h2>Seat Rows</h2>
            <label>
              <input
                type="radio"
                name="seatRows"
                value="2"
                checked={answers.seatRows === "2"}
                onChange={(e) => setField("seatRows", e.target.value)}
              />
              2 rows
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="seatRows"
                value="3"
                checked={answers.seatRows === "3"}
                onChange={(e) => setField("seatRows", e.target.value)}
              />
              3 rows
            </label>
          </div>

          <div>
            <h2>Service Location</h2>
            <label>
              <input
                type="radio"
                name="serviceLocation"
                value="mobile"
                checked={answers.serviceLocation === "mobile"}
                onChange={(e) => setField("serviceLocation", e.target.value)}
              />
              Mobile
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="serviceLocation"
                value="dropoff"
                checked={answers.serviceLocation === "dropoff"}
                onChange={(e) => setField("serviceLocation", e.target.value)}
              />
              Drop off
            </label>
          </div>

          {(answers.detailType === "interior" || answers.detailType === "full") && (
            <div>
              <h2>Interior Condition</h2>
              <label>
                <input
                  type="radio"
                  name="interiorCondition"
                  value="light"
                  checked={answers.interiorCondition === "light"}
                  onChange={(e) => setField("interiorCondition", e.target.value)}
                />
                Light
              </label>
              <label style={{ marginLeft: 12 }}>
                <input
                  type="radio"
                  name="interiorCondition"
                  value="moderate"
                  checked={answers.interiorCondition === "moderate"}
                  onChange={(e) => setField("interiorCondition", e.target.value)}
                />
                Moderate
              </label>
              <label style={{ marginLeft: 12 }}>
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
          )}

          {(answers.detailType === "exterior" || answers.detailType === "full") && (
            <div>
              <h2>Exterior Condition</h2>
              <label>
                <input
                  type="radio"
                  name="exteriorCondition"
                  value="light"
                  checked={answers.exteriorCondition === "light"}
                  onChange={(e) => setField("exteriorCondition", e.target.value)}
                />
                Light
              </label>
              <label style={{ marginLeft: 12 }}>
                <input
                  type="radio"
                  name="exteriorCondition"
                  value="moderate"
                  checked={answers.exteriorCondition === "moderate"}
                  onChange={(e) => setField("exteriorCondition", e.target.value)}
                />
                Moderate
              </label>
              <label style={{ marginLeft: 12 }}>
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
          )}

          <div>
            <h2>Add ons</h2>
            <label>
              Pet hair removal
              <select
                value={answers.petHairRemoval}
                onChange={(e) => setField("petHairRemoval", e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>

            <label style={{ marginLeft: 16 }}>
              Protection
              <select
                value={answers.protection}
                onChange={(e) => setField("protection", e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          <div>
            <h2>Biohazard</h2>
            <label>
              <input
                type="radio"
                name="biohazard"
                value="no"
                checked={answers.biohazard === "no"}
                onChange={(e) => setField("biohazard", e.target.value)}
              />
              No
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="biohazard"
                value="yes"
                checked={answers.biohazard === "yes"}
                onChange={(e) => setField("biohazard", e.target.value)}
              />
              Yes
            </label>

            {answers.biohazard === "yes" && (
              <div style={{ marginTop: 8, maxWidth: 520 }}>
                <textarea
                  placeholder="Brief note (optional)"
                  value={answers.biohazardNote}
                  onChange={(e) => setField("biohazardNote", e.target.value)}
                  rows={3}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>

          <div>
            <h2>Timing and Notes</h2>
            <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
              <textarea
                placeholder="When would you like the service?"
                value={answers.timing}
                onChange={(e) => setField("timing", e.target.value)}
                rows={3}
                style={{ width: "100%" }}
              />
              <textarea
                placeholder="Any notes?"
                value={answers.notes}
                onChange={(e) => setField("notes", e.target.value)}
                rows={3}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <button type="submit" disabled={emailStatus === "sending"}>
            {emailStatus === "sending" ? "Sending..." : "Get Quote"}
          </button>
        </form>

        <div style={{ marginTop: 20 }}>
          {submitted && missingFields.length > 0 && (
            <div style={{ padding: 12, border: "1px solid #f0c", borderRadius: 8 }}>
              Missing: {missingFields.join(", ")}
            </div>
          )}

          {submitted && finalPrice && (
            <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
              <h2>Your Quote</h2>
              <div style={{ fontSize: 36 }}>${finalPrice}</div>
              <p>This is an estimated quote. Final pricing may vary.</p>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}