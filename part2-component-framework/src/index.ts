import { Application } from "./application";
import * as framework from "./framework";

console.log("Starting the app");

const app = new Application();
framework.setup(() => app.render());
