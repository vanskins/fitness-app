import { useState, useEffect } from "react"
import { useNavigation } from "@remix-run/react"
import { json } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { createFitnessPlan, getMyFitnessPlan } from "~/utils/fitnessPlan.server"
import { createPost, getMyPosts } from "~/utils/post.server"
import { createComment } from "~/utils/comments.server";
import StatusCard from "~/components/StatusCard";
import OpenAI from "openai";

import type { MetaFunction, LoaderFunction, ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness profile" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const user = await authenticator.isAuthenticated(request, { failureRedirect: '/' })

  switch (intent) {
    case "generateRoutine": {
      console.log("generateroutine")
      const { age, gender, fitnessGoal, bodyType, hasActiveLifestyle, minutes, preferredPlace } = Object.fromEntries(formData);
      const fitnessPrompt = `
    Create a workout plan for me, I have ${minutes} minutes free time per day. My details are
    I am ${gender}, I'm ${age} years old, my fitness goal is ${fitnessGoal}, my body type is ${bodyType}, I have ${hasActiveLifestyle} active lifestyle,
    my preferred place to workout is ${preferredPlace}.
  `
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY,
      })

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": "You are personal trainer, and motivate the user." },
          { "role": "user", "content": fitnessPrompt }
        ]
      })
      console.log(chatCompletion)
      const result = chatCompletion.choices[0].message.content;

      if (result) {
        const fitnessPlan = await createFitnessPlan({
          routinePlan: JSON.stringify(result),
          postedBy: {
            connect: {
              id: user.id
            }
          }
        })

        return json({ fitnessPlan })
      }
      return ''
    }
    case "postStatus": {
      const status = formData.get("status");
      if (status) {
        const createNewPost = await createPost({
          post: status,
          postedBy: {
            connect: {
              id: user.id
            }
          }
        })
        return json({ createNewPost })
      }
      return ''
    }
    case "postComment": {
      const comment = formData.get("comment");
      const postId = formData.get("postId");

      if (comment && postId) {
        const createNewComment = await createComment({
          comment: comment.toString(),
          commentedBy: {
            connect: {
              id: user.id
            }
          },
          post: {
            connect: {
              id: postId
            }
          }
        })
        return json({ createNewComment })
      }
      return ''
    }
    default: {
      throw new Error("Unexpected action");
    }
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/'
  })

  if (user) {
    const fitnessPlan = await getMyFitnessPlan(user.id);
    const myPost = await getMyPosts(user.id)
    console.log(myPost, "TEST")
    return json({ fitnessPlan, user, myPost })
  }
  return json({ fitnessPlan: null, user, myPost: null })
}

const Profile = () => {
  const { user, fitnessPlan, myPost } = useLoaderData<typeof loader>();
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false)
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState<boolean>(false)
  const [post, setPost] = useState<string>("");
  const navigation = useNavigation();
  const isCreating = Boolean(
    navigation.state === "submitting"
  );

  useEffect(() => {
    if (navigation.state === "idle") {
      setIsCreatingPost(false)
      setPost("")
    }
  }, [navigation.state])


  // console.log(navigation.state, navigation)

  let message = [];
  if (fitnessPlan && fitnessPlan.length > 0) {
    message = JSON.parse(fitnessPlan[0].routinePlan).split("\n")
  }
  return (
    <div className="m-10">
      <h1 className="font-bold text-8xl">Hi {user.firstName}, Good day!</h1>
      <p className="lg:text-5xl text-4xl font-bold text-gray-600">
        {`Let's generate your workout routine based on your details.`}
      </p>
      <br />
      {
        message.length === 0 &&
        <Form className="" name="generateRoutine" method="post">
          <div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="age">Age</label>
              <input
                className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
                aria-label="age"
                name="age"
                disabled={isGeneratingWorkout}
                type="number"
                placeholder="How old are you?"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="gender">Gender</label>
              <select disabled={isGeneratingWorkout} className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300" name="gender" id="cars">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="fitness goal">Fitness goal</label>
              <select disabled={isGeneratingWorkout} className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300" name="fitnessGoal" id="cars">
                <option value="be lean">To be lean</option>
                <option value="be fit">To bulk up</option>
                <option value="lose weight">To lose weight</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">Body type</label>
              <select disabled={isGeneratingWorkout} className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300" name="bodyType" id="cars">
                <option value="underweight">Under weight</option>
                <option value="fit">Fit</option>
                <option value="overweight">Over weight</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">Has an active lifestyle?</label>
              <select disabled={isGeneratingWorkout} className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300" name="hasActiveLifestyle" id="cars">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">Minutes per day you can allocate?</label>
              <input
                disabled={isGeneratingWorkout}
                className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
                aria-label="minutes"
                name="minutes"
                type="number"
                placeholder="Minutes per day"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">Preffered place to workout</label>
              <select disabled={isGeneratingWorkout} className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300" name="preferredPlace" id="cars">
                <option value="home">Home</option>
                <option value="gym">Gym</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>
          </div>
          <button
            name="intent"
            value="generateRoutine"
            className={`${isGeneratingWorkout ? "bg-gray-600" : "bg-blue-400"} p-4 rounded-xl text-white font-bold`}
            type="submit"
            // onClick={() => setIsGeneratingWorkout(true)}
            disabled={isGeneratingWorkout}
          >
            {isGeneratingWorkout ? "Generating workout routine ..." : "Generate workout routine"}
          </button>
        </Form>
      }
      <br />
      <div className="flex flex-row">
        <div className="flex-1">
          {
            message.length > 0 &&
            message.map((i: string, k: number) => {
              if (i === "") {
                return <br key={k} />
              }
              if (k === 0 || k === message.length - 1) {
                return (<p className="font-bold text-xl" key={k}>{i}</p>)
              } else {
                return (
                  <p className="font-medium text-lg" key={k}>{i}</p>
                )
              }
            })
          }
        </div>
        {
          message.length > 0 &&
          <div className="flex flex-col flex-1 w-full">
            <Form name="createPost" className="shadow-lg p-6 w-full mx-10 h-2/5 rounded-xl" method="post">
              <div>
                <h2 className="font-bold text-4xl mt-6">How's your day?</h2>
                <div>
                  <textarea
                    className="resize-none w-full mt-4 p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
                    aria-label="status"
                    name="status"
                    rows={5}
                    typeof="string"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="How's your day?"
                  />
                </div>
                <button
                  name="intent"
                  value="postStatus"
                  className="bg-green-400 p-4 rounded-xl text-white font-bold"
                  type="submit"
                  onClick={() => setIsCreatingPost(true)}
                >
                  {isCreatingPost ? "Creating a post ..." : "Post"}
                </button>
              </div>
            </Form>
            <div>
              {
                myPost && myPost.map((i: any, k: number) => {
                  return (
                    <StatusCard
                      key={k}
                      postedBy={i.postedBy}
                      post={i.post}
                      createdAt={i.createdAt}
                      postId={i.id}
                      comments={i.Comments}
                    />
                  )
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile;