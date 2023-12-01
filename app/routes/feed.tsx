import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness feed" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

const Feed = () => {
  return (
    <div>Feed</div>
  )
}

export default Feed