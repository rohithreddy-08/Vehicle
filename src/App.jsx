import React from "react";
import { CarFront, Phone, MessageCircle, ShieldCheck, AlertCircle } from "lucide-react";

// Phase 1: static data.
// Later this object can be replaced with a backend API call.
const VEHICLES = {
  ROHIT123: {
    ownerName: "Rohit Reddy",
    vehicleNumber: "TG09AB1234",
    phone: "919999999999", // Replace with the real WhatsApp/call number.
    whatsappMessage:
      "Hi Rohit, I am contacting you regarding your car parking. There seems to be an issue with your vehicle."
  },

  MOUNIKA123: {
    ownerName: "Mounika Reddy",
    vehicleNumber: "TG09CD5678",
    phone: "919888888888",
    whatsappMessage:
      "Hi Mounika, I am contacting you regarding your car parking."
  }
};

const DEFAULT_VEHICLE_ID = "ROHIT123";

function getVehicleId() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("vehicle") || DEFAULT_VEHICLE_ID).toUpperCase();
}

function App() {
  const vehicleId = getVehicleId();
  const vehicle = VEHICLES[vehicleId];

  if (!vehicle) {
    return <NotFound vehicleId={vehicleId} />;
  }

  const callUrl = `tel:+${vehicle.phone}`;

  const whatsappUrl =
    `https://wa.me/${vehicle.phone}?text=` +
    encodeURIComponent(vehicle.whatsappMessage);

  return (
    <main className="page">
      <section className="card">
        <div className="topPattern" />

        <div className="content">
          <div className="carIcon">
            <CarFront size={34} strokeWidth={2.2} />
          </div>

          <div className="helloBadge">Hey!!! 👋</div>

          <h1>
            My self <span>{vehicle.ownerName}</span>
          </h1>

          <p className="intro">
            Is there any issue with my car parking?
            <br />
            Please contact me.
          </p>

          <div className="vehicleBox">
            <span className="vehicleLabel">VEHICLE NUMBER</span>
            <strong>{vehicle.vehicleNumber}</strong>
          </div>

          <div className="divider" />

          <p className="contactTitle">How would you like to contact me?</p>

          <div className="actions">
            <a className="actionButton callButton" href={callUrl}>
              <span className="actionIcon">
                <Phone size={21} />
              </span>

              <span className="actionText">
                <strong>Call Me</strong>
                <small>Contact the owner directly</small>
              </span>
            </a>

            <a
              className="actionButton whatsappButton"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="actionIcon">
                <MessageCircle size={21} />
              </span>

              <span className="actionText">
                <strong>WhatsApp Me</strong>
                <small>Send me a quick message</small>
              </span>
            </a>
          </div>

          <div className="privacyNote">
            <ShieldCheck size={17} />
            <span>
              Please contact only when necessary regarding parking or vehicle
              related issues.
            </span>
          </div>

          <p className="qrId">
            QR ID: <strong>{vehicleId}</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

function NotFound({ vehicleId }) {
  return (
    <main className="page">
      <section className="card errorCard">
        <div className="content">
          <div className="errorIcon">
            <AlertCircle size={38} />
          </div>

          <h1>QR Code Not Found</h1>

          <p className="intro">
            This QR code is invalid or the vehicle information is not
            available.
          </p>

          <div className="vehicleBox">
            <span className="vehicleLabel">QR ID</span>
            <strong>{vehicleId}</strong>
          </div>

          <p className="errorHelp">
            Please scan a valid vehicle QR code again.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;