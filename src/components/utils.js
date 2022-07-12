export const buttonSave = document.querySelectorAll(".form__button");
export function loading(button, loading) {
  if (loading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
