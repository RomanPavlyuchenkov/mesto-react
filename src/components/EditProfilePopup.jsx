import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      isClose={props.isClose}
      title="Редактировать профиль"
      name="edit-name"
      buttonText="Сохранить"
      typeForm="popup__form_type_edit-name"
    >
      <input
        className="popup__input"
        id="popup-edit-name-input-name"
        autoComplete="off"
        required
        minLength="2"
        maxLength="40"
        name="name"
        type="text"
        placeholder="Имя"
      />
      <span className="popup__input-error  popup-edit-name-input-name-error"></span>
      <input
        className="popup__input"
        id="popup-edit-name-input-status"
        autoComplete="off"
        required
        minLength="2"
        maxLength="400"
        name="about"
        type="text"
        placeholder="О себе"
      />
      <span className="popup__input-error popup-edit-name-input-status-error "></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
