import React from "react";
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from "remotion";

const shots = [
  {start: 0, end: 90, speaker: "cida", text: "Moço, minha guia vence hoje! Ainda dá tempo?"},
  {start: 90, end: 210, speaker: "lia", text: "Dá… se o número do protocolo estiver certo."},
  {start: 210, end: 360, speaker: "lia", text: "Ai, não… troquei dois dígitos!"},
  {start: 270, end: 360, speaker: "nilo", text: "Respira. Onde confere?"},
  {start: 360, end: 510, speaker: "nilo", text: "No comprovante anterior. Devagar, mas certo."},
  {start: 510, end: 600, speaker: "lia", text: "Corrigindo… enviado!"},
  {start: 600, end: 660, speaker: "cida", text: "Obrigada!"},
  {start: 630, end: 720, speaker: "nilo", text: "Prazo salvo. Conferência salva dia."},
  {start: 690, end: 795, speaker: "nilo", text: "Lia… amanhã tem fila dobrada e um cadastro novo."},
  {start: 795, end: 900, speaker: "lia", text: "Cadastro novo? Que tipo de cadastro?"},
];
const voices = [
  [0, "CIDA.wav"], [90, "LIA1.wav"], [210, "LIA2.wav"], [270, "NILO1.wav"],
  [360, "NILO2.wav"], [510, "LIA3.wav"], [600, "CIDA2.wav"], [630, "NILO3.wav"],
  [690, "NILO4.wav"], [795, "LIA4.wav"],
] as const;

const Character: React.FC<{name: "lia" | "nilo" | "cida"; x: string; y: string; scale?: number}> = ({name, x, y, scale = 1}) => {
  const frame = useCurrentFrame();
  const speaking = shots.some((s) => s.speaker === name && frame >= s.start && frame < s.end);
  const bob = Math.sin(frame / 8 + (name === "nilo" ? 1 : name === "cida" ? 2 : 0)) * 4;
  const mouth = speaking && Math.floor(frame / 4) % 2 === 0 ? 13 : 5;
  const skin = name === "nilo" ? "#b66f4e" : name === "cida" ? "#d99470" : "#e6a583";
  const shirt = name === "nilo" ? "#326d67" : name === "cida" ? "#bd5860" : "#efb845";
  const hair = name === "nilo" ? "#3a302d" : name === "cida" ? "#463731" : "#53362f";
  const handX = speaking ? Math.sin(frame / 5) * 20 : 0;
  return <div style={{position: "absolute", left: x, top: `calc(${y} + ${bob}px)`, width: 250, height: 470, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "bottom center"}}>
    <svg width="250" height="470" viewBox="0 0 250 470">
      <ellipse cx="126" cy="452" rx="88" ry="13" fill="#123f37" opacity=".22"/>
      <path d="M30 452 Q31 300 73 275 L178 275 Q220 310 222 452Z" fill={shirt}/>
      <path d="M92 275 L127 319 L161 275" fill="#fff3db" opacity=".8"/>
      <path d={`M53 300 Q${40 + handX} 350 ${45 + handX} 387`} fill="none" stroke={skin} strokeWidth="24" strokeLinecap="round"/>
      <path d={`M195 300 Q${210 - handX} 350 ${205 - handX} 387`} fill="none" stroke={skin} strokeWidth="24" strokeLinecap="round"/>
      <rect x="87" y="228" width="78" height="67" rx="25" fill={skin}/>
      <ellipse cx="126" cy="159" rx="82" ry="97" fill={skin}/>
      {name === "lia" ? <path d="M46 163 Q28 58 112 54 Q179 40 204 121 Q177 98 149 102 Q106 70 49 121Z" fill={hair}/> : null}
      {name === "nilo" ? <path d="M46 145 Q37 52 126 57 Q202 57 207 142 Q173 98 126 110 Q81 94 46 145Z" fill={hair}/> : null}
      {name === "cida" ? <path d="M42 175 Q20 62 107 55 Q198 48 211 159 L197 249 L178 235 L185 142 Q123 90 55 141 L59 245 L42 258Z" fill={hair}/> : null}
      <ellipse cx="94" cy="162" rx="8" ry="10" fill="#342e2b"/><ellipse cx="158" cy="162" rx="8" ry="10" fill="#342e2b"/>
      <path d="M95 207 Q126 225 157 207" fill="none" stroke="#8f4d43" strokeWidth="5" strokeLinecap="round"/>
      <ellipse cx="126" cy="199" rx="13" ry={mouth} fill="#7d3b3a"/>
      {name === "nilo" ? <path d="M75 186 Q126 217 178 186" fill="none" stroke="#6a4439" strokeWidth="6"/> : null}
      {name === "lia" ? <rect x="56" y="438" width="58" height="12" rx="6" fill="#efeee7"/> : null}
      {name === "nilo" ? <rect x="143" y="438" width="60" height="12" rx="6" fill="#efeee7"/> : null}
      {name === "cida" ? <path d="M64 355 L95 350 L102 392 L72 396Z" fill="#fff4dc" stroke="#b8a98d" strokeWidth="3"/> : null}
    </svg>
    <div style={{position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", color: "#fff8e9", fontSize: 22, letterSpacing: 2, fontWeight: 800, textShadow: "0 2px 4px #34231c"}}>{name === "lia" ? "LIA · 17" : name === "nilo" ? "SEU NILO · 52" : "DONA CIDA"}</div>
  </div>;
};

export const Microdrama: React.FC = () => {
  const frame = useCurrentFrame();
  const active = [...shots].reverse().find((s) => frame >= s.start && frame < s.end);
  const scene = frame < 210 ? 0 : frame < 510 ? 1 : frame < 690 ? 2 : 3;
  const camera = interpolate(frame, [0, 270, 510, 690, 900], [1, 1.04, 1, 1.03, 1], {extrapolateRight: "clamp"});
  return <AbsoluteFill style={{backgroundColor: "#f2c78e", fontFamily: "Arial, sans-serif", overflow: "hidden"}}>
    <AbsoluteFill style={{background: "linear-gradient(180deg,#f6d7a7 0%,#eebc7f 65%,#b76c50 65%,#8b4c3c 100%)"}}/>
    <div style={{position: "absolute", top: 80, left: 80, right: 80, height: 148, borderRadius: 22, background: "#244c43", color: "#fff1ce", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 44px", boxShadow: "0 15px 0 #183d36"}}>
      <div><div style={{fontSize: 22, letterSpacing: 4, color: "#e8ba66"}}>DESPACHANTE DO SEU NILO</div><div style={{fontSize: 41, fontWeight: 900, marginTop: 7}}>ÚLTIMA HORA</div></div>
      <div style={{fontSize: 36, fontWeight: 800, border: "4px solid #e9bd70", borderRadius: 18, padding: "12px 20px"}}>17:58</div>
    </div>
    <div style={{position: "absolute", top: 280, left: 70, right: 70, bottom: 190, transform: `scale(${camera})`, transformOrigin: "center bottom"}}>
      <div style={{position: "absolute", left: 0, right: 0, bottom: 36, height: 140, background: "linear-gradient(180deg,#a76345,#7d4938)", borderRadius: "24px 24px 10px 10px", boxShadow: "0 18px 0 #6d3e32"}}/>
      <div style={{position: "absolute", left: "34%", right: "34%", bottom: 110, height: 45, background: "#e6b56d", borderRadius: 10, transform: "skew(-12deg)"}}/>
      <div style={{position: "absolute", left: "48%", top: "20%", width: 142, height: 110, background: "#203b3b", border: "10px solid #e6b56d", borderRadius: 14, boxShadow: "0 18px 0 #825038"}}>
        <div style={{padding: 10, color: "#cff0ce", fontWeight: 700, fontSize: 16, lineHeight: 1.4}}>PROTOCOLO<br/>18-74-029<br/>STATUS: ?</div>
      </div>
      <Character name="lia" x="38%" y="28%" scale={0.9}/>
      <Character name="nilo" x="67%" y="27%" scale={0.9}/>
      <Character name="cida" x="14%" y="48%" scale={0.68}/>
    </div>
    {active ? <div style={{position: "absolute", bottom: 95, left: 80, right: 80, minHeight: 102, padding: "24px 34px", borderRadius: 28, background: "#fff8e9", border: "5px solid #244c43", boxShadow: "0 12px 0 #8b4c3c", color: "#253c34", fontSize: 35, lineHeight: 1.16, fontWeight: 800, textAlign: "center"}}><span style={{fontSize: 20, letterSpacing: 2, color: "#b15e47", display: "block", marginBottom: 8}}>{active.speaker === "cida" ? "DONA CIDA" : active.speaker === "lia" ? "LIA" : "SEU NILO"}</span>{active.text}</div> : null}
    <div style={{position: "absolute", top: 254, right: 96, color: "#fff5dc", fontSize: 19, fontWeight: 700, letterSpacing: 2}}>{scene === 0 ? "O PRAZO TERMINA HOJE" : scene === 1 ? "UM DETALHE MUDA TUDO" : scene === 2 ? "PROTOCOLO CORRIGIDO" : "CONTINUA…"}</div>
    <Audio src={staticFile("microdramas/rot125/rot125-bed.wav")} volume={0.12}/>
    {voices.map(([start, file]) => <Sequence key={file} from={start} durationInFrames={900 - start}><Audio src={staticFile(`microdramas/rot125/${file}`)} volume={1}/></Sequence>)}
  </AbsoluteFill>;
};
