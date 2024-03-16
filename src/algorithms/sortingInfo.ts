export enum Event {
    Focus,
    FocusChange,
    Change,
    Hold,
    ChangeHold,
    FocusChangeHold,
}

export const SORT_SPEED = 200;

export interface Step {
    index?: number,
    pivot?: boolean,
    event: Event,
}

export const pushFocus = (steps: Step[], index: number, pivot: boolean) => {
    steps.push({
        index: index,
        pivot: pivot,
        event: Event.Focus,
    });
}

export const pushFocusChange = (steps: Step[]) => {
    steps.push({
        event: Event.FocusChange,
    });
}

export const pushChange = (steps: Step[]) => {
    steps.push({
        event: Event.Change,
    });
}