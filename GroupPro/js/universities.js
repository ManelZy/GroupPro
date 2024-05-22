document.addEventListener('DOMContentLoaded', () => {
  const universityCardsContainer = document.getElementById('universityCards');

  // Fetch the list of universities
  fetch('http://127.0.0.1:8000/univ/get_univs')
    .then(response => response.json())
    .then(data => {
      if (data.answer === 'success') {
        const universities = data.universities;
        const defaultImage = "image/universitylogo.png"; // Replace with your actual path

        universities.forEach(university => {
          const card = document.createElement('div');
          card.className = 'card';

          const imageSrc = university.university_picture ? `http://127.0.0.1:8000${university.university_picture}` : defaultImage;

          card.innerHTML = `
            <img src="${imageSrc}" alt="${university.name}">
            <div class="card-title">${university.name}</div>
          `;

          card.addEventListener('click', () => {
            // Redirect to the university detail page with university name in the URL
            const encodedUniversityName = encodeURIComponent(university.name);
            window.location.href = `universityDetails.html?name=${encodedUniversityName}`;
          });
          universityCardsContainer.appendChild(card);
        });
      } else {
        console.error('Error fetching universities:', data.error_message);
      }
    })
    .catch(error => console.error('Error fetching universities:', error));
});
