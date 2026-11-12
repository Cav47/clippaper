import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";

export type ShortProps = {
  brand: string;
  hook: string;
  narration: string[];
  tip: string;
  action: string;
  cta: string;
};

type BeatProps = {
  label: string;
  text: string;
  accent: string;
  beat: number;
};

const Beat: React.FC<BeatProps> = ({ label, text, accent, beat }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18, 132, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const translateY = interpolate(frame, [0, 18], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: "130px 100px 170px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ color: accent, fontSize: 34, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase" }}>
        {label}
      </div>
      <div
        style={{
          color: "#fff9e9",
          fontSize: beat === 0 ? 88 : 70,
          lineHeight: 1.13,
          fontWeight: 750,
          marginTop: 38,
          maxWidth: 880,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
      <div style={{ marginTop: 54, width: 180, height: 8, borderRadius: 8, backgroundColor: accent }} />
    </AbsoluteFill>
  );
};

export const ShortVertical: React.FC<ShortProps> = ({ brand, hook, narration, tip, action, cta }) => {
  const beats: BeatProps[] = [
    { label: "Comece leve", text: hook, accent: "#F5C86B", beat: 0 },
    { label: "Uma ideia da semana", text: narration[0] ?? "Uma mudança pequena pode tornar o começo mais leve.", accent: "#91D6B2", beat: 1 },
    { label: "Experimente", text: narration[1] ?? "Combine um primeiro passo curto e sem pressão.", accent: "#91D6B2", beat: 2 },
    { label: "Dica prática", text: tip, accent: "#F5C86B", beat: 3 },
    { label: "Pequena ação", text: action, accent: "#91D6B2", beat: 4 },
    { label: "Rotina em Família", text: cta, accent: "#F5C86B", beat: 5 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(150deg, #123F36 0%, #1B6854 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: 72, left: 80, color: "#fff9e9", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
        {brand}
      </div>
      <div style={{ position: "absolute", top: 74, right: 80, color: "#b9dfcb", fontSize: 22 }}>
        {"ROTINA • ESTUDO • FAMÍLIA"}
      </div>
      {beats.map((beat, index) => (
        <Sequence key={beat.label} from={index * 150} durationInFrames={150}>
          <Beat {...beat} />
        </Sequence>
      ))}
      <div style={{ position: "absolute", bottom: 86, left: 80, right: 80, height: 5, backgroundColor: "#ffffff45", borderRadius: 8 }}>
        <Progress />
      </div>
    </AbsoluteFill>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [0, 900], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ width: `${width * 100}%`, height: "100%", backgroundColor: "#f5c86b", borderRadius: 8 }} />;
};
