const initialCards = [
  {
    name: "Yosemite Valley",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

/*Elements*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
// const modalCloseButton = profileEditModal.querySelector("#modal-close-button");
const profileModalCloseButton = document.querySelector(".modal__close");
const addCardModalCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*Functions*/

// function closePopup() {
//   profileEditModal.classList.remove("modal_opened");
// }

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

// function openModal() {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileDescription.textContent;

//   profileEditModal.classList.add("modal_opened");
// }
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
/*Event Handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

// profileEditButton.addEventListener("click", () => {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileDescription.textContent;

//   closePopup(profileEditModal);
// });

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
/* add new card */
addNewCardButton.addEventListener("click", () => closePopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

/*got this from and earlier video---
initialCards.reverse().forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});*/

/*for loop that inserts a card
for (let i = 0; i < initialCards.length; i++) {
  cardsWrap.prepend(getCardElement(initialCards[i]));
} */

initialCards.forEach((cardData) => {
  /*cardsWrap*/ cardListEl.prepend(getCardElement(cardData));
});
