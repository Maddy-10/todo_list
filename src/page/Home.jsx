import React, {useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useLocalStorage } from '../components/useLocalStorage';
import { addTask, deleteTask, toggleTaskCompletion } from '../components/useTaskFunctions';

const Home = () => {
  const [input, setInput] = useState('');
  const [todolist, setTodolist] = useLocalStorage('todolists', []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(todolist, setTodolist, input);
    setInput('');
  };

  const onDeleteTask = (index) => {
    deleteTask(todolist, setTodolist, index);
  };

  const onCheck = (index) => {
    toggleTaskCompletion(todolist, setTodolist, index);
  };

  return (
    <>
      <div className="container px-1 md:mx-auto">
      <h1 className='text-center text-2xl my-2'>To-Do List</h1>
        <form className="flex mx-auto justify-between w-full mt-3" onSubmit={handleSubmit}> 
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border w-[100%] rounded-l" placeholder="Enter Task..." />
          <button type="submit" className="border rounded-r bg-gray-200 hover:bg-gray-300 px-2 py-1 w-[30%]">Add</button>
        </form>

        <div className=" w-full px-1 mt-3">
          {todolist.map((task, index) => (
            <div className="flex justify-between border-b mt-1" key={index}>
              <p className={task.completed ? 'my-auto text-xl line-through' : 'my-auto text-xl'}>{task.task}</p>
              <div className="w-auto flex justify-between px-2 border-l">
                <div className="flex">
                  {task.completed && <p className="my-auto mr-1">Completed</p>}
                  <input type="checkbox" disabled={task.completed} className="w-5 h-5 my-auto text-green-400 focus:ring-green-400" checked={task.completed} onChange={() => onCheck(index)} />          
                </div>
                <button className="text-red-500  rounded px-1 ml-3 my-1" onClick={() => onDeleteTask(index)}><MdDeleteForever size={24}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
