import './bar.css';

type BarColor = string;

export const DEFAULT_COLOR: BarColor = 'yellowgreen';
export const CHANGE_COLOR: BarColor = 'blue';
export const FOCUS_COLOR: BarColor = 'orange';


export interface BarProps {
    value: number,
    speed: number,
    color: BarColor,
}

export const Bar = (props: BarProps) => {
    return(
        <div className="value-bar" style={{height: String(props.value*10) + 'px', transitionDuration: props.speed.toString() + 'ms', backgroundColor: props.color}}>
            {props.value}
        </div>
    );
}