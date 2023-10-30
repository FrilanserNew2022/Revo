import './index.html';
import './index.scss';

console.log(window.innerHeight)

// Переменная для определения анимации, если анимация идет в данный момент то функция работать не будет
let menuAnimation = false;

document.querySelector('.menu__burger').addEventListener('click', () => {

    if(!menuAnimation) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });

        menuAnimation = true;
        document.body.classList.toggle('open')
        document.querySelector('.header__menu').classList.toggle('open');
        document.querySelector('.header').classList.toggle('open');
        document.querySelector('.central__line').classList.toggle('open');


        setTimeout(() => {
            menuAnimation = false
        }, 750)
    }

})
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let isVideoPlayBack = true;

document.querySelector('.main__video-container').addEventListener(('click'), () => {
    document.querySelector('.video__play').classList.toggle('play')

    if(!isVideoPlayBack) {
        document.querySelector('.video').play()
        isVideoPlayBack = true;
    } else {
        document.querySelector('.video').pause()
        isVideoPlayBack = false;
    }
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let animationList = false;

document.querySelector('.standart__arrow-next-link').addEventListener('click', () => {

    if(!animationList) {

        animationList = true;

        const listTop = document.querySelector('.standart__content-list-top');
        const listBottom = document.querySelector('.standart__content-list-bottom');

        const listTopFirstItem = listTop.children[0];
        const listBottomFirstItem = listBottom.children[0];

        const standartListItemTop = listTopFirstItem.cloneNode(true);
        const standartListItemBottom = listBottomFirstItem.cloneNode(true);

        const itemWidth = listTopFirstItem.clientWidth;

        const translateLeft = (itemWidth + 30);

        standartListItemTop.style.transform = `translate(2520px, 0)`
        standartListItemBottom.style.transform = `translate(2520px, 0)`

        listTop.appendChild(standartListItemTop);
        listBottom.appendChild(standartListItemBottom);

        setTimeout(() => {
            Array.from(listTop.children).forEach((el, index) => {
                el.style.transform = `translate(${translateLeft * (index - 1)}px, 0)`
            })
            Array.from(listBottom.children).forEach((el, index) => {
                el.style.transform = `translate(${translateLeft * (index - 1)}px, 0)`
            })
    
        }, 0)
        
        setTimeout(() => {
            listTop.children[0].remove()
            listBottom.children[0].remove()
            animationList = false;
        }, 1000)
    }
    
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let animationGiftset = false;

function changingАramesTheGiftetblock (event) {
    const element = event.target;

    if(!animationGiftset) {
        animationGiftset = true

        let elementGiftsetContent;

        document.querySelectorAll('.giftset__number').forEach(el => {
            el.classList.remove('active');
            if(el === element) el.classList.add('active')
        })

        if(element.classList.contains('first')) elementGiftsetContent = document.querySelector('.giftset__content-first')

        if(element.classList.contains('second')) elementGiftsetContent = document.querySelector('.giftset__content-second')

        if(element.classList.contains('third')) elementGiftsetContent = document.querySelector('.giftset__content-third')

        document.querySelectorAll('.giftset__content').forEach(el => {
            if(elementGiftsetContent === el) {
                el.classList.remove('hidden')
            } else {
                el.classList.add('hidden')
            }
        })


        setTimeout(() => {
            animationGiftset = false
        }, 750)
    }
}

document.querySelector('.giftset__numbers').addEventListener('click', changingАramesTheGiftetblock)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let animationPersonalizedList = false;

document.querySelectorAll('.personalized__item').forEach((el, index) => {
    el.style.transform = `translate(${(el.clientWidth + 30) * index}px, 0)`
})

document.querySelector('.personalized__list-arrow').addEventListener('click', () => {

    if(!animationPersonalizedList) {

        animationPersonalizedList = true;

        const list = document.querySelector('.personalized__content-list');

        const listItem = list.children[0];

        const listItemClone = listItem.cloneNode(true);

        const translateLeft = (listItem.clientWidth + 30);

        console.log(translateLeft * 5)

        listItemClone.style.transform = `translate(${translateLeft * 4}px, 0)`

        list.appendChild(listItemClone);

        setTimeout(() => {

            Array.from(list.children).forEach((el, index) => {
                console.log(translateLeft * (index - 1))
                el.style.transform = `translate(${translateLeft * (index - 1)}px, 0)`
            })
            
        }, 1)

        setTimeout(() => {
            list.children[0].remove()
            animationPersonalizedList = false;
        }, 1000)
    }
    
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Объявляем переменную isVisible со значением false.

// Создаем объект IntersectionObserver с функцией-колбеком, которая вызывается при изменении видимости элемента.

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {

        // Устанавливаем значение переменной isVisible в true.
        // Перебираем все элементы entries и проверяем, стали ли они видимыми.
            entries.forEach(entry => {
        
            const elementClassName = entry.target.className;
        
            if('base__text' === elementClassName && entry.isIntersecting) {
                document.querySelector(`.base__description`).classList.remove('hidden')
                observer.unobserve(document.querySelector(`.base__text`))
            }
        
            if('standart__text' === elementClassName && entry.isIntersecting) {
                document.querySelector(`.standart__content`).classList.remove('hidden')
                observer.unobserve(document.querySelector(`.standart__text`))
            }
        
            if('giftset__text' === elementClassName && entry.isIntersecting) {
                document.querySelector(`.giftset__container-content`).classList.remove('hidden')
                observer.unobserve(document.querySelector(`.giftset__text`))
            }
            
            if('personalized__text' === elementClassName && entry.isIntersecting) {
                document.querySelector(`.personalized__content`).classList.remove('hidden')
                observer.unobserve(document.querySelector(`.personalized__text`))
            }
        
            });
        
        }, {
        // Указываем параметры наблюдателя. В данном случае, наблюдатель будет реагировать на элементы, которые стали видимыми на 50% (порог 0.5).
            root: null,
            rootMargin: '0px',
            threshold: [0.5],
        });
        
        
        observer.observe(document.querySelector('.base__text'));
        
        observer.observe(document.querySelector('.standart__text'));
        
        observer.observe(document.querySelector('.giftset__text'));
        
        observer.observe(document.querySelector('.personalized__text'));
});