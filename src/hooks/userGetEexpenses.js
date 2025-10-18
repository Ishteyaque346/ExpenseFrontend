
import { setExpenses } from "@/redux/expenseSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const usetGetExpenses = () => {
          const dispatch = useDispatch();
          const { category, doneExpense } = useSelector(store => store.expense);

          useEffect(() => {
                    const fetchExpenses = async () => {
                              try {
                                        axios.defaults.withCredentials = true;
                                        const res = await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&doneExpense=${doneExpense}`);
                                        if (res.data.success) {
                                                  dispatch(setExpenses(res.data.expenses));
                                        }
                              } catch (error) {
                                        console.log(error);

                              }
                    }
                    fetchExpenses();
          }, [dispatch, category, doneExpense]);
}
export default usetGetExpenses;