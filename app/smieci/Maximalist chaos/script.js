// MAXIMALIST CHAOS SCRIPT - HIGH END INTERACTION

// 1. CUSTOM CURSOR WITH LAG
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant cursor
    cursor.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px)`;
});

function updateFollower() {
    // Smooth Lerp
    posX += (mouseX - posX) / 6;
    posY += (mouseY - posY) / 6;

    follower.style.transform = `translate(${posX - 24}px, ${posY - 24}px)`;
    requestAnimationFrame(updateFollower);
}
updateFollower();

// Cursor reacts to clickables
const clickables = document.querySelectorAll('a, button');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.transform = `translate(${posX - 24}px, ${posY - 24}px) scale(1.5)`;
        follower.style.backgroundColor = '#84cc16'; // Lime
        follower.style.borderColor = '#84cc16';
        cursor.style.backgroundColor = 'white';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.transform = `translate(${posX - 24}px, ${posY - 24}px) scale(1)`;
        follower.style.backgroundColor = 'transparent';
        follower.style.borderColor = 'black';
        cursor.style.backgroundColor = 'black';
    });
});

// 2. MENU INTERACTION
const burger = document.getElementById('burger');
const menuClose = document.getElementById('menu-close');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

function toggleMenu(show) {
    if (show) {
        menuOverlay.style.transform = 'translateY(0%)';
    } else {
        menuOverlay.style.transform = 'translateY(-100%)';
    }
}

burger.addEventListener('click', () => toggleMenu(true));
menuClose.addEventListener('click', () => toggleMenu(false));
menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));


// 3. GLITCH TEXT SCRAMBLE EFFECT on Logo Hover
const logo = document.querySelector('header a');
const originalText = "<SYF/>";
const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

logo.addEventListener('mouseover', () => {
    let iterations = 0;
    const interval = setInterval(() => {
        logo.innerText = logo.innerText
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += 1 / 3;
    }, 30);
});

// 4. RANDOM STICKER BOMBING ON SCROLL
// Only does it occasionally to not ruin UX completely
/*
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > 500) {
        // Drop a random sticker maybe?
        lastScrollY = window.scrollY;
    }
});
*/

console.log("%c ANTYDIZAJN MAXIMALIST LOADED ", "background: #84cc16; color: black; font-size: 20px; font-weight: bold;");
