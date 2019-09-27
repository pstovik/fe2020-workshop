
document.addEventListener("click", (event) => {
    // console.log(event.target);
    const element = event.target;

    // old way via className string
    // console.log(event.target.className);
    // const cssClasses = element.className.split(" ");

    // modern way via classList structure
    // https://caniuse.com/#feat=classlist
    // console.log(classList);
    const classList = element.classList;
    if (isTile(classList)) {
        rotateTile(classList);
    }
})

function isTile(classList) {
    return classList.contains("tile");
}

function rotateTile(classList) {
    console.log("# rotateTile");

    const currentRotation = getCurrentRotation(classList);
    console.log(`currentRotation: "${currentRotation}"`);

    const nextRotation = getNextRotation(currentRotation);
    console.log(`nextRotation: "${nextRotation}"`);

    if (currentRotation !== "") {
        classList.remove(currentRotation);
    }
    if (nextRotation !== "") {
        classList.add(nextRotation);
    }
}

function getCurrentRotation(classList) {
    let rotation = "";
    classList.forEach((cssClass) => {
        // https://caniuse.com/#feat=es6-string-includes
        if (cssClass.includes("tile--rotate-")) {
            rotation = cssClass;
        }
    });
    return rotation;
}

function getNextRotation(currentRotation) {
    switch (currentRotation) {
        case "":
            return "tile--rotate-90";
        case "tile--rotate-90":
            return "tile--rotate-180";
        case "tile--rotate-180":
            return "tile--rotate-270";
        case "tile--rotate-270":
            return "";
    }
    throw new Error("Uknown rotation " + currentRotation);
}