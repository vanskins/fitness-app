import type { MetaFunction } from "@remix-run/node"
export const meta: MetaFunction = () => {
  return [
    { title: "Fitness profile" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile