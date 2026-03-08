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
// INIT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("header, main section, footer");
    elements.forEach((el, i) => {
        setTimeout(() => el.classList.remove("opacity-0", "translate-y-5"), 150 * i);
    });

    zikirUpdateArabic();
    zikirBuildBeads();
    zikirUpdateUI();
});

// ===============================
// CARD TOGGLE
// ===============================

function toggleCard(element) {
    const target = document.getElementById(element.dataset.target);
    element.classList.add("hidden");
    target.classList.remove("hidden");
    setTimeout(() => target.classList.remove("opacity-0", "translate-y-5"), 50);
}

function toggleBack(id) {
    document.getElementById(id).classList.add("hidden");
    document.querySelector(`[data-target="${id}"]`).classList.remove("hidden");
}

// ===============================
// ARABIC + TARGET UPDATE
// ===============================

function zikirUpdateArabic() {
    const parts = document.getElementById("zikirSelect").value.split("|");
    document.getElementById("arabicText").textContent = parts[0];
    document.getElementById("indonesianText").textContent = parts[2] || "";
}

// ===============================
// ZIKIR CHANGE (dropdown)
// ===============================

function zikirChange() {
    const parts = document.getElementById("zikirSelect").value.split("|");
    document.getElementById("arabicText").textContent = parts[0];
    document.getElementById("indonesianText").textContent = parts[2] || "";
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
    const total = Math.min(zikirTarget, BEAD_MAX);
    for (let i = 0; i < total; i++) {
        const b = document.createElement("div");
        b.id = "zb-" + i;
        b.className = "w-2.5 h-2.5 rounded-full bg-[#0F9D58] opacity-20 transition-all duration-300";
        row.appendChild(b);
    }
}

function zikirUpdateBeads() {
    const total = Math.min(zikirTarget, BEAD_MAX);
    const currentCycle = zikirCount % zikirTarget;
    for (let i = 0; i < total; i++) {
        const b = document.getElementById("zb-" + i);
        if (!b) continue;
        const threshold = zikirTarget > BEAD_MAX
            ? Math.round((i + 1) * zikirTarget / BEAD_MAX)
            : i + 1;
        b.className = currentCycle >= threshold
            ? "w-2.5 h-2.5 rounded-full bg-[#0F9D58] opacity-100 scale-110 transition-all duration-300"
            : "w-2.5 h-2.5 rounded-full bg-[#0F9D58] opacity-20 transition-all duration-300";
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
        ring.style.strokeDashoffset = ZIKIR_CIRCUMFERENCE * (1 - currentCycle / zikirTarget);
    }

    zikirUpdateBeads();
    if (zikirCount === 0) zikirHideNotif();
}

// ===============================
// ACTIONS
// ===============================

function zikirAdd() {
    zikirCount++;

    // Counter bump animation
    const counter = document.getElementById("zikirCount");
    counter.classList.remove("zikir-bump");
    void counter.offsetWidth;
    counter.classList.add("zikir-bump");

    // Haptic vibration — smooth double-tap
    if (navigator.vibrate) {
        navigator.vibrate([12, 6, 8]);
    }

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
    const sound = document.getElementById("zikirSound");
    document.getElementById("zikirPopupText").textContent = message;
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