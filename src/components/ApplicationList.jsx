import React, { use } from 'react';
import ApplicationListRow from './ApplicationListRow';

const ApplicationList = ({ myApplicationPromise }) => {

    const applications = use(myApplicationPromise);

    // console.log(applications)

    return (
        <div className='fontJakarta container mx-auto py-8'>
            <p className='text-md text-center font-bold pb-8'>You Applied Marathon So Far: {applications.length}</p>
            <div className="overflow-x-auto">
                <table className="table w-full bg-base-200 shadow rounded-md text-sm md:text-base">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Title & Details</th>
                            <th>Distance</th>
                            <th>Marathon Date</th>
                            <th>Applicant Details</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-base-300">
                        {
                            applications.map((application, index) => <ApplicationListRow
                                key={application._id}
                                index={index}
                                application={application}
                            ></ApplicationListRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationList;