// import { useDispatch, useSelector } from 'react-redux';
// import { decrement, increment } from '../store/counterSlice';

const Counter = () => {
// const count = useSelector((state: any) => state.count.value);
// const dispatch = useDispatch();

  return <>
  {/* <div className="text-2xl font-bold"> 
    <p>Count : {count}</p>
  </div>
  <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => dispatch(increment())}>Increment</button>
  <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => dispatch(decrement())}>Decrement</button> */}
  <fieldset className="space-y-3">
  <legend className="sr-only">Delivery</legend>

  <div>
    <label
      htmlFor="DeliveryStandard"
      className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600"
    >
      <p className="text-gray-700">Standard</p>

      <p className="text-gray-900">Free</p>

      <input
        type="radio"
        name="DeliveryOption"
        value="DeliveryStandard"
        id="DeliveryStandard"
        className="sr-only"
        checked
      />
    </label>
  </div>

  <div>
    <label
      htmlFor="DeliveryPriority"
      className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600"
    >
      <p className="text-gray-700">Next Day</p>

      <p className="text-gray-900">£9.99</p>

      <input
        type="radio"
        name="DeliveryOption"
        value="DeliveryPriority"
        id="DeliveryPriority"
        className="sr-only"
      />
    </label>
  </div>
</fieldset>

  </>
};

export default Counter;