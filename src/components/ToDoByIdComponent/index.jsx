import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import ErrorComponent from '../Error';
import { fetchToDoById } from '../../reducer/todoDynamicSlice';

const ToDoComponentById = () => {
  const dispatch = useDispatch();
  // Since we expect a single todo, we don't need to map through an array
  //todo ini untuk data
  const todo = useSelector((state) => state.todosById.todo);
  //status ini untuk status loading
  const status = useSelector((state) => state.todosById.status);
  //state ini untuk error
  const error = useSelector((state) => state.todosById.error);

  // print todo,status dan error
  //state untuk simpan value input
  const [input, setInput] = useState();
  // trigger untuk simpen input ke func, spya fetch data
  const handleFetchClick = () => {
    //input ada value
    if (input) {
      //dispatch fethToDo dgn params input
      dispatch(fetchToDoById(input));
    }
  };
  console.log('todo byid', todo);
  console.log('status byid', status);
  console.log('error byid', error);
  //early return utk loading
  if (status === 'loading') return <Loading />;
  //early return utk error
  if (status === 'failed') return <ErrorComponent message={error} />;
  return (
    <div className="mt-8 mx-auto">
      {/* Input Todo by id */}
      <div className="bg-white p-8 max-w-xs w-full rounded-lg mb-8">
        <input
          type="number"
          placeholder="Enter To Do Id"
          className="border border-gray-400 p-2 rounded-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-300 p-2 w-full mt-4 rounded-md"
          onClick={handleFetchClick}
        >
          {' '}
          Fetch ToDo
        </button>
      </div>
      {/* kalau success */}
      {status === 'succeeded' && (
        <div key={todo.id}>
          <h3 className="font-bold text-3xl text-blue-400">{todo.title}</h3>
          <p
            className={`font-semibold text-lg ${
              todo.completed ? 'text-green-600' : 'text-red-500'
            }`}
          >
            Completed : {todo.completed ? 'YES' : 'NO'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToDoComponentById;
