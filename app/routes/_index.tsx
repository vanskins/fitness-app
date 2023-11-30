import LoginForm from '~/components/LoginForm'
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates, 'UPDATES')

  return json({ updates });
};

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