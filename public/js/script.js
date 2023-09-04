document.addEventListener('DOMContentLoaded', () => {
  // show edit and delete icons for city on hover
  const cityCards = document.querySelectorAll('.city-card');

  cityCards.forEach((cityCard) => {
    cityCard.addEventListener('mouseover', () => {
      const editIcon = cityCard.querySelector('.city-edit-button');
      const deleteIcon = cityCard.querySelector('.city-delete-button');

      editIcon.style.display = 'block';
      deleteIcon.style.display = 'block';
    });

    cityCard.addEventListener('mouseout', () => {
      const editIcon = cityCard.querySelector('.city-edit-button');
      const deleteIcon = cityCard.querySelector('.city-delete-button');

      editIcon.style.display = 'none';
      deleteIcon.style.display = 'none';
    });
  });

  // show edit and delete icons for attraction on hover
  const attractionCards = document.querySelectorAll('.attraction-card');

  attractionCards.forEach((attractionCard) => {
    attractionCard.addEventListener('mouseover', () => {
      const editIcon = attractionCard.querySelector('.attraction-edit-button');
      const deleteIcon = attractionCard.querySelector(
        '.attraction-delete-button'
      );

      editIcon.style.display = 'block';
      deleteIcon.style.display = 'block';
    });

    attractionCard.addEventListener('mouseout', () => {
      const editIcon = attractionCard.querySelector('.attraction-edit-button');
      const deleteIcon = attractionCard.querySelector(
        '.attraction-delete-button'
      );

      editIcon.style.display = 'none';
      deleteIcon.style.display = 'none';
    });
  });

  // success and error flashign messages
  const successFlash = document.getElementById('successFlash');
  const errorFlash = document.getElementById('errorFlash');

  if (successFlash.textContent.trim().length > 0) {
    // trim() removes whitespace from both ends of a string
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

  // click delete-icon to open form/modal for attractions and perform delete
  const deleteAttractionButtons = document.querySelectorAll(
    '.attraction-delete-button'
  );

  deleteAttractionButtons.forEach((deleteAttractionButton) => {
    deleteAttractionButton.addEventListener('click', () => {
      const attractionId =
        deleteAttractionButton.getAttribute('data-attraction-id');
      const deleteAttractionDialog = document.getElementById(
        `deleteAttractionDialog-${attractionId}`
      );
      const confirmDeleteAttractionButton =
        deleteAttractionDialog.querySelector('#confirmDeleteAttraction');
      const cancelDeleteAttractionButton = deleteAttractionDialog.querySelector(
        '#cancelDeleteAttraction'
      );

      deleteAttractionDialog.showModal();

      deleteAttractionDialog.addEventListener('click', (e) => {
        if (e.target === deleteAttractionDialog) {
          deleteAttractionDialog.close();
        }
      });

      confirmDeleteAttractionButton.addEventListener('click', async () => {
        try {
          const attractionId =
            deleteAttractionButton.getAttribute('data-attraction-id');
          const response = await fetch(`/cities/${attractionId}`, {
            method: 'DELETE',
          });

          console.log('response successful', response);
          window.location.reload();
          deleteAttractionDialog.close();
        } catch (error) {
          console.error('An error occurred:', error);
        }
      });

      cancelDeleteAttractionButton.addEventListener('click', () => {
        deleteAttractionDialog.close();
      });
    });
  });

  // click edit-icon to open form/modal for attractions and perform edit
  const editAttractionButtons = document.querySelectorAll(
    '.attraction-edit-button'
  );

  editAttractionButtons.forEach((editAttractionButton) => {
    editAttractionButton.addEventListener('click', () => {
      const attractionId =
        editAttractionButton.getAttribute('data-attraction-id');
      const editAttractionDialog = document.getElementById(
        `editAttractionDialog-${attractionId}`
      );
      const confirmEditAttractionButton = editAttractionDialog.querySelector(
        '#submitAttractionChange'
      );

      editAttractionDialog.showModal();

      editAttractionDialog.addEventListener('click', (e) => {
        if (e.target === editAttractionDialog) {
          editAttractionDialog.close();
        }
      });

      confirmEditAttractionButton.addEventListener('click', async (e) => {
        try {
          const editAttractionForm = document.querySelector(
            `#editAttractionForm-${attractionId}`
          );

          const formData = new FormData(editAttractionForm);
          formData.append('attractionID', attractionId);

          // append attractionImgPUT multer field to formData
          const attractionImgPUT = document.querySelector(`#attractionImgPUT`); // input type="file"
          formData.append('attractionImgPUT', attractionImgPUT.files[0]); // only append if file is selected, otherwise it will be undefined

          const response = await fetch(`/cities/${attractionId}`, {
            method: 'PUT',
            body: formData,
          });

          window.location.reload();
          console.log('response successful', response);
        } catch (error) {
          console.error('An error occurred:', error);
        }

        editAttractionDialog.close();
      });
    });
  });
});
