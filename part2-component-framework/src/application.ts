export interface IAppRenderer {
    (html: string): void;
}

export class Application {
    private _renderer: IAppRenderer;

    constructor(options: { renderer: IAppRenderer }) {
        this._renderer = options.renderer;
    }

    render() {
        this._renderer("<h1>HERE</h1>");
    }
}
