import { Form, Link } from "@remix-run/react"

const RegisterForm = () => {
  return (
    <div className="h-screen w-1/2 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold m-10">Become a member</h1>
      <div className="h-auto w-3/4 p-2 shadow-lg">
        <Form className="m-10" method="post">
          <div className="">
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">First name</label>
              <input
                className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
                aria-label="first name"
                name="firstName"
                type="text"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">Last name</label>
              <input
                className="w-full p-2 mb-6 border-2 rounded-lg border-gray-400 outline-none focus:border-blue-300"
                aria-label="last name"
                name="lastName"
                type="text"
                placeholder="Last name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">Email address</label>
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
                Register
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RegisterForm