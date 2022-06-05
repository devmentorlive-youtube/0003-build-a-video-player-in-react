import "./globals.css";
import Page from "@/ui/page";

export default function App({ Component, pageProps }) {
  return (
    <Page
      id="0003-build-a-video-player-in-react"
      videoId="rYlwiJ0vr_4"
      title="Build an HTML5 Media Player using Modern React"
      description="In this lesson I teach you how to to build a responsive media player using react, nextjs, tailwind, and good programming habits!">
      <Component {...pageProps} />{" "}
    </Page>
  );
}
