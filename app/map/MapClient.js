"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if (window.L) return resolve(window.L);

    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[src="${LEAFLET_JS}"]`)) {
      const script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.onload = () => resolve(window.L);
      script.onerror = () => reject(new Error("Failed to load Leaflet"));
      document.head.appendChild(script);
    } else {
      const poll = setInterval(() => {
        if (window.L) {
          clearInterval(poll);
          resolve(window.L);
        }
      }, 50);
    }
  });
}

export default function MapClient({ deals }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then((L) => {
        if (cancelled || !mapContainerRef.current || mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current, {
          center: [38.73, -9.15],
          zoom: 12,
          scrollWheelZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        deals.forEach((deal) => {
          const popup = `
            <div style="min-width:180px;font-family:sans-serif;font-size:0.85rem;line-height:1.5;">
              <strong style="font-size:0.95rem;color:#111827;">${deal.title.pt}</strong><br/>
              <span style="color:#059669;font-weight:600;">${deal.baseDiscountPercent}% desc.</span><br/>
              <span style="color:#6b7280;">${deal.timeSlot.pt} | ${deal.days.pt}</span><br/>
              <a href="/deals/${deal.slug}" style="color:#059669;font-weight:600;text-decoration:none;margin-top:6px;display:inline-block;">
                Ver oferta →
              </a>
            </div>
          `;
          L.marker([deal.lat, deal.lng]).addTo(map).bindPopup(popup);
        });

        mapInstanceRef.current = map;
        if (!cancelled) setReady(true);
      })
      .catch((err) => {
        if (!cancelled) console.error("Leaflet load error:", err);
      });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [deals]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header
        style={{
          background: "#ffffff",
          padding: "16px 24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Link
          href="/"
          style={{
            color: "#059669",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
          }}
        >
          ← Voltar
        </Link>

        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Mapa de Ofertas
        </span>

        <span
          style={{
            background: "#059669",
            color: "#ffffff",
            borderRadius: "999px",
            padding: "4px 12px",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          {deals.length} {deals.length === 1 ? "oferta" : "ofertas"}
        </span>
      </header>

      <div style={{ flexGrow: 1, position: "relative" }}>
        <div
          ref={mapContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
        {!ready && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3f4f6",
              color: "#6b7280",
              fontSize: "0.95rem",
            }}
          >
            A carregar mapa…
          </div>
        )}
      </div>
    </div>
  );
}
