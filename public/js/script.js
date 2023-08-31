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

  // click delete-icon to open form/modal for cities and perform delete
  const deleteButtons = document.querySelectorAll('.city-delete-button');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      const cityId = deleteButton.getAttribute('data-city-id');
      const deleteDialog = document.getElementById(`deleteDialog-${cityId}`);
      const confirmDeleteButton = deleteDialog.querySelector('#confirmDelete');
      const cancelDeleteButton = deleteDialog.querySelector('#cancelDelete');

      deleteDialog.showModal();

      confirmDeleteButton.addEventListener('click', () => {
        // Perform delete action here
        console.log('Deleting city with ID:', cityId);
        deleteDialog.close();
      });

      cancelDeleteButton.addEventListener('click', () => {
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
