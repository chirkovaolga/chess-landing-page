// Получаем элементы слайдера в блоке "Участники"
const slider = document.querySelector(".slider__list");
const leftButton = document.getElementById("slider__btn-left");
const leftButtonSvg = document.querySelector(".left-btn-disabled");
const rightButton = document.getElementById("slider__btn-right");
const rightButtonSvg = document.querySelector(".right-btn-disabled");
const slides = Array.from(slider.querySelectorAll(".slider__item"));
const slideCount = slides.length;
const spanMin = document.querySelector(".slider__span-min");
const spanMax = document.querySelector(".slider__span-max");

// Получаем элементы слайдера в блоке "Этапы"
const sliderStagesBox = document.querySelector(".stages__box");
const sliderStages = document.querySelector(".stages__list");
const slidesStages = Array.from(sliderStages.querySelectorAll(".stages__item"));
const leftButtonStages = document.getElementById("stages__btn-left");
const leftButtonSvgStages = document.querySelector(".stages__left-btn-disabled");
const rightButtonStages = document.getElementById("stages__btn-right");
const rightButtonSvgStages = document.querySelector(".stages__right-btn-disabled");
const slideCountStages = slidesStages.length;
const dotsBox = document.querySelector(".stages__box-dots");

//  Общий счетчик для слайдеров
let slideIndex = {
  first: 0,
  second: 0
}

// Показ предыдущего слайда
function showPreviousSlide(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg, func) {
  if (document.documentElement.clientWidth < 993) {
    slideIndex[prop] = (slideIndex[prop] - 1 + count) % count;
    func(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg);
  } else {
    slideIndex[prop] = (slideIndex[prop] - 3 + count) % count;
    func(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg);
  }
}

// Показ следующего слайда
function showNextSlide(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg, func) {
  if (document.documentElement.clientWidth < 993) {
    slideIndex[prop] = (slideIndex[prop] + 1) % count;
    func(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg);
  } else {
    slideIndex[prop] = (slideIndex[prop] + 3) % count;
    func(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg);
  }
}

// Изменения слайдера "Участники"
function updateSlider(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg) {
  if (document.documentElement.clientWidth < 993) {
    arr.forEach((slide, index) => {
      if (index === slideIndex[prop]) {
        slide.style.display = "flex";
        spanMin.textContent = index + 1;
      } else {
        slide.style.display = "none";
      }
    });

    checkButton (slideIndex[prop], count, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg)

  } else {
    arr.forEach((slide, index) => {
      if (index === slideIndex[prop] || index === slideIndex[prop] + 1 || index === slideIndex[prop] + 2) {
        slide.style.display = "flex";
        spanMin.textContent = index + 1;
      } else {
        slide.style.display = "none";
      }
    });

    checkButton (slideIndex[prop], count, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg)
  }
}

// Изменения слайдера "Этапы"
function updateStagesSlider(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg) {
  checkButton (slideIndex[prop], count, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg)

  arr.forEach((slide, index) => {
    if (index === slideIndex[prop]) {
      if (slideIndex[prop] === 0 || slideIndex[prop] === 3) {
        slide.style.display = "block";
        arr[index + 1].style.display = "block";
        slideIndex[prop] = slideIndex[prop] + 1;
      } else {
        slide.style.display = "block";
      }
    } else {
      slide.style.display = "none";
    }
  });
}

function updateStagesSliderPrevious(prop, count, arr, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg) {
  arr.forEach((slide, index) => {
    if (index === slideIndex[prop]) {
      if (slideIndex[prop] === 4 || slideIndex[prop] === 1) {
        slide.style.display = "block";
        arr[index - 1].style.display = "block";
        slideIndex[prop] = slideIndex[prop] - 1;
      } else {
        slide.style.display = "block";
      }
    } else {
      slide.style.display = "none";
    }
  });

  checkButton (slideIndex[prop], count, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg)
}

// Функция для управления классами кнопок
function checkButton (ind, count, leftBtn, rightBtn, leftBtnSvg, rightBtnSvg) {
  if (document.documentElement.clientWidth < 993) {
    leftBtn.disabled = false;
    rightBtn.disabled = false;
    leftBtnSvg.classList.remove('btn-disabled');
    rightBtnSvg.classList.remove('btn-disabled');

    if (ind === 0) {
      leftBtnSvg.classList.add('btn-disabled');
      leftBtn.disabled = true;
    }
    if (ind === count - 1) {
      rightBtnSvg.classList.add('btn-disabled');
      rightBtn.disabled = true;
    }
  } else {
    if (ind === 0) {
      leftBtnSvg.classList.add('btn-disabled');
      leftBtn.disabled = true;
      rightBtnSvg.classList.remove('btn-disabled');
      rightBtn.disabled = false;
    } else {
      rightBtnSvg.classList.add('btn-disabled');
      rightBtn.disabled = true;
      leftBtnSvg.classList.remove('btn-disabled');
      leftBtn.disabled = false;
    }
  }
}

// Создание навигации и управление классами в слайдере "Участники"
function getDots (arr) {
  for (i = 0; i < arr.length - 2; i++) {
    const element = document.createElement('span');
    element.classList.add('stages__span');
    element.id = `${i}`

    dotsBox.append(element)
  }
}

let currentNumberDot = 0;

function changeDotsClass () {
  const dots = Array.from(dotsBox.querySelectorAll('.stages__span'));
  dots.forEach((dot) => {
    dot.classList.remove('stages__span-current')
  })

  const currentDot = document.getElementById(`${currentNumberDot}`);
  currentDot.classList.add('stages__span-current')
}

document.addEventListener('DOMContentLoaded', () => {

  spanMax.textContent = `/ ${slideCount}`
  updateSlider('first', slideCount, slides, leftButton, rightButton, leftButtonSvg, rightButtonSvg);

  if (document.documentElement.clientWidth < 993) {
    updateStagesSlider('second', slideCountStages, slidesStages, leftButtonStages, rightButtonStages, leftButtonSvgStages, rightButtonSvgStages);

      getDots (slidesStages);

      changeDotsClass ();

  }

  const intervalSlider = setInterval(() => {
    if (document.documentElement.clientWidth < 993) {
      if (slideIndex.first === slideCount - 1) {
        slideIndex.first = -1;
      }
      slideIndex.first = slideIndex.first + 1;
      updateSlider('first', slideCount, slides, leftButton, rightButton, leftButtonSvg, rightButtonSvg);
    } else {
      if (slideIndex.first === 3) {
        slideIndex.first = -3;
      }
      slideIndex.first = slideIndex.first + 3;
      updateSlider('first', slideCount, slides, leftButton, rightButton, leftButtonSvg, rightButtonSvg);
    }
  }, 4000)

  // Обработчики событий для кнопок слайдера "Участники"
  leftButton.addEventListener("click", () => {
    showPreviousSlide('first', slideCount, slides, leftButton, rightButton, leftButtonSvg, rightButtonSvg, updateSlider);
  });
  rightButton.addEventListener("click", () => {
    showNextSlide('first', slideCount, slides, leftButton, rightButton, leftButtonSvg, rightButtonSvg, updateSlider)
  });

  // Обработчики событий для кнопок слайдера "Этапы"
  leftButtonStages.addEventListener("click", () => {
    showPreviousSlide('second', slideCountStages, slidesStages, leftButtonStages, rightButtonStages, leftButtonSvgStages, rightButtonSvgStages, updateStagesSliderPrevious);

    currentNumberDot = currentNumberDot - 1;
    changeDotsClass ()
  });
  rightButtonStages.addEventListener("click", () => {
    showNextSlide('second', slideCountStages, slidesStages, leftButtonStages, rightButtonStages, leftButtonSvgStages, rightButtonSvgStages, updateStagesSlider)

    currentNumberDot = currentNumberDot + 1;
    changeDotsClass ()
  });
})

