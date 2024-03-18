import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useLocalStorage } from '../components/useLocalStorage'; 
import { addTask, deleteTask, toggleTaskCompletion, editTask } from '../components/useTaskFunctions';

const Home = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [todolist, setTodolist] = useLocalStorage('todolists', []); // Custom hook for local storage
  const [completedTodo, setCompletedTodo] = useLocalStorage('completedTodos', []); // Custom hook for local storage
  const [isActive, setIsActive] = useState(true);

  // Function to toggle between active and completed tasks
  const toggleActive = () => {
    let active = !isActive;
    setIsActive(active);
  };

  // Effect to handle escape key press to cancel editing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && editIndex !== -1) {
        setEditIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editIndex]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '') {
      setError("Enter a Task to Add.....!")
    } else {
      addTask(todolist, setTodolist, input);
      setInput('');
    }
  };

  // Function to delete a task
  const onDeleteTask = (index) => {
    deleteTask(todolist, setTodolist, index);
  };

  // Function to delete a completed task
  const onDeleteCompletedTask = (index) => {
    deleteTask(completedTodo, setCompletedTodo, index);
  };

  // Function to toggle task completion
  const onCheck = (index) => {
    toggleTaskCompletion(todolist, setTodolist, index);
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    console.log("Completed On : " + completedOn);

    let filtercompleted = {
      ...todolist[index],
      completedOn: completedOn
    }

    let updateCompleted = [...completedTodo];
    updateCompleted.push(filtercompleted);
    setCompletedTodo(updateCompleted);

    console.log(updateCompleted);

    onDeleteTask(index);
  };

  // Function to edit a task
  const onEditTask = (index) => {
    setEditIndex(index);
    setEditValue(todolist[index].task);
  };

  // Function to save edited task
  const onSaveEdit = () => {
    editTask(todolist, setTodolist, editIndex, editValue);
    setEditIndex(-1);
  };

  // Filtering tasks based on search query
  const filteredTasks = todolist.filter(task =>
    task.task.toLowerCase().includes(search.toLowerCase())
  );

  // Checking if no results found for search
  const noResultsFound = search !== '' && filteredTasks.length === 0;

  return (
    <>
      <div className="container px-1 flex flex-col md:mx-auto">
        <h1 className='text-center text-2xl my-2'>To-Do List</h1>

        {/* Search input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 w-[50%] mx-auto rounded border-black mt-3 px-2 py-1"
          placeholder="Search tasks..."
        />

        {/* Form for adding tasks */}
        <form className="flex mx-auto justify-between w-full mt-3" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={(e) => {
            setError('')
            setInput(e.target.value)
          }} className="border border-black w-[100%] rounded-l px-2" placeholder="Enter Task..." />
          <button disabled={!input} name="addtasks" type="submit" className="border border-black rounded-r bg-gray-200 hover:bg-gray-300 px-2 py-1 w-[30%]">Add</button>
        </form>

        {/* Displaying error if input is empty */}
        {error && <p className='text-red-500 text-left ml-2 text-lg'>{error}</p>}

        {/* Toggle buttons for active tasks and completed tasks */}
        <div className='flex mt-2 border-b border-blue-700'>
          <button onClick={toggleActive}
            className={`border px-2 py-1 rounded-t ${!isActive && 'hover:bg-gray-200'} ${isActive ? 'bg-blue-700 text-white border-white' : 'bg-none'}`}>Active</button>
          <button onClick={toggleActive}
            className={`border px-2 py-1 rounded-t ${isActive && 'hover:bg-gray-200'} ${!isActive ? 'bg-blue-700 text-white border-white' : 'bg-none'}`}>Completed</button>
        </div>

        {/* Displaying tasks based on active state */}
        <div className="w-full px-1 mt-3">
          {isActive === true && (noResultsFound ? (
            <p>No results found...!</p>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div  className="flex justify-between border-b mt-1" key={index}>
                {/* Editing task */}
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded-l w-full px-2 py-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSaveEdit();
                        }
                      }}
                    />
                    <button className="border rounded-r bg-gray-200 hover:bg-gray-300 px-2 py-1" onClick={onSaveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    {/* Displaying task */}
                    <p  className={task.completed ? 'my-auto text-xl line-through' : 'my-auto text-xl'}>{task.task}</p>
                    <div className="w-auto flex justify-between px-2 border-l">
                      <div className="flex">
                        {/* Checkbox for task completion */}
                        {task.completed && <p className="my-auto mr-1">Completed</p>}
                        <input type="checkbox" disabled={task.completed} className="w-5 h-5 my-auto text-green-400 focus:ring-green-400" checked={task.completed} onChange={() => onCheck(index)} />
                      </div>
                      {/* Buttons for editing and deleting task */}
                      <button disabled={task.completed} className="text-blue-500 rounded px-1 ml-1 my-1" onClick={() => onEditTask(index)}><MdEdit size={24} /></button>
                      <button className="text-red-500  rounded px-1 ml-1 my-1" onClick={() => onDeleteTask(index)}><MdDeleteForever size={24} /></button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : <p>Your List Looks Empty Add Some Tasks to The List....!</p>)}

          {/* Displaying completed tasks */}
          {isActive === false && (noResultsFound ? (
            <p>No results found...!</p>
          ) : completedTodo.length > 0 ? (
            completedTodo.map((task, index) => (
              <div className="flex justify-between border-b mt-1" key={index}>
                {/* Editing completed task */}
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded-l w-full px-2 py-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSaveEdit();
                        }
                      }}
                    />
                    <button className="border rounded-r bg-gray-200 hover:bg-gray-300 px-2 py-1" onClick={onSaveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    {/* Displaying completed task */}
                    <p className={task.completed ? 'my-auto text-xl line-through' : 'my-auto text-xl'}>{task.task}</p>
                    <div className="w-auto flex justify-between px-2 border-l">
                      <div className="flex">
                        {task.completed && <p className="my-auto mr-1">Completed on : {task.completedOn}</p>}
                      </div>
                      {/* Button to delete completed task */}
                      <button className="text-red-500  rounded px-1 ml-1 my-1" onClick={() => onDeleteCompletedTask(index)}><MdDeleteForever size={24} /></button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : <p>All tasks are still in progress.....!</p>)}
        </div>
      </div>
    </>
  );
};

export default Home;
