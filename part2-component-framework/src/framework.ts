const componentClickListeners: { [componentId: string]: () => void } = {};

export function processClick(event: MouseEvent): void {
    // console.log(event.target);
    const element = event.target;
    const componentId = (element as HTMLElement).id;
    const listener = componentClickListeners[componentId];
    if (listener !== undefined) {
        listener();
    }
}

export function onClick(componentId: string, listener: () => void) {
    componentClickListeners[componentId] = listener;
}
