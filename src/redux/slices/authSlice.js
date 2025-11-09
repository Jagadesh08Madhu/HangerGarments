import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // your axios instance

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // backend: POST /auth/login
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      console.log("❌ Login Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// 🔹 SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      // backend: POST /auth/register
      const res = await api.post("/auth/register", { name, email, password });
      return res.data;
    } catch (err) {
      console.log("❌ Signup Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

const token = localStorage.getItem("authToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: null,
    loading: false,
    error: null,
    isLoggedIn: !!token,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ LOGIN
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;

        // Handle backend structure
        const { data, success, message } = a.payload;
        if (success && data?.accessToken) {
          s.token = data.accessToken;
          s.user = data.user;
          s.isLoggedIn = true;
          localStorage.setItem("authToken", data.accessToken);
        } else {
          s.error = message || "Login failed!";
        }
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ✅ SIGNUP
      .addCase(signupUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(signupUser.fulfilled, (s, a) => {
        s.loading = false;

        const { data, success, message } = a.payload;
        if (success && data?.accessToken) {
          // auto-login after signup
          s.token = data.accessToken;
          s.user = data.user;
          s.isLoggedIn = true;
          localStorage.setItem("authToken", data.accessToken);
        } else if (success) {
          // registered but no token
          s.isLoggedIn = false;
          s.user = null;
        } else {
          s.error = message || "Signup failed!";
        }
      })
      .addCase(signupUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
