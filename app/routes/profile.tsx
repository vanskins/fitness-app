import type { MetaFunction, LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness profile" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/'
  })
  return ''
}

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile