import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import type {UserDataValidator, TodoValidator} from '../../Function/useLocalStorage'

export interface TodoState {
  data: UserDataValidator;
  loading: boolean;
}

type TodoIdType = string;

const initialState: TodoState = {
  data: {userName: "", todoList: []},
  loading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataValidator>) => {
      state.data = action.payload;
    },
    addUserTodo: (state, action: PayloadAction<TodoValidator>) => {
      state.data.todoList = [...state.data.todoList, action.payload]
    },
    toggleMarkDoneTodo: (state, action:PayloadAction<TodoIdType>) => {
      state.data.todoList = [...state.data.todoList].map(todo => {
        if(todo.id !== action.payload) return todo;
        return {
          ...todo,
          done: !todo.done
        }
      });
    },
    deleteTodoById: (state, action:PayloadAction<TodoIdType>) => {
      state.data.todoList = [...state.data.todoList].filter(todo => todo.id!== action.payload)
    }
  },
});

export const { setUserData, addUserTodo, toggleMarkDoneTodo, deleteTodoById } = todoSlice.actions;



export default todoSlice.reducer
