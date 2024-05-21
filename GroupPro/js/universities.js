document.addEventListener('DOMContentLoaded', () => {
  const universityCardsContainer = document.getElementById('universityCards');
  const itemsPerPage = 6;
  let currentPage = 1;
  let universities = [];

  // Function to render universities on the page
  function renderUniversities(page) {
      universityCardsContainer.innerHTML = '';
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedUniversities = universities.slice(start, end);

      paginatedUniversities.forEach(university => {
          const card = document.createElement('div');
          card.className = 'card';
          const universityPicture = university.university_picture ? university.university_picture : 'images/universitylogo.png';
          card.innerHTML = `
              <img src="${universityPicture}" alt="${university.name}">
              <div class="card-title">${university.name}</div>
          `;
          card.addEventListener('click', () => {
              // Redirect to the university detail page with university name in the URL
              const encodedUniversityName = encodeURIComponent(university.name);
              window.location.href = `universityDetails.html?name=${encodedUniversityName}`;
          });
          universityCardsContainer.appendChild(card);
      });

      renderPagination();
  }

  // Function to render pagination controls
  function renderPagination() {
      const paginationContainer = document.getElementById('pagination');
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(universities.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement('button');
          pageLink.textContent = i;
          pageLink.className = 'page-link';
          if (i === currentPage) {
              pageLink.classList.add('active');
          }
          pageLink.addEventListener('click', () => {
              currentPage = i;
              renderUniversities(currentPage);
          });
          paginationContainer.appendChild(pageLink);
      }
  }

  // Fetch the list of universities
  fetch('http://127.0.0.1:8000/univ/get_univs')
      .then(response => response.json())
      .then(data => {
          if (data.answer === 'success') {
              universities = data.universities;
              renderUniversities(currentPage);
          } else {
              console.error('Error fetching universities:', data.error_message);
          }
      })
      .catch(error => console.error('Error fetching universities:', error));
});
