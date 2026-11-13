import { Composition } from "remotion";
import { ShortVertical, ShortProps } from "./Composition";

const example: ShortProps = {
  brand: "ROTINA EM FAMÍLIA",
  hook: "A parte mais difícil\ndo estudo pode ser\ncomeçar.",
  narration: [
    "Na família fictícia de Mara e Theo, abrir o caderno parecia difícil.",
    "Eles combinaram tentar só cinco minutos, sem pressão para continuar.",
  ],
  tip: "Deixe um cronômetro visível e escolham esse primeiro tempo juntos.",
  action: "Quando terminar, conversem: parar ou continuar?",
  cta: "Adapte à rotina de vocês. Como o começo fica mais leve?",
  audioSrc: "audio/short-estudo.wav",
  musicSrc: "audio/short-estudo-bed.wav",
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ShortVertical"
      component={ShortVertical}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={example}
    />
  </>
);
