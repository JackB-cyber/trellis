import { ImageResponse } from "next/og";

export const alt =
  "Trellis Digital — Web Design for Canadian Small Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colours mirror --color-* tokens in globals.css
const abyss = "#060A08";
const bone = "#F1EBE0";
const gold = "#B8782A";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: abyss,
          backgroundImage:
            "radial-gradient(ellipse 75% 55% at 60% 30%, rgba(27,51,40,0.55), rgba(6,10,8,0))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 48, height: 2, backgroundColor: gold }} />
          <div
            style={{
              color: gold,
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Canadian Web Design
          </div>
        </div>

        <div
          style={{
            color: bone,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Your local business deserves a website that works.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ color: bone, fontSize: 34, fontWeight: 700 }}>
            Trellis Digital
          </div>
          <div style={{ color: gold, fontSize: 28 }}>trellisdigital.ca</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
