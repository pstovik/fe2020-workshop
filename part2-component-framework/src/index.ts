import { Application } from "./application";
import * as framework from "./framework";

const app = new Application();
console.log("Initial render");
document.body.innerHTML = app.render();

console.log("Start global event listeners");
document.addEventListener("click", framework.processClick);
