"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { increment, decrement } from "@/features/counterSlice";

 function CounterPage() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
export default CounterPage;