/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers } from "$fresh/server.ts";
import Pg from "../utils/database.ts";
import * as anime from "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  async POST(request: Request) {
    const formData = await request.formData();
    const secret = formData.get("secret") as string;
    Pg.startClient();
    await Pg.addOne({ description: secret });

    return Response.redirect("http://localhost:8000", 302);
  },
};

export default function CreateSecret() {
  return (
    <div
      style={{
        backgroundColor: "rgb(17 24 39)",
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 4 4"%3E%3Cpath fill="%231e3465" fill-opacity="0.28" d="M1 3h1v1H1V3zm2-2h1v1H3V1z"%3E%3C/path%3E%3C/svg%3E')`,
      }}
      class={tw`w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 to-indigo-900`}
    >
      <a
        href="/"
        id="link"
        class={tw`flex justify-center items-center py-2 rounded-full w-12 text-sm text-white absolute top-4 left-4 hover:bg-gradient-to-b from-bermuda to-bermuda-darker transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={tw`h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </a>
      <form method="POST" class={tw`flex justify-center items-center`}>
        <h1 class={tw`text-white text-bold text-xl pr-12`}>
          Share your secret, it won't leak.
        </h1>
        <input
          placeholder="Your darkest secret"
          name="secret"
          autoComplete="off"
          autoFocus
          autocorrect="off"
          class={tw`px-4 w-8/12 py-4 rounded-xl border-2 border-bermuda-darker outline-none focus:border-4 text-gray-700`}
        />
      </form>
    </div>
  );
}
