import './index.html';
import './index.scss';

// Переменная для определения анимации, если анимация идет в данный момент то функция работать не будет
let menuAnimation = false;

document.querySelector('.menu__burger').addEventListener('click', () => {

    if(!menuAnimation) {

        menuAnimation = true;
        document.body.classList.toggle('open')
        document.querySelector('.header__menu').classList.toggle('open');
        document.querySelector('.central__line').classList.toggle('open');

        setTimeout(() => {
            menuAnimation = false
        }, 750)
    }

})
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
