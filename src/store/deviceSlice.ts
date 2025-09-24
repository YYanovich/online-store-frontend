import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Device {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
}

interface Brand {
    id: number,
    name: string
}

interface Type {
    id: number,
    name: string
}

interface DeviceState {
    devices: Device[],
    brands: Brand[],
    types: Type[],
    loading: boolean
    error: string | null
}

const initialState: DeviceState = { 
    devices: [],
    brands: [],
    types: [],
    loading: false,
    error: null,
}

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        fetchDeviceStart(state) {
            state.loading = true
            state.error = null
        },
        fetchDeviceSuccess(state, action: PayloadAction<Device[]>) {
            state.loading = false
            state.devices = action.payload
        },
        fetchDeviceError(state, action: PayloadAction<string>) {
            state.loading = false,
            state.error = action.payload
        },
        createDeviceSuccess(state, action: PayloadAction<Device>) {
            state.devices.push(action.payload)
        },
        fetchTypesStart(state) {
            state.loading = true
            state.error = null
        },
        fetchTypesSuccess(state, action: PayloadAction<Type[]>) {
            state.loading = false,
            state.types = action.payload
        },
        fetchTypesError(state, action: PayloadAction<string>) {
            state.loading = false,
            state.error = action.payload
        },
        createTypeSuccess(state, action: PayloadAction<Type>) {
            state.types.push(action.payload);
        },
        fetchBrandStart(state) {
            state.loading = true
            state.error = null
        },
        fetchBrandSuccess(state, action: PayloadAction<Brand[]>) {
            state.loading = false
            state.brands = action.payload
        },
        fetchBrandError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload
        },
        createBrandSuccess(state, action: PayloadAction<Brand>) {
            state.brands.push(action.payload)
        }
        
    }
})
export const {fetchDeviceStart, fetchDeviceSuccess, fetchDeviceError, createDeviceSuccess, fetchTypesStart, fetchTypesSuccess, fetchTypesError, createTypeSuccess, fetchBrandStart, fetchBrandSuccess, fetchBrandError, createBrandSuccess } = deviceSlice.actions
export default deviceSlice.reducer