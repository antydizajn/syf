// RAW JS
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('CLICKED_ITEM: ' + item.querySelector('.name').innerText);
    });
});
