"use client";

import { useState, useEffect } from "react";
import { getDeals, saveDeal, deleteDeal } from "../actions";
import { translations } from "../translations";
import styles from "./page.module.css";

export default function Dashboard() {
  const [lang, setLang] = useState("pt");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [titlePt, setTitlePt] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [categoryPt, setCategoryPt] = useState("Padel");
  const [categoryEn, setCategoryEn] = useState("Padel");
  const [daysPt, setDaysPt] = useState("Seg–Sex");
  const [daysEn, setDaysEn] = useState("Mon–Fri");
  const [timePt, setTimePt] = useState("14:00–17:00");
  const [timeEn, setTimeEn] = useState("14:00–17:00");
  const [baseDiscount, setBaseDiscount] = useState("50");
  const [minDiscount, setMinDiscount] = useState("25");
  const [decayRate, setDecayRate] = useState("1.2");
  const [ownerEmail, setOwnerEmail] = useState("");

  // Check session auth on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("offpeak_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Load deals
  useEffect(() => {
    if (isAuthenticated) {
      loadDealsList();
    }
  }, [isAuthenticated]);

  const loadDealsList = async () => {
    setLoading(true);
    const res = await getDeals();
    if (res.success && res.deals) {
      setDeals(res.deals);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "offpeak2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("offpeak_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError(lang === "pt" ? "Palavra-passe incorreta" : "Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("offpeak_admin_auth");
  };

  const openAddModal = () => {
    setEditingId(null);
    setPartnerName("");
    setTitlePt("");
    setTitleEn("");
    setCategoryPt("Padel");
    setCategoryEn("Padel");
    setDaysPt("Seg–Sex");
    setDaysEn("Mon–Fri");
    setTimePt("14:00–17:00");
    setTimeEn("14:00–17:00");
    setBaseDiscount("50");
    setMinDiscount("25");
    setDecayRate("1.2");
    setOwnerEmail("");
    setIsModalOpen(true);
  };

  const openEditModal = (deal) => {
    setEditingId(deal.id);
    // Extract partner name from PT title or use a default
    const pName = deal.title.pt.split("—")[0].split("-")[0].trim();
    setPartnerName(pName);
    setTitlePt(deal.title.pt);
    setTitleEn(deal.title.en);
    setCategoryPt(deal.category.pt);
    setCategoryEn(deal.category.en);
    setDaysPt(deal.days.pt);
    setDaysEn(deal.days.en);
    setTimePt(deal.timeSlot.pt);
    setTimeEn(deal.timeSlot.en);
    setBaseDiscount(deal.baseDiscountPercent.toString());
    setMinDiscount(deal.minDiscountPercent.toString());
    setDecayRate(deal.decayRate.toString());
    setOwnerEmail(deal.ownerEmail || "admin@offpeak.pt");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dealData = {
      id: editingId,
      categoryEn,
      categoryPt,
      titleEn,
      titlePt,
      timeSlotEn,
      timeSlotPt,
      daysEn,
      daysPt,
      baseDiscountPercent: parseInt(baseDiscount),
      minDiscountPercent: parseInt(minDiscount),
      decayRate: parseFloat(decayRate),
      ownerEmail,
    };

    const res = await saveDeal(dealData);
    if (res.success) {
      setIsModalOpen(false);
      loadDealsList();
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async (id) => {
    const confirmMsg = lang === "pt" 
      ? "Tem a certeza que deseja eliminar esta oferta?" 
      : "Are you sure you want to delete this deal?";
    
    if (confirm(confirmMsg)) {
      const res = await deleteDeal(id);
      if (res.success) {
        loadDealsList();
      } else {
        alert(res.error);
      }
    }
  };

  // Helper variables for inputs/values mapping
  const titlePtVal = titlePt || (partnerName ? `${partnerName} — Oferta Fora de Pico` : "");
  const titleEnVal = titleEn || (partnerName ? `${partnerName} — Off-Peak Slots` : "");
  const timeSlotPt = timePt;
  const timeSlotEn = timeEn;

  const t = translations[lang] || translations.en;
  const d = t.dashboard;

  if (!isAuthenticated) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginCard}>
          <h1 className={styles.logo}>offpeak<span className={styles.logoDot}></span>pt</h1>
          <h2 className={styles.loginTitle}>{d.title}</h2>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              placeholder={d.enterPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
              required
            />
            {authError && <p className={styles.authError}>{authError}</p>}
            <button type="submit" className={styles.loginBtn}>{d.submit}</button>
          </form>
          <button
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            className={styles.langToggle}
            style={{ marginTop: "1rem" }}
          >
            {lang === "en" ? "PT" : "EN"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardLayout}>
      {/* ─── Dashboard Header ─── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.logo}>offpeak<span className={styles.logoDot}></span>pt</h1>
            <p className={styles.subtitle}>{d.subtitle}</p>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              className={styles.langToggle}
            >
              {lang === "en" ? "PT" : "EN"}
            </button>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              {d.logout}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content Area ─── */}
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <h2 className={styles.sectionTitle}>{d.title}</h2>
          <button onClick={openAddModal} className={styles.addBtn}>
            + {d.addDeal}
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{d.placeName}</th>
                  <th>{d.category}</th>
                  <th>{d.timeSlot}</th>
                  <th>{d.days}</th>
                  <th>{d.discount} (Base/Min)</th>
                  <th>{d.metrics}</th>
                  <th>{d.actions}</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => {
                  const pName = deal.title[lang]?.split("—")[0].split("-")[0].trim() || "Place";
                  return (
                    <tr key={deal.id}>
                      <td className={styles.boldCell}>
                        {pName}
                        <span className={styles.subTextCell}>{deal.ownerEmail || "admin@offpeak.pt"}</span>
                      </td>
                      <td>
                        <span className={styles.categoryBadge}>
                          {deal.category[lang] || deal.category.en}
                        </span>
                      </td>
                      <td>{deal.timeSlot[lang] || deal.timeSlot.en}</td>
                      <td>{deal.days[lang] || deal.days.en}</td>
                      <td>
                        <strong>{deal.baseDiscountPercent}%</strong> / {deal.minDiscountPercent}%
                      </td>
                      <td className={styles.metricsCell}>
                        👁 {deal.views || 0} / ⚡ {deal.bookings || 0}
                      </td>
                      <td>
                        <div className={styles.actionsGroup}>
                          <button
                            onClick={() => openEditModal(deal)}
                            className={styles.editBtn}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(deal.id)}
                            className={styles.deleteBtn}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ─── Add/Edit Modal Form ─── */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingId ? d.editDeal : d.addDeal}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.partnerName}</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="e.g. Lisboa Padel Club"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.ownerEmail}</label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="e.g. contact@lpc.pt"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.titlePt}</label>
                  <input
                    type="text"
                    value={titlePt}
                    onChange={(e) => setTitlePt(e.target.value)}
                    placeholder={titlePtVal}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.titleEn}</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder={titleEnVal}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.categoryPt}</label>
                  <input
                    type="text"
                    value={categoryPt}
                    onChange={(e) => setCategoryPt(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.categoryEn}</label>
                  <input
                    type="text"
                    value={categoryEn}
                    onChange={(e) => setCategoryEn(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.daysPt}</label>
                  <input
                    type="text"
                    value={daysPt}
                    onChange={(e) => setDaysPt(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.daysEn}</label>
                  <input
                    type="text"
                    value={daysEn}
                    onChange={(e) => setDaysEn(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.timePt}</label>
                  <input
                    type="text"
                    value={timePt}
                    onChange={(e) => setTimePt(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.timeEn}</label>
                  <input
                    type="text"
                    value={timeEn}
                    onChange={(e) => setTimeEn(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.baseDiscount}</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={baseDiscount}
                    onChange={(e) => setBaseDiscount(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.minDiscount}</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={minDiscount}
                    onChange={(e) => setMinDiscount(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{d.form.decayRate}</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="10"
                    value={decayRate}
                    onChange={(e) => setDecayRate(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  {d.cancel}
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {d.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
