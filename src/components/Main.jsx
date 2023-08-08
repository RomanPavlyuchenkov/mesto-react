import React from "react";
import editBtn from "../images/edit-btn.svg";
import addBtn from "../images/add-btn.svg";
import { api } from "../utils/Api.js";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      })
      .catch((err) => console.log(`catch: ${err}`));
  }, []);
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

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__avatar-edit"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
          </button>
          <div className="profile__name">
            <div className="profile__edit">
              <h1 className="profile__title">{userName}</h1>

              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              >
                <img
                  className="profile__edit-button-img"
                  src={editBtn}
                  alt="редактировать"
                />
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img
            className="profile__add-button-img"
            src={addBtn}
            alt="добавить"
          />
        </button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card key={item._id} card={item} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
