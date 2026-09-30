import React, { useMemo, useState } from "react";
import {
  CarFront,
  Phone,
  MessageCircle,
  Lightbulb,
  Ban,
  Truck,
  Car,
  AlertTriangle,
  Pencil,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Siren,
  UsersRound,
  PhoneCall,
} from "lucide-react";
import "./App.css";

const VEHICLES = {
  ROHIT9010: {
    ownerName: "ROHITH REDDY",
    phone: "919999999999",

    familyContacts: [
      {
        id: "family-1",
        name: "Wife",
        phone: "916301872340",
      },
      {
        id: "family-2",
        name: "Shiva",
        phone: "917569040339",
      },
      {
        id: "family-3",
        name: "Rakesh",
        phone: "919100376371",
      },
    ],
  },
};

const CONTACT_REASONS = [
  {
    id: "lights",
    label: "The lights of this car are on",
    icon: Lightbulb,
    message: "The lights of your car are on.",
  },
  {
    id: "no-parking",
    label: "The car is in no parking",
    icon: Ban,
    message: "Your car is parked in a no-parking area.",
  },
  {
    id: "towing",
    label: "The car is getting towed",
    icon: Truck,
    message: "Your car is getting towed.",
  },
  {
    id: "window",
    label: "The window or car is open",
    icon: Car,
    message: "The window or car appears to be open.",
  },
  {
    id: "something-wrong",
    label: "Something is wrong with this car",
    icon: AlertTriangle,
    message: "There appears to be something wrong with your car.",
  },
  {
    id: "other",
    label: "Other",
    icon: Pencil,
    message: "",
  },
];

const getVehicleId = () => {
  const params = new URLSearchParams(window.location.search);
  return (params.get("vehicle") || "ROHIT9010").toUpperCase();
};

const App = () => {
  const vehicleId = getVehicleId();

  const vehicle = VEHICLES[vehicleId];

  const [selectedReason, setSelectedReason] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [showEmergency, setShowEmergency] = useState(false);
  const selectedReasonData = useMemo(
    () => CONTACT_REASONS.find((item) => item.id === selectedReason),
    [selectedReason],
  );

  if (!vehicle) {
    return (
      <div className="page not-found-page">
        <div className="not-found-card">
          <CarFront size={48} />
          <h1>Vehicle Not Found</h1>
          <p>We couldn't find the vehicle associated with this QR code.</p>
        </div>
      </div>
    );
  }

  const getMessage = () => {
    if (!selectedReasonData) {
      return `Hi ${vehicle.ownerName}, I'm contacting you regarding your vehicle.`;
    }

    if (selectedReason === "other") {
      return (
        customMessage.trim() ||
        `Hi ${vehicle.ownerName}, I'm contacting you regarding your vehicle.`
      );
    }

    return `Hi ${vehicle.ownerName}, I'm contacting you regarding your vehicle. ${selectedReasonData.message}`;
  };

  const handleWhatsApp = () => {
    const message = getMessage();

    const whatsappUrl = `https://wa.me/${vehicle.phone}?text=${encodeURIComponent(
      message,
    )}`;

    window.location.href = whatsappUrl;
  };

  const handleCall = () => {
    window.location.href = `tel:+${vehicle.phone}`;
  };

  return (
    <div className="page">
      {/* Animated background */}
      <div className="background">
        <div className="gradient-orb orb-one" />
        <div className="gradient-orb orb-two" />
        <div className="grid-overlay" />
      </div>

      <main className="contact-container">
        {/* Header */}
        <section className="hero-section">
          <div className="hero-icon">
            <CarFront size={30} strokeWidth={2} />
          </div>

          <div className="verified-badge">
            <CheckCircle2 size={14} />
            VEHICLE CONTACT
          </div>

          <h1>CONTACT VEHICLE OWNER</h1>

          <h2>{vehicle.ownerName}</h2>

          <p className="hero-description">
            Need to reach the owner? Select the reason below.
          </p>
        </section>

        {/* Main card */}
        <section className="contact-card">
          <div className="card-header">
            <div>
              <span className="section-label">CONTACT REQUEST</span>
              <h3>Why would you like to contact the vehicle owner?</h3>
            </div>
          </div>

          {/* Reason options */}
          <div className="reason-list">
            {CONTACT_REASONS.map((reason) => {
              const Icon = reason.icon;
              const isSelected = selectedReason === reason.id;

              return (
                <button
                  key={reason.id}
                  type="button"
                  className={`reason-option ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedReason(reason.id)}
                >
                  <div className="reason-icon">
                    <Icon size={21} strokeWidth={2} />
                  </div>

                  <span className="reason-text">{reason.label}</span>

                  <span
                    className={`radio ${isSelected ? "radio-selected" : ""}`}
                  >
                    {isSelected && <span />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom message */}
          {selectedReason === "other" && (
            <div className="custom-message-wrapper">
              <div className="custom-message-header">
                <Pencil size={17} />
                <span>Write your message</span>
              </div>

              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message here..."
                maxLength={300}
              />

              <div className="character-count">{customMessage.length}/300</div>
            </div>
          )}

          {/* Selected message preview */}
          {selectedReason && (
            <div className="message-preview">
              <div className="preview-icon">
                <MessageCircle size={18} />
              </div>

              <div>
                <span>MESSAGE PREVIEW</span>

                <p>{getMessage()}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="action-section">
            <button type="button" className="call-button" onClick={handleCall}>
              <Phone size={21} />
              <span>
                <strong>PRIVATE CALL</strong>
                <small>Call vehicle owner</small>
              </span>
            </button>

            <button
              type="button"
              className="whatsapp-button"
              onClick={handleWhatsApp}
            >
              <MessageCircle size={21} />
              <span>
                <strong>WHATSAPP MESSAGE</strong>
                <small>Send selected reason</small>
              </span>
            </button>
          </div>
          <button
            type="button"
            className="emergency-button"
            onClick={() => setShowEmergency(true)}
          >
            <div className="emergency-icon">
              <Siren size={23} />
            </div>

            <div className="emergency-content">
              <strong>EMERGENCY</strong>
              <span>View emergency contacts</span>
            </div>

            <div className="emergency-number">112</div>
          </button>
        </section>

        {/* Privacy */}
        <section className="privacy-card">
          <div className="privacy-icon">
            <Lock size={18} />
          </div>

          <div>
            <strong>Privacy protected</strong>
            <p>
              The vehicle owner's phone number is not displayed on this page.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <ShieldCheck size={16} />
          <span>For parking or genuine vehicle-related issues only</span>
        </footer>
        {showEmergency && (
          <div
            className="emergency-overlay"
            onClick={() => setShowEmergency(false)}
          >
            <div
              className="emergency-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="emergency-modal-header">
                <div className="emergency-title-wrapper">
                  <div className="emergency-modal-icon">
                    <Siren size={22} />
                  </div>

                  <div>
                    <h3>Emergency Contact Details</h3>
                    <p>Use emergency contacts for urgent situations only.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="close-emergency"
                  onClick={() => setShowEmergency(false)}
                >
                  ×
                </button>
              </div>

              {/* Emergency contacts */}
              <div className="emergency-contacts">
                {/* 112 */}
                <a href="tel:112" className="emergency-contact-row primary">
                  <div className="contact-service-icon">
                    <Siren size={20} />
                  </div>

                  <div className="contact-service-details">
                    <strong>National Emergency</strong>
                    <span>Police, medical & other emergencies</span>
                  </div>

                  <span className="contact-number">112</span>
                </a>

                {/* Ambulance */}
                <a href="tel:108" className="emergency-contact-row">
                  <div className="contact-service-icon ambulance">🚑</div>

                  <div className="contact-service-details">
                    <strong>Ambulance</strong>
                    <span>Medical emergency assistance</span>
                  </div>

                  <span className="contact-number">108</span>
                </a>

                {/* Police */}
                <a href="tel:100" className="emergency-contact-row">
                  <div className="contact-service-icon police">👮</div>

                  <div className="contact-service-details">
                    <strong>Police</strong>
                    <span>Police assistance</span>
                  </div>

                  <span className="contact-number">100</span>
                </a>

                {/* Women Helpline */}
                <a href="tel:1091" className="emergency-contact-row">
                  <div className="contact-service-icon women">👩</div>

                  <div className="contact-service-details">
                    <strong>Women Helpline</strong>
                    <span>Women in distress</span>
                  </div>

                  <span className="contact-number">1091</span>
                </a>
              </div>
              {/* Family Contacts */}
              <div className="family-section">
                <div className="family-section-header">
                  <UsersRound size={18} />

                  <div>
                    <strong>Family Contacts</strong>
                    <span>Contact a family member if needed</span>
                  </div>
                </div>

                <div className="family-contact-list">
                  {vehicle.familyContacts?.map((contact) => (
                    <div className="family-contact-row" key={contact.id}>
                      <div className="family-contact-avatar">
                        <UsersRound size={18} />
                      </div>

                      <div className="family-contact-details">
                        <strong>{contact.name}</strong>
                        <span>Family member</span>
                      </div>

                      <a
                        href={`tel:${contact.phone}`}
                        className="family-call-button"
                        aria-label={`Call ${contact.name}`}
                      >
                        <PhoneCall size={17} />
                        <span>Call</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="family-privacy">
                  <Lock size={13} />
                  <span>Family phone numbers are hidden for privacy.</span>
                </div>
              </div>
              {/* Warning */}
              <div className="emergency-warning">
                <AlertTriangle size={18} />

                <div>
                  <strong>Important</strong>
                  <p>Please use these numbers only for genuine emergencies.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
