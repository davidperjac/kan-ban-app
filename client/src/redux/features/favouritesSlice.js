import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		setFavouriteList: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setFavouriteList } = favouritesSlice.actions;
export default favouritesSlice.reducer;
