import { useContext, useState } from "react";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
// import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form.email, form.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Succesfuly",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from);
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login with Google!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from);
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <div className=" popins bg-base-200 p-10 rounded-xl shadow-2xl flex items-center justify-center">
      {/* <Helmet>
        <title>
          Login | RunFlow
        </title>
      </Helmet> */}
      <div className="w-full max-w-sm">
        <div className="card bg-base-100 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mt-5">Login</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />

              <label className="label mt-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-3 cursor-pointer text-lg text-gray-500"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="text-right mt-1">
                <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-neutral mt-4 w-full">
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <button onClick={handleGoogleLogin} className="btn w-full mb-2">
              <FaGoogle /> <span>Sign in with Google</span>
            </button>

            <div className="text-center mt-4">
              Not SingUp?{" "}
              <Link className="underline text-blue-600" to="/singup">
                SingUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;