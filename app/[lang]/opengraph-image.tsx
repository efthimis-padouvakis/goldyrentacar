import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CRETE_MAP } from "@/lib/creteMap";

export const alt = "Goldy Rent a Car – Car rental in Crete";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/img/brand/logo.svg"), "base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #0f3e41 0%, #052427 75%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg
          viewBox={`0 0 ${CRETE_MAP.width} ${CRETE_MAP.height}`}
          width={900}
          height={(900 * CRETE_MAP.height) / CRETE_MAP.width}
          style={{ position: "absolute", right: -120, bottom: 40, opacity: 0.55 }}
        >
          <path d={CRETE_MAP.path} fill="none" stroke="#239693" strokeOpacity={0.25} strokeWidth={40} strokeLinejoin="round" />
          <path d={CRETE_MAP.path} fill="#124c4e" stroke="#45b2ae" strokeWidth={2} />
        </svg>
        <img src={`data:image/svg+xml;base64,${logo}`} alt="" width={290} height={70} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Car rental in Crete</div>
          <div style={{ marginTop: 22, fontSize: 34, color: "rgba(255,255,255,0.75)" }}>Heraklion & Chania airport · Unlimited km · Cover included</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 28 }}>
          <div style={{ display: "flex", background: "#e3b752", color: "#052427", padding: "12px 28px", borderRadius: 999, fontWeight: 800 }}>from €15/day</div>
          <div style={{ display: "flex", border: "2px solid rgba(255,255,255,0.3)", padding: "12px 28px", borderRadius: 999 }}>goldyrentacar.gr</div>
        </div>
      </div>
    ),
    size,
  );
}
