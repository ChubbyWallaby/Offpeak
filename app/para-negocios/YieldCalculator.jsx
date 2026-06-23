"use client";

import { useState } from "react";

export default function YieldCalculator() {
  const [emptySlots, setEmptySlots] = useState(20);
  const [pricePerSlot, setPricePerSlot] = useState(24); // e.g. average padel court
  const [discountOffered, setDiscountOffered] = useState(40); // 40% discount

  // Calculations
  // Assuming 4.33 weeks in a month
  const lostRevenuePerMonth = Math.round(emptySlots * pricePerSlot * 4.33);
  
  const discountedPrice = pricePerSlot * (1 - discountOffered / 100);
  // Assuming Offpeak can fill roughly 40% of those empty slots with the discount
  const recoveredSlots = emptySlots * 0.4;
  const grossRecoveredPerMonth = Math.round(recoveredSlots * discountedPrice * 4.33);
  
  // Offpeak fee is 10% (risk-free plan)
  const offpeakFee = grossRecoveredPerMonth * 0.10;
  const netRecoveredPerMonth = Math.round(grossRecoveredPerMonth - offpeakFee);

  return (
    <div style={{
      background: "#1e2235",
      color: "#ffffff",
      borderRadius: "16px",
      padding: "40px 32px",
      margin: "40px auto 60px",
      maxWidth: "800px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      textAlign: "left"
    }}>
      <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.5px" }}>
        Simulador de Receita Perdida
      </h3>
      <p style={{ color: "#8b8f9e", marginBottom: "32px", fontSize: "15px", lineHeight: 1.5 }}>
        Descubra quanto dinheiro está a deixar na mesa todos os meses e quanto pode recuperar com a Offpeak.pt.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {/* Input: Empty Slots */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8f9e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Horas vazias por semana
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input 
              type="range" 
              min="5" 
              max="100" 
              step="5"
              value={emptySlots} 
              onChange={(e) => setEmptySlots(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#ffffff" }}
            />
            <span style={{ fontSize: "18px", fontWeight: 700, width: "40px" }}>{emptySlots}</span>
          </div>
        </div>

        {/* Input: Price */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8f9e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Preço médio normal (€)
          </label>
          <input 
            type="number" 
            min="5" 
            max="200"
            value={pricePerSlot} 
            onChange={(e) => setPricePerSlot(Number(e.target.value))}
            style={{ 
              width: "100%", 
              background: "#282b3d", 
              border: "1px solid #3a3e52", 
              color: "#fff", 
              padding: "10px 14px", 
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600
            }}
          />
        </div>

        {/* Input: Discount */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8f9e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Desconto Offpeak (%)
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input 
              type="range" 
              min="20" 
              max="70" 
              step="5"
              value={discountOffered} 
              onChange={(e) => setDiscountOffered(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#ffffff" }}
            />
            <span style={{ fontSize: "18px", fontWeight: 700, width: "40px" }}>{discountOffered}%</span>
          </div>
        </div>
      </div>

      <div style={{ 
        background: "#282b3d", 
        borderRadius: "12px", 
        padding: "24px",
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        alignItems: "center"
      }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <p style={{ fontSize: "14px", color: "#8b8f9e", margin: "0 0 4px" }}>Receita perdida atual</p>
          <p style={{ fontSize: "32px", fontWeight: 800, color: "#ef4444", margin: 0, letterSpacing: "-1px" }}>
            €{lostRevenuePerMonth.toLocaleString("pt-PT")} <span style={{ fontSize: "14px", fontWeight: 500, color: "#5e6478" }}>/mês</span>
          </p>
        </div>
        
        <div style={{ width: "1px", height: "50px", background: "#3a3e52", display: "none" }} className="divider"></div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <p style={{ fontSize: "14px", color: "#8b8f9e", margin: "0 0 4px" }}>Potencial recuperado (Líquido)</p>
          <p style={{ fontSize: "32px", fontWeight: 800, color: "#10b981", margin: 0, letterSpacing: "-1px" }}>
            €{netRecoveredPerMonth.toLocaleString("pt-PT")} <span style={{ fontSize: "14px", fontWeight: 500, color: "#5e6478" }}>/mês</span>
          </p>
        </div>
      </div>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <p style={{ fontSize: "13px", color: "#5e6478", margin: 0, maxWidth: "400px", lineHeight: 1.5 }}>
          *Estimativa baseada numa taxa de ocupação de 40% dos horários off-peak publicados e já descontando a taxa de 10% da Offpeak.pt (plano Sem Risco).
        </p>
        <a 
          href="#registar" 
          style={{
            background: "#ffffff",
            color: "#1e2235",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            letterSpacing: "-0.2px"
          }}
        >
          Recuperar Receita →
        </a>
      </div>
      
      <style>{`
        @media (min-width: 600px) {
          .divider { display: block !important; }
        }
      `}</style>
    </div>
  );
}
