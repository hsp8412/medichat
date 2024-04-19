"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import {signIn, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * This is the login form on the login page.
 * @constructor
 */

const LoginForm = () => {
    //Initialize router for redirecting
    const router = useRouter();

    //State that determines if the form is submitted
    const [submitted, setSubmitted] = useState(false);
    const { data: session } = useSession();

    //Initialize formik form
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().max(255).required(),
            password: Yup.string().max(255).required(),
        }),
        onSubmit: async ({ email, password }) => {
            //Set submitted to true to disable the submit button
            setSubmitted(true);

            //Sign in using next-auth
            signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            }).then(async (res) => {
                if (res && !res.error) {
                    setSubmitted(false);
                    router.push("/home");
                } else {
                    //If the login is unsuccessful, alert the user
                    alert(res?.error ?? "Error: Invalid credentials or Recaptcha failed");
                    setSubmitted(false);
                }
            });
        },
    });
    const { touched, errors, handleSubmit, handleChange, handleBlur, values } =
        formik;
    return (
        <form
            className="w-full lg:pe-10"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            {/*Email*/}
            <section className="mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-bold text-primary"
                >
                    Email address
                </label>
                <input
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                {touched.email && errors.email && (
                    <p className="text-red-600">{errors.email}</p>
                )}
            </section>
            {/*Password*/}
            <section className="mb-6">
                <label
                    htmlFor="password"
                    className="block mb-2 text-lg font-bold text-primary"
                >
                    Password
                </label>
                <input
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                {touched.password && errors.password && (
                    <p className="text-red-600">{errors.password}</p>
                )}
            </section>
            {/*Sign in button and forgot password link*/}
            <section className="flex flex-col items-center lg:items-start">
                {/*Submit button*/}
                <button
                    type="submit"
                    disabled={submitted}
                    className="flex items-center gap-2 text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center"
                >
                    <div
                        className={`${
                            !submitted && "hidden"
                        } animate-spin inline-block w-6 h-6 border-[4px] border-current border-t-transparent text-white rounded-full`}
                        role="status"
                        aria-label="loading"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                    Sign in
                </button>
            </section>
        </form>
    );
};

export default LoginForm;