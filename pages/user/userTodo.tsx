import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import UserTodos from "../../components/UserTodos";

const StyledContent = styled("main")(({ theme }) => ({
  "& .title": {
    textAlign: 'center'
  },
}));

const UserTodo: NextPage = () => {
  const userData = useSelector((state: RootState) => state.todo);
  // console.log(userData.data.userName);
  const { userName, todoList } = userData.data;
  return (
    <div>
      <Head>
        <title>User Todo</title>
      </Head>
      <StyledContent>
        <Container sx={{
          paddingTop: '1em',
          paddingBottom: '1em',

        }}>
          <div className="title">
            <Typography fontWeight="bold" variant="h5">Hi {userName}</Typography>
            <Typography>Here is your todos</Typography>
          </div>
          <UserTodos/>
        </Container>
      </StyledContent>
    </div>
  );
};

export default UserTodo;
