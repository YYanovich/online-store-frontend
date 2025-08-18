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

interface DeviceState {
    devices: Device[]
    loading: boolean
    error: string | null
}

const initialState: DeviceState = { 
    devices: [],
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
        }
    }
})
export const {fetchDeviceStart, fetchDeviceSuccess, fetchDeviceError} = deviceSlice.actions
export default deviceSlice.reducer