document.addEventListener("DOMContentLoaded", () => {
    setupDropdown(document.getElementById('search-input-1'), document.getElementById('dropdown-menu-1'));
    setupDropdown(document.getElementById('search-input-2'), document.getElementById('dropdown-menu-2'));
  });
  
  document.getElementById('compare-btn').addEventListener('click', async () => {
    const searchInput1 = document.getElementById('search-input-1').value.trim();
    const searchInput2 = document.getElementById('search-input-2').value.trim();
  
    if (searchInput1 && searchInput2) {
      try {
        const response1 = await fetch(`http://127.0.0.1:8000/univ/get_specialty ?name=${searchInput1}`);
        const response2 = await fetch(`http://127.0.0.1:8000/univ/get_specialty ?name=${searchInput2}`);
  
        if (response1.ok && response2.ok) {
          const data1 = await response1.json();
          const data2 = await response2.json();
  
          displayComparison(data1, data2);
        } else {
          console.error('Failed to fetch comparison data.');
        }
      } catch (error) {
        console.error('Error fetching comparison data:', error);
      }
    } else {
      alert('Please enter names for both specialties.');
    }
  });
  
  function setupDropdown(inputElement, dropdownElement) {
    inputElement.addEventListener("input", async function(e) {
      let val = this.value;
  
      closeAllLists();
      if (!val) { return false; }
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/univ/get_specialty ?query=${val}`);
        if (response.ok) {
          const suggestions = await response.json();
          suggestions.forEach(item => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add('dropdown-item');
            suggestionItem.innerText = item;
            suggestionItem.addEventListener("click", function(e) {
              inputElement.value = this.innerText;
              closeAllLists();
            });
            dropdownElement.appendChild(suggestionItem);
          });
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    });
  
    function closeAllLists(elmnt) {
      while (dropdownElement.firstChild) {
        dropdownElement.removeChild(dropdownElement.firstChild);
      }
    }
  
    document.addEventListener("click", function (e) {
      if (!inputElement.contains(e.target) && !dropdownElement.contains(e.target)) {
        closeAllLists(e.target);
      }
    });
  }
  
  function displayComparison(data1, data2) {
    const comparisonResults = document.getElementById('comparison-results');
    comparisonResults.innerHTML = `
      <div class="comparison-row">
        <div class="comparison-column">
          <h3>${data1.name}</h3>
        </div>
        <div class="comparison-column">
          <h3>${data2.name}</h3>
        </div>
      </div>
      <div class="comparison-row">
        <div class="comparison-column">
          <h4>Duration of Study</h4>
          <p>${data1.duration}</p>
        </div>
        <div class="comparison-column">
          <h4>Duration of Study</h4>
          <p>${data2.duration}</p>
        </div>
      </div>
      <div class="comparison-row">
        <div class="comparison-column">
          <h4>Language of Instruction</h4>
          <p>${data1.language}</p>
        </div>
        <div class="comparison-column">
          <h4>Language of Instruction</h4>
          <p>${data2.language}</p>
        </div>
      </div>
      <div class="comparison-row">
        <div class="comparison-column">
          <h4>Degree Levels Offered</h4>
          <p>${data1.degreeLevels}</p>
        </div>
        <div class="comparison-column">
          <h4>Degree Levels Offered</h4>
          <p>${data2.degreeLevels}</p>
        </div>
      </div>
      <div class="comparison-row">
        <div class="comparison-column">
          <h4>Specializations and Concentrations</h4>
          <p>${data1.specializations}</p>
        </div>
        <div class="comparison-column">
          <h4>Specializations and Concentrations</h4>
          <p>${data2.specializations}</p>
        </div>
      </div>
      <div class="comparison-row">
        <div class="comparison-column">
          <h4>Curriculum and Modules</h4>
          <p>${data1.curriculum}</p>
        </div>
        <div class="comparison-column">
          <h4>Curriculum and Modules</h4>
          <p>${data2.curriculum}</p>
        </div>
      </div>
    `;
  }
  