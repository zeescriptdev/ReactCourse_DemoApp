import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../../firebase'
import { getProfile, loginWithIdToken, updateProfile } from '../../lib/api'

interface Profile {
  display_name: string
  bio: string
}

interface AuthState {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isLoadingProfile: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  isLoadingProfile: false,
  error: null,
  isAuthenticated: false,
}

// Async thunks for auth operations
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (idToken: string, { rejectWithValue }) => {
    try {
      await loginWithIdToken(idToken)
      return auth.currentUser
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth)
      return null
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async () => {
    return new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        resolve(user)
      })
    })
  }
)

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await getProfile()
      return profile
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get profile'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData: { display_name: string; bio: string }, { rejectWithValue }) => {
    try {
      await updateProfile(profileData)
      return profileData
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
      return rejectWithValue(errorMessage)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      // Google login cases
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Initialize auth cases
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = !!action.payload
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false
        state.error = 'Failed to initialize authentication'
      })
      // Get profile cases
      .addCase(getUserProfile.pending, (state) => {
        state.isLoadingProfile = true
        state.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoadingProfile = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoadingProfile = false
        state.error = action.payload as string
      })
      // Update profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoadingProfile = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoadingProfile = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoadingProfile = false
        state.error = action.payload as string
      })
  }, 
})

export const { clearError, setUser } = authSlice.actions
export default authSlice.reducer