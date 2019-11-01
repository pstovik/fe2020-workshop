import { Application } from "./application";
import * as framework from "./framework";

console.log("Starting the app");

const app = new Application(window.location.hash);
framework.setup(() => app.render());
