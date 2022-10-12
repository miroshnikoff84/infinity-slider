document.addEventListener("DOMContentLoaded", () => {
  const BTN_LEFT = document.querySelector("#btn-left");
  const BTN_RIGHT = document.querySelector("#btn-right");
  const CAROUSEL = document.querySelector("#carousel");
  const ITEM_LEFT = document.querySelector("#item-left");
  const ITEM_RIGHT = document.querySelector("#item-right");

  let evenNumbers = [];
  let oddNumbers = [];

  const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("slider__item-wrap");
    return card;
  }
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const shuffle = (arr) => {
    return () => {
      return arr.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    }
  }

  const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  };

  const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  };

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);

  CAROUSEL.addEventListener("animationend", (animationEvent) => {
    let changedItem;
    evenNumbers = [];
    oddNumbers = [];
    const shuffled = shuffle(array);
    const ar = shuffled();

    for (var i = 0; i < ar.length; i++) {
      if (i % 2 === 0) { 

        evenNumbers.push(ar[i]);
      } 
      if (i % 2 === 1){ 
        oddNumbers.push(ar[i]);
      }
    }

    if (animationEvent.animationName === "move-left") {
      CAROUSEL.classList.remove("transition-left");
      changedItem = ITEM_LEFT;
      document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;

    } else {
      CAROUSEL.classList.remove("transition-right");
      changedItem = ITEM_RIGHT;
      document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
    }

    changedItem.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate();
      card.innerHTML = `
        <a class="slider__item-link" href="#">
                        <img class="slider__item-image" src="images/pets-slider/pet-${evenNumbers[i]}.png" alt="image">
                        <div class="slider__description-wrap">
                          <div class="slider__description">
                            <div class="slider__title">Cheetahs</div>
                            <div class="slider__text">Native to Africf</div>
                          </div>
                          <img class="slider__icon" src="images/pets-slider/icon/meet.svg" alt="icon">
                        </div>
                      </a>
                      <a class="slider__item-link" href="#">
                        <img class="slider__item-image" src="images/pets-slider/pet-${oddNumbers[i]}.png" alt="image">
                        <div class="slider__description-wrap">
                          <div class="slider__description">
                            <div class="slider__title">Cheetahs</div>
                            <div class="slider__text">Native to Africf</div>
                          </div>
                          <img class="slider__icon" src="images/pets-slider/icon/meet.svg" alt="icon">
                        </div>
                      </a>
        `;
      changedItem.appendChild(card);
    }

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
  })
});