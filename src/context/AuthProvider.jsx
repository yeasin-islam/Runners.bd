import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config.js";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signInWithGithub = () => {
    return signInWithPopup(auth).then((result) => {

      const user = result.user;

      const githubEmail = result._tokenResponse.email || result.user.email;
      if (!user.email && githubEmail) {
        updateProfile(user, {
          email: githubEmail,
        }).then(() => {
          setUser({ ...user, email: githubEmail });
        });
      }

      return result;
    });
  };

  const signUp = (email, password, name) => {
    // Register user with email/password
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // After signing up, update the profile with name
        return updateProfile(user, { displayName: name });
      })
      .then(() => {
        setUser({ ...auth.currentUser });
      });
  };

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const updateUserProfile = async (displayName, photoURL) => {
    await updateProfile(auth.currentUser, { displayName, photoURL });
    setUser({ ...auth.currentUser }); // Let onAuthStateChanged refresh if needed
  };

  const logOut = () => {
    setIsLoading(false);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
