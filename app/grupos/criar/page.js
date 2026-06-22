"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/components/AuthProvider";
import AuthModal from "@/app/components/AuthModal";
import { createSession } from "@/app/actions";
import DEALS from "@/app/deals.json";
import styles from "./page.module.css";

const LABELS = {
  pt: {
    back: "← Grupos",
    title: "Criar Grupo",
    subtitle: "Cria um grupo para encontrares pessoas com quem partilhar uma atividade off-peak.",
    activityLabel: "Atividade",
    activityOptions: { padel: "Padel 🎾", bowling: "Bowling 🎳", cinema: "Cinema 🎬", fitness: "Fitness 💪", wellness: "Wellness 🧘", other: "Outra ✨" },
    dealLabel: "Local / Parceiro (opcional)",
    dealPlac: "Seleciona um parceiro Offpeak",
    dealNone: "Outro local",
    venueName: "Nome do Local",
    venueNamePlac: "Ex: Lisboa Padel Club",
    dateLabel: "Data",
    timeSlot: "Horário",
    timeSlotPlac: "Ex: 14:00–16:00",
    spotsLabel: "Vagas totais (incluindo tu)",
    messageLabel: "Mensagem opcional",
    messagePlac: "Ex: Procuro parceiros nível intermédio, jogo relaxado 😊",
    submit: "Criar Grupo",
    submitting: "A criar...",
    signInPrompt: "Para criar um grupo precisas de iniciar sessão.",
    signIn: "Entrar / Criar Conta",
    successTitle: "Grupo criado! 🎉",
    successText: "O teu grupo está agora visível. Partilha o link com amigos!",
    viewGroup: "Ver Grupo",
  },
  en: {
    back: "← Groups",
    title: "Create Group",
    subtitle: "Create a group to find people to share an off-peak activity with.",
    activityLabel: "Activity",
    activityOptions: { padel: "Padel 🎾", bowling: "Bowling 🎳", cinema: "Cinema 🎬", fitness: "Fitness 💪", wellness: "Wellness 🧘", other: "Other ✨" },
    dealLabel: "Venue / Partner (optional)",
    dealPlac: "Select an Offpeak partner",
    dealNone: "Other venue",
    venueName: "Venue Name",
    venueNamePlac: "e.g. Lisboa Padel Club",
    dateLabel: "Date",
    timeSlot: "Time Slot",
    timeSlotPlac: "e.g. 14:00–16:00",
    spotsLabel: "Total spots (including you)",
    messageLabel: "Optional message",
    messagePlac: "e.g. Looking for intermediate level players, relaxed game 😊",
    submit: "Create Group",
    submitting: "Creating...",
    signInPrompt: "You need to sign in to create a group.",
    signIn: "Sign In / Create Account",
    successTitle: "Group created! 🎉",
    successText: "Your group is now visible. Share the link with friends!",
    viewGroup: "View Group",
  },
};

export default function CriarGrupoPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"#080b14"}} />}>
      <CriarGrupoContent />
    </Suspense>
  );
}

function CriarGrupoContent() {
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang") || "pt";
  const lang = rawLang === "en" ? "en" : "pt";
  const preDeal = searchParams.get("deal") || "";
  const l = LABELS[lang];

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);

  const [activity, setActivity] = useState("padel");
  const [selectedDeal, setSelectedDeal] = useState(preDeal);
  const [venueName, setVenueName] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [spotsTotal, setSpotsTotal] = useState(4);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successId, setSuccessId] = useState(null);

  // Auto-fill venue when deal selected
  useEffect(() => {
    if (selectedDeal) {
      const deal = DEALS.find((d) => d.slug === selectedDeal);
      if (deal) {
        setVenueName(deal.title[lang] || deal.title.pt);
        setTimeSlot(deal.timeSlot?.[lang] || deal.timeSlot?.pt || "");
        setActivity(deal.category?.[lang]?.toLowerCase() || "padel");
      }
    }
  }, [selectedDeal, lang]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) { setAuthOpen(true); return; }
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("activity", activity);
      fd.set("dealSlug", selectedDeal);
      fd.set("venueName", venueName);
      fd.set("date", date);
      fd.set("timeSlot", timeSlot);
      fd.set("spotsTotal", String(spotsTotal));
      fd.set("message", message);
      fd.set("creatorUid", user.uid);
      fd.set("creatorDisplayName", user.displayName || user.email?.split("@")[0] || "Offpeak User");
      fd.set("lang", lang);

      const result = await createSession(fd);
      if (result.success) {
        setSuccessId(result.sessionId);
      } else {
        setError(result.error || "Erro ao criar grupo.");
      }
    } catch (err) {
      setError(err.message || "Erro ao criar grupo.");
    } finally {
      setSubmitting(false);
    }
  }

  const minDate = new Date().toISOString().split("T")[0];

  if (authLoading) return <div className={styles.page} />;

  if (successId) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>🎉</div>
          <h1 className={styles.successTitle}>{l.successTitle}</h1>
          <p className={styles.successText}>{l.successText}</p>
          <Link href={`/grupos/${successId}`} className={styles.submitBtn}>{l.viewGroup}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} lang={lang} onSuccess={() => {}} />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/grupos" className={styles.backLink}>{l.back}</Link>
          </div>
        </header>

        <main className={styles.main}>
          <h1 className={styles.title}>{l.title}</h1>
          <p className={styles.subtitle}>{l.subtitle}</p>

          {!user && !authLoading && (
            <div className={styles.authPrompt}>
              <p>{l.signInPrompt}</p>
              <button className={styles.submitBtn} onClick={() => setAuthOpen(true)}>{l.signIn}</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Activity */}
            <div className={styles.field}>
              <label className={styles.label}>{l.activityLabel}</label>
              <div className={styles.activityGrid}>
                {Object.entries(l.activityOptions).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.activityBtn} ${activity === key ? styles.activityActive : ""}`}
                    onClick={() => setActivity(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Deal / Partner */}
            <div className={styles.field}>
              <label htmlFor="deal-select" className={styles.label}>{l.dealLabel}</label>
              <select
                id="deal-select"
                className={styles.select}
                value={selectedDeal}
                onChange={(e) => setSelectedDeal(e.target.value)}
              >
                <option value="">{l.dealNone}</option>
                {DEALS.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.title[lang] || d.title.pt}
                  </option>
                ))}
              </select>
            </div>

            {/* Venue Name */}
            <div className={styles.field}>
              <label htmlFor="venue-name" className={styles.label}>{l.venueName}</label>
              <input
                id="venue-name"
                type="text"
                className={styles.input}
                placeholder={l.venueNamePlac}
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            {/* Date + Time Slot */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="session-date" className={styles.label}>{l.dateLabel}</label>
                <input
                  id="session-date"
                  type="date"
                  className={styles.input}
                  value={date}
                  min={minDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="time-slot" className={styles.label}>{l.timeSlot}</label>
                <input
                  id="time-slot"
                  type="text"
                  className={styles.input}
                  placeholder={l.timeSlotPlac}
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                  maxLength={20}
                />
              </div>
            </div>

            {/* Spots */}
            <div className={styles.field}>
              <label htmlFor="spots-total" className={styles.label}>{l.spotsLabel}</label>
              <div className={styles.spotsRow}>
                {[2, 3, 4, 6, 8].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`${styles.spotsBtn} ${spotsTotal === n ? styles.spotsActive : ""}`}
                    onClick={() => setSpotsTotal(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className={styles.field}>
              <label htmlFor="session-msg" className={styles.label}>{l.messageLabel}</label>
              <textarea
                id="session-msg"
                className={styles.textarea}
                placeholder={l.messagePlac}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                rows={3}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" disabled={submitting || !user} className={styles.submitBtn}>
              {submitting ? l.submitting : l.submit}
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
