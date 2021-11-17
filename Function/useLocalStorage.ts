import React, {useEffect} from "react";

export interface TodoValidator {
  id: string;
  todo: string;
  date: string;
  done: boolean
}

export interface UserDataValidator {
  userName: string;
  todoList: TodoValidator[];
}

export type LocalStorageValidator = UserDataValidator[];

const useLocalStorage = (localStorageName: string) => {



  const setDataLocalStorage = (data:LocalStorageValidator) => {
    localStorage.setItem(localStorageName, JSON.stringify(data));
  }

  const getItemLocalStorage = (storageName: string): LocalStorageValidator => {
    return JSON.parse(localStorage.getItem(storageName) || "[]");
  };

  //used in login section GET DATA BY USERNAME
  const localStorageLogin = (userName: string):UserDataValidator => {
    //create new local Storage with  new userName object
    const newLocalStorage: LocalStorageValidator = [
      {
        userName,
        todoList: [],
      },
    ];
    //check if local storage is empty or not
    if (getItemLocalStorage(localStorageName).length === 0) {
      //if empty create new data on local storage and return new created user
      // localStorage.setItem(localStorageName, JSON.stringify(newLocalStorage));
      setDataLocalStorage(newLocalStorage);
      return newLocalStorage[0];

    } else {
      //getDataByUserName
      const savedUserData = getDataByUserName(userName);
      //if user found return his data
      if (Boolean(savedUserData)) return savedUserData || newLocalStorage[0];
      //else create new user with emptyData on existing local storage;
      addNewUser(userName);
      //and return his newly data
      return newLocalStorage[0];
    }
  };

  const getUserList = () => {
    const storage = getItemLocalStorage(localStorageName);
    return storage.map(data => data.userName);
  }  

  
  /**
   * Create new user with empty data on existing local storage
   */
  const addNewUser = (userName:string) => { 
    const currentData = getItemLocalStorage(localStorageName);
    currentData.push({
      userName,
      todoList: []
    });
    setDataLocalStorage(currentData);
  }

  /**
   * if user not found will return false
   * else if user found will return userData object
   */
  const getDataByUserName = (userName: string,) => {
    const storage = getItemLocalStorage(localStorageName);
    if (storage.length === 0) return false; // storage is empty
    const userData: UserDataValidator = storage.filter(
      (userData) => userData.userName === userName
    )[0];
    if (!Boolean(userData)) return false;
    return userData;
  };

  const addNewTodoByUserName = (userName:string, newTodo:TodoValidator) => {
    const storage = getItemLocalStorage(localStorageName);
    const newStorage = storage.map(data => {
      if(data.userName !== userName)return data;
      return {
        ...data,
        todoList:[
          ...data.todoList,
          newTodo
        ]
      }
    });
    setDataLocalStorage(newStorage);

  }

  const deleteTodoByTodoId = (userName:string, todoId:string) => {
    const storage = getItemLocalStorage(localStorageName);
    const newStorage = storage.map(data => {
      if(data.userName !== userName) return data;
      return {
        ...data,
        todoList: data.todoList.filter(todo => todo.id !== todoId)
      }
    });
    setDataLocalStorage(newStorage);
  }

  const updateTodoByTodoId = (userName:string, newTodo:TodoValidator) => {
    const storage = getItemLocalStorage(localStorageName);
    const newStorage = storage.map(data => {
      if(data.userName !== userName) return data;
      return {
        ...data,
        todoList: data.todoList.map(todo => {
          if(todo.id !== newTodo.id) return todo;
          return newTodo
        })
      }
    });
    setDataLocalStorage(newStorage)

  }


  return {
    localStorageLogin,
    getDataByUserName,
    addNewTodoByUserName,
    deleteTodoByTodoId,
    updateTodoByTodoId,
    getUserList,
  };
};

export default useLocalStorage;
