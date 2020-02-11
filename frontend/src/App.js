import React from "react";

function App() {
  return (
    <div className="App absolute w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md bg-grey-800">
        <form action="" className="bg-white shadow-md rounded px-8 py-8 pt-8">
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-sm block font-bold pb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@doe.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            ></input>
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
