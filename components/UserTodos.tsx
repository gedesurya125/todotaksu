// import { Box, Button } from '@mui/system';
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { Box, Button } from "@mui/material";
import AddTodoModal from "./AddTodoModal";
import { useRouter } from "next/router";
import TodoList from './TodoList'

const UserTodos = () => {
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.todo.data);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { userName, todoList } = userData;

  const handleCloseAddTodo = () => {
    setOpenAddModal(false)
  }
  const handleOpenAddTodo = () => {
    setOpenAddModal(true)
  }

  const handleGoToHome = () => {
    router.push('/')
  }
  return (
    <>
      <Box
        sx={{
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      >
        <Box display="flex" justifyContent="center" gap="1em">
          <Button onClick={handleOpenAddTodo} variant="contained">Add Todo</Button>
          <Button onClick={handleGoToHome} variant="contained" color="error">
            Log Out
          </Button>
        </Box>
        <TodoList/>
      </Box>
      <AddTodoModal open={openAddModal} handleClose={handleCloseAddTodo}/>
    </>
  );
};

export default UserTodos;
