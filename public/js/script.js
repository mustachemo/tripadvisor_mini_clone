document.addEventListener('DOMContentLoaded', () => {
  // success and error flashign messages
  const successFlash = document.getElementById('successFlash');
  const errorFlash = document.getElementById('errorFlash');

  // if flash message is empty, hide it. Otherwise it will show up as an empty box
  if (successFlash.textContent.trim().length > 0) {
    successFlash.classList.add('animate-slide-in-out');
  }

  if (errorFlash.textContent.trim().length > 0) {
    errorFlash.classList.add('animate-slide-in-out');
  }

  // check passowrd in signup form
  const signUpPageConfirmation = document.getElementById('signupForm');

  if (signUpPageConfirmation) {
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#password_confirm');

    function checkPassword() {
      if (password.value !== repeatPassword.value) {
        repeatPassword.setCustomValidity('Passwords do not match');
      } else {
        repeatPassword.setCustomValidity('');
      }
    }

    password.addEventListener('change', checkPassword);
    repeatPassword.addEventListener('keyup', checkPassword);
  }

  // make githib icon bounce on hover
  const githubIcon = document.querySelector('footer span i');

  githubIcon.addEventListener('mouseover', () => {
    githubIcon.classList.add('fa-bounce');
  });

  githubIcon.addEventListener('mouseout', () => {
    githubIcon.classList.remove('fa-bounce');
  });

  // click add-icon to open form/modal for cities
  const addCity = document.getElementById('addCityButton');
  const addCityForm = document.querySelector('#addCityForm');

  if (addCityForm) {
    addCity.addEventListener('click', () => {
      addCityForm.showModal();
    });

    addCityForm.addEventListener('click', (e) => {
      if (e.target === addCityForm) {
        addCityForm.close();
      }
    });
  }

  // click add-icon to open form/modal for attractions
  const addAttraction = document.querySelector('#addAttractionButton');
  const addAttractionForm = document.querySelector('#addAttractionForm');

  if (addAttractionForm) {
    addAttraction.addEventListener('click', () => {
      console.log('add attraction button clicked');
      addAttractionForm.showModal();
    });

    addAttractionForm.addEventListener('click', (e) => {
      if (e.target === addAttractionForm) {
        addAttractionForm.close();
      }
    });
  }

  // click delete-icon to open form/modal for cities and perform delete
  const deleteButtons = document.querySelectorAll('.city-delete-button');

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const cityId = deleteButton.getAttribute('data-city-id');
      const deleteDialog = document.getElementById(`deleteDialog-${cityId}`);
      const confirmDeleteButton = deleteDialog.querySelector('#confirmDelete');
      const cancelDeleteButton = deleteDialog.querySelector('#cancelDelete');

      deleteDialog.showModal();

      deleteDialog.addEventListener('click', (e) => {
        if (e.target === deleteDialog) {
          deleteDialog.close();
        }
      });

      confirmDeleteButton.addEventListener('click', async () => {
        try {
          const cityId = deleteButton.getAttribute('data-city-id');
          const response = await fetch(`/${cityId}`, {
            method: 'DELETE',
          });

          console.log('response successful', response);
          window.location.reload();
          deleteDialog.close();
        } catch (error) {
          console.error('An error occurred:', error);
        }
      });

      cancelDeleteButton.addEventListener('click', () => {
        deleteDialog.close();
      });
    });
  });

  // click edit-icon to open form/modal for cities and perform edit
  const editButtons = document.querySelectorAll('.city-edit-button');

  editButtons.forEach((editButton) => {
    editButton.addEventListener('click', () => {
      const cityId = editButton.getAttribute('data-city-id');
      const editDialog = document.getElementById(`editDialog-${cityId}`);
      const confirmEditButton = editDialog.querySelector('#submitChange');

      editDialog.showModal();

      editDialog.addEventListener('click', (e) => {
        if (e.target === editDialog) {
          editDialog.close();
        }
      });

      confirmEditButton.addEventListener('click', async (e) => {
        try {
          const editForm = document.querySelector(`#editForm-${cityId}`);

          const formData = new FormData(editForm);
          formData.append('cityID', cityId);

          // append cityImgPUT multer field to formData
          const cityImgPUT = document.querySelector(`#cityImgPUT`); // input type="file"
          formData.append('cityImgPUT', cityImgPUT.files[0]); // only append if file is selected, otherwise it will be undefined

          const response = await fetch(`/${cityId}`, {
            method: 'PUT',
            body: formData,
          });

          window.location.reload();
          console.log('response successful', response);
        } catch (error) {
          console.error('An error occurred:', error);
        }

        editDialog.close();
      });
    });
  });
});
