// ===============================
// CONSTANTS
// ===============================

const ZIKIR_RADIUS = 68;
const ZIKIR_CIRCUMFERENCE = 2 * Math.PI * ZIKIR_RADIUS;
const BEAD_MAX = 33;

// ===============================
// STATE
// ===============================

let zikirCount = 0;
let zikirTarget = 33;

// ===============================
// CARD CONTROL
// ===============================

function toggleCard(element) {
    const targetId = element.dataset.target;
    const targetCard = document.getElementById(targetId);

    element.classList.add("hidden");
    targetCard.classList.remove("hidden");

    setTimeout(() => {
        targetCard.classList.remove("opacity-0", "translate-y-5");
    }, 50);
}

function toggleBack(id) {
    const mainCard = document.getElementById(id);
    const imageCard = document.querySelector(`[data-target="${id}"]`);

    mainCard.classList.add("hidden");
    imageCard.classList.remove("hidden");
}

// ===============================
// PAGE ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("header, main section, footer");

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove("opacity-0", "translate-y-5");
        }, 150 * index);
    });

    zikirBuildBeads();
    zikirUpdateUI();
});

// ===============================
// ZIKIR CHANGE
// ===============================

function zikirChange() {
    const parts = document.getElementById("zikirSelect").value.split("|");

    zikirTarget = parseInt(parts[1]);
    document.getElementById("zikirTargetDisplay").textContent = zikirTarget;

    zikirCount = 0;

    zikirHideNotif();
    zikirBuildBeads();
    zikirUpdateUI();
}

// ===============================
// BEADS
// ===============================

function zikirBuildBeads() {
    const row = document.getElementById("zikirBeads");
    row.innerHTML = "";

    const totalBeads = Math.min(zikirTarget, BEAD_MAX);

    for (let i = 0; i < totalBeads; i++) {
        const bead = document.createElement("div");
        bead.id = "zb-" + i;
        bead.className =
            "w-2.5 h-2.5 rounded-full bg-[#0F9D58] opacity-20 transition-all duration-300";

        row.appendChild(bead);
    }
}

function zikirUpdateBeads() {
    const totalBeads = Math.min(zikirTarget, BEAD_MAX);
    const currentCycle = zikirCount % zikirTarget;

    for (let i = 0; i < totalBeads; i++) {
        const bead = document.getElementById("zb-" + i);
        if (!bead) continue;

        const threshold =
            zikirTarget > BEAD_MAX
                ? Math.round((i + 1) * zikirTarget / BEAD_MAX)
                : i + 1;

        if (currentCycle >= threshold) {
            bead.className =
                "w-2.5 h-2.5 rounded-full bg-[#0F9D58] opacity-100 scale-110 transition-all duration-300";
        } else {
            bead.className =
                "w-2.5 h-2.5 rounded-full bg-[#0F9D58] opacity-20 transition-all duration-300";
        }
    }
}

// ===============================
// UI UPDATE
// ===============================

function zikirUpdateUI() {
    document.getElementById("zikirCount").textContent = zikirCount;

    const ring = document.getElementById("zikirRing");
    const currentCycle = zikirCount % zikirTarget;
    const isComplete = zikirCount > 0 && currentCycle === 0;

    if (isComplete) {
        ring.style.strokeDashoffset = 0;

        const putaran = zikirCount / zikirTarget;
        zikirShowNotif(`🌟 Target tercapai! (${putaran}× putaran)`);

        setTimeout(() => {
            if (zikirCount % zikirTarget === 0) {
                ring.style.transition = "none";
                ring.style.strokeDashoffset = ZIKIR_CIRCUMFERENCE;

                void ring.offsetWidth;

                ring.style.transition = "stroke-dashoffset 0.4s ease";
            }
        }, 400);

    } else {
        const percentage = currentCycle / zikirTarget;
        const offset = ZIKIR_CIRCUMFERENCE * (1 - percentage);
        ring.style.strokeDashoffset = offset;
    }

    zikirUpdateBeads();

    if (zikirCount === 0) {
        zikirHideNotif();
    }
}

// ===============================
// ACTIONS
// ===============================

function zikirAdd() {
    zikirCount++;

    const counter = document.getElementById("zikirCount");

    counter.classList.remove("zikir-bump");
    void counter.offsetWidth;
    counter.classList.add("zikir-bump");

    zikirUpdateUI();
}

function zikirReset() {
    zikirCount = 0;
    zikirHideNotif();
    zikirUpdateUI();
}

// ===============================
// NOTIFICATION
// ===============================

function zikirShowPopup(message) {
    const popup = document.getElementById("zikirPopup");
    const text = document.getElementById("zikirPopupText");
    const sound = document.getElementById("zikirSound");

    text.textContent = message;
    popup.classList.remove("hidden");

    sound.currentTime = 0;
    sound.play();
}

function zikirClosePopup() {
    document.getElementById("zikirPopup").classList.add("hidden");
}


function zikirShowNotif(message) {
    const notif = document.getElementById("zikirNotif");
    notif.textContent = message;
    notif.classList.remove("hidden");

    zikirShowPopup(message);
}

function zikirHideNotif() {
    document.getElementById("zikirNotif").classList.add("hidden");

}
