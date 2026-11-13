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

const bedtimeExample: ShortProps = {
  brand: "ROTINA EM FAMÍLIA",
  hook: "A hora de dormir\nvira negociação?",
  narration: [
    "Na família fictícia de Ana e Lucas, o fim do dia era difícil.",
    "Eles tentam banheiro, pijama e uma história curta. Um aviso dez minutos antes sinaliza a transição.",
  ],
  tip: "Escolha três passos simples e mantenha a ordem por alguns dias.",
  action: "Hoje, experimente o aviso e a sequência.",
  cta: "Adapte à família. O que funciona por aí?",
  audioSrc: "audio/short-sono.wav",
  musicSrc: "audio/short-sono-bed.wav",
  visualTheme: "bedtime",
};

const mealsExample: ShortProps = {
  brand: "ROTINA EM FAMÍLIA",
  hook: "A refeição vira batalha?",
  narration: [
    "Na família fictícia de Renata e Marcos, o filho deixava o prato quase cheio e a hora de comer virava cobrança.",
    "Eles pararam de comentar a quantidade no prato e passaram a comer junto, com a conversa leve. A criança passou a se servir sozinha e a refeição ficou mais leve.",
  ],
  tip: "Ofereça variedade sem forçar, coma junto e mantenha a conversa sem comentar quanto o filho comeu.",
  action: "Na próxima refeição, sente-se junto e não faça comentários sobre quanto o filho comeu.",
  cta: "Cada família pode adaptar ao próprio ritmo. O que funciona por aí?",
  audioSrc: "audio/short-refeicoes.wav",
  musicSrc: "audio/short-refeicoes-bed.wav",
  visualTheme: "meals",
};

const comunicacaoExample: ShortProps = {
  brand: "ROTINA EM FAMÍLIA",
  hook: "Perguntar 'como foi na escola?' vira interrogatório?",
  narration: [
    "Na família fictícia de Camila e Daniel, o filho respondia 'bem' ou ficava em silêncio quando perguntado sobre o dia.",
    "Eles decidiram começar contando algo simples do próprio dia primeiro, sem pressionar. A criança passou a comentar espontaneamente aos poucos.",
  ],
  tip: "Comece contando algo simples do seu dia e espere; aceite respostas curtas sem insistir.",
  action: "Na próxima chegada, conte uma coisa pequena do seu dia antes de perguntar sobre o dia da criança.",
  cta: "Cada família pode adaptar ao próprio ritmo. O que funciona por aí?",
  audioSrc: "audio/short-comunicacao.wav",
  musicSrc: "audio/short-comunicacao-bed.wav",
  visualTheme: "comunicacao",
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
    <Composition
      id="ShortSono"
      component={ShortVertical}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={bedtimeExample}
    />
    <Composition
      id="ShortRefeicoes"
      component={ShortVertical}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={mealsExample}
    />
    <Composition
      id="ShortComunicacao"
      component={ShortVertical}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={comunicacaoExample}
    />
  </>
);
