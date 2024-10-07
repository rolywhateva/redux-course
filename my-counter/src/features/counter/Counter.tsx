import { useState } from "react"

// Use pre-typed versions of the React-Redux
// `useDispatch` and `useSelector` hooks
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  decrement,
  multiply,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectStatus,
  reset,
  subtractByAmount,
  divide,
} from "./counterSlice"

import styles from "./Counter.module.css"

export const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const isDisabled = status === "loading";
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement())
          }}
          disabled={isDisabled}
        >
          -
        </button>
        <span aria-label="Count" className={styles.value}>
          {count}
        </span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            dispatch(increment())
          }}
          disabled={isDisabled}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          type="number"
          onChange={e => {
            setIncrementAmount(e.target.value)
          }}
          disabled={isDisabled}

        />
        <button
          className={styles.button}
          onClick={() => {
            dispatch(incrementByAmount(incrementValue))
          }}
          disabled={isDisabled}
        >
          Add Amount
        </button>

        <button
          className={styles.button}
          onClick={() => {
            dispatch(subtractByAmount(incrementValue))
          }}
          disabled={isDisabled}
        >
          Subtract  Amount
        </button>

        <button
          className={styles.button}
          onClick={() => {
            dispatch(multiply(incrementValue))
          }}
          disabled={isDisabled}
        >
          Multiply
        </button>

        <button
          className={styles.button}
          onClick={() => {
            dispatch(divide(incrementValue))
          }}
          disabled={isDisabled}
        >
          Divide
        </button>

        <button
          className={styles.button}
          onClick={() => {
            dispatch(reset())
          }}
          disabled={isDisabled}
        >
          Reset
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          disabled={status !== "idle"}
          onClick={() => {
            dispatch(incrementAsync(incrementValue))
          }}
        >
          Add Async
        </button>
        <button
          className={styles.oddButton}
          disabled={isDisabled}
          onClick={() => {
            dispatch(incrementIfOdd(incrementValue))
          }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}
