import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Loader, Loader2 } from 'lucide-react'
import axios, { Axios } from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses } from '@/redux/expenseSlice'

function CreateExpense() {
  const [formData, setFormData] = useState({
    description: '',
       amount: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {expenses} = useSelector(store=>store.expense);

   const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlecategoryChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        try {
          setLoading(true); 
          const res = await axios.post("http://localhost:8000/api/v1/expense/add",formData, {
             headers:{
            'Content-Type': 'application/json'
          },
          withCredentials:true
          });
          if(res.data.success){
            dispatch(setExpenses([...expenses, res.data.expense]));
           toast.success(res.data.message);
           setIsOpen(false); 
          }
         
        } catch (error) {
           console.log(error);
          
        } finally {
          setLoading(false);
        }
    };


  return (
    <Dialog open={IsOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button onClick={()=> setIsOpen(true)} variant="outline">Add New Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expence</DialogTitle>
            <DialogDescription>
              Create a new expense here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="name-1">
                  Description
                </label>
                <Input
                  id="descrption"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">
                  Amount
                </Label>
                <Input
                  id="amount"
                  placeholder="xxx in ₹"
                  name="amount"
                  value={formData.amount}
                  onChange={changeEventHandler}
                />
              </div>
              <Select onValueChange={handlecategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
            {
              loading ? <Button className='w-full my-4'>
                <Loader2 className='mr-2 h-4 animate-spin' />
                Please Wait...
                </Button> : 
                <Button type="submit">Add</Button>

            }
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>

  );
}


export default CreateExpense;