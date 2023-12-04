import { LinksFunction } from "@remix-run/node";
import type { LoaderFunctionArgs, LoaderFunction, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import stylesheet from "./global.css";
import Navbar from "~/components/Navbar";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

import { authenticator } from "~/utils/auth.server";

export const action = async (props: ActionFunctionArgs) => {
  const { request } = props;
  return authenticator.logout(request, { redirectTo: '/' })
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  return user
}

export default function App() {
  const user = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container mx-auto">
          <Navbar userSession={user} />
          <Outlet />
        </div>
        <Scripts />
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}
