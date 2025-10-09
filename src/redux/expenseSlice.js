import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState:{
    category: "",
    doneExpense: "",
    expenses: [],
    singleExpense: null
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDoneExpense: (state, action) => {
      state.doneExpense = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
     setSingleExpense: (state, action) => {
      state.singleExpense = action.payload;
    } 
  },
});
export const { setCategory, setDoneExpense, setExpenses, setSingleExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
