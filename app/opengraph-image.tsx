import { ImageResponse } from "next/og";

export const alt = "RecuperaJogo - Recupere seu dinheiro das bets";
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
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
          <div style={{ fontSize: "80px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.05em", marginBottom: "-10px" }}>
            Recupera<span style={{ color: "#34D399" }}>Jogo</span>
          </div>

          <div style={{ fontSize: "32px", color: "#A1A1AA", textAlign: "center", maxWidth: "800px", marginTop: "30px", lineHeight: 1.3 }}>
            As bets levaram seu dinheiro? Cobre na Justiça <strong>sem advogado</strong> por apenas R$ 137.
          </div>

          <div style={{ display: "flex", gap: "20px", marginTop: "50px" }}>
            <div style={{ padding: "15px 30px", background: "#34D399", color: "#000", fontWeight: "bold", borderRadius: "8px", fontSize: "24px" }}>
              Gerar Petição Agora
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
