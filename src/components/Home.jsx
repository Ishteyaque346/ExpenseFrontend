import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useDispatch } from 'react-redux'
import ExpenseTable from './ExpenseTable'
import { setCategory, setDoneExpense } from '@/redux/expenseSlice'
import usetGetExpenses from '@/hooks/userGetEexpenses'
 
const Home = () => {
  usetGetExpenses();
  const dispatch = useDispatch();
  const handlecategoryChange = (value) => {
    dispatch(setCategory(value));
  }
  const handledoneChange = (value) => {
    dispatch(setDoneExpense(value));
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl max-auto mt-6 '>
        <div className='flex items-center justify-between mb-5'>
          <h1 className='mx-80'>Expense</h1>
          <CreateExpense />
        </div>
        <div className='flex items-centre my-5' >
          <h1 className=' mx-80 font-medium text-lg'>Filter By: </h1>
          <Select onValueChange={handlecategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handledoneChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
          <ExpenseTable />
      </div>
    </div>
  )
}

export default Home
