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
  