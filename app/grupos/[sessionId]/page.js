"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/components/AuthProvider";
import AuthModal from "@/app/components/AuthModal";
import { joinSession } from "@/app/actions";
import styles from "./page.module.css";

const LABELS = {
  pt: {
    back: "← Grupos",
    notFound: "Grupo não encontrado.",
    loading: "A carregar...",
    activity: "Atividade",
    venue: "Local",
    date: "Data",
    timeSlot: "Horário",
    participants: "Participantes",
    spotsLeft: (n) => `${n} ${n === 1 ? "vaga disponível" : "vagas disponíveis"}`,
    full: "Grupo Completo",
    message: "Mensagem do grupo",
    joinBtn: "Quero Ir!",
    joinedBy: "Este grupo inclui:",
    yourName: "O teu nome",
    yourNamePlac: "Primeiro nome",
    yourNote: "Nota opcional",
    yourNotePlac: "Olá! Estou ao nível...",
    confirmJoin: "Confirmar Participação",
    joining: "A juntar...",
    joinSuccess: "Estás dentro! 🎉",
    joinSuccessText: "A tua participação foi confirmada. Bom jogo!",
    alreadyIn: "Já participas neste grupo.",
    signInToJoin: "Entra para te juntar ao grupo.",
    signIn: "Entrar / Criar Conta",
    createdBy: "Criado por",
    cancel: "Cancelar",
  },
  en: {
    back: "← Groups",
    notFound: "Group not found.",
    loading: "Loading...",
    activity: "Activity",
    venue: "Venue",
    date: "Date",
    timeSlot: "Time Slot",
    participants: "Participants",
    spotsLeft: (n) => `${n} spot${n === 1 ? "" : "s"} available`,
    full: "Group Full",
    message: "Group note",
    joinBtn: "I'm In!",
    joinedBy: "This group includes:",
    yourName: "Your name",
    yourNamePlac: "First name",
    yourNote: "Optional note",
    yourNotePlac: "Hi! I'm at level...",
    confirmJoin: "Confirm Participation",
    joining: "Joining...",
    joinSuccess: "You're in! 🎉",
    joinSuccessText: "Your participation is confirmed. Have fun!",
    alreadyIn: "You're already in this group.",
    signInToJoin: "Sign in to join this group.",
    signIn: "Sign In / Create Account",
    createdBy: "Created by",
    cancel: "Cancel",
  },
};

const ACTIVITY_ICONS = { padel: "🎾", bowling: "🎳", cinema: "🎬", fitness: "💪", wellness: "🧘", other: "✨" };

export default function SessionDetailPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"#080b14"}} />}>
      <SessionDetailContent />
    </Suspense>
  );
}

function SessionDetailContent() {
  const { sessionId } = useParams();
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang") || "pt";
  const lang = rawLang === "en" ? "en" : "pt";
  const l = LABELS[lang];

  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinName, setJoinName] = useState("");
  const [joinNote, setJoinNote] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinDone, setJoinDone] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const ref = doc(db, "sessions", sessionId);
        const snap = await getDoc(ref);
        if (snap.exists()) setSession({ id: snap.id, ...snap.data() });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (sessionId) fetch();
  }, [sessionId]);

  useEffect(() => {
    if (user) setJoinName(user.displayName || "");
  }, [user]);

  async function handleJoin(e) {
    e.preventDefault();
    if (!user) { setAuthOpen(true); return; }
    setJoinError("");
    setJoining(true);
    try {
      const fd = new FormData();
      fd.set("sessionId", sessionId);
      fd.set("participantUid", user.uid);
      fd.set("participantDisplayName", joinName || user.displayName || user.email?.split("@")[0] || "Offpeak User");
      fd.set("note", joinNote);
      const result = await joinSession(fd);
      if (result.success) {
        setJoinDone(true);
        // Re-fetch updated session
        const ref = doc(db, "sessions", sessionId);
        const snap = await getDoc(ref);
        if (snap.exists()) setSession({ id: snap.id, ...snap.data() });
      } else {
        setJoinError(result.error || "Erro ao juntar ao grupo.");
      }
    } catch (err) {
      setJoinError(err.message);
    } finally {
      setJoining(false);
    }
  }

  if (loading) return <div className={styles.page}><p className={styles.loading}>{l.loading}</p></div>;
  if (!session) return (
    <div className={styles.page}>
      <header className={styles.header}><div className={styles.headerInner}><Link href="/grupos" className={styles.backLink}>{l.back}</Link></div></header>
      <div className={styles.notFound}>{l.notFound}</div>
    </div>
  );

  const spotsLeft = session.spotsTotal - (session.participants?.length || 1);
  const isFull = spotsLeft <= 0;
  const alreadyIn = user && session.participants?.some((p) => p.uid === user.uid);
  const isCreator = user && session.creatorUid === user.uid;

  function formatDateLong(ts) {
    if (!ts?.toDate) return "";
    return ts.toDate().toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
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
          {/* Top info */}
          <div className={styles.activityBadge}>
            <span>{ACTIVITY_ICONS[session.activity] || "✨"} {session.activity}</span>
            <span className={`${styles.spotsBadge} ${isFull ? styles.spotsFull : ""}`}>
              {isFull ? l.full : l.spotsLeft(spotsLeft)}
            </span>
          </div>

          <h1 className={styles.venueName}>{session.venueName}</h1>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📅</span>
              <span>{formatDateLong(session.date)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>⏰</span>
              <span>{session.timeSlot}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>👥</span>
              <span>{session.participants?.length || 1} / {session.spotsTotal}</span>
            </div>
          </div>

          {session.message && (
            <div className={styles.messageBox}>
              <p>"{session.message}"</p>
              <span>— {session.creatorDisplayName}</span>
            </div>
          )}

          {/* Participants */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{l.joinedBy}</h2>
            <div className={styles.participantsList}>
              <div className={styles.participant}>
                <div className={styles.avatar}>{(session.creatorDisplayName || "?")[0].toUpperCase()}</div>
                <span>{session.creatorDisplayName} ⭐</span>
              </div>
              {(session.participants || []).filter((p) => p.uid !== session.creatorUid).map((p, i) => (
                <div key={i} className={styles.participant}>
                  <div className={styles.avatar}>{(p.displayName || "?")[0].toUpperCase()}</div>
                  <span>{p.displayName}</span>
                </div>
              ))}
              {!isFull && Array.from({ length: spotsLeft }).map((_, i) => (
                <div key={`empty-${i}`} className={`${styles.participant} ${styles.participantEmpty}`}>
                  <div className={`${styles.avatar} ${styles.avatarEmpty}`}>?</div>
                  <span className={styles.emptySlot}>Vaga livre</span>
                </div>
              ))}
            </div>
          </div>

          {/* Join section */}
          {joinDone ? (
            <div className={styles.joinSuccess}>
              <span className={styles.joinSuccessIcon}>🎉</span>
              <h3>{l.joinSuccess}</h3>
              <p>{l.joinSuccessText}</p>
            </div>
          ) : alreadyIn || isCreator ? (
            <div className={styles.alreadyIn}>{l.alreadyIn}</div>
          ) : isFull ? null : !user ? (
            <div className={styles.signInPrompt}>
              <p>{l.signInToJoin}</p>
              <button className={styles.joinBtn} onClick={() => setAuthOpen(true)}>{l.signIn}</button>
            </div>
          ) : showJoinForm ? (
            <form onSubmit={handleJoin} className={styles.joinForm}>
              <div className={styles.field}>
                <label htmlFor="join-name" className={styles.label}>{l.yourName}</label>
                <input
                  id="join-name"
                  type="text"
                  className={styles.input}
                  placeholder={l.yourNamePlac}
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  required
                  maxLength={50}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="join-note" className={styles.label}>{l.yourNote}</label>
                <textarea
                  id="join-note"
                  className={styles.textarea}
                  placeholder={l.yourNotePlac}
                  value={joinNote}
                  onChange={(e) => setJoinNote(e.target.value)}
                  maxLength={150}
                  rows={2}
                />
              </div>
              {joinError && <p className={styles.error}>{joinError}</p>}
              <div className={styles.joinActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowJoinForm(false)}>{l.cancel}</button>
                <button type="submit" disabled={joining} className={styles.joinBtn}>
                  {joining ? l.joining : l.confirmJoin}
                </button>
              </div>
            </form>
          ) : (
            <button className={styles.joinBtn} onClick={() => setShowJoinForm(true)}>{l.joinBtn}</button>
          )}
        </main>
      </div>
    </>
  );
}
