/**
 * Book Information Website - Interactive Features & Logic
 */

// Master Book Catalog Data (Expanded to 9 Books)
const BOOKS_DATA = [
  {
    id: 1,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    publisher: 'HarperCollins',
    price: 299,
    year: 1988,
    image: 'images/alchemist.jpeg',
    pageUrl: 'book1.html',
    rating: 4.8,
    description: "The Alchemist is a world-renowned novel about a young Andalusian shepherd named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an alchemist, all of whom point Santiago in the direction of his quest. The story teaches about listening to your heart, recognizing opportunity, and following your dreams."
  },
  {
    id: 2,
    title: 'Wings of Fire',
    author: 'Dr. A.P.J. Abdul Kalam',
    genre: 'Autobiography',
    publisher: 'Universities Press',
    price: 350,
    year: 1999,
    image: 'images/The_Wings_of_fire.jpeg',
    pageUrl: 'book2.html',
    rating: 4.9,
    description: "Wings of Fire is an inspirational autobiography of Dr. A.P.J. Abdul Kalam, the former President of India and renowned aerospace scientist. The book covers his early life, struggles, hardships, fortitude, and the chance opportunities that led him to lead India's space research, missile development, and nuclear programs. It is an uplifting story of courage, perseverance, and dedication to nation-building."
  },
  {
    id: 3,
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    genre: 'Personal Finance',
    publisher: 'Plata Publishing',
    price: 399,
    year: 1997,
    image: 'images/Rich_Dad_Poor_Dad.jpeg',
    pageUrl: 'book3.html',
    rating: 4.7,
    description: "Rich Dad Poor Dad advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses. It contrasts the financial mindsets of the author's biological father (the 'poor dad', a highly educated government worker) and his childhood best friend's father (the 'rich dad', an entrepreneur)."
  },
  {
    id: 4,
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    publisher: 'Penguin Random House',
    price: 450,
    year: 2018,
    image: 'images/atomic_habits.png',
    pageUrl: 'book4.html',
    rating: 4.9,
    description: "Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones in four simple steps. James Clear shows how small, 1% incremental changes every day compound into remarkable long-term results, transforming your health, productivity, and personal life."
  },
  {
    id: 5,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'History',
    publisher: 'Harvill Secker',
    price: 520,
    year: 2014,
    image: 'images/sapiens.png',
    pageUrl: 'book5.html',
    rating: 4.8,
    description: "Sapiens spans the entire length of human history, exploring how Homo sapiens evolved from an insignificant ape in Africa to the undisputed ruler of planet Earth through the Cognitive Revolution, Agricultural Revolution, and Scientific Revolution."
  },
  {
    id: 6,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Personal Finance',
    publisher: 'Harriman House',
    price: 380,
    year: 2020,
    image: 'images/psychology_of_money.png',
    pageUrl: 'book6.html',
    rating: 4.8,
    description: "Timeless lessons on wealth, greed, and happiness. Morgan Housel shares 19 short stories exploring the strange ways people think about money, demonstrating that doing well with money has little to do with how smart you are and more to do with how you behave."
  },
  {
    id: 7,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Psychology',
    publisher: 'Farrar, Straus and Giroux',
    price: 499,
    year: 2011,
    image: 'images/thinking_fast_slow.png',
    pageUrl: 'book7.html',
    rating: 4.7,
    description: "Nobel laureate Daniel Kahneman explains the two systems that drive the way we think: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberative, logical), showing how cognitive biases shape our everyday choices and decision-making."
  },
  {
    id: 8,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    publisher: 'J.B. Lippincott & Co.',
    price: 320,
    year: 1960,
    image: 'images/mockingbird.png',
    pageUrl: 'book8.html',
    rating: 4.9,
    description: "A Pulitzer Prize-winning classic novel set in the American South, following young Scout Finch and her lawyer father Atticus Finch as he defends a wrongly accused black man in a deeply prejudiced small town."
  },
  {
    id: 9,
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    genre: 'Biography',
    publisher: 'Simon & Schuster',
    price: 550,
    year: 2011,
    image: 'images/SteveJobs.jpeg',
    pageUrl: 'book9.html',
    rating: 4.8,
    description: "The exclusive biography of Apple co-founder Steve Jobs, based on more than forty interviews with Jobs conducted over two years, providing an unvarnished and candid view of his life, career, and creative genius."
  }
];

// --- Theme Management ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', activeTheme);
  updateThemeIcon(activeTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  showToast(`Switched to ${newTheme} mode`, newTheme === 'dark' ? '🌙' : '☀️');
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

// --- Bookmarking System ---
function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem('book_bookmarks') || '[]');
  } catch (e) {
    return [];
  }
}

function isBookmarked(bookId) {
  return getBookmarks().includes(Number(bookId));
}

function toggleBookmark(bookId) {
  let bookmarks = getBookmarks();
  const numericId = Number(bookId);
  const book = BOOKS_DATA.find(b => b.id === numericId);
  const bookTitle = book ? book.title : 'Book';
  
  if (bookmarks.includes(numericId)) {
    bookmarks = bookmarks.filter(id => id !== numericId);
    showToast(`Removed "${bookTitle}" from favorites`, '💔');
  } else {
    bookmarks.push(numericId);
    showToast(`Added "${bookTitle}" to favorites!`, '❤️');
  }
  
  localStorage.setItem('book_bookmarks', JSON.stringify(bookmarks));
  updateBookmarkBadgeCount();
  
  // Re-render UI elements if on catalog or detail page
  if (document.getElementById('booksContainer')) {
    renderBooks();
  }
  
  const detailBookmarkBtn = document.getElementById('detailBookmarkBtn');
  if (detailBookmarkBtn) {
    const active = isBookmarked(numericId);
    detailBookmarkBtn.classList.toggle('bookmarked', active);
    detailBookmarkBtn.innerHTML = active ? '❤️ Saved in Favorites' : '🤍 Add to Favorites';
  }
}

function updateBookmarkBadgeCount() {
  const badge = document.getElementById('bookmarkCountBadge');
  if (badge) {
    const count = getBookmarks().length;
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// --- Toast Notification Component ---
function showToast(message, icon = 'ℹ️') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 2700);
}

// --- Dynamic Genre Filter Pills Renderer ---
function initGenrePills() {
  const genrePillsContainer = document.querySelector('.genre-pills');
  if (!genrePillsContainer) return;

  const genres = ['All', ...new Set(BOOKS_DATA.map(b => b.genre))];
  
  genrePillsContainer.innerHTML = genres.map(g => `
    <button class="pill-btn ${g === currentGenre ? 'active' : ''}" data-genre="${g}">${g}</button>
  `).join('');

  const genrePills = genrePillsContainer.querySelectorAll('.pill-btn');
  genrePills.forEach(pill => {
    pill.addEventListener('click', () => {
      genrePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentGenre = pill.getAttribute('data-genre') || 'All';
      renderBooks();
    });
  });
}

// --- Home Page Catalog Controller ---
let currentSearch = '';
let currentGenre = 'All';
let currentSort = 'default';
let showOnlyBookmarks = false;

function initCatalog() {
  const booksContainer = document.getElementById('booksContainer');
  if (!booksContainer) return;

  initGenrePills();

  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const filterBookmarksBtn = document.getElementById('filterBookmarksBtn');

  // Parse URL query params (e.g., index.html?favorites=true)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('favorites') === 'true' || window.location.hash === '#favorites') {
    showOnlyBookmarks = true;
    if (filterBookmarksBtn) {
      filterBookmarksBtn.classList.add('active');
      filterBookmarksBtn.setAttribute('title', 'Show all books');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderBooks();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderBooks();
    });
  }

  if (filterBookmarksBtn) {
    filterBookmarksBtn.addEventListener('click', () => {
      showOnlyBookmarks = !showOnlyBookmarks;
      filterBookmarksBtn.classList.toggle('active', showOnlyBookmarks);
      filterBookmarksBtn.setAttribute('title', showOnlyBookmarks ? 'Show all books' : 'Show favorites only');
      showToast(showOnlyBookmarks ? 'Filtering favorite books' : 'Showing all books', '⭐');
      renderBooks();
    });
  }

  renderBooks();
}

function renderBooks() {
  const container = document.getElementById('booksContainer');
  if (!container) return;

  const bookmarks = getBookmarks();

  let filtered = BOOKS_DATA.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(currentSearch) ||
      book.author.toLowerCase().includes(currentSearch) ||
      book.genre.toLowerCase().includes(currentSearch) ||
      book.description.toLowerCase().includes(currentSearch);

    const matchesGenre = currentGenre === 'All' || book.genre === currentGenre;
    const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(book.id);

    return matchesSearch && matchesGenre && matchesBookmark;
  });

  // Sorting logic
  if (currentSort === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'year-desc') {
    filtered.sort((a, b) => b.year - a.year);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No books found</h3>
        <p class="empty-desc">Try adjusting your search query or genre filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(book => {
    const bookmarked = isBookmarked(book.id);
    const starsHtml = getStarRatingHtml(book.rating);

    return `
      <article class="book-card">
        <div class="card-img-container">
          <img src="${book.image}" alt="${book.title} Cover" class="card-img" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=${encodeURIComponent(book.title)}'">
          <span class="genre-tag">${book.genre}</span>
          <button class="btn-bookmark ${bookmarked ? 'bookmarked' : ''}" 
                  onclick="toggleBookmark(${book.id})" 
                  title="${bookmarked ? 'Remove from favorites' : 'Add to favorites'}" 
                  aria-label="Favorite">
            ${bookmarked ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="card-body">
          <h3 class="card-title">${book.title}</h3>
          <p class="card-author">by ${book.author}</p>
          <div class="rating-stars">
            ${starsHtml}
            <span class="rating-score">${book.rating}</span>
          </div>
          <div class="card-meta">
            <span class="price-tag">₹${book.price}</span>
            <span class="year-tag">${book.year} • ${book.publisher}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-secondary" onclick="openQuickView(${book.id})">⚡ Quick View</button>
            <a href="${book.pageUrl}" class="btn btn-primary">Details ➔</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function getStarRatingHtml(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '★';
    } else if (i === fullStars && hasHalf) {
      stars += '★';
    } else {
      stars += '☆';
    }
  }
  return stars;
}

// --- Quick View Modal Controller ---
function openQuickView(bookId, pushHistory = true) {
  const modal = document.getElementById('quickViewModal');
  const book = BOOKS_DATA.find(b => b.id === Number(bookId));
  if (!modal || !book) return;

  const bookmarked = isBookmarked(book.id);

  modal.innerHTML = `
    <div class="modal-content-grid">
      <div class="modal-img-wrapper">
        <img src="${book.image}" alt="${book.title}" class="modal-img" onerror="this.src='https://via.placeholder.com/300x400?text=${encodeURIComponent(book.title)}'">
      </div>
      <div class="modal-body">
        <span class="modal-badge">${book.genre}</span>
        <h2 class="modal-title">${book.title}</h2>
        <p class="modal-author">by ${book.author}</p>
        
        <div class="modal-specs">
          <div class="spec-item">
            <strong>Price</strong>
            <span style="color:var(--accent); font-weight:700;">₹${book.price}</span>
          </div>
          <div class="spec-item">
            <strong>Published</strong>
            <span>${book.year}</span>
          </div>
          <div class="spec-item">
            <strong>Publisher</strong>
            <span>${book.publisher}</span>
          </div>
          <div class="spec-item">
            <strong>Rating</strong>
            <span>${book.rating} / 5.0 ★</span>
          </div>
        </div>

        <p class="modal-description">${book.description}</p>

        <div class="modal-footer-actions">
          <button class="btn btn-secondary modal-back-btn" onclick="closeQuickView()" title="Close Quick View">← Back</button>
          <a href="${book.pageUrl}" class="btn btn-primary" style="flex:1;">Read Full Details ➔</a>
          <button class="btn btn-secondary" onclick="toggleBookmark(${book.id}); openQuickView(${book.id}, false);">
            ${bookmarked ? '❤️ Saved' : '🤍 Favorite'}
          </button>
        </div>
      </div>
    </div>
  `;

  try {
    if (!modal.open) {
      modal.showModal();
    }
  } catch (e) {
    console.warn('showModal notice:', e);
  }

  if (pushHistory) {
    try {
      history.pushState({ modalOpen: true, bookId: book.id }, '', '#quickview-' + book.id);
    } catch (e) {
      window.location.hash = 'quickview-' + book.id;
    }
  }
}

function closeQuickView() {
  try {
    const modal = document.getElementById('quickViewModal');
    if (modal && modal.open) {
      modal.close();
    }
  } catch (e) {
    console.warn('closeModal notice:', e);
  }

  try {
    if (window.location.hash && window.location.hash.startsWith('#quickview')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  } catch (e) {
    window.location.hash = '';
  }
}

// --- Detail Page Controller ---
function initDetailPage(bookId) {
  const numericId = Number(bookId);
  const book = BOOKS_DATA.find(b => b.id === numericId);
  if (!book) return;

  // Rating input handler
  const ratingInputs = document.querySelectorAll('.star-rating-input input');
  const userRatings = JSON.parse(localStorage.getItem('book_ratings') || '{}');
  if (userRatings[numericId]) {
    const input = document.querySelector(`.star-rating-input input[value="${userRatings[numericId]}"]`);
    if (input) input.checked = true;
  }

  ratingInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const val = e.target.value;
      const ratings = JSON.parse(localStorage.getItem('book_ratings') || '{}');
      ratings[numericId] = val;
      localStorage.setItem('book_ratings', JSON.stringify(ratings));
      showToast(`You rated this book ${val} stars!`, '⭐');
    });
  });

  // Bookmark Button
  const bookmarkBtn = document.getElementById('detailBookmarkBtn');
  if (bookmarkBtn) {
    const active = isBookmarked(numericId);
    bookmarkBtn.classList.toggle('bookmarked', active);
    bookmarkBtn.innerHTML = active ? '❤️ Saved in Favorites' : '🤍 Add to Favorites';
    bookmarkBtn.addEventListener('click', () => toggleBookmark(numericId));
  }

  // Share Button
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!', '📋');
      } else {
        showToast('Shared successfully!', '🔗');
      }
    });
  }

  // Reviews Render & Submit
  renderReviews(numericId);

  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reviewerName');
      const textInput = document.getElementById('reviewText');

      if (!nameInput.value.trim() || !textInput.value.trim()) return;

      const reviews = JSON.parse(localStorage.getItem(`reviews_${numericId}`) || '[]');
      const newReview = {
        name: nameInput.value.trim(),
        text: textInput.value.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      reviews.unshift(newReview);
      localStorage.setItem(`reviews_${numericId}`, JSON.stringify(reviews));

      nameInput.value = '';
      textInput.value = '';
      showToast('Thank you! Your review has been posted.', '💬');
      renderReviews(numericId);
    });
  }
}

function renderReviews(bookId) {
  const listContainer = document.getElementById('reviewsList');
  if (!listContainer) return;

  const defaultReviews = [
    { name: 'Alex Johnson', text: 'An absolute masterpiece! I learned so much from reading this.', date: 'Jan 15, 2026' },
    { name: 'Priya Sharma', text: 'Highly inspiring and well written. Definitely a must-read for everyone.', date: 'Feb 02, 2026' }
  ];

  const stored = JSON.parse(localStorage.getItem(`reviews_${bookId}`) || '[]');
  const allReviews = [...stored, ...defaultReviews];

  listContainer.innerHTML = allReviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="reviewer-name">${r.name}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join('');
}

// Global initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateBookmarkBadgeCount();

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (document.getElementById('booksContainer')) {
    initCatalog();
  }

  // Handle browser Back / Forward buttons for modal state
  window.addEventListener('popstate', () => {
    const modal = document.getElementById('quickViewModal');
    if (modal && modal.open) {
      closeQuickView();
    }
  });

  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeQuickView();
    });

    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        closeQuickView();
      }
    });
  }
});
