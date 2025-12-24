document.addEventListener('DOMContentLoaded', () => {
    const arrowButtons = document.querySelectorAll('.arrow-btn');

    arrowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Зупиняємо розповсюдження події, щоб не спрацьовували батьківські кнопки
            e.stopPropagation();
            
            // Знаходимо найближчий контейнер саме цієї кнопки
            const parentLi = button.closest('.has-dropdown');
            
            // Перемикаємо клас тільки для цього рівня
            parentLi.classList.toggle('is-open');
        });
    });
});