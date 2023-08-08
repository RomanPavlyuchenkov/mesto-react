import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      isClose={props.isClose}
      title="Обновить аватар"
      name="update-avatar"
      buttonText="Сохранить"
      typeForm="popup__form_type_update-avatar"
    >
      <input
        className="popup__input"
        id="popup-update-avatar-link"
        autoComplete="off"
        name="avatar"
        required
        type="url"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error popup-update-avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
