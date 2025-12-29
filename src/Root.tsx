import { Composition } from "remotion";
import { NewsVideo } from "./NewsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NewsVideo"
        component={NewsVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "VÍDEO MOSTRA A RETIRADA DOS DESTROÇOS DE AVIÃO DE PUBLICIDADE QUE CAIU NO MAR DE COPACABANA",
          imageUrl: "https://iafeed.com.br/uploads/2025/12/29/image_1767030770_6952bff24832c.webp",
        }}
      />
    </>
  );
};
