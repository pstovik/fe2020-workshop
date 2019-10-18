import { Application } from "./application";

const app = new Application({
    renderer: html => {
        document.body.innerHTML = html;
    }
});
console.log("Initial render");
app.render();
