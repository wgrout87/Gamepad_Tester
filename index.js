let controllerIndex = null;

window.addEventListener("gamepadconnected", (event) => {
    handleConnectDisconnect(event, true);
});

window.addEventListener("gamepaddisconnected", (event) => {
    handleConnectDisconnect(event, false);
});

function handleConnectDisconnect(event, connected) {
    const controllerAreaNotConnected = document.getElementById("controller-not-connected-area");
    const controllerAreaConnected = document.getElementById("controller-connected-area");

    const gamepad = event.gamepad;
    console.log(gamepad);

    if (connected) {
        controllerIndex = gamepad.index;
        controllerAreaNotConnected.style.display = "none";
        controllerAreaConnected.style.display = "block";
        createButtonLayout(gamepad.buttons);
    } else {
        controllerIndex = null;
        controllerAreaNotConnected.style.display = "block";
        controllerAreaConnected.style.display = "none";
    }
};

function createButtonLayout(buttons) {
    const buttonArea = document.getElementById("buttons");
    buttonArea.innerHTML = "";
    for (let i = 0; i < buttons.length; i++) {
        buttonArea.innerHTML += createButtonHtml(i, 0);
    }
};

function createButtonHtml(index, value) {
    return `<div class="button" id"button-${index}">
                <svg width="10px" height="50px">
                    <rect width="10px" height="50px" fill="grey"></rect>
                    <rect
                        class="button-meter"
                        width="10px"
                        x="0"
                        y="50"
                        data-original-y-position="50"
                        height="50px"
                        fill="rgb(60, 61, 60)"
                    ></rect>
                </svg>
                <div class="button-text-area">
                    <div class="button-name">B${index}</div>
                    <div class="button-value">${value.toFixed(2)}</div>
                </div>
            </div>`;
};