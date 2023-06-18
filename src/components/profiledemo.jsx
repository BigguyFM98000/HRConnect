import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from './cloudinaryimages';
import DisplayProfileInfo from '../userprofile/profileinfo';
import { useGoogleStore } from '../zustandStore/useGoogleStore';

const UserProfile = () => {
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('https://uploads2.yugioh.com/card_images/257/detail/Dark-Magician.jpg?1375127294');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [jobtitle, setJobTitle] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [aboutcompany, setAboutCompany] = useState('');
    const [active, setActive] = useState('edit');
    const navigate = useNavigate();
    const userData = useGoogleStore(state => state.userInfo);

    const photoUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let activeP = 'profile';
        setActive(activeP);
        navigate('/profile');
    }

    useEffect(() => {
        
    }, [])

    return (
        <>

            <div>
                {(active === 'edit') ? (

                    <form className='w-11/12 mx-auto border-gray border rounded border-solid mt-8 p-8 bg-teal-200'>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Photo
                                        </label>
                                        <div htmlFor="photo-upload" className="mt-2 flex items-center gap-x-3">
                                            <div className="avatar">
                                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img htmlFor="photo-upload" src={imagePreviewUrl} />
                                                </div>

                                            </div>
                                            <input id="photo-upload" type="file" onChange={photoUpload} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-md font-semibold leading-6 text-gray-900">
                                            Firstname
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                onChange={(e) => setFirstname(e.target.value)}
                                                maxLength="25"
                                                value={firstname}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-md font-semibold leading-6 text-gray-900">
                                            Lastname
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                onChange={(e) => setLastname(e.target.value)}
                                                maxLength="35"
                                                value={lastname}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="job-title" className="block text-md font-semibold leading-6 text-gray-900">
                                            Job title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="job-title"
                                                name="job-title"
                                                type="text"
                                                onChange={(e) => setJobTitle(e.target.value)}
                                                maxLength="35"
                                                value={jobtitle}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="company-name" className="block text-md font-semibold leading-6 text-gray-900">
                                            Company name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="company-name"
                                                name="company-name"
                                                type="text"
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                maxLength="35"
                                                value={companyname}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="about-company" className="block text-md font-semibold leading-6 text-gray-900">
                                            About Company
                                        </label>
                                        <textarea rows={6}
                                            className="lock w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="about-company"
                                            placeholder="Enter company details here"
                                            onChange={(e) => setAboutCompany(e.target.value)}
                                            value={aboutcompany}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center items-baseline justify-end gap-x-6">
                            <button onClick={() => navigate('/welcome')} type="button" className="inline-flex w-full justify-center rounded bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                Cancel
                            </button>
                            <button onClick={() => {
                                handleSubmit(
                                ); navigate('/profile')
                            }}
                                type="submit"
                                className="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                ) : (
                    <DisplayProfileInfo handleSubmit={handleSubmit} firstname={firstname} lastname={lastname} imagePreviewUrl={imagePreviewUrl} />
                )}

            </div>
        </>
    )
}

export default UserProfile;

