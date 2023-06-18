import React, { Fragment } from 'react';
import Navbar from './Navbar';
import { HiUserAdd } from 'react-icons/hi';

export default function Dashboard() {



    return (
        <>
            <Navbar />
            
            <div className=" mt-12 p-4">
                
                
                <div className="grid md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 gap-3">

                    <div className="card w-96 bg-primary text-primary-content mt-16">
                        <div className="card-body text-center">
                            <h2 className="card-title flex justify-center">Colleagues</h2>
                            <p>12</p>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-primary text-primary-content mt-16">
                        <div className="card-body text-center">
                            <h2 className="card-title flex justify-center">Friends</h2>
                            <p>9</p>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-primary text-primary-content mt-16">
                        <div className="card-body text-center">
                            <h2 className="card-title flex justify-center">Family</h2>
                            <p>8</p>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-primary text-primary-content mt-16">
                        <div className="card-body text-center">
                            <h2 className="card-title flex justify-center ">Others</h2>
                            <p>22</p>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-primary text-primary-content mt-16">
                        <div className="card-body text-center">
                            <h2 className="card-title flex justify-center ">Relatives</h2>
                            <p>16</p>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-primary text-primary-content mt-16">
                        <div className="card-body text-center">
                            <h2 className="card-title flex justify-center ">Church</h2>
                            <p>13</p>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}