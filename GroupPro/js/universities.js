document.addEventListener('DOMContentLoaded', () => {
  const universityCardsContainer = document.getElementById('universityCards');

  // Fetch the list of universities
  fetch('http://127.0.0.1:8000/univ/get_univs')
    .then(response => response.json())
    .then(data => {
      if (data.answer === 'success') {
        const universities = data.universities;
        universities.forEach((university, index) => {
          // Fetch the picture for each university
          fetch('http://127.0.0.1:8000/univ/get_univ_picture', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: university.name }),
          })
            .then(response => response.json())
            .then(pictureData => {
              if (pictureData.answer === 'success') {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                  <img src="${pictureData.profile_picture}" alt="${university.name}">
                  <div class="card-title">${university.name}</div>
                `;
                card.addEventListener('click', () => {
                  // Redirect to the university detail page with university ID in the URL
                  window.location.href = `universityDetails.html?id=${index}`;
                });
                universityCardsContainer.appendChild(card);
              } else {
                console.error('Error fetching picture:', pictureData.error_message);
              }
            })
            .catch(error => console.error('Error fetching picture:', error));
        });
      } else {
        console.error('Error fetching universities:', data.error_message);
      }
    })
    .catch(error => console.error('Error fetching universities:', error));
});
