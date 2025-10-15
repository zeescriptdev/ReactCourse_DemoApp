import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../store/counterSlice';

const Counter = () => {
const count = useSelector((state: any) => state.count.value);
const dispatch = useDispatch();

  return <>
  <div> 
    <p>Count : {count}</p>
  </div>
  <button onClick={() => dispatch(increment())}>Increment</button>
  <button onClick={() => dispatch(decrement())}>Decrement</button>
  </>
};

export default Counter;