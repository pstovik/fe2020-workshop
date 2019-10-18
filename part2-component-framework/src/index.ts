import { Application } from "./application";

const app = new Application();
console.log("Initial render");
document.body.innerHTML = app.render();
