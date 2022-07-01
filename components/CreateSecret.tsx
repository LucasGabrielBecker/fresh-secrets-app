/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export function CreateSecret() {
  return (
    <form
      action="/api/secret"
      method="POST"
      class={tw`mx-auto w-full bg-gray-300`}
    >
      <h1>Share your secret, it wont leak.</h1>
      <input
        placeholder="Insert your dirtier secret in here"
        name="secret"
        class={tw`px-12 py-4 border border-teal-200`}
      />
    </form>
  );
}
