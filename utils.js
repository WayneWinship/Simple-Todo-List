const grab = (element) => {
    const selected = document.querySelector(element);
    if (selected) {
        return selected
    } else {
        console.error(`The element ${element} was not found??`);
    }
};
const grabM = (elements) => {
    const selected = document.querySelectorAll(elements);
    if (selected.length === 0) {
        console.error(`The element ${elements} was not found??`);
    } else {
        return selected
    }
};

export { grab, grabM }