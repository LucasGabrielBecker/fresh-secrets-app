/** @jsx h */
import { h } from "preact";
import { Secret as ISecret } from "../utils/index.ts";
import { tw } from "@twind";

export default function Secret(props: { secret: ISecret }) {
  const date = new Intl.DateTimeFormat("en-US").format(
    new Date(props.secret.created_at)
  );
  return (
    <form
      action={`/api/secret/delete/${props.secret.id}`}
      method="POST"
      class={tw`group bg-white rounded-md  min-h-max`}
    >
      <div class={tw` py-4 px-8 rounded-md relative`}>
        <span class="flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-900 -top-4 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-gray-700"></span>
        </span>
        <p
          class={tw`text-lg text-bold text-verde-400 group-hover:text-gray-900 transition-all`}
        >
          {props.secret.description}
        </p>
      </div>
      <div
        class={tw`w-full border-t-[1px] border-gray-400 p-2 flex justify-between`}
      >
        <span class={tw`text-sm text-gray-400 ml-6`}>
          <i>@anonymous {date}</i>
        </span>
      </div>
    </form>
  );
}
