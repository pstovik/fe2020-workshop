import { Application } from "../src/application";

describe("application", () => {
    it("should be able to render HTML", () => {
        const app = new Application();
        const html = app.render();
        expect(html).toBeDefined();
    });
});
