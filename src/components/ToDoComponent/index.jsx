import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToDo } from '../../reducer/todoSlice';
import Loading from '../Loading';
import ErrorComponent from '../Error';

const ToDoComponent = () => {
  const dispatch = useDispatch();
  // Since we expect a single todo, we don't need to map through an array
  //todo ini untuk data
  const todo = useSelector((state) => state.todos.todo);
  //status ini untuk status loading
  const status = useSelector((state) => state.todos.status);
  //state ini untuk error
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch]);

  console.log('todo', todo);
  console.log('status', status);
  console.log('error', error);
  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <ErrorComponent message={error} />;
  return (
    <div className="mt-8 mx-auto">
      {status === 'succeeded' && (
        <div key={todo.id}>
          <h3 className="font-bold text-3xl text-blue-400">{todo.tile}</h3>
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

export default ToDoComponent;
