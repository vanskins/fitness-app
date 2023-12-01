import type { MetaFunction } from "@remix-run/node"
import RegisterForm from "~/components/RegisterForm"

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness registration" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

const Register = () => {
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="flex flex-col text-left flex-1 justify-center h-screen p-4">
        <h1 className="lg:text-9xl text-6xl font-extrabold my-2">Welcome!</h1>
        <p className="lg:text-5xl text-4xl font-bold text-gray-600">
          Get ready to transform your fitness journey. Start customizing your perfect workout plan and embrace a healthier, stronger you. Let's achieve your goals together!"
        </p>
      </div>
      <div className="flex-1">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register