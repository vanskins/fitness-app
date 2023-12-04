import type { LoaderFunctionArgs, LoaderFunction, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

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
  return ''
}

const Feed = () => {
  return (
    <div>Feed</div>
  )
}

export default Feed