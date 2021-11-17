import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, TextField } from "@mui/material";
import type { TodoValidator } from "../Function/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { addUserTodo } from "../redux/reducers/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import useLocalStorage from "../Function/useLocalStorage";

interface AddTodoModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddTodoModal({ open, handleClose }: AddTodoModalProps) {
  const storage = useLocalStorage("todotaksu");
  const userData = useSelector((state:RootState) => state.todo.data);
  const {userName} = userData
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    const userTodo: TodoValidator = {
      date: new Date().toString(),
      done: false,
      todo,
      id: uuidv4(),
    };
    storage.addNewTodoByUserName(userName,userTodo);
    dispatch(addUserTodo(userTodo));
    // console.log(userTodo);
    setTodo(""); //clear todo state
    handleClose();
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          // border: '2px solid #000',
          boxShadow: 24,
          borderRadius: "1em",
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          align="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Add New Todo
        </Typography>
        <Divider sx={{ marginBottom: "1em" }} />
        <TextField
          sx={{ marginBottom: "1em" }}
          fullWidth
          variant="outlined"
          label="Todo"
          value={todo}
          onChange={handleTodoChange}
        />
        <Box
          display="flex"
          justifyContent="center"
          gap="1em"
        >
          <Button onClick={handleAddTodo} variant="contained">Add</Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancle
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
