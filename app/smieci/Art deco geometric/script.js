// ART DECO SCRIPT

console.log("%c GATSBY PROTOCOL INITIATED ", "background: #000; color: #d4af37; border: 1px solid #d4af37; padding: 4px; font-family: serif;");

document.addEventListener('DOMContentLoaded', () => {
    // Elegant Fade In
    const main = document.querySelector('main');
    main.style.opacity = '0';
    main.style.transition = 'opacity 1.5s ease-out';

    setTimeout(() => {
        main.style.opacity = '1';
    }, 200);
});
