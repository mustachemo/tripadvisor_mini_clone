const githubIcon = document.querySelector('footer span i');

githubIcon.addEventListener('mouseover', () => {
  githubIcon.classList.add('fa-bounce');
});

githubIcon.addEventListener('mouseout', () => {
  githubIcon.classList.remove('fa-bounce');
});
