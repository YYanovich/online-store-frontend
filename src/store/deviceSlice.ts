import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Device {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
}
export interface Brand {
  id: number;
  name: string;
}
export interface Type {
  id: number;
  name: string;
}
interface DeviceState {
  devices: Device[];
  brands: Brand[];
  types: Type[];
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  brands: [],
  types: [],
  loading: false,
  error: null,
};

export const fetchInitialData = createAsyncThunk(
  "device/fetchInitialData",
  async (_, thunkAPI) => {
    try {
      const [devicesRes, typesRes, brandsRes] = await Promise.all([
        fetch("http://localhost:5002/api/device"),
        fetch("http://localhost:5002/api/type"),
        fetch("http://localhost:5002/api/brand"),
      ]);

      if (!devicesRes.ok || !typesRes.ok || !brandsRes.ok) {
        throw new Error("Failed to fetch initial data");
      }

      const devicesData = await devicesRes.json();
      const typesData = await typesRes.json();
      const brandsData = await brandsRes.json();

      return {
        devices: devicesData.rows,
        types: typesData,
        brands: brandsData,
      };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createBrand = createAsyncThunk(
  "device/createBrand",
  async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5002/api/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Error creating brand");
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const createType = createAsyncThunk(
  "device/createType",
  async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5002/api/type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Error creating type");
      }
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const createDevice = createAsyncThunk(
  "device/createDevice",
  async (deviceData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5002/api/device", {
        method: "POST",
        body: deviceData,
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Error creating device");
      }
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload.devices;
        state.types = action.payload.types;
        state.brands = action.payload.brands;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.brands.push(action.payload);
      })
      .addCase(createType.fulfilled, (state, action: PayloadAction<Type>) => {
        state.types.push(action.payload);
      })
      .addCase(
        createDevice.fulfilled,
        (state, action: PayloadAction<Device>) => {
          state.devices.push(action.payload);
        }
      )
      .addMatcher(isRejectedWithValue, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deviceSlice.reducer;
