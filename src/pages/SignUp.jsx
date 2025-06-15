import { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
// import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { signUp, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", imageUrl: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, imageUrl } = form;

    // ✅ Password validation after submit
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const validLength = password.length >= 6;

    if (!upperCase) {
      return Swal.fire({
        icon: "warning",
        title: "Password must have at least one uppercase letter!",
      });
    }

    if (!lowerCase) {
      return Swal.fire({
        icon: "warning",
        title: "Password must have at least one lowercase letter!",
      });
    }

    if (!validLength) {
      return Swal.fire({
        icon: "warning",
        title: "Password must be at least 6 characters long!",
      });
    }

    // Sign up logic
    signUp(email, password)
      .then(() => {
        if (imageUrl) {
          updateUserProfile(name, imageUrl);
        } else {
          updateUserProfile(name);
        }

        Swal.fire({
          icon: "success",
          title: "Sign up successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed up with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-10 popins bg-base-200 rounded-xl">
      <Helmet>
        <title>SignUp | RunFlow</title>
      </Helmet>

      <div className="w-full max-w-sm">
        <div className="shadow-2xl card bg-base-100">
          <h1 className="mt-5 text-2xl font-bold text-center">Sign Up</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Name"
                required
              />

              <label className="mt-2 label">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Email"
                required
              />

              <label className="mt-2 label">Password</label>
              <div className="relative flex items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className="pr-10 input input-bordered"
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute text-lg text-gray-500 cursor-pointer right-8"
                  onClick={() => setPasswordVisible(prev => !prev)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label className="mt-2 label">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Image URL"
              />

              <button type="submit" className="w-full mt-4 btn btn-neutral">
                Sign Up
              </button>
            </form>

            <div className="divider">OR</div>

            <button onClick={handleGoogleSignup} className="w-full mb-2 btn">
              <FaGoogle /> <span>Sign Up with Google</span>
            </button>

            <div className="mt-4 text-center">
              Already signed up?{" "}
              <Link className="text-blue-600 underline" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
