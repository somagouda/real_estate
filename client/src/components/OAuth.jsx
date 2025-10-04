import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/user.Slice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());

      const provider = new GoogleAuthProvider();
       provider.setCustomParameters({ prompt: 'select_account' }); // 👈 always ask
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,   // 👈 backend expects `name`
          picture: result.user.photoURL    // 👈 backend expects `picture`
        })
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data.user));
        navigate('/'); // redirect after login
      } else {
        dispatch(signInFailure(data.error || "Google login failed"));
      }
    } catch (error) {
      console.log("Google sign-in failed:", error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='mt-3'>
      <button 
        onClick={handleGoogleClick} 
        type='button' 
        className="flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded w-full uppercase hover:opacity-95 transition"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="google"
          className="w-5 h-5 bg-white rounded-full p-1"
        />
        Continue with Google
      </button>
    </div>
  )
}
