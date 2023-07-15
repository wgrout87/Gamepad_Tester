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
    } else {
        controllerIndex = null;
        controllerAreaNotConnected.style.display = "block";
        controllerAreaConnected.style.display = "none";
    }
}