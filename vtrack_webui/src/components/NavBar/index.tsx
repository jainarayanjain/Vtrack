import Image from "next/image";
import { useState } from "react";

import { IProps } from "./types";
import { Browser } from "@/constants";

export default function NavBar(props: IProps): JSX.Element {
  const [userDropdown, setUserDropdown] = useState<boolean>(false);
  return (
    <nav className="bg-stone-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-shrink-0 items-center border-solid border-2 border-white bg-stone-600">
            <Image
              className="bg-stone-600 block h-8 w-auto lg:hidden"
              src={Browser.ANDROID_CHROME_512}
              alt={"Gate Pass"}
              width={100}
              height={100}
            />
            <Image
              className="bg-stone-600 hidden h-8 w-auto lg:block"
              src={Browser.ANDROID_CHROME_192}
              alt={"Gate Pass"}
              width={100}
              height={100}
            />
          </div>
          <div className="hidden justify-center align-center rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 focus:ring-offset-gray-100 cursor-pointer dropDown lg:block">
            <button
              type="button"
              className="inline-flex w-full justify-center bg-transparent text-sm font-medium text-gray-700"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={(): void => setUserDropdown(!userDropdown)}
            >
              {`${props.firstName} ${props.lastName}`}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
