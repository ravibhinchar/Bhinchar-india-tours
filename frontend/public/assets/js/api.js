
const API_URL = `${window.BACKEND_URL}/api/tours`;

// Fetch and display tours
async function fetchTours() {
  try {
    const response = await fetch(API_URL);
    const tours = await response.json();

    const packageList = document.querySelector('.package-list');
    if (packageList && tours.length > 0) {
      packageList.innerHTML = '';

      tours.forEach(tour => {
        const tourCard = `
                 <li>
                  <div class="package-card">

                    <figure class="card-banner">
                      <img src="${tour.image}" alt="${tour.title}" loading="lazy">
                    </figure>

                    <div class="card-content">

                      <h3 class="h3 card-title">${tour.title}</h3>

                      <p class="card-text">
                        ${tour.description}
                      </p>

                      <ul class="card-meta-list">

                        <li class="card-meta-item">
                          <div class="meta-box">
                            <ion-icon name="time"></ion-icon>

                            <p class="text">${tour.duration}</p>
                          </div>
                        </li>

                        <li class="card-meta-item">
                          <div class="meta-box">
                            <ion-icon name="people"></ion-icon>

                            <p class="text">pax: 10</p>
                          </div>
                        </li>

                        <li class="card-meta-item">
                          <div class="meta-box">
                            <ion-icon name="location"></ion-icon>

                            <p class="text">${tour.destination}</p>
                          </div>
                        </li>

                      </ul>

                    </div>

                    <div class="card-price">

                      <div class="wrapper">

                        <p class="reviews">(${tour.reviews} reviews)</p>

                        <div class="card-rating">
                          ${Array.from({ length: 5 }, (_, i) => {
          if (tour.rating >= i + 1) return '<ion-icon name="star"></ion-icon>';
          if (tour.rating >= i + 0.5) return '<ion-icon name="star-half"></ion-icon>';
          return '<ion-icon name="star-outline"></ion-icon>';
        }).join('')}
                        </div>

                      </div>

                        $${tour.price}
                        <span>/ per person</span>
                      </p>

                      <button class="btn btn-secondary" onclick="handleBooking('${tour._id}', '${tour.title}')">Book Now</button>

                    </div>

                  </div>
                </li>
                `;
        packageList.insertAdjacentHTML('beforeend', tourCard);
      });
    }

  } catch (error) {
    console.error('Error fetching tours:', error);
  }
}

// Handle Booking Logic
window.handleBooking = async function (tourId, tourTitle) {
  const token = localStorage.getItem('token');

  if (!token) {
    const confirmLogin = confirm("You need to login to book a tour. Go to login page?");
    if (confirmLogin) {
      window.location.href = 'login.html';
    }
  } else {
    try {
      const res = await fetch(`${window.BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tourId, tourTitle })
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Success! Your booking for "${tourTitle}" has been sent.\nCheck your Dashboard for status.`);
        window.location.href = 'profile.html';
      } else {
        alert(`Booking Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Booking Error:', error);
      alert(`Error: ${error.message}\n(Possible causes: weak internet, server restarting, or CORS issue)`);
    }
  }
};

// Check Auth State for Header
function checkAuthState() {
  const token = localStorage.getItem('token');
  const loginBtn = document.getElementById('loginBtn');

  if (token && loginBtn) {
    loginBtn.textContent = 'My Profile';
    loginBtn.href = 'profile.html';
    loginBtn.classList.remove('btn-primary');
    loginBtn.classList.add('btn-secondary');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTours();
  checkAuthState();

  // Inquiry Form Handler
  const inquiryForm = document.querySelector('.tour-search-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = {
        destination: document.getElementById('destination').value,
        people: document.getElementById('people').value,
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value
      };

      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        formData.user = user._id;
      }

      try {
        const res = await fetch(`${window.BACKEND_URL}/api/inquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          alert('Thank you! Your inquiry has been sent to our team. We will contact you shortly.');
          inquiryForm.reset();
        } else {
          alert('Failed to send inquiry. Please try again.');
        }
      } catch (error) {
        console.error('Inquiry Error:', error);
        alert('Network Error. Please try again later.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
