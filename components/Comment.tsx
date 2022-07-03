/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Comment as iComment } from "../utils/typing.ts";
export const Comment = ({ comment }: { comment: iComment }) => {
  return (
    <div
      class={tw`hidden flex flex-row justify-between h-12 -translate-y-6
                  group-hover:flex group-hover:translate-y-0 transition-all ease-in duration-300 border border-gray-200 px-6 py-2 rounded-md mb-2`}
    >
      <p>{comment.content}</p>
      <div class={tw`flex`}>
        <form action={`/api/comment/upvote/${comment.id}`} method="POST">
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
        <form action={`/api/comment/downvote/${comment.id}`} method="POST">
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
  );
};
