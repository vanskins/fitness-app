import { useState } from "react"
import { Form } from "@remix-run/react";
import moment from "moment"

type statusCardProps = {
  postedBy: any;
  createdAt: string;
  post: string;
  postId: string;
  comments: any[];
}

const StatusCard = ({ postedBy, createdAt, post, postId, comments }: statusCardProps) => {
  const [text, setText] = useState<string>("")

  const onChangeText = (e: { target: { value: string; }; }) => {
    setText(e.target.value)
  }
  return (
    <div className="shadow-md p-6 w-full mx-10 my-10 bg-gray-100">
      <div>
        <p className="text-xl font-bold text-blue-600">@{postedBy.firstName}</p>
        <p className="text-lg mb-4 text-gray-400">{moment(createdAt).fromNow()}</p>
        <p className="text-xl">{post}</p>
      </div>
      <br />
      <div className="max-h-[500px] overflow-auto">
        {
          comments.map((i: any, k: number) => {
            return (
              <div className="bg-white p-3 rounded-md my-6" key={k}>
                <div className="flex flex-row justify-between">
                  <p className="text-pink-500 font-bold">@{i.commentedBy.firstName}</p>
                  <p className="text-gray-400 font-normal">{moment(i.createdAt).fromNow()}</p>
                </div>
                <span className="text-black font-normal">{i.comment}</span>
              </div>
            )
          })
        }
      </div>
      <Form
        method="post"
        onSubmit={() => {
          setText("")
        }}
      >
        <div className="flex flex-row my-4">
          <input
            id={postId}
            className="w-full border-r-0 p-2 border-none rounded-md rounded-r-none border-gray-400 outline-none focus:border-blue-300"
            aria-label="comment"
            name="comment"
            type="text"
            onChange={onChangeText}
            value={text || ""}
            placeholder="Write a comment..."
          />
          <input value={postId} readOnly hidden name="postId" />
          <button
            name="intent"
            value="postComment"
            className="bg-indigo-400 p-2 w-20 rounded-md rounded-l-none text-white font-bold"
          >
            submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default StatusCard