import type { LoaderFunctionArgs, LoaderFunction, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { getAllFitnessPlan } from "~/utils/fitnessPlan.server"
import moment from "moment";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness feed" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/'
  })
  const fitnessPlans = await getAllFitnessPlan()
  console.log(fitnessPlans, "S")
  return { fitnessPlans }
}



const Feed = () => {
  const { fitnessPlans } = useLoaderData<typeof loader>();

  const convertRoutinePlan = (plan: string) => {
    const message = JSON.parse(plan).split("\n")
    return message.map((i: string, k: number) => {
      const divideTwo = message.length / 2;
      if (i === "") {
        return <br />
      }
      if (k === 0) {
        return (<p className="font-bold text-xl" key={k}>{i}</p>)
      } else if (k < divideTwo) {
        return (
          <p className="font-medium text-lg" key={k}>{i}</p>
        )
      } else {
        return null
      }
    })
  }
  return (
    <div>
      {
        fitnessPlans.map((i: any, k: number) => {
          return (
            <div className="shadow-lg m-10 p-10" key={k}>
              <p className="text-xl font-bold text-blue-600 mt-4">@{i.postedBy.firstName}</p>
              <p className="text-lg mb-4 text-gray-400">{moment(i.createdAt).fromNow()}</p>
              {convertRoutinePlan(i.routinePlan)}
              <p className="text-xl font-bold text-blue-600">View more</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Feed