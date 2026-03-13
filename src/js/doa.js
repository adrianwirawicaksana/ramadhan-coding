// SHOW CARD
function toggleCard(element) {
    const targetId = element.dataset.target;
    const targetCard = document.getElementById(targetId);

    element.classList.add("hidden");
    targetCard.classList.remove("hidden");

    setTimeout(() => {
        targetCard.classList.remove("opacity-0", "translate-y-5");
    }, 50);
}

// BACK BUTTON
function toggleBack(id) {
    const mainCard = document.getElementById(id);
    const imageCard = document.querySelector(`[data-target="${id}"]`);

    mainCard.classList.add("hidden");
    imageCard.classList.remove("hidden");
}

// ANIMATION ON LOAD
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("header, main section, footer");

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove("opacity-0", "translate-y-5");
        }, 150 * index);
    });
});