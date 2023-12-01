import { Form, Link } from "@remix-run/react"

const LoginForm = () => {

  return (
    <div className="w-full lg:w-2/5 mx-15 p-5 shadow-lg">
      <Form className="" method="post">
        <div className="">
          <div>
            <label className="block mb-2 font-medium" htmlFor="email">Email</label>
            <input
              className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
              aria-label="email"
              name="email"
              type="email"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="email">Password</label>
            <input
              className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
              aria-label="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="flex flex-row justify-end">
            <button
              name="login"
              className="bg-blue-400 text-white font-medium p-2 rounded-md w-20 m-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </Form>
      <div className="text-center">
        <p className="font-medium">Not a member? <Link to="register" className="text-blue-500">Sign up now</Link></p>
      </div>
    </div>
  )
}

export default LoginForm