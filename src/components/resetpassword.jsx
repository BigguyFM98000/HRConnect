import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hrconnectlogo from "../assets/hrconnect-four.png";

const ResetPassword = () => {
    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={hrconnectlogo}
                        alt="HRConnect Logo"
                    />
                    <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-200">
                        Reset Your Password
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">

                        <div className="flex items-center justify-between">
                            <label htmlFor="newpassword" className="block text-sm font-medium leading-6 text-gray-200">
                               New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newpassword"
                                    name="password"
                                    type="password"
                                    
                                    required
                                    className="block w-full rounded-md border-0 p-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmpassword"
                                    name="password"
                                    type="password"
                                    
                                    required
                                    className="block w-full rounded-md border-0 p-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;