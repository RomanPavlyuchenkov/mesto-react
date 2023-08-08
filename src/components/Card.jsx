import deleteBtn from "../images/delete.svg";
function Card({ onCardClick, ...props }) {
  const handleClick = () => {
    onCardClick(props.card); // наши карточки при загрузке
  };
  return (
    <div className="elements__element">
      <button type="button" className="elements__delete">
        <img src={deleteBtn} alt="удалить" />
      </button>
      <img
        className="elements__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__container-btn">
          <button type="button" className="elements__like "></button>
          <span className="elements__like-count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
