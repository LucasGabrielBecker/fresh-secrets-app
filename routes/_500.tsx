/** @jsx h */
import { h } from "preact";
import { ErrorPageProps } from "$fresh/server.ts";

export default function Error500Page({ error }: ErrorPageProps) {
  console.error(error);
  console.log(error.stack);
  return <p>500 internal error</p>;
}
