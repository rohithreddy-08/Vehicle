import React from "react";
import {
  CarFront,
  Phone,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const VEHICLES = {
  ROHIT2953: {
    ownerName: "Rohit Reddy",
    vehicleNumber: "TG35AB2953",
    phone: "919705560414",

    whatsappMessage:
      "Hi Rohit, I am contacting you regarding your car parking.",
  },
};

const getVehicleId = () => {
  const params = new URLSearchParams(window.location.search);

  return (params.get("vehicle") || "ROHIT2953").toUpperCase();
};

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
      {/* Animated background */}
      <div className="background">
        <div className="gradientOrb orbOne" />
        <div className="gradientOrb orbTwo" />
        <div className="gradientOrb orbThree" />

        <span className="particle particle1">✦</span>
        <span className="particle particle2">✧</span>
        <span className="particle particle3">•</span>
        <span className="particle particle4">✦</span>
        <span className="particle particle5">•</span>
      </div>

      <section className="vehicleCard">
        <div className="cardGlow" />

        <div className="content">
          {/* Top icon section */}
          <div className="hero">
            <div className="carGlow glowOne" />
            <div className="carGlow glowTwo" />

            <div className="carIcon">
              <CarFront size={46} strokeWidth={1.8} />
            </div>
          </div>

          {/* Greeting */}
          <div className="helloBadge">
            <Sparkles size={13} />
            <span>Hey!!! 👋</span>
          </div>

          {/* Owner */}
          <h1>
            Myself
            <span>{vehicle.ownerName}</span>
          </h1>

          {/* Message */}
          <div className="message">
            <p className="mainMessage">
              Is there any issue with
              <br />
              <strong>my car parking?</strong>
            </p>

            <p className="subMessage">
              Please feel free to contact me.
              <br />
              I’ll be happy to help you.
            </p>
          </div>

          {/* Number plate */}
          <div className="numberPlateWrapper">
            <div className="plateLight" />

            <div className="numberPlate">
              <div className="indiaMark">
                <span>IND</span>
              </div>

              <div>
                <small>VEHICLE NUMBER</small>

                <strong>{vehicle.vehicleNumber}</strong>
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="contactSection">
            <div className="sectionHeading">
              <span />
              <p>Contact me</p>
              <span />
            </div>

            <div className="actions">
              {/* Call */}
              <a href={callUrl} className="action callAction">
                <div className="actionIcon">
                  <Phone size={23} />
                </div>

                <div className="actionInfo">
                  <strong>Call Me</strong>
                  <span>Talk directly with me</span>
                </div>

                <div className="arrow">→</div>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action whatsappAction"
              >
                <div className="actionIcon">
                  <MessageCircle size={23} />
                </div>

                <div className="actionInfo">
                  <strong>WhatsApp Me</strong>
                  <span>Send me a quick message</span>
                </div>

                <div className="arrow">→</div>
              </a>
            </div>
          </div>

          {/* Privacy */}
          <div className="privacy">
            <div className="privacyIcon">
              <ShieldCheck size={16} />
            </div>

            <p>
              Please contact me only regarding parking
              or vehicle-related issues.
            </p>
          </div>

          {/* QR */}
          <div className="qrFooter">
            <span>QR ID</span>
            <strong>{vehicleId}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

function NotFound({ vehicleId }) {
  return (
    <main className="page">
      <div className="background">
        <div className="gradientOrb orbOne" />
        <div className="gradientOrb orbTwo" />
      </div>

      <section className="vehicleCard errorCard">
        <div className="content">
          <div className="errorIcon">
            <AlertCircle size={45} />
          </div>

          <h1>
            QR Code
            <span>Not Found</span>
          </h1>

          <p className="subMessage">
            This QR code is invalid or the vehicle
            information is unavailable.
          </p>

          <div className="errorId">
            QR ID: <strong>{vehicleId}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;