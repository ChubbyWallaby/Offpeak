"use client";

import { useState } from "react";
import { submitBusinessPartner } from "../actions";

const C = {
  primary: "#1e2235",
  text: "#1e2235",
  border: "#e2e4ea",
  bg: "#f8f9fc",
};

export default function PartnerForm() {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [activityType, setActivityType] = useState("padel");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!businessName.trim() || !contactName.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("contactName", contactName);
    formData.append("email", email);
    formData.append("activityType", activityType);
    formData.append("message", message);
    try {
      const res = await submitBusinessPartner(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || "Não foi possível submeter. Tente novamente.");
      }
    } catch (_) {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✓</div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px", color: "#22c55e" }}>
          Pedido enviado com sucesso
        </h3>
        <p style={{ color: "#5e6478", fontSize: "1rem" }}>
          A equipa Offpeak.pt entra em contacto em menos de 48 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "520px", margin: "0 auto" }}>
      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Nome do negócio *</label>
          <input
            type="text"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Lisboa Padel Club"
            style={inputStyle}
            disabled={submitting}
          />
        </div>
        <div>
          <label style={labelStyle}>Nome de contacto *</label>
          <input
            type="text"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="e.g. João Silva"
            style={inputStyle}
            disabled={submitting}
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. joao@empresa.pt"
            style={inputStyle}
            disabled={submitting}
          />
        </div>
        <div>
          <label style={labelStyle}>Tipo de atividade</label>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            style={inputStyle}
            disabled={submitting}
          >
            <option value="padel">Padel</option>
            <option value="bowling">Bowling</option>
            <option value="cinema">Cinema</option>
            <option value="gym">Ginásio / Fitness</option>
            <option value="spa">Spa / Wellness</option>
            <option value="restaurante">Restaurante</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Mensagem (opcional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Horários disponíveis, tipo de oferta que pretende, dúvidas..."
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            disabled={submitting}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: "#dc2626", fontSize: "0.9rem", marginTop: "12px" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%",
          marginTop: "24px",
          padding: "14px",
          background: C.primary,
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "1rem",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "A enviar..." : "Registar o meu negócio"}
      </button>
    </form>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#5e6478",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: `1px solid ${C.border}`,
  borderRadius: "8px",
  fontSize: "0.95rem",
  color: C.text,
  background: "#ffffff",
  boxSizing: "border-box",
};
