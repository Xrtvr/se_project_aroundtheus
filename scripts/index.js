const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
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

// Validation config
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileFormEl = profileEditModal.querySelector(".modal__form");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardTitleInput = addCardFormEl.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormEl.querySelector(".modal__input_type_url");

const imageModalWindow = document.querySelector("#image-modal");
const imageEl = imageModalWindow.querySelector(".modal__image");
const imageCaption = imageModalWindow.querySelector(".modal__caption");
const imageModalCloseButton = imageModalWindow.querySelector(".modal__close");

/* Functions */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);

  const form = modal.querySelector('.modal__form');
  if (form) {
    resetValidation(form, config);

    // Only reset form fields for non-edit modals
    if (modal.id === "add-card-modal") {
      form.reset();
    }
  }
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_opened");
    if (openedModal) closePopup(openedModal);
  }
}

function setModalEventListeners(modal) {
  modal.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("modal") || // overlay area
      e.target.classList.contains("modal__close") // close button
    ) {
      closePopup(modal);
    }
  });
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  addCardFormEl.reset();
}

function handleCardDelete(e) {
  e.target.closest(".card").remove();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    handlePreviewImage(cardData);
  });

  deleteButton.addEventListener("click", (e) => {
    handleCardDelete(e);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handlePreviewImage(data) {
  imageEl.src = data.link;
  imageEl.alt = data.name;
  imageCaption.textContent = data.name;
  openModal(imageModalWindow);
}

/* Event Listeners */

// Open Edit Profile Modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileFormEl.reset();
  const submitBtn = profileFormEl.querySelector(
    validationConfig.submitButtonSelector
  );
  submitBtn.disabled = true;
  submitBtn.classList.add(validationConfig.inactiveButtonClass);

  openModal(profileEditModal);
});

// Open Add Card Modal
addNewCardButton.addEventListener("click", () => {
  addCardFormEl.reset();
  const submitBtn = addCardFormEl.querySelector(
    validationConfig.submitButtonSelector
  );
  submitBtn.disabled = true;
  submitBtn.classList.add(validationConfig.inactiveButtonClass);

  openModal(addCardModal);
)

// Close buttons
profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);
imageModalCloseButton.addEventListener("click", () =>
  closePopup(imageModalWindow)
);

// Form submissions
profileFormEl.addEventListener("submit", handleProfileFormSubmit);
addCardFormEl.addEventListener("submit", handleAddCardFormSubmit);

// Load initial cards
initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

// Set overlay & Esc listeners
setModalEventListeners(profileEditModal);
setModalEventListeners(addCardModal);
setModalEventListeners(imageModalWindow);
