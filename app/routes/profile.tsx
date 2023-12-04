import { json } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { createFitnessPlan, getMyFitnessPlan } from "~/utils/fitnessPlan.server"
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
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  })

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { "role": "system", "content": "You are personal trainer, and motivate the user." },
      { "role": "user", "content": "Create a workout plan for me, I have 30 minutes free time, I'm a beginner." }
    ]
  })
  const result = chatCompletion.choices[0].message.content;
  console.log(result?.split("\n"))
  if (result) {
    const user = await authenticator.isAuthenticated(request)
    const fitnessPlan = await createFitnessPlan({
      routinePlan: JSON.stringify(result),
      postedBy: {
        connect: {
          id: user.id
        }
      }
    })
    console.log(fitnessPlan, 'fitnessPlan')
    return fitnessPlan
  }
  return ''
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/'
  })

  if (user) {
    const fitnessPlan = await getMyFitnessPlan(user.id);
    if (fitnessPlan) {
      return { fitnessPlan, user }
    }
    return { fitnessPlan: null, user }
  }
  return { fitnessPlan: null, user }
}

const Profile = () => {
  const { user, fitnessPlan } = useLoaderData<typeof loader>();

  let message = [];
  if (fitnessPlan && fitnessPlan.length > 0) {
    message = JSON.parse(fitnessPlan[0].routinePlan).split("\n")
  }
  return (
    <div className="m-10">
      <h1 className="font-bold text-8xl">Hi {user.firstName}, Good day!</h1>
      <br />
      {
        message.length === 0 &&
        <Form className="" method="post">
          <button
            className="bg-blue-400 p-4 rounded-xl text-white font-bold"
            type="submit"
          >
            Generate workout routine
          </button>
        </Form>
      }
      <br />
      <div className="w-1/2">
        {
          message.length > 0 &&
          message.map((i: string, k: number) => {
            if (i === "") {
              return <br />
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
    </div>
  )
}

export default Profile