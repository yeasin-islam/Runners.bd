import { useContext, useState } from "react";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
// import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
    <div className="flex items-center justify-center p-10 shadow-2xl popins bg-base-200 rounded-xl">
      <Helmet>
        <title>
          Login | RunFlow
        </title>
      </Helmet>
      <div className="w-full max-w-sm">
        <div className="shadow-2xl card bg-base-100">
          <h1 className="mt-5 text-2xl font-bold text-center">Login</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full input input-bordered"
                placeholder="Email"
                required
              />

              <label className="mt-2 label">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className="w-full pr-10 input input-bordered"
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute text-lg text-gray-500 cursor-pointer right-3"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="mt-1 text-right">
                <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="w-full mt-4 btn btn-neutral">
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <button onClick={handleGoogleLogin} className="w-full mb-2 btn">
              <FaGoogle /> <span>Sign in with Google</span>
            </button>

            <div className="mt-4 text-center">
              Not SignUp?{" "}
              <Link className="text-blue-600 underline" to="/signup">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;