import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { AuthCredential, reload } from "firebase/auth";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { Helmet } from "react-helmet-async";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  // const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;

    try {
      await updateUserProfile(displayName, photoURL);
      // await reload(getAuth().currentUser); // Correct reload usage
      toast.success("Profile updated successfully!");
      setShow(false);
    } catch (error) {
      console.error("Profile update failed:", error.message);
    }
  };

  return (
    <section className="popins bg-base-200 p-10 rounded-xl shadow-2xl flex items-center justify-center">
      {/* <Helmet>
          <title>Profile | RunFlow</title>
        </Helmet> */}
      <div className="w-full max-w-sm">
        <div className="card bg-base-100 shadow-2xl">
          <h1 className="text-4xl text-center font-bold mt-4">Profile</h1>

          <div className="card-body">
            {user && (
            <div className="space-y-2">
              {/* Display profile image or fallback image */}
              <div className="h-20 w-20 rounded-full mx-auto bg-gray-300 flex items-center justify-center ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                {user.photoURL ? (
                  <img
                    className="w-full h-full object-cover"
                    src={user.photoURL}
                    alt="Profile"
                  />
                ) : (
                  <FaUserCircle className="text-6xl text-gray-600" />
                )}
              </div>

              <div className="text-lg font-semibold text-center">{user.displayName || "No Name Set"}</div>
              <div className="text-sm opacity-70 text-center">
                {user.email || "Email not available"}
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <button onClick={() => setShow(!show)} className="btn btn-success">
              {show ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {show && (
            <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4 text-left">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  name="displayName"
                  className="input w-full"
                  placeholder="Name"
                  required
                />

                <label className="label">Photo URL</label>
                <input
                  defaultValue={user?.photoURL}
                  type="text"
                  name="photoURL"
                  className="input w-full"
                  placeholder="Photo URL"
                  required
                />
              </fieldset>

              <button type="submit" className="btn btn-neutral w-full">
                Update Profile
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
