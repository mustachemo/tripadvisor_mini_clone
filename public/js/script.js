document.addEventListener('DOMContentLoaded', () => {
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

  addCity.addEventListener('click', event => {
    console.log('add city button clicked');
    addCityForm.showModal();
  });

  addCityForm.addEventListener('click', e => {
    if (e.target === addCityForm) {
      addCityForm.close();
    }
  });

  // click delete-icon to open form/modal for cities
  const deleteButtons = document.querySelectorAll('#cityDELETE');
  const deleteDialog = document.getElementById('deleteDialog');
  const confirmDeleteButton = document.getElementById('confirmDelete');
  const cancelDeleteButton = document.getElementById('cancelDelete');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', event => {
      const cityId = deleteButton.getAttribute('data-city-id');
      console.log('cityId: ', cityId);
      deleteDialog.showModal();

      confirmDeleteButton.addEventListener('click', () => {
        console.log('confirm delete button clicked');
        deleteDialog.close();
      });

      cancelDeleteButton.addEventListener('click', () => {
        console.log('cancel delete button clicked');
        deleteDialog.close();
      });
    });
  });

  // click add-icon to open form/modal for attractions
  const addAttraction = document.querySelector('#addAttractionButton');
  const addAttractionForm = document.querySelector('#addAttractionForm');

  addAttraction.addEventListener('click', () => {
    console.log('add attraction button clicked');
    addAttractionForm.showModal();
  });

  addAttractionForm.addEventListener('click', e => {
    if (e.target === addAttractionForm) {
      addAttractionForm.close();
    }
  });
});
