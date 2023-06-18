import React, { useState, useEffect } from 'react';
import { useGoogleStore } from '../zustandStore/useGoogleStore';
import { useNavigate } from 'react-router-dom';

const DisplayProfileInfo = (props) => {
    const [given_name, setGivenname] = useState('');
    const [family_name, setFamilyname] = useState('');
    const [google_email, setGoogleemail] = useState('');
    const [google_picture, setGooglepicture] = useState('');
    const userInfo = useGoogleStore((state) => state.userInfo);
    const navigate = useNavigate();
    const [active, setActive] = useState('profile');

    const handleSubmit = e => {
        e.preventDefault();
        let activeP = 'edit';
        setActive(activeP);
        navigate('/updateprofile');
    }

    useEffect(() => {
        setGivenname(userInfo.firstname);
        setFamilyname(userInfo.lastname);
        setGoogleemail(userInfo.email);
        setGooglepicture(userInfo.profileImage);
    }, [userInfo])
    return (
        <div className='w-3/4 mx-auto border-gray border rounded border-solid mt-8 p-8 bg-teal-200'>
            <div className="flex justify-evenly items-start px-4 sm:px-0">
                <div>
                    <h3 className="text-base text-2xl font-semibold leading-7 text-blue-600">Profile</h3>
                </div>
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img htmlFor="photo-upload" src={google_picture ? google_picture : props.imagePreviewUrl} alt='avatar' />
                    </div>
                </div>
            </div>
            <div className="mt-4 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg leading-6 text-black font-semibold">Full name</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{family_name ? family_name : props.firstname} {given_name ? given_name : props.lastname}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg leading-6 text-black font-semibold">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{google_email}</dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg leading-6 text-black font-semibold">Department</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Talent Acquisition</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg leading-6 text-black font-semibold">Company</dt>
                        <dd className="mt-1 text-sm text-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0">AngelzConnect Software Company</dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-semibold leading-6 text-black">About Company</dt>
                        <dd className="mt-1 text-sm text-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                            pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                    </div>

                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={() => { navigate('/welcome') }} type="button" className="edit inline-flex w-full justify-center rounded bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Cancel</button>
                        <button onClick={handleSubmit} type="button" className="edit mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Update</button>
                    </div>

                </dl>
            </div>
        </div>
    )
}

export default DisplayProfileInfo;