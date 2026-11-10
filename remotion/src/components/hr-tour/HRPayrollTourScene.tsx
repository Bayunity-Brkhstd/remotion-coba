import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HRPayrollTourScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated Cursor movement from bottom-right to the "Hitung Payroll" button
  const cursorX = interpolate(frame, [15, 60], [1200, 850], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [15, 60], [800, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorClick = spring({
    frame: Math.max(0, frame - 65),
    fps,
    config: { damping: 8, stiffness: 200 },
  });
  const buttonScale = interpolate(cursorClick, [0, 1], [1, 0.94]);

  // Calculating counters (Frame 70 to 140)
  const calcProgress = interpolate(frame, [70, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const totalPayroll = Math.round(calcProgress * 1248000000);
  const taxCalculated = Math.round(calcProgress * 118400000);
  const formattedPayroll = `Rp ${totalPayroll.toLocaleString("id-ID")}`;
  const formattedTax = `Rp ${taxCalculated.toLocaleString("id-ID")}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080c16",
        display: "flex",
        flexDirection: "column",
        padding: "40px 80px",
      }}
    >
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <div style={{ fontSize: "1.1rem", color: "#38bdf8", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Tur Fitur 02 · Payroll Otomatis
          </div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, margin: "8px 0 0", color: "#ffffff" }}>
            Sinkronisasi Pajak PPh 21 & BPJS
          </h2>
        </div>

        {/* Action Button */}
        <div
          style={{
            transform: `scale(${buttonScale})`,
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            padding: "16px 36px",
            borderRadius: "14px",
            fontWeight: 800,
            fontSize: "1.2rem",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span>⚡</span>
          <span>Proses Rekapitulasi Gaji</span>
        </div>
      </div>

      {/* Main Calculation Dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", flex: 1 }}>
        {/* Left: Calculation Breakdown */}
        <div
          style={{
            backgroundColor: "#0f172a",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#94a3b8" }}>
              Total Pembayaran Gaji Bersih
            </div>
            <div style={{ fontSize: "3.6rem", fontWeight: 900, color: "#10b981", marginTop: "12px", letterSpacing: "-0.03em" }}>
              {formattedPayroll}
            </div>

            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                <span style={{ color: "#94a3b8" }}>Pajak PPh 21 (TER Terbaru)</span>
                <span style={{ fontWeight: 700, color: "#f8fafc" }}>{formattedTax}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                <span style={{ color: "#94a3b8" }}>BPJS TK & Kesehatan (4%)</span>
                <span style={{ fontWeight: 700, color: "#38bdf8" }}>Otomatis Potong</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                <span style={{ color: "#94a3b8" }}>Slip Gaji Terenkripsi</span>
                <span style={{ fontWeight: 700, color: "#10b981" }}>1,248 Siap Terbit</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#64748b", marginBottom: "8px" }}>
              <span>Validasi Rekening Bank</span>
              <span style={{ color: "#38bdf8" }}>{Math.round(calcProgress * 100)}%</span>
            </div>
            <div style={{ height: "10px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${calcProgress * 100}%`, height: "100%", backgroundColor: "#38bdf8", borderRadius: "5px" }} />
            </div>
          </div>
        </div>

        {/* Right: Real-time Slip Preview Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { name: "Andi Wijaya", dep: "Product Strategy", amount: "Rp 18.500.000", status: "Siap Kirim" },
            { name: "Nadia Saraswati", dep: "People Ops", amount: "Rp 14.200.000", status: "Siap Kirim" },
            { name: "Budi Santoso", dep: "Infrastructure", amount: "Rp 21.000.000", status: "Siap Kirim" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff" }}>{item.name}</div>
                <div style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "4px" }}>{item.dep}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#f8fafc" }}>{item.amount}</div>
                <div style={{ fontSize: "0.85rem", color: "#10b981", fontWeight: 600, marginTop: "4px" }}>✓ {item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          pointerEvents: "none",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
          zIndex: 10,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M4 3L11 21L14 14L21 11L4 3Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
