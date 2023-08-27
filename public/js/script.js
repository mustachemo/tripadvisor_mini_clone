// make githib icon bounce on hover
const githubIcon = document.querySelector('footer span i');

githubIcon.addEventListener('mouseover', () => {
  githubIcon.classList.add('fa-bounce');
});

githubIcon.addEventListener('mouseout', () => {
  githubIcon.classList.remove('fa-bounce');
});

// click add-icon to open form/modal
const addIcon = document.querySelector('#addIcon');
const addCityForm = document.querySelector('#addCityForm');

addIcon.addEventListener('click', () => {
  addCityForm.showModal();
});
