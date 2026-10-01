const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mobileBackdrop = document.getElementById('mobileBackdrop');
const toast = document.getElementById('toast');

function setTheme(light){
  body.classList.toggle('light', light);
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
}
setTheme(localStorage.getItem('portfolio-theme') === 'light');

themeToggle.addEventListener('click', () => {
  setTheme(!body.classList.contains('light'));
  showToast(body.classList.contains('light') ? 'Light mode enabled' : 'Dark mode enabled');
});

function closeSidebar(){
  sidebar.classList.remove('open');
  mobileBackdrop.classList.remove('show');
}
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  mobileBackdrop.classList.toggle('show');
});
mobileBackdrop.addEventListener('click', closeSidebar);
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth <= 900) closeSidebar();
  });
});

function showToast(message){
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => toast.classList.remove('show'), 2100);
}

document.querySelectorAll('.view-project').forEach(button => {
  button.addEventListener('click', () => {
    showToast(`${button.dataset.project} selected`);
  });
});

window.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') closeSidebar();
});
