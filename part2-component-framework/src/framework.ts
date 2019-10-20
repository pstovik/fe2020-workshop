const componentClickListeners: { [componentId: string]: () => void } = {};
let updater: () => string;

// re-render whole app
export function update() {
    document.body.innerHTML = updater();
}

// register click event from the component
export function componentClick(componentId: string, listener: () => void) {
    componentClickListeners[componentId] = listener;
}

export function componentStyle(style: string) {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
}

// once to setup
export function setup(htmlUpdater: () => string) {
    console.log("Register event listeners");
    document.addEventListener("click", processClick);

    updater = htmlUpdater;
    console.log("Initial render");
    update();
}

// whole app processing
function processClick(event: MouseEvent): void {
    // console.log(event.target);
    const element = event.target;
    const componentId = (element as HTMLElement).id;
    const listener = componentClickListeners[componentId];
    if (listener !== undefined) {
        listener();
    }
}
