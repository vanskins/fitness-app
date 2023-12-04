import type { MetaFunction, LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness blog" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/'
  })
  return ''
}

const Blog = () => {
  return (
    <div>Blog</div>
  )
}

export default Blog