import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#05080C",
          color: "#fff",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 28, color: "#34d399", marginBottom: 16 }}>RecuperaJogo</div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Contra as bets. Petição para o Juizado.
        </div>
        <div style={{ fontSize: 24, color: "#9ca3af", marginTop: 24 }}>
          Software da Primex Sistemas · R$ 137 · não é advocacia
        </div>
      </div>
    ),
    { ...size }
  );
}
