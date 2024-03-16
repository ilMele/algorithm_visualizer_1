import { swap, } from '../utils/functions';
import { Step, pushFocus, pushFocusChange, pushChange } from './sortingInfo';

export const selectionSort = async (array: number[], steps: Step[]) => {
  array = [...array];

  for(let i=0; i<array.length-1; i++){
    
    pushFocus(steps, i, true);

    for(let j=i+1; j<array.length; j++){
      
      pushFocus(steps, j, false);

      if(array[i] > array[j]){
        
        pushFocusChange(steps);
        pushChange(steps);

        swap(array, i, j);
      }
    }
  }
}

export const insertionSort = async (array: number[], steps: Step[]) => {
  array = [...array];

  for(let i=1; i<array.length; i++){

    pushFocus(steps, i, true);

    let value = array[i];
    let j = i-1;
    while(j >= 0 && array[j] > value){

      pushFocus(steps, j+1, true);
      pushFocus(steps, j, false);
      pushFocusChange(steps);
      pushChange(steps);

      array[j+1] = array[j];
      j -= 1;
    }
    array[j+1] = value;
  }
}

export const bubbleSort = async (array: number[], steps: Step[]) => {
  array = [...array];
  let isSwap = true;
  while(isSwap){
    isSwap = false;
    for(let i=0; i<array.length-1; i++){

      pushFocus(steps, i, true);
      pushFocus(steps, i+1, false);

      if(array[i] > array[i+1]){

        pushFocusChange(steps);
        pushChange(steps);

        swap(array, i, i+1);
        isSwap = true;
      }
    }
  }
}