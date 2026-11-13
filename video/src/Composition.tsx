import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

export type ShortProps = {
  brand: string;
  hook: string;
  narration: string[];
  tip: string;
  action: string;
  cta: string;
  audioSrc?: string;
  musicSrc?: string;
  visualTheme?: "study" | "bedtime";
};

type BeatProps = {
  label: string;
  text: string;
  accent: string;
  beat: number;
  scene: number;
  visualTheme?: "study" | "bedtime";
};

const SceneArt: React.FC<{
  scene: number;
  visualTheme?: "study" | "bedtime";
}> = ({ scene, visualTheme = "study" }) => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [0, 18], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const timer = scene === 2 || scene === 3;
  const family = scene === 1 || scene === 4;
  if (visualTheme === "bedtime") {
    return (
      <div
        style={{
          position: "absolute",
          top: 205,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity,
          transform: `translateY(${rise}px)`,
        }}
      >
        <svg
          width="760"
          height="410"
          viewBox="0 0 760 410"
          role="img"
          aria-label="Ilustração de uma rotina tranquila antes de dormir"
        >
          <ellipse cx="380" cy="354" rx="285" ry="34" fill="#070f2c" opacity=".28" />
          <circle cx="380" cy="185" r="145" fill="#354d80" />
          <circle cx="380" cy="185" r="119" fill="#c7d3e9" />
          <rect x="220" y="110" width="190" height="154" rx="12" fill="#182b50" stroke="#fff2cf" strokeWidth="10" />
          <path d="M315 112v150m-93-76h186" stroke="#fff2cf" strokeWidth="8" />
          <path d="M350 147a28 28 0 1 0 38 38 35 35 0 0 1-38-38" fill="#f5c86b" />
          <path d="m258 145 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2zM438 130l4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1z" fill="#fff2cf" />
          <rect x="300" y="270" width="260" height="62" rx="18" fill="#244364" stroke="#fff2cf" strokeWidth="8" />
          <path d="M300 301h260v52H300z" fill="#91d6b2" stroke="#124438" strokeWidth="8" />
          <rect x="320" y="280" width="88" height="38" rx="17" fill="#fff4dc" />
          <path d="M300 353v18m260-18v18" stroke="#124438" strokeWidth="12" strokeLinecap="round" />
          {scene % 2 === 1 && (
            <g>
              <path d="M490 255v-54q35-38 70 0v54" fill="#f5c86b" stroke="#124438" strokeWidth="8" />
              <path d="M476 255h98" stroke="#124438" strokeWidth="10" strokeLinecap="round" />
              <circle cx="525" cy="188" r="8" fill="#fff4dc" />
            </g>
          )}
        </svg>
      </div>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 205,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${rise}px)`,
      }}
    >
      <svg
        width="760"
        height="410"
        viewBox="0 0 760 410"
        role="img"
        aria-label="Ilustração de uma rotina de estudo em família"
      >
        <ellipse
          cx="380"
          cy="354"
          rx="285"
          ry="34"
          fill="#0b352d"
          opacity=".24"
        />
        <circle
          cx="380"
          cy="185"
          r="145"
          fill={scene % 2 ? "#2b8067" : "#28745f"}
        />
        <circle cx="380" cy="185" r="119" fill="#e6b879" />
        {timer ? (
          <g>
            <rect
              x="278"
              y="115"
              width="205"
              height="168"
              rx="28"
              fill="#fff4dc"
              stroke="#124438"
              strokeWidth="12"
            />
            <rect
              x="306"
              y="145"
              width="149"
              height="80"
              rx="12"
              fill="#d6ead9"
            />
            <text
              x="380"
              y="203"
              textAnchor="middle"
              fill="#124438"
              fontFamily="Arial"
              fontSize="52"
              fontWeight="700"
            >
              05:00
            </text>
            <circle cx="380" cy="253" r="12" fill="#e8a64d" />
            <path
              d="M350 102v-24h60v24"
              fill="none"
              stroke="#124438"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M323 306l-40 39m154-39 40 39"
              stroke="#124438"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <g>
            <rect
              x="177"
              y="263"
              width="406"
              height="28"
              rx="14"
              fill="#124438"
            />
            <path
              d="M209 290v59m342-59v59"
              stroke="#124438"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <rect
              x="273"
              y="223"
              width="105"
              height="39"
              rx="5"
              transform="rotate(-8 273 223)"
              fill="#fff4dc"
            />
            <path
              d="M286 239l76-11m-72 25 54-8"
              stroke="#91bca0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="409"
              y="219"
              width="72"
              height="45"
              rx="5"
              fill="#e8a64d"
            />
            <path
              d="M424 232h42m-42 13h32"
              stroke="#fff4dc"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx={family ? 274 : 310} cy="130" r="40" fill="#6b3c2b" />
            <path
              d="M232 252q1-81 42-81t42 81"
              fill="#91d6b2"
              stroke="#124438"
              strokeWidth="8"
            />
            <circle cx={family ? 481 : 464} cy="128" r="36" fill="#593b2c" />
            <path
              d="M425 252q0-75 56-75t56 75"
              fill="#f5c86b"
              stroke="#124438"
              strokeWidth="8"
            />
            {family && (
              <path
                d="M324 151q58-36 112 0"
                fill="none"
                stroke="#fff4dc"
                strokeWidth="8"
                strokeLinecap="round"
              />
            )}
          </g>
        )}
        {scene === 4 && (
          <g>
            <path
              d="M531 81h110v67h-61l-25 22v-22h-24z"
              fill="#fff4dc"
              stroke="#124438"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            <circle cx="563" cy="114" r="5" fill="#e8a64d" />
            <circle cx="585" cy="114" r="5" fill="#e8a64d" />
            <circle cx="607" cy="114" r="5" fill="#e8a64d" />
          </g>
        )}
        {scene === 5 && (
          <g>
            <path
              d="M300 178l80-62 80 62v95H300z"
              fill="#fff4dc"
              stroke="#124438"
              strokeWidth="10"
              strokeLinejoin="round"
            />
            <path
              d="M355 273v-62h50v62"
              fill="#e8a64d"
              stroke="#124438"
              strokeWidth="8"
            />
            <path
              d="M380 81V49m-59 50-22-22m140 22 22-22"
              stroke="#f5c86b"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

const Beat: React.FC<BeatProps> = ({
  label,
  text,
  accent,
  beat,
  scene,
  visualTheme,
}) => {
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
      <SceneArt scene={scene} visualTheme={visualTheme} />
      <div
        style={{
          color: accent,
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
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
      <div
        style={{
          marginTop: 54,
          width: 180,
          height: 8,
          borderRadius: 8,
          backgroundColor: accent,
        }}
      />
    </AbsoluteFill>
  );
};

export const ShortVertical: React.FC<ShortProps> = ({
  brand,
  hook,
  narration,
  tip,
  action,
  cta,
  audioSrc,
  musicSrc,
  visualTheme = "study",
}) => {
  const beats: BeatProps[] = [
    {
      label: "Comece leve",
      text: hook,
      accent: "#F5C86B",
      beat: 0,
      scene: 0,
      visualTheme,
    },
    {
      label: "Uma ideia da semana",
      text:
        narration[0] ?? "Uma mudança pequena pode tornar o começo mais leve.",
      accent: "#91D6B2",
      beat: 1,
      scene: 1,
      visualTheme,
    },
    {
      label: "Experimente",
      text: narration[1] ?? "Combine um primeiro passo curto e sem pressão.",
      accent: "#91D6B2",
      beat: 2,
      scene: 2,
      visualTheme,
    },
    {
      label: "Dica prática",
      text: tip,
      accent: "#F5C86B",
      beat: 3,
      scene: 3,
      visualTheme,
    },
    {
      label: "Pequena ação",
      text: action,
      accent: "#91D6B2",
      beat: 4,
      scene: 4,
      visualTheme,
    },
    {
      label: "Rotina em Família",
      text: cta,
      accent: "#F5C86B",
      beat: 5,
      scene: 5,
      visualTheme,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          visualTheme === "bedtime"
            ? "linear-gradient(150deg, #101b3d 0%, #263b66 100%)"
            : "linear-gradient(150deg, #123F36 0%, #1B6854 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      {musicSrc ? (
        <Audio
          src={staticFile(musicSrc)}
          volume={(frame) =>
            interpolate(frame, [0, 30, 840, 900], [0, 0.12, 0.12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 80,
          color: "#fff9e9",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        {brand}
      </div>
      <div
        style={{
          position: "absolute",
          top: 74,
          right: 80,
          color: "#b9dfcb",
          fontSize: 22,
        }}
      >
        {visualTheme === "bedtime"
          ? "SONO • ROTINA • FAMÍLIA"
          : "ROTINA • ESTUDO • FAMÍLIA"}
      </div>
      {beats.map((beat, index) => (
        <Sequence key={beat.label} from={index * 150} durationInFrames={150}>
          <Beat {...beat} />
        </Sequence>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 86,
          left: 80,
          right: 80,
          height: 5,
          backgroundColor: "#ffffff45",
          borderRadius: 8,
        }}
      >
        <Progress />
      </div>
    </AbsoluteFill>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [0, 900], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: `${width * 100}%`,
        height: "100%",
        backgroundColor: "#f5c86b",
        borderRadius: 8,
      }}
    />
  );
};
