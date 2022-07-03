/** @jsx h */
import { h } from "preact";
import { Secret as ISecret, Comment } from "../utils/index.ts";
import { tw } from "@twind";

export default function Secret(props: { secret: ISecret }) {
  const date = new Intl.DateTimeFormat("en-US").format(
    new Date(props.secret.created_at)
  );
  const commentsAmount = props.secret.comments?.length as number;
  return (
    <div class={tw`group bg-white rounded-md  min-h-max`}>
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
      <div class={tw`group`}>
        <div
          class={tw`group w-full border-t-[1px] border-gray-400 p-2 flex justify-between`}
        >
          <span class={tw`text-sm text-gray-400 ml-6`}>
            <i>@anonymous {date}</i>
          </span>
          <span class={tw`text-sm text-gray-400 mr-6`}>
            {commentsAmount} {commentsAmount > 1 ? "comentários" : "comentário"}
          </span>
        </div>
        <div class={tw`group px-4 py-2 transition-all`}>
          {commentsAmount
            ? props.secret.comments?.map((comment) => (
                <div
                  class={tw`hidden flex flex-row justify-between h-12 -translate-y-6
                  group-hover:flex group-hover:translate-y-0 transition-all ease-in duration-300 border border-gray-200 px-6 py-2 rounded-md mb-2`}
                >
                  <p>{comment.content}</p>
                  <div class={tw`flex`}>
                    <form
                      action={`/api/comment/upvote/${comment.id}`}
                      method="POST"
                    >
                      <button class={tw`flex px-4 items-center justify-center`}>
                        {comment.upvotes}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class={tw`h-4 w-4 ml-1`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                      </button>
                    </form>
                    <form
                      action={`/api/comment/downvote/${comment.id}`}
                      method="POST"
                    >
                      <button class={tw`flex px-4 items-center justify-center`}>
                        {comment.downvotes}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class={tw`h-4 w-4 ml-1`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
