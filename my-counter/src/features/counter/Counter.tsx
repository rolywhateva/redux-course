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
  reset,
  subtractByAmount,
  divide,
  incrementIfEven,
  raiseToPower,
  modulo,
  selectOperationAmount,
  setOperationAmount,
  selectIsLoading,
} from "./counterSlice"

import styles from "./Counter.module.css"
import { IOperationButtonProps, OperationButton } from "./OperationButton"

const operationButtons: IOperationButtonProps[] = [
  { text: "Add amount", actionCreator: incrementByAmount },
  { text: "Subtract amount", actionCreator: subtractByAmount },
  { text: "Multiply by amount", actionCreator: multiply },
  { text: "Raise to the power of", actionCreator: raiseToPower },
  { text: "Divide", actionCreator: divide },
  { text: "Modulo", actionCreator: modulo },
]

const condititionalOperationsButtons: IOperationButtonProps[] = [
  { text: "Add async", actionCreator: incrementAsync },
  { text: "Add if odd", actionCreator: incrementIfOdd },
  { text: "Increment if even", actionCreator: incrementIfEven },
]

const mapOperations = (operations: IOperationButtonProps[], name: string) =>
  operations.map((operation, index) => (
    <OperationButton key={`${name}${index}`} {...operation} />
  ))

export const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const modifyingValue = useAppSelector(selectOperationAmount)
  const isDisabled = useAppSelector(selectIsLoading)

  console.count("Counter re-render")
  return (
    <div>
      <div className={styles.row}>
        <OperationButton actionCreator={decrement} text="-" />

        <span aria-label="Count" className={styles.value}>
          {count}
        </span>

        <OperationButton actionCreator={increment} text="+" />
      </div>

      <div className={styles.row}>
        <OperationButton actionCreator={reset} text="Reset" />
      </div>

      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={modifyingValue}
          type="number"
          onChange={e => {
            dispatch(setOperationAmount(+e.target.value))
          }}
          disabled={isDisabled}
        />

        {mapOperations(operationButtons, "operationButtons")}
      </div>

      <div className={styles.row}>
     
        {mapOperations(
          condititionalOperationsButtons,
          "conditionalOperationButtons",
        )}
      </div>
    </div>
  )
}
