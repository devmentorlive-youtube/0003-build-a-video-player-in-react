import { useState, useEffect } from "react";
import Head from "next/head";
import GithubIcon from "@/ui/icons/github";
import YoutubeIcon from "@/ui/icons/youtube";

export default function Page({
  children,
  id,
  videoId = "",
  title,
  description,
}) {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => setTimeout(() => setOpacity(100), 500), []);

  return (
    <>
      {(title || description) && (
        <Head>
          {title && <title>{title}</title>}
          {description && (
            <meta name="description" content={description}></meta>
          )}
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      )}

      <div className="relative">
        <div
          className="absolute right-0 -top-8 transition-all duration-700 z-50 w-24"
          style={{ opacity }}>
          <div className="flex flex-col items-end justify-center h-[290px] md:h-screen">
            <div className="flex flex-col items-center gap-3 bg-gray-800 p-4 md:p-8 rounded-l-3xl">
              <div>
                <a
                  target="_blank"
                  href={`https://github.com/devmentorlive-youtube/${id}`}>
                  <div className="flex flex-col items-center w-full gap-1">
                    <GithubIcon className="text-white h-6 w-6 md:h-8 md:w-8 lg:h-12 lg:w-12" />
                    <div className="text-xs text-center">code</div>
                  </div>
                </a>
              </div>

              {videoId.length > 0 && (
                <div>
                  <a
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${videoId}`}>
                    <div className="flex flex-col items-center w-full">
                      <YoutubeIcon className="text-white h-6 w-6 md:h-8 md:w-8 lg:h-12 lg:w-12" />
                      <div className="text-xs text-center">tutorial</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
