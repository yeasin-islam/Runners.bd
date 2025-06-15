import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { AuthCredential, reload } from "firebase/auth";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { Helmet } from "react-helmet-async";
import { FaUserCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
    <section className="flex items-center justify-center p-10 shadow-2xl popins bg-base-200 rounded-xl">
      <Helmet>
        <title>Profile | RunFlow</title>
      </Helmet>
      <div className="w-full max-w-sm">
        <div className="shadow-2xl card bg-base-100">
          <h1 className="pt-6 text-3xl font-bold text-center lg:text-5xl md:text-4xl">Profile</h1>

          <div className="card-body">
            {user && (
              <div className="space-y-2 ">
                {/* Display profile image or fallback image */}
                <div className="flex items-center justify-center w-20 h-20 mx-auto overflow-hidden bg-gray-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.photoURL ? (
                    <img
                      className="object-cover w-full h-full"
                      src={user.photoURL}
                      alt="Profile"
                    />
                  ) : (
                    <FaUserCircle className="text-6xl text-gray-600" />
                  )}
                </div>

                <div className="text-lg font-semibold text-center">{user.displayName || "No Name Set"}</div>
                <div className="text-sm text-center opacity-70">
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
                    className="w-full input"
                    placeholder="Name"
                    required
                  />

                  <label className="label">Photo URL</label>
                  <input
                    defaultValue={user?.photoURL}
                    type="url"
                    name="photoURL"
                    className="w-full input"
                    placeholder="Photo URL"
                    required
                  />
                </fieldset>

                <button type="submit" className="w-full btn btn-neutral">
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
