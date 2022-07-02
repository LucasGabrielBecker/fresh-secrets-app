/** @jsx h */
import { h } from "preact";
import { Handlers } from "$fresh/server.ts";
import { tw } from "@twind";
import { Secret as ISecret } from "../utils/index.ts";
import Pg from "../utils/database.ts"
import sql from "../utils/connection.ts"
import Secret from "../components/Secret.tsx";

export const handler = async (_req: Request, ctx: HandlerContext): Response => {
  const secrets = await sql`select * from secrets`
  return ctx.render(secrets);
};

export default function HomePage(props: { data: ISecret[] }) {
  const secrets = props.data;
  return (
    <div
      class={tw`flex gap-2 w-full h-screen flex-col mx-auto p-12 bg-[#141414]`}
      style={{
        backgroundColor: "#141414",
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="28" height="49" viewBox="0 0 28 49"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="hexagons" fill="%23171717" fill-opacity="0.4" fill-rule="nonzero"%3E%3Cpath d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');`,
      }}
    >
      {secrets.map((secret: ISecret) => (
        <Secret secret={secret} />
      ))}
      <a
        href="/new"
        class={tw`px-4 py-2 rounded-full bg-verde-300 text-sm text-bold text-white absolute bottom-4 left-4 hover:bg-verde-400 transition-all`}
      >
        Share a secret
      </a>
    </div>
  );
}
