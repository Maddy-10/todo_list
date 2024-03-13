import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useLocalStorage } from '../components/useLocalStorage';
import { addTask, deleteTask, toggleTaskCompletion, editTask } from '../components/useTaskFunctions';

const Home = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [todolist, setTodolist] = useLocalStorage('todolists', []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '') {
      setError("Enter a Task to Add.....!")
    } else {
      addTask(todolist, setTodolist, input);
      setInput('');
    }
  };

  const onDeleteTask = (index) => {
    deleteTask(todolist, setTodolist, index);
  };

  const onCheck = (index) => {
    toggleTaskCompletion(todolist, setTodolist, index);
  };

  const onEditTask = (index) => {
    setEditIndex(index);
    setEditValue(todolist[index].task);
  };

  const onSaveEdit = () => {
    editTask(todolist, setTodolist, editIndex, editValue);
    setEditIndex(-1);
  };

  const filteredTasks = todolist.filter(task =>
    task.task.toLowerCase().includes(search.toLowerCase())
  );

  const noResultsFound = search !== '' && filteredTasks.length === 0;

  return (
    <>
      <div className="container px-1 flex flex-col md:mx-auto">
        <h1 className='text-center text-2xl my-2'>To-Do List</h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 w-[50%] mx-auto rounded border-black mt-3 text-center px-2 py-1"
          placeholder="Search tasks..."
        />

        <form className="flex mx-auto justify-between w-full mt-3" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={(e) => {
            setError('')
            setInput(e.target.value)
          }} className="border border-black w-[100%] rounded-l px-2" placeholder="Enter Task..." />
          <button type="submit" className="border border-black rounded-r bg-gray-200 hover:bg-gray-300 px-2 py-1 w-[30%]">Add</button>
        </form>
        {error && <p className='text-red-500 text-left ml-2 text-lg'>{error}</p>}

        <div className=" w-full px-1 mt-3">
          {noResultsFound ? (
            <p>No results found...!</p>
          ) : (
            filteredTasks.map((task, index) => (
              <div className="flex justify-between border-b mt-1" key={index}>
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
                    <p className={task.completed ? 'my-auto text-xl line-through' : 'my-auto text-xl'}>{task.task}</p>
                    <div className="w-auto flex justify-between px-2 border-l">
                      <div className="flex">
                        {task.completed && <p className="my-auto mr-1">Completed</p>}
                        <input type="checkbox" disabled={task.completed} className="w-5 h-5 my-auto text-green-400 focus:ring-green-400" checked={task.completed} onChange={() => onCheck(index)} />
                      </div>
                      <button className="text-blue-500 rounded px-1 ml-1 my-1" onClick={() => onEditTask(index)}><MdEdit size={24} /></button>
                      <button className="text-red-500  rounded px-1 ml-1 my-1" onClick={() => onDeleteTask(index)}><MdDeleteForever size={24} /></button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
