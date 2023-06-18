import React, { useState } from 'react';
import hrconnectlogo from "../assets/hrconnect-four.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\\.,;:\s@\"]{2,})$/i;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  
  const register = async (e) => {
    e.preventDefault()
    const url = "https://hrconnectapi.onrender.com/auth/signup";
    if (firstname && lastname) {
      setFirstname(firstname);
      setLastname(lastname);
    } else {
      setError("Firstname and lastname are required");
    }
    if (email) {
      if (regex.test(email)) {
        setEmail(email);
      } else {
        setError("Enter valid email address");
      }
    } else {
      setError("Email is required");
    }
    if (password) {
      if (password.length >= 6) {
        setPassword(password);
      } else {
        setError("Password must be at least 6 characters long");
      }
    }
    console.log(password, email, firstname, lastname);

    // Signup user with all required fields
    try {
      console.log(error);
      if (error === '') {
        setLoading(true);
        const response = await axios.post(url,
          JSON.stringify({ firstname, lastname, email, password }),
          {
            headers: { 'Content-Type': 'application/json' },
          }).then((res) => {
            setLoading(false);
            console.log(JSON.stringify(res));
            navigate("/");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
          });
          console.log(response);
      }
    } catch (error) {
      setLoading(false);
      setError("Signup failed");
    }
  }

  const showPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 ">
          <div>
            <img
              className="mx-auto h-12 w-auto text-lg text-teal-900"
              src={hrconnectlogo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Signup
            </h2>
          </div>
          <form className="mt-8 space-y-6" >
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            {error ?

              <div className="block w-full alert alert-error shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              </div> :
              <div className="block w-full alert alert-success shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>All fields are required</span>
                </div>
              </div>
            }
            <div className="flex flex-col gap-1.5 rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" >
                  Firstname
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 px-2.5 py-1.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" >
                  Lastname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="string"
                  required
                  className="relative block w-full rounded-md border-0 px-2.5 py-1.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full rounded-md border-0 px-2.5 py-1.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>
              <div className='flex flex-col gap-1.5'>
                <label htmlFor="password" >
                  Password
                </label>
                <input autoComplete='false'
                  id="password"
                  name="password"

                  type={passwordShown ? "text" : "password"}
                  required
                  className="relative block w-full rounded-md border-0 px-2.5 py-1.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex justify-between gap-1.5'>
                  <div className='flex gap-1.5'>
                  <input type="radio" name="toggle" value="show" onClick={
                    showPassword
                  } /><label>Show Password</label>
                  </div>
                  <div>
                    <a onClick={() => navigate('/')} className='font-medium text-indigo-600 hover:text-indigo-500'>Login</a>
                  </div>
                
                </div>
              </div>
            </div>

            <div>
            {loading ? <button disabled={true} type="button" class="flex w-full justify-center py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                  <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                  </svg>
                  Loading...
                </button >: <button
                onClick={register}
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                </span>
                Register
              </button> }

              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}