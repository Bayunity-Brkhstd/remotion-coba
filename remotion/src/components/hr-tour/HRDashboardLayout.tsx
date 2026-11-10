import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HRDashboardLayout: React.FC<{
  activeTab?: string;
  focusWidget?: "overview" | "leave" | "payroll" | "analytics";
  cameraZoom?: number;
  cameraTranslateX?: number;
  cameraTranslateY?: number;
}> = ({
  activeTab = "Dashboard",
  focusWidget = "overview",
  cameraZoom = 1,
  cameraTranslateX = 0,
  cameraTranslateY = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const dashboardOpacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#090d16",
        color: "#f8fafc",
        display: "flex",
        overflow: "hidden",
        transform: `scale(${cameraZoom}) translate(${cameraTranslateX}px, ${cameraTranslateY}px)`,
        transformOrigin: "center center",
        opacity: dashboardOpacity,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          height: "100%",
          backgroundColor: "#0f172a",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          padding: "32px 24px",
          flexShrink: 0,
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.3rem",
            }}
          >
            P
          </div>
          <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Pulse<span style={{ color: "#6366f1" }}>HR</span>
          </span>
        </div>

        {/* Navigation Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { label: "Dashboard", icon: "📊" },
            { label: "Karyawan", icon: "👥" },
            { label: "Cuti & Izin", icon: "🗓️" },
            { label: "Payroll", icon: "💳" },
            { label: "Kinerja", icon: "📈" },
            { label: "Pengaturan", icon: "⚙️" },
          ].map((item, idx) => {
            const isActive = item.label === activeTab;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backgroundColor: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                  color: isActive ? "#818cf8" : "#94a3b8",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "1.05rem",
                  borderLeft: isActive ? "3px solid #6366f1" : "3px solid transparent",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* User Card at Bottom */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            AD
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Alya Danastri</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Head of People</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div
          style={{
            height: "80px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Overview Tim & Operasional</h1>
            <p style={{ margin: "4px 0 0", fontSize: "0.9rem", color: "#64748b" }}>
              Update real-time · Selasa, 10 November 2026
            </p>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                fontWeight: 700,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
              Sistem Aktif & Aman
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", gap: "28px", flex: 1 }}>
          {/* Key Metric Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { label: "Total Karyawan", val: "1,248", change: "+12 bulan ini", color: "#6366f1" },
              { label: "Tingkat Kehadiran", val: "98.6%", change: "Optimal", color: "#10b981" },
              { label: "Pengajuan Cuti", val: "14", change: "Perlu approval", color: "#f59e0b" },
              { label: "Payroll Bulan Ini", val: "100%", change: "Terverifikasi", color: "#06b6d4" },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "0.9rem", color: "#94a3b8", fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "8px", color: stat.color }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "6px" }}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Lower Two-Column Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px", flex: 1 }}>
            {/* Left: Pending Approvals / Activity */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>Pengajuan Cuti Menunggu Tindakan</div>
                <div style={{ fontSize: "0.9rem", color: "#6366f1", fontWeight: 600 }}>Lihat Semua (14)</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { name: "Dimas Pratama", role: "Sr. Backend Engineer", type: "Cuti Tahunan", dur: "3 Hari", status: "Review" },
                  { name: "Siti Rahmawati", role: "Product Designer", type: "Cuti Sakit", dur: "1 Hari", status: "Lampiran Medis" },
                  { name: "Reza Mahendra", role: "Marketing Lead", type: "Cuti Menikah", dur: "4 Hari", status: "Review" },
                ].map((req, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 20px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1rem" }}>{req.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{req.role}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#38bdf8" }}>{req.type} ({req.dur})</div>
                      <div style={{ fontSize: "0.8rem", color: "#f59e0b", marginTop: "2px" }}>{req.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Payroll Status Overview */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>Jadwal Payroll Periode Ini</div>
                <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "4px" }}>
                  Batas approval akhir: 25 November 2026
                </p>

                <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 600 }}>
                      <span>Kesiapan Data Gaji</span>
                      <span style={{ color: "#10b981" }}>94% Selesai</span>
                    </div>
                    <div style={{ height: "8px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "4px", marginTop: "8px", overflow: "hidden" }}>
                      <div style={{ width: "94%", height: "100%", backgroundColor: "#10b981", borderRadius: "4px" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <span style={{ color: "#94a3b8" }}>Pajak PPh 21 Otomatis</span>
                    <span style={{ color: "#10b981", fontWeight: 700 }}>Terkalkulasi</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <span style={{ color: "#94a3b8" }}>BPJS Ketenagakerjaan</span>
                    <span style={{ color: "#10b981", fontWeight: 700 }}>Sinkron</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#4f46e5",
                  padding: "14px",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                1-Klik Transfer Gaji
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
