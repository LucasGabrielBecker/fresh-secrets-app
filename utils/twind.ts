import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/texture.svg')",
      },
      colors: {
        bermuda: "#00C39A",
        "bermuda-darker": "#19a889",
        "verde-100": "#80F2FF",
        "verde-200": "#52C0CC",
        "verde-300": "#2E8E99",
        "verde-400": "#145E66",
        "verde-500": "#052E33",
      },
    },
  },
};
if (IS_BROWSER) setup(config);
