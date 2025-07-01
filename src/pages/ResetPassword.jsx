import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import Lottie from "lottie-react";
import LottieAnimation from "../assets/lotties/ResetPassword.json";
import { auth } from "../firebase.config";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="fontJakarta bg-base-200 flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Reset Password | Runners.bd</title>
      </Helmet>

      <div
        className="flex flex-col md:flex-row gap-10 items-center max-w-4xl w-full bg-base-300 border border-primary rounded-xl shadow-xl p-8"
        data-aos="fade-up"
      >
        <div data-aos="zoom-in">
          <Lottie
            animationData={LottieAnimation}
            style={{ width: "300px" }}
            loop
          />
        </div>

        <form onSubmit={handleReset} className="w-full max-w-md space-y-4">
          <h2 className="poppins text-3xl font-bold text-center text-primary">
            Forgot Password?
          </h2>
          <p className="text-center text-sm text-gray-500">
            Enter your email to receive a password reset link.
          </p>
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full">
            Send Reset Link
          </button>

          <div className="text-center text-sm mt-2">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
