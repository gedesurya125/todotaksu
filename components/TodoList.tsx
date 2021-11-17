import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteTodoById,
  toggleMarkDoneTodo,
} from "../redux/reducers/todoSlice";
import useLocalStorage from "../Function/useLocalStorage";

export default function TodoList() {
  const { todoList, userName } = useSelector(
    (state: RootState) => state.todo.data
  );
  const dispatch = useDispatch();
  const storage = useLocalStorage("todotaksu");
  // const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  const handleToggleDone = (todoId: string) => {
    dispatch(toggleMarkDoneTodo(todoId));
    const recentTodo = todoList.filter((todo) => todo.id === todoId)[0];
    const updatedTodo = {
      ...recentTodo,
      done: !recentTodo.done,
    };
    storage.updateTodoByTodoId(userName, updatedTodo);
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodoById(todoId));
    storage.deleteTodoByTodoId(userName, todoId);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "rgba(211, 211, 211, 0.5)",
        marginTop: "1em",
        borderRadius: "10px",
        padding: "1em",
        boxShadow: '1px 1px 5px black',
        minHeight: '400px'
      }}
    >
      {todoList.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;
        return (
          <ListItem
            key={todo.id}
            sx={{
              backgroundColor: "rgba(187, 234, 223, 0.5)",
            }}
            secondaryAction={
              <IconButton
                onClick={() => handleDeleteTodo(todo.id)}
                edge="end"
                aria-label="comments"
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => handleToggleDone(todo.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textDecoration: todo.done ? "line-through" : "none",
                }}
                id={todo.id}
                primary={todo.todo}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
