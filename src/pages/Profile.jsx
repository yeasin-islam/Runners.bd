import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import axios from "axios";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [totalMarathons, setTotalMarathons] = useState(0);
  const [myMarathons, setMyMarathons] = useState(0);
  const [myApplys, setMyApplys] = useState(0);
  const axiosSecure = useAxiosSecure()

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
  useEffect(() => {
    // Fetch total posts
    axiosSecure.get(`${import.meta.env.VITE_API_URL}/marathons`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setTotalMarathons(res.data.length);
        } else {
          setTotalMarathons(res.data.count || 0);
        }
      })
      .catch(err => console.error("Error loading all posts:", err));

    // Fetch my posts
    if (user?.email) {
      axiosSecure.get(`/my-marathons?email=${user.email}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setMyMarathons(res.data.length);
          } else {
            setMyMarathons(res.data.count || 0);
          }
        })
        .catch(err => console.error("Error loading user posts:", err));
    };
    if (user?.email) {
      axiosSecure.get(`/my-applications?applicantEmail=${user.email}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setMyApplys(res.data.length);
          } else {
            setMyApplys(res.data.count || 0);
          }
        })
        .catch(err => console.error("Error loading user posts:", err));
    };
  }, [user]);

  return (
    <section className="fontJakarta popins bg-base-200">
      <Helmet>
        <title>Profile | Runners.bd</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center p-10 rounded-xl max-w-4xl mx-auto">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 2, bounce: 0.3 },
            }} className="shadow-2xl card bg-base-100">
            <h1 className="poppins pt-6 text-3xl font-bold text-center lg:text-5xl md:text-4xl">Profile</h1>

            <div className="p-8">
              {user && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-12">
                  {/* Display profile image or fallback image */}
                  <div className="flex-shrink-0 w-32 h-32 rounded-full ring ring-primary ring-offset-2 overflow-hidden bg-base-200 flex items-center justify-center">
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

                  <div className="font-bold text-2xl text-center md:text-start">
                    <div className="font-extrabold">{user.displayName || "No Name Set"}</div>
                    <div className="text-lg text-center opacity-70">
                      {user.email || "Email not available"}
                    </div>
                    <p className="text-lg opacity-70">Account Type: <span className="font-medium capitalize">User</span></p>
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
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
          <div className="bg-primary text-white rounded-xl p-6 shadow hover:scale-[1.02] transition-transform">
            <h4 className="text-lg font-semibold mb-1">Total Marathons</h4>
            <p className="text-4xl font-bold">{totalMarathons}</p>
          </div>

          <div className="bg-secondary text-white rounded-xl p-6 shadow hover:scale-[1.02] transition-transform">
            <h4 className="text-lg font-semibold mb-1">My Marathons</h4>
            <p className="text-4xl font-bold">{myMarathons}</p>
          </div>

          <div className="bg-accent text-white rounded-xl p-6 shadow hover:scale-[1.02] transition-transform">
            <h4 className="text-lg font-semibold mb-1">My Apply Marathons</h4>
            <p className="text-2xl font-bold capitalize">{myApplys}</p>
          </div>
          <div className="bg-accent text-white rounded-xl p-6 shadow hover:scale-[1.02] transition-transform">
            <h4 className="text-lg font-semibold mb-1">Role</h4>
            <p className="text-2xl font-bold capitalize">{user?.role || "User"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
