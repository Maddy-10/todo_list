export const addTask = (todolist, setTodolist, input) => {
    const newTask = { 
      task: input,
      completed: false
    };

    const updatedList = [newTask,
      ...todolist.filter(task => !task.completed),
      ...todolist.filter(task => task.completed),
    ];

    setTodolist(updatedList);
  };
  
  export const deleteTask = (todolist, setTodolist, index) => {
    const updatedList = [...todolist];
    updatedList.splice(index, 1);
    setTodolist(updatedList);
  };
  
  export const toggleTaskCompletion = (todolist, setTodolist, index) => {
    const updatedList = [...todolist];
    updatedList[index].completed = true;
    if(updatedList[index].completed){
      const newCheckeditem = updatedList.splice(index,1)[0];
      updatedList.push(newCheckeditem);
    }
    setTodolist(updatedList);
  };
  
  export const editTask = (todolist, setTodolist, index, newTask) => {
    const updatedList = [...todolist];
    if (index >= 0 && index < updatedList.length) {
      updatedList[index] = { ...updatedList[index], task: newTask };
      setTodolist(updatedList);
    } else {
      console.error("Invalid index provided for editing task.");
    }
  };
  