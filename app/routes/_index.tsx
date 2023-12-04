import LoginForm from '~/components/LoginForm'
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const action = async (props: ActionFunctionArgs) => {
  const { request } = props;
  const formData = await request.formData();

  return await authenticator.authenticate("form", request, {
    successRedirect: "/feed",
    failureRedirect: "/",
    context: { formData },
  })
};

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness platform" },
    { name: "Description", content: "Welcome to Fitness App" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/feed",
  })
  return user
}

const Index = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="mb-10 text-center">
        <h1 className="font-bold text-7xl">WELCOME TO FITNESS APP</h1>
        <p className="font-semibold text-xl text-gray-400 mt-2">Empower Your Fitness Journey: Anytime, Anywhere, Achieve!</p>
      </div>
      <LoginForm />
    </div>
  )
}

export default Index