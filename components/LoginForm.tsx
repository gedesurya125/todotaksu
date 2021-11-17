import React, {useEffect, useState} from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLocalStorage from "../Function/useLocalStorage";
// import Link from "next/link";
import {useRouter} from 'next/router';
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/reducers/todoSlice";

const LoginFormContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
}));

interface LoginFormProps {
  onLogin: () => void;
}


const LoginForm = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string|null>(userList[0] || null);
  const [inputValue, setInputValue] = useState("");
  const ls = useLocalStorage("todotaksu");
  const dispatch = useDispatch();

  // const userList = ls.getUserList().map((userName) => ({ label: userName }));
  // console.log(ls.getUserList());

  const handleValueChange = (e:any, newVal:string|null) => {
    setSelectedValue(newVal)  
  }

  const handleInputChange = (e:any, newVal:string) => {
    setInputValue(newVal);
  }
  console.log( inputValue)

  const handleLogin = () => {
    router.push("/user/userTodo");
    dispatch(setUserData(ls.localStorageLogin(inputValue)))
  }
  useEffect(() => {
    setUserList(ls.getUserList()) //access the localStorage after render
    // setUserList(["satu, dua, tiga", "empat", "lima"]) //access the localStorage after render

  }, []);

  return (
    <LoginFormContainer sx={{
      marginBottom: '1em'
    }}>
      <Autocomplete
        freeSolo
        disablePortal
        value={selectedValue}
        inputValue={inputValue}
        onChange={handleValueChange}
        onInputChange={handleInputChange}
        options={userList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} sx={{
          marginBottom: '1em',
          marginTop: '1em'
        }} label="User Name" />}
      />
      <Button onClick={handleLogin} variant="contained">Login</Button>
    </LoginFormContainer>
  );
};

export default LoginForm;
