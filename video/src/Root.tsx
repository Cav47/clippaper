import { Composition } from "remotion";
import { ShortVertical, ShortProps } from "./Composition";

const example: ShortProps = {
  brand: "ROTINA EM FAMÍLIA",
  hook: "A parte mais difícil\ndo estudo não é\no conteúdo.\nÉ começar.",
  narration: [
    "Na família fictícia de Mara e Theo, o filho adiava abrir o caderno.",
    "Eles combinaram: só cinco minutos, sem pressão, depois a gente vê.",
  ],
  tip: "Use um cronômetro visível e combine cinco minutos, sem pressão.",
  action: "Na próxima tarefa, proponha o combinado e deixe o cronômetro à vista.",
  cta: "Teste essa semana e veja como funciona na sua casa.",
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
