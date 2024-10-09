import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectOperationAmount, selectIsLoading } from "./counterSlice";

import styles from "./Counter.module.css"

export interface IOperationButtonProps { 
   actionCreator: any; 
   text: string 
}

export function OperationButton(props:IOperationButtonProps ) {
    const dispatch = useAppDispatch()
    const operationAmount = useAppSelector(selectOperationAmount)
    const isDisabled = useAppSelector(selectIsLoading);
  
    console.count("OperationButton re-render");
    return (
      <button
        className={styles.button}
        disabled={isDisabled}
        onClick={() => dispatch(props.actionCreator(operationAmount))}
      >
        {props.text}
      </button>
    )
  }