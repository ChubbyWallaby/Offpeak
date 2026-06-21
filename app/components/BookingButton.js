"use client";

import { useState } from "react";
import { submitBooking } from "../actions";

const styles = {
  ctaButton: {
    display: "block",
    width: "100%",
    padding: "16px",
    background: "#059669",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "1.05rem",
    textAlign: "center",
    borderRadius: "12px",
    textDecoration: "none",
    marginTop: "12px",
    letterSpacing: "0.01em",
    border: "none",
    cursor: "pointer",
  },
  whatsappButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "16px",
    background: "#25D366",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "1.05rem",
    textAlign: "center",
    borderRadius: "12px",
    textDecoration: "none",
    marginTop: "12px",
    letterSpacing: "0.01em",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px 28px",
    maxWidth: "440px",
    width: "100%",
    position: "relative",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  modalTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    margin: 0,
    color: "#111827",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px",
    lineHeight: 1,
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  submitBtn: {
    display: "block",
    width: "100%",
    padding: "14px",
    background: "#059669",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "1rem",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "8px",
  },
  success: {
    textAlign: "center",
    padding: "20px 0",
  },
  successIcon: {
    width: "48px",
    height: "48px",
    background: "#d1fae5",
    color: "#059669",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "12px",
  },
  successTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "8px",
  },
  successText: {
    fontSize: "0.9rem",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  error: {
    color: "#dc2626",
    fontSize: "0.85rem",
    marginTop: "8px",
  },
};

export default function BookingButton({ deal }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("2");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const bookingMethod = deal.bookingMethod || "form";
  const bookingTarget = deal.bookingTarget || "";
  const dealTitle = deal.title?.pt || deal.title?.en || "Oferta";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("dealId", deal.id);
    formData.append("name", name);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("people", people);
    formData.append("phone", phone);

    try {
      const res = await submitBooking(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || "Erro ao submeter. Tente novamente.");
      }
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingMethod === "whatsapp" && bookingTarget) {
    const cleanNumber = bookingTarget.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Olá! Vi a oferta "${dealTitle}" no Offpeak.pt e gostaria de reservar.`
    );
    return (
      <a
        href={`https://wa.me/${cleanNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappButton}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Reservar via WhatsApp
      </a>
    );
  }

  if (bookingMethod === "external" && bookingTarget) {
    return (
      <a
        href={bookingTarget}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.ctaButton}
      >
        Reservar com Desconto
      </a>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <button
        type="button"
        onClick={() => { setSubmitted(false); setError(""); setIsFormOpen(true); }}
        style={styles.ctaButton}
      >
        Reservar com Desconto
      </button>

      {isFormOpen && (
        <div style={styles.overlay} onClick={() => setIsFormOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Reservar — {dealTitle}</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                style={styles.closeBtn}
                aria-label="Fechar"
              >
                &times;
              </button>
            </div>

            {submitted ? (
              <div style={styles.success}>
                <div style={styles.successIcon}>✓</div>
                <h4 style={styles.successTitle}>Pedido de reserva enviado!</h4>
                <p style={styles.successText}>
                  O parceiro irá confirmar a sua reserva brevemente.
                  Verifique o seu e-mail ou telefone.
                </p>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  style={{ ...styles.submitBtn, marginTop: "16px", background: "#6b7280" }}
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="booking-name">Nome</label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    placeholder="O seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="booking-date">Data pretendida</label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="booking-time">Horário pretendido</label>
                  <input
                    id="booking-time"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="booking-people">Número de pessoas</label>
                  <input
                    id="booking-people"
                    type="number"
                    required
                    min="1"
                    max="20"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    style={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="booking-phone">Telefone (opcional)</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="+351 912 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.submitBtn,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? "A enviar..." : "Confirmar Reserva"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
