const STORAGE_KEY = "userInformation";
const profileCard = document.getElementById("profileCard");
const emptyState = document.getElementById("emptyState");
const message = document.getElementById("message");

function setupCommon() {
  const clock = document.getElementById("liveClock");
  const tick = () => { clock.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date()); };
  tick();
  setInterval(tick, 1000);
  const top = document.getElementById("backTop");
  window.addEventListener("scroll", () => top.classList.toggle("visible", window.scrollY > 320));
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
function showToast(text, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.className = `toast visible ${type}`;
  setTimeout(() => toast.classList.remove("visible"), 3200);
}
function readUser() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return value && typeof value === "object" && typeof value.name === "string" ? value : null;
  } catch { return null; }
}
function render() {
  const user = readUser();
  if (!user) {
    profileCard.hidden = true;
    emptyState.hidden = false;
    message.textContent = "No saved profile found.";
    document.getElementById("savedBadge").hidden = true;
    return;
  }
  emptyState.hidden = true;
  profileCard.hidden = false;
  message.textContent = "Everything you shared, in one place.";
  document.getElementById("savedBadge").hidden = false;
  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profileLocation").textContent = [user.city, user.state, user.country].filter(Boolean).join(", ");
  document.getElementById("avatar").textContent = user.name.split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
  document.getElementById("lastUpdated").textContent = user.savedAt ? `Saved ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(user.savedAt))}` : "Saved locally";
  const entries = [["♙", "Full name", user.name], ["⚧", "Gender", user.gender], ["⌕", "Mobile number", user.mobile], ["@", "Email address", user.email], ["⌖", "City", user.city], ["◈", "State", user.state], ["◎", "Country", user.country]];
  const list = document.getElementById("detailsList");
  list.replaceChildren();
  entries.forEach(([icon, label, value]) => {
    const item = document.createElement("div");
    item.className = "detail-item";
    const iconEl = document.createElement("span");
    iconEl.className = "detail-icon";
    iconEl.textContent = icon;
    const content = document.createElement("div");
    const heading = document.createElement("small");
    heading.textContent = label;
    const valueEl = document.createElement("strong");
    valueEl.textContent = value || "Not provided";
    content.append(heading, valueEl);
    item.append(iconEl, content);
    list.append(item);
  });
}
function modal(open) {
  document.getElementById("confirmModal").hidden = !open;
  if (open) document.getElementById("cancelModal").focus();
}
setupCommon();
render();
document.getElementById("editButton").addEventListener("click", () => { window.location.href = "index.html?edit=true"; });
document.getElementById("deleteButton").addEventListener("click", () => modal(true));
document.getElementById("cancelModal").addEventListener("click", () => modal(false));
document.getElementById("confirmModalButton").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  modal(false);
  render();
  showToast("Your saved details were deleted.");
});
