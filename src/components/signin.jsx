import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import hrconnectlogo from "../assets/hrconnect-four.png";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSignIn from './googlelogin';
import useGithubStore from '../zustandStore/useGithubStore';
import { BsGithub } from 'react-icons/bs';
import jwtDecode from 'jwt-decode';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\\.,;:\s@\"]{2,})$/i;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [githubdata, setGitHubData] = useState({ user: "", isLoading: false });
  const [githuberror, setGitHubError] = useState({ errorMessage: "", isLoading: false });
  const redirect_uri = useGithubStore(state => state.redirect_uri);
  const client_id = useGithubStore(state => state.client_id);
  console.log(profile);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const signin_url = 'https://hrconnectapi.onrender.com/auth/signin';

    if (!email && !password) {
      setLoading(false);
      setError("Email and password must be provided");
      return;
    }
    if (email) {
      if (regex.test(email)) {
        setEmail(email);
      } else {
        setLoading(false);
        setError("Enter valid email address");
      }
    } else {
      setLoading(false);
      setError("Email is required");
    }
    if (password) {
      if (password.length >= 6) {
        setPassword(password);
      } else {
        setLoading(false);
        setError("Password must be at least 6 characters long");
      }
    }
    const body = {
      "email": email,
      "password": password,
    };

    try {
      const response = await axios.post(signin_url, body, {
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        console.log(res.data);
        localStorage.setItem("userfirstname", JSON.stringify(res.data.message.firstname));
        localStorage.setItem("userlastname", JSON.stringify(res.data.message.lastname));
        setLoading(false);
        navigate("/welcome");
        setEmail("");
        setPassword("");
      });
    } catch (err) {
      setLoading(false);
      setError("Login failed");
    }
  }

  const showPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  // Update the data for github users
  useEffect(() => {

    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setGitHubData({ ...githubdata, isLoading: true });

      const requestData = {
        code: newUrl[1]
      };

      const proxy_url = proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {

          setGitHubError({
            user: data, isLoggedIn: true
          });
        })
        .catch(error => {
          setGitHubError({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [githubdata]);

  const responseMessage = async (response) => {
    const data = jwtDecode(response.credential);
    const body = {
      "given_name": data.given_name,
      "family_name": data.family_name,
      "name": data.name,
      "email": data.email,
      "picture": data.picture
    }
    const url = 'https://hrconnectapi.onrender.com/google/';

    console.log(body);
    try {
      const respone = await axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        navigate('/welcome');
        console.log(res.data);
      });
      console.log(respone);
    } catch (error) {
      navigate('/welcome');
      console.log(error);
      setError("Requet failed");
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={hrconnectlogo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>

          </div>
          <form className="mt-8 space-y-6" >
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
                  <span>Enter your details to login</span>
                </div>
              </div>
            }
            <div className="flex flex-col gap-2 rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-2.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className='flex justify-between'>
                  <label htmlFor="password" >
                    Password
                  </label>
                  <a onClick={() => navigate('/ForgotPassword')} className="font-medium text-indigo-600 hover:text-indigo-500 text-sm">
                    Forgot your password?
                  </a>
                </div>

                <input
                  id="password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  required
                  value={password}
                  className="relative block w-full rounded-md border-0 py-1.5 px-2.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex gap-2 py-1'>
                  <input type="radio" name="toggle" value="show"
                    onClick={showPassword} /><label>Show Password</label>
                </div>
              </div>
            </div>

            <div>
              <div>
                {loading ? <button disabled={true} type="button" className="flex w-full justify-center rounded-md py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                  <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                  </svg>
                  Loading...
                </button> : <button
                  onClick={(e) => login(e)}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  </span>
                  Submit
                </button>}
              </div>
              <div className='divider'>OR</div>
              <div className='flex justify-center gap-2 items-center'>
                <GoogleOAuthProvider clientId="1090611813560-vkabsu4t7seet7aqk9p9d4brifq58c4r.apps.googleusercontent.com">
                  <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="w-full btn btn-active btn-primary gap-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
                </GoogleOAuthProvider>
              </div>
            </div>
            <div className="flex justify-center gap-1 text-sm">
              <label>Dont have account?</label>
              <a onClick={() => navigate('/signup')} className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

