import { useEffect } from "react";
import { signInWithGoogle, onAuth } from "../firebase"
import { useAppDispatch } from "../store";
import { loginWithGoogle, initializeAuth } from "../store/slices/authSlice";

export default function Login() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const unsub = onAuth(async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                dispatch(loginWithGoogle(idToken))
            }
        })

        dispatch(initializeAuth())

        return () => unsub()
    }, [dispatch])

  const handleLogin = async () => {
    try {
        const { idToken } = await signInWithGoogle();
        dispatch(loginWithGoogle(idToken))
    } catch (error) {
        console.error('Error signing in with Google:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}