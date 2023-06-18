import React, { useState, Fragment, useEffect } from "react";
import Navbar from "./Navbar";
import { MdDeleteForever, MdOutlinePersonAddAlt, MdEmail } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useUserStore from '../zustandStore/userStore';
import { useGoogleStore } from "../zustandStore/useGoogleStore";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modalerror, setModalError] = useState('');
  const [initfirstname, setInitFirstname] = useState('');
  const [initlastname, setInitLastname] = useState('');
  const [initphonenumber, setInitPhonenumber] = useState('');
  const [initemail, setInitEmail] = useState('');
  const [initdepartment, setInitDepartment] = useState('');
  const [employeeid, setEmployeeId] = useState('');
  const [modalsuccess, setModalSuccess] = useState('');
  const [loggeduserfirstname, setLoggedUserFirstname] = useState('');
  const [loggeduserlastname, setLoggedUserLastname] = useState('');
  const [loggeduseruserid, setLoggedUserUserid] = useState('');
  const MySwal = withReactContent(Swal);
  const employeedata = useGoogleStore((state) => state.data);
  const getEmployeeData = useGoogleStore((state) => state.getEmployees);
  const getLoggedInUser = useGoogleStore((state) => state.getLoggedInUser);
  const loggedinuserId = useGoogleStore((state) => state.loggedIn);
  const userInfo = useGoogleStore((state) => state.userInfo);

  const [filteredData, setFilteredData] = useState(employeedata);
  const [selectValue, setSelectValue] = useState('');
  console.log(employeedata);
  console.log(loggedinuserId);

  const addNewEmployee = async (e) => {
    e.preventDefault();
    if (!firstname && !lastname && !phonenumber && !email) {
      console.log("Inputs cannot be empty");
      return;
    }
    const data = {
      "firstname": firstname,
      "lastname": lastname,
      "phonenumber": phonenumber,
      'email': email,
    }
    const url = 'https://hrconnectapi.onrender.com/employee/add';
    try {
      const respone = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        navigate('/welcome');
        console.log(res.data);
        setSuccess(res.data.message);
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhonenumber('');
      });
      console.log(respone);
      navigate('/welcome');
    } catch (error) {
      console.log(error);
      setError("Requet failed");
    }

  };

  const deleteEmployee = async (deleteid) => {
    const url = `https://hrconnectapi.onrender.com/employee/${deleteid}`;
    try {
      const employeeData = await axios.delete(url).then((res) => {
        console.log(res.data.message);
      });
      console.log(employeeData);
    } catch (error) {
      console.log(error);
      setError("Delete request failed");
    }
  };

  const removeEmployee = async (selectedEmployee) => {
    const id = selectedEmployee._id;

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        MySwal.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        )
      }
    })
  }

  const prevInfo = (selectedEmployee) => {
    console.log(selectedEmployee);
    setInitFirstname(selectedEmployee.firstname);
    setInitLastname(selectedEmployee.lastname);
    setInitEmail(selectedEmployee.email);
    setInitPhonenumber(selectedEmployee.phonenumber);
    setEmployeeId(selectedEmployee._id);
  }

  const updateEmployeeDetails = async () => {
    setInterval(() => {
      console.log('###', initfirstname);
      console.log('###', initlastname);
      console.log('###', initphonenumber);
      console.log('###', initemail);
      console.log('###', employeeid);
    }, 2000)

    console.log('***',)

    const url = `https://hrconnectapi.onrender.com/employee/${employeeid}`;
    setModalError("");
    const updatedInfo = {
      "firstname": initfirstname,
      "lastname": initlastname,
      "phonenumber": initphonenumber,
      "email": initemail,
    };

    try {
      const updatedEmployee = await axios.put(url, updatedInfo).then((res) => {
        console.log(res.data.message);
        setModalSuccess(res.data.message);
        setTimeout(() => {
          setModalSuccess("");
        }, 2000);
      });
      console.log(updatedEmployee);
      setInitFirstname("");
      setInitLastname('');
      setInitPhonenumber('');
      setInitEmail('');
    } catch (error) {
      console.log(error);
      setError("Update request failed");
    }
  }

  const searchList = (e) => {
    // console.log(e.target.value);
    setFilteredData(employeedata.filter(item => item.firstname.includes(e.target.value)));
  }

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    console.log(`Value: ${selectValue}`);
  }

  useEffect(() => {
    getEmployeeData();
    getLoggedInUser(userInfo._id);
    setLoggedUserFirstname(userInfo.firstname);
    setLoggedUserLastname(userInfo.lastname);
    setLoggedUserUserid(userInfo._id);
  }, [getEmployeeData]);

  return (
    <Fragment>
      <Navbar firstname={loggeduserfirstname} lastname={loggeduserlastname} />

      <div className="bg-base-500 mt-1">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-lg">All Employees</h2>

          {success ? <div className="text-lg alert alert-successupdateFirstname shadow-lg bg-blue-600">
            <div className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{success}</span>
            </div>
          </div> : <div></div>}

          {error ? <div className="text-lg alert alert-error shadow-lg bg-red-600 text-white">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          </div> : <div></div>}

          <div className="mt-2 flex justify-between">
            <input type="text" placeholder="Search" onKeyUp={searchList} className="text-lg rounded text-black bg-indigo-100 px-4" />{" "}
            <label htmlFor="my-modal-6" className="btn gap-2"><MdOutlinePersonAddAlt /><h1 className="text-lg">New</h1></label>

            {/* Modal to add employee data */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Enter all fields below!</h3>

                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="enter firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="enter lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                />
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="enter phone number"
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                />
                <div className="py-4">{modalerror ? <div className="alert alert-error shadow-lg bg-red-600 text-white">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                  </div>
                </div> : <div></div>}</div>
                <div className="modal-action">

                  <label htmlFor="my-modal-6" onClick={() => {
                    setSuccess('');
                    setError('');
                    setFirstname("");
                    setLastname('');
                    setPhonenumber('');
                    setEmail('');
                  }} className="btn bg-red-600">Cancel</label>
                  <button onClick={addNewEmployee} type="submit" className="btn btn-success">Add</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredData.map((employee) => (
              <div
                key={employee._id}
                href={employee.href}
                className="card bg-green-400 group rounded"
              >
                <div className="card text-center" key={employee._id}>
                  <h3 className="mt-1 text-lg font-sm text-white">{employee.firstname} {employee.lastname}</h3>
                  <p className="mt-1 text-lg font-sm text-white">
                    {employee.phonenumber}
                  </p>
                  <p className="mt-1 text-lg font-sm text-white">
                    {employee.email}
                  </p>
                  <div className="flex justify-between gap-2 items-baseline my-1 mx-1">
                    <button onClick={() => navigate('/hremail')} className="btn gap-1 h-6 px-1 py-0 bg-teal-700 text-white text-md rounded">
                      <MdEmail />
                      Send Email
                    </button>
                    <div></div>
                    <span className="flex gap-4">
                      <label htmlFor="my-modal-3" onClick={() => prevInfo(employee)} className="btn px-1 py-0 bg-green-400"><BiEdit className="rounded bg-yellow-200 text-2xl " /></label>
                      <label className="btn px-1 py-0 bg-green-400"><MdDeleteForever onClick={() => removeEmployee(employee)} className="rounded text-2xl bg-red-600 " /></label>
                    </span>

                    {/* Modal to add employee data */}
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Employee Details</h3>
                        <input

                          type="text"
                          name="firstname"
                          id="firstname"
                          value={initfirstname}
                          onChange={(e) => setInitFirstname(e.target.value)}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          value={initlastname}
                          onChange={(e) => setInitLastname(e.target.value)}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={initphonenumber}
                          onChange={(e) => setInitPhonenumber(e.target.value)}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={initemail}
                          onChange={(e) => setInitEmail(e.target.value)}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        {modalerror ? <div className="alert alert-error shadow-lg bg-red-600 text-white">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{modalerror}</span>
                          </div>
                        </div> : <div></div>}
                        {modalsuccess ? <div className="alert alert-success shadow-lg bg-blue-600">
                          <div className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{modalsuccess}</span>
                          </div>
                        </div> : <div></div>}
                        <div className="modal-action">
                          <label htmlFor="my-modal-3" onClick={() => {
                            setModalSuccess('');
                            setModalError('');
                          }} className="btn bg-red-600">Cancel</label>
                          <button onClick={() => updateEmployeeDetails()} type="submit" className="btn btn-success">Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
