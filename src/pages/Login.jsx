import { useLoaderData, useActionData, Form, redirect, useNavigation } from "react-router-dom";

import { loginUser } from "../api";

export default function Login() {
  const message = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      <Form method="post" className="login-form" replace>
        {message && !error && <p className="warning-message">{message}</p>}
        {error && <p className="warning-message">{error.message}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email address"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
        />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </button>
      </Form>
    </div>
  );
}

export function loader({ request }) {
  const url = new URL(request.url);
  const message = url.searchParams.get("message");
  return message;
}

export async function action({ request }) {
  const path = new URL(request.url).searchParams.get("redirectTo") || "/";
  const fd = await request.formData();
  const inputData = Object.fromEntries(fd);
  try {
    const user = await loginUser(inputData);
    localStorage.setItem("loggedin", true);
    console.log(user);
    return redirect(path);
  } catch (error) {
    return error;
  }
}