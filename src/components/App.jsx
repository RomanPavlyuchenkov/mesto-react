import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  /*   данные пользователя */
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((currentUser) => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar: currentUser.avatar,
          _id: currentUser._id,
        });
      })
      .catch((err) => console.log(`catch: ${err}`));
  }, []);
  /* открываем картинку */
  const [selectedCard, setSelectedCard] = React.useState(null);
  const handleCardClick = (data) => {
    setSelectedCard(data);
  };
  /* получаем карточки */
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(`catch: ${err}`));
  }, []);

  const handleCardLike = (card) => {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`catch: ${err}`));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`catch: ${err}`));
    }
  };
  //Удаляем карточки
  const handleCardDelete = (cardID) => {
    api
      .deleteCard(cardID)
      .then(() => {
        //с помощью метода filter создаем копию массива, исключив из него удалённую карточку.
        setCards((cards) => cards.filter((c) => c._id !== cardID));
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  //edit profile
  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUserInfo({ name, about })
      .then((newProfile) => {
        setCurrentUser(newProfile);
        closeAllPopups();
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  //edit avatar
  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  //add place
  const handleAddPlace = (data) => {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onCardLike={handleCardLike}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          cards={cards}
        ></Main>
        <Footer />
        <EditAvatarPopup
          isClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
