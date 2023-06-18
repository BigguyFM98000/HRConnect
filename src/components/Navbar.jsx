import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { googleLogout } from '@react-oauth/google';
import hrconnectlogo from "../assets/hrconnect-four.png";
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { ImProfile } from 'react-icons/im';
import { useGoogleStore } from '../zustandStore/useGoogleStore';

const navigation = [
  { name: 'Colleagues', href: '#', current: true },
  { name: 'Church', href: '#', current: false },
  { name: 'Family', href: '#', current: false },
  { name: 'Friends', href: '#', current: false },
  { name: 'Others', href: '#', current: false },
  { name: 'Relatives', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ firstname, lastname }) {
  const navigate = useNavigate();
  const [gfirstname, setGFirstname] = useState('');
  const [glastname, setGLastname] = useState('');
  const [gpicture, setGPicture] = useState('');
  const loggedInUser = useGoogleStore((state) => state.userInfo);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    localStorage.clear();
  };

  useEffect(() => {
    
    const givenName = localStorage.getItem("given_name");
    const familyName = localStorage.getItem("family_name");
    const picture = localStorage.getItem("picture");
    setGFirstname(loggedInUser.firstname);
    setGLastname(loggedInUser.lastname);
    setGPicture(loggedInUser.profileImage);
  }, [])

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0 z-40">
      {({ open }) => (
        <>
          <div className="block mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={hrconnectlogo}
                    alt="HRConnect Logo"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={hrconnectlogo}
                    alt="HRConnect Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={gpicture}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => navigate("/profile")}
                            className={classNames(active ? 'bg-gray-100' : '', 'block w-full flex justify-start items-center gap-1 px-4 py-2 text-sm text-gray-700')}
                          >
                            <ImProfile /><h2>{gfirstname}</h2>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block w-full flex justify-start items-center gap-1 px-4 py-2 text-sm text-gray-700')}
                          >
                            <RxDashboard /> <h2>Dashboard</h2>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              
                              logOut();
                              navigate('/');
                            }}
                            className={classNames(active ? 'bg-gray-100' : '', 'block w-full flex justify-start items-center gap-1 px-4 py-2 text-sm text-gray-700')}
                          >
                            <BiLogOutCircle /> <h2>Logout</h2>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
