import { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
// import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

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
    <div className="popins bg-base-200 p-10 rounded-xl flex items-center justify-center min-h-screen">
      {/* <Helmet>
        <title>SignUp | RunFlow</title>
      </Helmet> */}

      <div className="w-full max-w-sm">
        <div className="card bg-base-100 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mt-5">Sign Up</h1>
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

              <label className="label mt-2">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Email"
                required
              />

              <label className="label mt-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className="input input-bordered pr-10"
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-8 cursor-pointer text-lg text-gray-500"
                  onClick={() => setPasswordVisible(prev => !prev)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label className="label mt-2">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Image URL"
              />

              <button type="submit" className="btn btn-neutral mt-4 w-full">
                Sign Up
              </button>
            </form>

            <div className="divider">OR</div>

            <button onClick={handleGoogleSignup} className="btn w-full mb-2">
              <FaGoogle /> <span>Sign Up with Google</span>
            </button>

            <div className="text-center mt-4">
              Already signed up?{" "}
              <Link className="underline text-blue-600" to="/login">
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
