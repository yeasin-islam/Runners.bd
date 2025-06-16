import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const ApplicationListRow = ({ application, index }) => {

    const { title, photo, location, distance, applicantFirstName, applicantLastName, marathonDate, applicantLocation } = application;

    return (
        <tr>
            <th>
                <label>
                    {index + 1}
                </label>
            </th>
            <td>
                <div className="fontJakarta flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={photo}
                                alt={title} />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{title}</div>
                    <div className="flex items-center gap-1 text-sm opacity-50"><FaLocationDot className="w-5 h-5" /> {location}</div>
                </div>
            </td>
            <td>
                {distance}
            </td>
            <td>
                {marathonDate}
            </td>
            <td>
                <div className="font-bold">{applicantFirstName} {applicantLastName}</div>
                <div className="flex items-center gap-1 text-sm opacity-50"><FaLocationDot className="w-5 h-5" /> {applicantLocation}</div>
            </td>
            <td className="flex gap-2 flex-col md:flex-row">
                <button
                    className="btn btn-warning btn-sm"
                >
                    Update
                </button>
                <button
                    className="btn btn-outline btn-error btn-sm"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ApplicationListRow;