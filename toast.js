const parser = new DOMParser();
const toastContainer = document.createElement("div");
toastContainer.style = "position: fixed; bottom:30px; right:30px;";
document.body.appendChild(toastContainer);

function createToastEl(title, message, img) {
  const toast = parser.parseFromString(
    `<div
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="margin-top:10px; min-width:17vw"

    >
      <div class="toast-header">
        <img src="${img}" width="20px" height="20px" class="rounded mr-2" alt="..." />
        <strong class="mr-auto">${title}</strong>
        <small>now</small>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">${message}</div>
    </div>`,
    "text/html"
  ).body.firstChild;
  toastContainer.appendChild(toast);
  return toast;
}

export function creteToast(title, message, img) {
  const toastEl = createToastEl(title, message, img);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
