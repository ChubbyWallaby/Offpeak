"use client";

import { useState, useEffect } from "react";

export default function CookieConsent({ lang = "pt" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  const t = lang === "pt"
    ? {
        message: "Utilizamos cookies de análise para melhorar a sua experiência.",
        accept: "Aceitar",
        reject: "Rejeitar",
        learnMore: "Saber mais",
      }
    : {
        message: "We use analytics cookies to improve your experience.",
        accept: "Accept",
        reject: "Reject",
        learnMore: "Learn more",
      };

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      right: "1.5rem",
      maxWidth: "480px",
      background: "white",
      border: "1px solid #e5e5e5",
      borderRadius: "1rem",
      padding: "1.25rem 1.5rem",
      boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    }}>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "#333", lineHeight: 1.5 }}>
        {t.message}{" "}
        <a href="/privacy" style={{ color: "#6b46c1", textDecoration: "underline" }}>
          {t.learnMore}
        </a>
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={reject}
          style={{
            flex: 1,
            padding: "0.6rem 1rem",
            border: "1.5px solid #ddd",
            borderRadius: "0.5rem",
            background: "white",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            color: "#555",
          }}
        >
          {t.reject}
        </button>
        <button
          onClick={accept}
          style={{
            flex: 1,
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "0.5rem",
            background: "#1a1a2e",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
