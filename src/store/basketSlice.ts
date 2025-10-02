import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Device } from "./deviceSlice";

interface BasketState {
  items: Device[];
  loading: boolean;
  error: string | null;
}

const initialState: BasketState = {
  items: [],
  loading: false,
  error: null,
};

export const addToBasket = createAsyncThunk<
  Device,
  number,
  { rejectValue: string }
>("basket/addToBasket", async (deviceId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("User is not authenticated. Please log in.");
    }

    const response = await fetch("http://localhost:5002/api/basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const getBasket = createAsyncThunk<
  Device[],
  void,
  { rejectValue: string }
>("basket/getBasket", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5002/api/basket", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong with getting basket items"
      );
    }
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const removeFromBasket = createAsyncThunk<
  Device,
  number,
  { rejectValue: string }
>("basket/removeFromBasket", async (deviceId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5002/api/basket/${deviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message ||
          "Something went wrong with deleting item from the basket"
      );
    }
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});
export const clearBasket = createAsyncThunk<
  Device[],
  void,
  { rejectValue: string }
>("basket/clearBasket", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5002/api/basket", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data.message || "Something went wront with clearing basket"
      );
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});
const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToBasket.fulfilled,
        (state, action: PayloadAction<Device>) => {
          state.loading = false;
          state.items.push(action.payload);
        }
      )
      .addCase(addToBasket.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(getBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBasket.fulfilled,
        (state, action: PayloadAction<Device[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(getBasket.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(removeFromBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFromBasket.fulfilled,
        (state, action: PayloadAction<Device>) => {
          state.loading = false;
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      )
      .addCase(removeFromBasket.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(clearBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearBasket.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearBasket.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export default basketSlice.reducer;
