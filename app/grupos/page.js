"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/components/AuthProvider";
import AuthModal from "@/app/components/AuthModal";
import styles from "./page.module.css";

const LABELS = {
  pt: {
    title: "Encontra o Teu Grupo",
    subtitle: "Junta-te a outros utilizadores para jogar padel, bowling, ou qualquer outra atividade nos melhores horários off-peak de Lisboa.",
    create: "Criar Grupo",
    empty: "Ainda não há grupos criados.",
    emptyAction: "Sê o primeiro a criar um!",
    filters: { all: "Todos", padel: "Padel 🎾", bowling: "Bowling 🎳", cinema: "Cinema 🎬", fitness: "Fitness 💪", wellness: "Wellness 🧘", other: "Outros ✨" },
    spots: (n) => n === 1 ? "1 vaga" : `${n} vagas`,
    spotsLeft: "disponíveis",
    full: "Grupo Completo",
    join: "Quero Ir →",
    created: "por",
    loading: "A carregar grupos...",
  },
  en: {
    title: "Find Your Group",
    subtitle: "Join other users for padel, bowling, or any other activity during the best off-peak hours in Lisbon.",
    create: "Create Group",
    empty: "No groups yet.",
    emptyAction: "Be the first to create one!",
    filters: { all: "All", padel: "Padel 🎾", bowling: "Bowling 🎳", cinema: "Cinema 🎬", fitness: "Fitness 💪", wellness: "Wellness 🧘", other: "Others ✨" },
    spots: (n) => n === 1 ? "1 spot" : `${n} spots`,
    spotsLeft: "available",
    full: "Group Full",
    join: "I'm In →",
    created: "by",
    loading: "Loading groups...",
  },
};

const ACTIVITY_ICONS = {
  padel: "🎾",
  bowling: "🎳",
  cinema: "🎬",
  fitness: "💪",
  wellness: "🧘",
  other: "✨",
};

export default function GruposPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"#080b14"}} />}>
      <GruposContent />
    </Suspense>
  );
}

function GruposContent() {
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang") || "pt";
  const lang = rawLang === "en" ? "en" : "pt";
  const l = LABELS[lang];

  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      try {
        const sessionsRef = collection(db, "sessions");
        const constraints = [where("status", "==", "open"), orderBy("date", "asc"), limit(50)];
        if (filter !== "all") constraints.splice(1, 0, where("activity", "==", filter));
        const q = query(sessionsRef, ...constraints);
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Only show future sessions
        const now = Date.now();
        setSessions(data.filter((s) => s.date?.toMillis ? s.date.toMillis() > now : true));
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, [filter]);

  function formatDate(ts, l) {
    if (!ts?.toDate) return "";
    return ts.toDate().toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
      weekday: "short", day: "numeric", month: "short"
    });
  }

  const filterKeys = Object.keys(l.filters);

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} lang={lang} />
      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href={`/${lang === "en" ? "?lang=en" : ""}`} className={styles.backLink}>
              ← Offpeak
            </Link>
            {user ? (
              <Link href="/grupos/criar" className={styles.createBtn}>
                + {l.create}
              </Link>
            ) : (
              <button className={styles.createBtn} onClick={() => setAuthOpen(true)}>
                + {l.create}
              </button>
            )}
          </div>
        </header>

        <main className={styles.main}>
          {/* Hero */}
          <section className={styles.hero}>
            <h1 className={styles.heroTitle}>{l.title}</h1>
            <p className={styles.heroSubtitle}>{l.subtitle}</p>
          </section>

          {/* Filters */}
          <div className={styles.filters}>
            {filterKeys.map((key) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${filter === key ? styles.active : ""}`}
                onClick={() => setFilter(key)}
              >
                {l.filters[key]}
              </button>
            ))}
          </div>

          {/* Session Grid */}
          {loading ? (
            <div className={styles.loading}>{l.loading}</div>
          ) : sessions.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>👥</span>
              <p>{l.empty}</p>
              {user ? (
                <Link href="/grupos/criar" className={styles.createBtn}>{l.emptyAction}</Link>
              ) : (
                <button className={styles.createBtn} onClick={() => setAuthOpen(true)}>{l.emptyAction}</button>
              )}
            </div>
          ) : (
            <div className={styles.grid}>
              {sessions.map((session) => {
                const spotsLeft = session.spotsTotal - (session.spotsFilled || 1);
                const isFull = spotsLeft <= 0;
                return (
                  <Link key={session.id} href={`/grupos/${session.id}`} className={`${styles.card} ${isFull ? styles.cardFull : ""}`}>
                    <div className={styles.cardTop}>
                      <span className={styles.activityPill}>
                        {ACTIVITY_ICONS[session.activity] || "✨"} {session.activity}
                      </span>
                      <span className={`${styles.spotsBadge} ${isFull ? styles.spotsFull : ""}`}>
                        {isFull ? l.full : `${l.spots(spotsLeft)} ${l.spotsLeft}`}
                      </span>
                    </div>

                    <h2 className={styles.cardVenue}>{session.venueName}</h2>
                    <p className={styles.cardDate}>
                      📅 {formatDate(session.date)} · {session.timeSlot}
                    </p>

                    {session.message && (
                      <p className={styles.cardMessage}>"{session.message}"</p>
                    )}

                    <div className={styles.cardFooter}>
                      <span className={styles.cardCreator}>
                        {l.created} {session.creatorDisplayName || "Offpeak User"}
                      </span>
                      {!isFull && <span className={styles.joinHint}>{l.join}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
