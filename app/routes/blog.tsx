import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness blog" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

const Blog = () => {
  return (
    <div>Blog</div>
  )
}

export default Blog