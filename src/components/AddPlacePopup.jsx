import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      isClose={props.isClose}
      title="Новое место"
      name="add-card"
      buttonText="Создать"
      typeForm="popup__form_type_add-card"
    >
      <input
        className="popup__input"
        id="popup-add-card-input-name"
        autoComplete="off"
        name="name"
        minLength="2"
        maxLength="30"
        required
        type="text"
        placeholder="Название"
      />
      <span className="popup__input-error popup-add-card-input-name-error"></span>
      <input
        className="popup__input"
        id="popup-add-card-input-link"
        autoComplete="off"
        name="link"
        required
        type="url"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error popup-add-card-input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
