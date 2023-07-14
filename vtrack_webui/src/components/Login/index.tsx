import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { FormEvent, MutableRefObject, useRef } from "react";

import { ILoginPayload, ILoginResponse } from "./types";
import Password from "../icons/Password";
import User from "../icons/User";
import { API, Browser, LOCAL_STORAGE_KEY } from "@/constants";
import { NextRouter, useRouter } from "next/router";

export default function Login(): JSX.Element {
  const router: NextRouter = useRouter();
  const usernameRef: MutableRefObject<HTMLInputElement> = useRef(null!);
  const passwordRef: MutableRefObject<HTMLInputElement> = useRef(null!);

  const performLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const payload: ILoginPayload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const response: AxiosResponse = await axios.post(
      API.ACCOUNT_LOGIN,
      payload
    );

    const data: ILoginResponse = await response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY, data.token);
    router.push(Browser.VISITOR_DEATILS);
  };
  
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center justify-center align-middle bg-stone-600">
        <div className="md:mx-20 md:px-10 rounded pb-10-hidden flex items-center justify-center bg-white">
          <div className="rounded-3xl px-6 md:px-24 py-12 md:py-32 h-auto md:h-5/6">
            <div className="flex justify-center py-3">
              <Image
                width={100}
                height={100}
                src={Browser.ANDROID_CHROME_512}
                alt="logo"
              />
            </div>
            <form className="mt-8 space-y-6 rounded" onSubmit={performLogin}>
              <div className="flex items-center space-x-1 px-3 border rounded border-black bg-white">
                <User />
                <input
                  className="px-3 py-2 placeholder-gray-500 bg-white sm:text-sm"
                  type="Username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="flex items-center space-x-1 px-3 border rounded border-black bg-white">
                <Password />
                <input
                  className="px-3 py-2 placeholder-gray-500 bg-white sm:text-sm"
                  type="Password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="group relative flex items-center w-40 justify-center rounded-md border border-transparent bg-stone-600 py-2 text-sm font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-700 focus:ring-offset-2"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div>
            <Image
              className="rounded"
              width={700}
              height={450}
              src={Browser.LOGIN_IMAGE}
              alt="login background"
            />
          </div>
        </div>
      </section>
    </>
  );
}
