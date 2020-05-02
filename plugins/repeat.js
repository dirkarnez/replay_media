function repeat() {
    var player = document.querySelector(".player");
    var repeatCheckbox = player.parentNode.querySelector(".repeat");
    if (repeatCheckbox) {
        repeatCheckbox.remove();
    } else {
        repeatCheckbox = document.createElement("input");
        repeatCheckbox.className = "repeat";
        repeatCheckbox.setAttribute("type", "checkbox");
        repeatCheckbox.checked = player.loop;

        repeatCheckbox.addEventListener("click", function() {
            player.loop = repeatCheckbox.checked;
            player.pause();
            player.play();
        });
        player.parentNode.append(repeatCheckbox);
    }
}