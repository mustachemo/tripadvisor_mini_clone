// make githib icon bounce on hover
const githubIcon = document.querySelector('footer span i');

githubIcon.addEventListener('mouseover', () => {
  githubIcon.classList.add('fa-bounce');
});

githubIcon.addEventListener('mouseout', () => {
  githubIcon.classList.remove('fa-bounce');
});

// click add-icon to open form/modal for cities
const addCity = document.querySelector('#addCityButton');
const addCityForm = document.querySelector('#addCityForm');

addCity.addEventListener('click', () => {
  addCityForm.showModal();

  addCityForm.addEventListener('click', e2 => {
    if (e2.target === addCityForm) {
      addCityForm.close();
    }
  });
});

// click add-icon to open form/modal for attractions
const addAttraction = document.querySelector('#addAttractionButton');
const addAttractionForm = document.querySelector('#addAttractionForm');

addAttraction.addEventListener('click', () => {
  console.log('add attraction button clicked');
  addAttractionForm.showModal();
  console.log('add attraction form opened');

  addAttractionForm.addEventListener('click', e2 => {
    if (e2.target === addAttractionForm) {
      addAttractionForm.close();
    }
  });
});
