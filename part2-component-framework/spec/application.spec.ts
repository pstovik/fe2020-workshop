import { Application } from "../src/application";

describe("application", () => {
    it("should be able to render HTML", () => {
        const rendererSpy = jasmine.createSpy("renderer");

        const app = new Application({
            renderer: rendererSpy
        });

        app.render();
        expect(rendererSpy).toHaveBeenCalled();
    });
});
