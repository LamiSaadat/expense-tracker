import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080";

const initialState = {
  expenseItems: [],
  totalExpenses: 0,
  isLoading: true,
};

export const getExpenseItems = createAsyncThunk(
  "expenses/getExpenseItems",
  async () => {
    try {
      const res = await axios(url);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addExpenseItem = createAsyncThunk(
  "expenses/addExpenseItem",
  async (newItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, newItem);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteExpenseItem = createAsyncThunk(
  "expenses/deleteExpenseItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    calculteTotalExpenses: (state) => {
      let total = 0;

      state.expenseItems.forEach((item) => (total += Number(item.amount)));

      state.totalExpenses = total;
    },
  },
  extraReducers: {
    [getExpenseItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getExpenseItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.expenseItems = action.payload;
    },
    [getExpenseItems.rejected]: (state) => {
      state.isLoading = false;
    },
    [addExpenseItem.fulfilled]: (state, action) => {
      state.expenseItems.push(action.payload);
    },
  },
});

export const { calculteTotalExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
