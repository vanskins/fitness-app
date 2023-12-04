import type { LoaderFunctionArgs, LoaderFunction, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { getAllFitnessPlan } from "~/utils/fitnessPlan.server"
import FeedCard from "~/components/FeedCard";

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

  return { fitnessPlans }
}



const Feed = () => {
  const { fitnessPlans } = useLoaderData<typeof loader>();

  return (
    <div>
      {
        fitnessPlans.map((i: any, k: number) => {
          return (
            <FeedCard key={k} postedBy={i.postedBy} routinePlan={i.routinePlan} createdAt={i.createdAt} />
          )
        })
      }
    </div>
  )
}

export default Feed