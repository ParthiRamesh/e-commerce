// import { useEffect } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.util.js";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  //   useEffect(() => {
  //     return async () => {
  //       const response = await getRedirectResult(auth);
  //       console.log(response);
  //       if (response) {
  //         const userDocRef = await createUserDocFromAuth(response.user);
  //       }
  //     };
  //   }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = await createUserDocFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>sign in</h1>
      <button onClick={logGoogleUser}>Sign in with GOOGLE Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
