import { ImageResponse } from "next/og";

export const alt = "RecuperaJogo - Cobre a bet no Juizado. Sem advogado.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#05080C",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px",
            height: "900px",
            background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "#34D399", letterSpacing: "-0.02em", marginBottom: "24px", display: "flex" }}>
            RecuperaJogo
          </div>
          <div style={{ fontSize: "72px", fontWeight: 900, color: "#FFFFFF", textAlign: "center", maxWidth: "1000px", lineHeight: 1.1, display: "flex" }}>
            Cobre a bet no Juizado. Sem advogado.
          </div>
          <div style={{ fontSize: "32px", color: "#A1A1AA", textAlign: "center", marginTop: "32px", display: "flex" }}>
            Software de petição por R$ 137.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
