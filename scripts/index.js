const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

// Templates
const cardTemplate = document.querySelector('#card-template')
  .content.querySelector('.places__item');

// Wrappers
const placesWrap = document.querySelector('.places__list');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');
// students don't work well with the submit event yet

// Buttons and DOM nodes
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');
const closeEditFormButton = editFormModalWindow.querySelector('.popup__close');
const closeCardFormButton = cardFormModalWindow.querySelector('.popup__close');
const closeImageModalButton = imageModalWindow.querySelector('.popup__close');
// students don't know about custom data attributes yet
// and won;t be able to make an array and go though it
// thus, they won't be able to connect the buttons and the elements they represent correctly

// DOM nodes of the profile
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Forms
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
const cardNameInputValue = cardFormModalWindow.querySelector('.popup__input_type_card-name');
const cardLinkInputValue = cardFormModalWindow.querySelector('.popup__input_type_url');
const imageElement = imageModalWindow.querySelector('.popup__image');
const imageCaption = imageModalWindow.querySelector('.popup__caption');
// an easy solution. students can also process the input values inside the form

const getCardElement = (data) => {
  // this sprint is where the students learn about the arrow functions
  // and function expressions. but using function declarations is also OK
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const imageElement = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__image').style.backgroundImage = 'url(' + data.link + ')';
  cardElement.querySelector('.card__title').textContent = data.name;

  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteCard);
  imageElement.addEventListener('click', () => handlePreviewPicture(data));
  // add event listeners before an element is returned
  return cardElement;
};

const toggleModalWindow = (modalWindow) => {
  if (!modalWindow.classList.contains('popup_is-opened')) {
    titleInputValue.value = profileTitle.textContent;
    descriptionInputValue.value = profileDescription.textContent;
  }
  modalWindow.classList.toggle('popup_is-opened');
};

const formSubmitHandler = (evt) => {
  // a better name for this element: handleProfileFormSubmit
  // but it's like that in the project brief
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  toggleModalWindow(editFormModalWindow);
};

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
  // students know about evt.target
};

const handleDeleteCard = (evt) => {
  // students don't know about evt.stopPropagation();
  evt.target.closest('.card').remove();
};

const handlePreviewPicture = (data) => {
  imageElement.src = data.link;
  imageElement.alt = 'Image ' + data.name + '';
  // we don't require this from the students
  imageCaption.textContent = data.name;
  toggleModalWindow(imageModalWindow);
};

const cardFormSubmitHandler = (evt) => {
  // similar to how we handled the previous button
  evt.preventDefault();
  // to improve: remove the way to add a card with empty fields
  // (not a JS validation method!)
  renderCard({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value
  }, placesWrap);
  toggleModalWindow(cardFormModalWindow);
  // to improve: clear the form after the card is added
};

const renderCard = (data, wrap) => {
  // not ok to use forEach() here
  // the renderCard() function must be reused when handling the submit of a new card
  wrap.prepend(getCardElement(data));
  // students know about prepend()
};
// alternative:

/*
const itemList = initialCards.map((data) => getCardElement(data));
placesWrap.prepend(...itemList);
*/

// this looks more elegant,
// and the students know about the spread operator by now
// but this blurs the render function's role a bit


// EventListeners
editFormModalWindow.addEventListener('submit', formSubmitHandler);
cardFormModalWindow.addEventListener('submit', cardFormSubmitHandler);

openEditFormButton.addEventListener('click', () => {
  toggleModalWindow(editFormModalWindow);
});

closeEditFormButton.addEventListener('click', () => {
  toggleModalWindow(editFormModalWindow);
});

openCardFormButton.addEventListener('click', () => {
  toggleModalWindow(cardFormModalWindow);
});

closeCardFormButton.addEventListener('click', () => {
  toggleModalWindow(cardFormModalWindow);
});

closeImageModalButton.addEventListener('click', () => {
  toggleModalWindow(imageModalWindow);
});

// Render
initialCards.forEach((data) => {
  renderCard(data, placesWrap)
});