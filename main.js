"use strict"

//объявление переменных для элементов страницы
const root = document.querySelector('.root');
const wrapper = root.querySelector('.wrapper');
const scrollingButton = document.getElementById('scrollingButton');
const scrollingLineBottom = document.querySelector('.wrapper_scroll-line').getBoundingClientRect().bottom;
const paragraph = document.querySelector('.container_2_text_2');
const modalWindow = document.body.querySelector('.wrapper_modal-window');
const modalList_1 = document.body.querySelector('.modal_list_1-list');
const modalList_2 = document.body.querySelector('.modal_list_2-list');
const paginationPoint_1 = document.body.querySelector('.pagination_point-1');
const paginationPoint_2 = document.body.querySelector('.pagination_point-2');
const scrollH = paragraph.scrollHeight - paragraph.getBoundingClientRect().height;
const w = wrapper.offsetWidth;
const elementsForAnim = [document.querySelector('.anim-img_8'),
    document.querySelector('.anim-img_9'),
    document.querySelector('.anim-img_10'),
    document.querySelector('.anim-img_11'),
    document.querySelector('.anim-img_12')];

Object.prototype.scrollingByX = scrollingBy_X; //для скроллинга wrapper, очевидно можно было сделать как функцию, но так красиво
Object.prototype.scrollingToX = scrollingTo_X;

//слушатели событий
wrapper.ontouchstart = event => { //для сенсорных устройств
    const startX = event.changedTouches[0].clientX;
    let x;

    wrapper.ontouchmove = e => x = e.changedTouches[0].clientX - startX;

    wrapper.ontouchend = () => {
        wrapperScrolling.call(event, x);
        wrapper.ontouchmove = null;
    }
}

wrapper.onmousedown = event => { //для мыши
    const startX = event.clientX;
    let x;
    event.preventDefault();

    wrapper.onmousemove = e => x = e.clientX - startX;

    document.onmouseup = () => {
        wrapperScrolling.call(event, x);
        wrapper.onmousemove = null;
    }
}

root.onclick = e => {
    const elem = e.target;
    if(elem.closest('.root_home-button')) wrapper.scrollingToX(0)
    if(elem.closest('.wrapper_next-box')) wrapper.scrollingToX(1024)
    if(elem.closest('.container_3_btn-more') || elem.closest('.modal-window_close')) modalWindow.classList.toggle('active');
    if(elem.closest('.pagination_back')) openPopup_and_Pagin(modalList_1, paginationPoint_1, modalList_2, paginationPoint_2);
    if(elem.closest('.pagination_next')) openPopup_and_Pagin(modalList_2, paginationPoint_2, modalList_1, paginationPoint_1);
}

scrollingButton.ontouchstart = e => { //для сенсорных устройств
    const startY = e.changedTouches[0].clientY;
    const y = parseInt(scrollingButton.style.top);

    scrollingButton.ontouchmove = e => scrollingLineFun(e.changedTouches[0].clientY, startY, y);
}

scrollingButton.onmousedown = e => { //для мыши
    e.preventDefault();
    const startY = e.clientY;
    const y = parseInt(scrollingButton.style.top);

    scrollingButton.onmousemove = e => scrollingLineFun(e.clientY, startY, y);

    scrollingButton.onmouseup = () => scrollingButton.onmousemove = null;
}

wrapper.addEventListener('scroll', () => setTimeout(() => animActive('anim-no-active', ...elementsForAnim), 500), {once: true});

//функции
function wrapperScrolling(x) {
    if(this.target.id === 'scrollingButton') return;
    x > 0 && wrapper.scrollingByX(-w) //scrolling wrapper - это метод в прототипе Объекта смотрите на строке 22
    x < 0 && wrapper.scrollingByX(w);
}

function scrollingBy_X(x) {
    this.scrollBy({
        left: x,
        behavior: "smooth",
    })
}

function scrollingTo_X(x) {
    this.scrollTo({
        left: x,
        behavior: "smooth",
    })
}

function openPopup_and_Pagin(elem1 ,elem2, ...rest) {
    elem1.classList.add('active');
    elem2.classList.add('active-point');
    rest.forEach(e => {e.classList.remove('active'); e.classList.remove('active-point')})
    
}

function scrollingLineFun(clientY, startY, y) {
    scrollingButton.style.top = y + clientY - startY + 'px';
    if(parseInt(scrollingButton.style.top) <= -7.5 && clientY - startY < 0) scrollingButton.style.top = '-7.5px'
    else if(parseInt(scrollingButton.style.top) >= 348 && clientY - startY > 0) scrollingButton.style.top = '348.5px'
    else paragraph.scrollTo(0, scrollH-((scrollingLineBottom - scrollingButton.getBoundingClientRect().bottom)*scrollH)/341);
}

function animActive(classNme, ...rest) {
    rest.forEach(elem => elem.classList.remove(classNme))
}