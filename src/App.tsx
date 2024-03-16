import React, { useEffect, useRef, useState } from 'react';

import { swap, sleep } from './utils/functions';
import { Bar, DEFAULT_COLOR, FOCUS_COLOR, CHANGE_COLOR } from './components/bar';
import * as SortAlg from './algorithms/sortingAlgorithms';
import * as SortInfo from './algorithms/sortingInfo';

import './App.css';

const LOW_NUMBER = 1;
const HIGH_NUMBER = 20;
const ARRAY_LENGTH = 10;

interface stepState{
  pivot: number,
  compared: number,
  swap: boolean,
}

enum Algorithm {
  SelectionSort,
  InsertionSort,
  BubbleSort,
}

function App() {
  const stop = useRef(true);
  const [currentAlgo, setCurrentAlgo] = useState(-1);
  const [array, setArray] = useState([0]);
  const [stepState, setStepState] = useState({} as stepState);

  const showSteps = async (steps: SortInfo.Step[]) => {
    for(let step of steps) {
      switch(step.event){
        case SortInfo.Event.Focus:
          step.pivot ? stepState.pivot = step.index! : stepState.compared = step.index!;
          setStepState({
            pivot: stepState.pivot,
            compared: stepState.compared,
            swap: false,
          });
          break;
        
        case SortInfo.Event.FocusChange:
          setStepState({
            pivot: stepState.pivot,
            compared: stepState.compared,
            swap: true,
          });
          break;

        case SortInfo.Event.Change:
          swap(array, stepState.pivot, stepState.compared);
          setArray([...array]);
          break;
      }

      if(stop.current) return;

      await sleep(SortInfo.SORT_SPEED);
    }
    stop.current = true;
    setStepState({
      pivot: -1,
      compared: -1,
      swap: false,
    });
  }

  const resetArray = () => {
    if(!stop.current){
      stop.current = true;
    }

    let newArray = new Array<number>();
    for(let i=0; i<ARRAY_LENGTH; i++){
      newArray.push((Math.floor(Math.random() * (HIGH_NUMBER - LOW_NUMBER + 1) + LOW_NUMBER)));
    }

    setArray(newArray);
    setStepState((ci) => {
      ci.pivot = -1;
      ci.compared = -1;
      ci.swap = false;
      return ci;
    })
  }

  const start = () => {
    let steps: SortInfo.Step[];

    switch(currentAlgo){
      case Algorithm.SelectionSort:
        steps = new Array<SortInfo.Step>();
        stop.current = false;
        SortAlg.selectionSort(array, steps).then(() => {
          showSteps(steps);
        });
        break;
      case Algorithm.InsertionSort:
        stop.current = false;
        steps = new Array<SortInfo.Step>();
        SortAlg.insertionSort(array, steps).then(() => {
          showSteps(steps);
        });
        break;
      case Algorithm.BubbleSort:
        stop.current = false;
        steps = new Array<SortInfo.Step>();
        SortAlg.bubbleSort(array, steps).then(() => {
          showSteps(steps);
        });
        break;
    }
  }

  // useEffect(() => {
  //   resetArray();
  // }, [])

  useEffect(() => {
    resetArray();
  }, [currentAlgo]);

  return (
    <div className="App">
      <h1 className="title">Algorithm visualizer 1</h1>
      <div className="controls">
        <button onClick={start}>start</button>
        |
        <button onClick={resetArray}>reset</button>
      </div>
      <div className="content">
        <ul className="sortingListSideBar">
          <li onClick={() => {setCurrentAlgo(Algorithm.SelectionSort)}} className={currentAlgo === Algorithm.SelectionSort ? 'algorithm-selected' : ''}>selection sort</li>
          <li onClick={() => {setCurrentAlgo(Algorithm.InsertionSort)}} className={currentAlgo === Algorithm.InsertionSort ? 'algorithm-selected' : ''}>insertion sort</li>
          <li onClick={() => {setCurrentAlgo(Algorithm.BubbleSort)}} className={currentAlgo === Algorithm.BubbleSort ? 'algorithm-selected' : ''}>bubble sort</li>
        </ul>
        <div className="array-content">
          {
            array.map((v, i) => (
              <Bar key={i} color={
                stepState.pivot === i || stepState.compared === i ? stepState.swap ? CHANGE_COLOR : FOCUS_COLOR : DEFAULT_COLOR
              } value={v} speed={SortInfo.SORT_SPEED}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
