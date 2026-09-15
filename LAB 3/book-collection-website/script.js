const books = [
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        year: "1988",
        pages: "208",
        rating: "4.6",
        cover: "images/alchemist.jpeg",
        description: "A young shepherd named Santiago follows a recurring dream and begins a journey across deserts and cultures. The story explores dreams, courage, destiny and the importance of listening to your own heart."
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        year: "2018",
        pages: "320",
        rating: "4.8",
        cover: "images/atomic_habits.png",
        description: "A practical guide to building good habits and breaking bad ones. It explains how tiny improvements, repeated consistently, can create remarkable long-term results."
    },
    {
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        year: "1949",
        pages: "328",
        rating: "4.7",
        cover: "images/1984.jpg",
        description: "A dystopian novel set under an authoritarian regime where surveillance, propaganda and thought control shape everyday life. Winston Smith quietly questions the system around him."
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        year: "1997",
        pages: "309",
        rating: "4.9",
        cover: "images/Harry Potter and the Philosopher's Stone.jpg",
        description: "Harry Potter discovers that he is a wizard and enters Hogwarts School of Witchcraft and Wizardry. There he makes friends, learns magic and uncovers a mysterious threat."
    },
    {
        title: "Ikigai",
        author: "Hector Garcia & Francesc Miralles",
        category: "Self-Help",
        year: "2016",
        pages: "208",
        rating: "4.5",
        cover: "images/ikigai.jpg",
        description: "Inspired by Japanese ideas about purpose and meaningful living, this book explores habits, community, activity and balance that can contribute to a fulfilling life."
    },
    {
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        category: "Finance",
        year: "1997",
        pages: "336",
        rating: "4.5",
        cover: "images/Rich_Dad_Poor_Dad.jpeg",
        description: "The author contrasts two different approaches to money and education. The book focuses on financial literacy, assets, liabilities and developing a long-term mindset."
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        year: "1937",
        pages: "310",
        rating: "4.8",
        cover: "images/The Hobbit.jpg",
        description: "Bilbo Baggins leaves his comfortable home and joins a company of dwarves on an adventure to reclaim a treasure guarded by the dragon Smaug."
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "History",
        year: "2011",
        pages: "464",
        rating: "4.6",
        cover: "images/sapiens.png",
        description: "A broad exploration of human history, from early hunter-gatherers to modern societies. It examines how cooperation, culture, agriculture and technology shaped civilization."
    },
    {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        year: "2020",
        pages: "256",
        rating: "4.7",
        cover: "images/psychology_of_money.png",
        description: "This book explores how emotions, personal experiences and behavior influence financial decisions. It presents timeless lessons about wealth, risk and long-term thinking."
    },
    {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Biography",
        year: "1999",
        pages: "180",
        rating: "4.8",
        cover: "images/The_Wings_of_fire.jpeg",
        description: "An inspirational autobiography describing A.P.J. Abdul Kalam's early life, education and career in Indian aerospace and defence research, along with lessons about dreams and perseverance."
    }
];

function renderBooks() {
    const list = document.getElementById("bookList");
    if (!list) return;

    const search = (document.getElementById("searchBox")?.value || "").toLowerCase().trim();
    const category = document.getElementById("categoryFilter")?.value || "All";
    const sort = document.getElementById("sortFilter")?.value || "featured";
    const favoritesOnly = document.body.dataset.favoritesOnly === "true";

    let filtered = books.filter(book => {
        const originalIndex = books.indexOf(book);
        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);
        const matchesCategory = category === "All" || book.category === category;
        const matchesFavorites = !favoritesOnly || getFavorites().includes(originalIndex);
        return matchesSearch && matchesCategory && matchesFavorites;
    });

    if (sort === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "rating") filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
    if (sort === "year") filtered.sort((a, b) => Number(b.year) - Number(a.year));

    document.getElementById("bookCount").textContent =
        `${filtered.length} book${filtered.length === 1 ? "" : "s"}`;
    const finished = books.filter((_, index) => getProgress(index) === 100).length;
    document.getElementById("readingCount").textContent = `${finished} finished`;
    const clearSearchButton = document.getElementById("clearSearch");
    if (clearSearchButton) clearSearchButton.hidden = !search;
    const favoritesButton = document.getElementById("favoritesFilter");
    if (favoritesButton) {
        favoritesButton.classList.toggle("active", favoritesOnly);
        favoritesButton.textContent = favoritesOnly ? "♥ Favorites" : "♡ Favorites";
    }

    list.innerHTML = filtered.length
        ? filtered.map(book => {
            const originalIndex = books.indexOf(book);
            const progress = getProgress(originalIndex);
            return `
                <article class="book-card${document.body.dataset.selectedBook === String(originalIndex) ? " active" : ""}" onclick="selectBook(${originalIndex})" tabindex="0" onkeydown="if(event.key==='Enter') selectBook(${originalIndex})">
                    <div class="cover-wrap">
                        <img class="cover-small" src="${book.cover}" alt="${escapeHTML(book.title)} cover">
                        ${progress === 100 ? '<span class="finished-badge">✓</span>' : ""}
                    </div>
                    <div>
                        <div class="book-title">${escapeHTML(book.title)}</div>
                        <div class="book-author">${escapeHTML(book.author)}</div>
                        <div class="book-meta"><span>${escapeHTML(book.category)}</span><span>★ ${book.rating}</span></div>
                    </div>
                    <div class="card-end">
                        <button class="card-heart${getFavorites().includes(originalIndex) ? " is-favorite" : ""}" onclick="event.stopPropagation(); toggleFavorite(${originalIndex})" aria-label="${getFavorites().includes(originalIndex) ? "Remove from favorites" : "Add to favorites"}" aria-pressed="${getFavorites().includes(originalIndex)}">♥</button>
                        <span class="arrow">↗</span>
                        ${progress > 0 && progress < 100 ? `<span class="mini-progress">${progress}%</span>` : ""}
                    </div>
                </article>
            `;
        }).join("")
        : `<div class="empty"><div class="empty-icon">⌕</div><strong>No books found</strong><br>Try another title, author or category.</div>`;
}

function clearSearch() {
    const input = document.getElementById("searchBox");
    if (input) input.value = "";
    renderBooks();
}

function toggleFavoritesFilter() {
    document.body.dataset.favoritesOnly = document.body.dataset.favoritesOnly !== "true";
    renderBooks();
}

function selectBook(index) {
    document.body.dataset.selectedBook = String(index);
    renderBooks();
    const frame = parent.frames["detailsFrame"];
    if (frame && typeof frame.loadBook === "function") {
        frame.loadBook(index);
    } else {
        window.open(`book-details.html?book=${index}`, "_self");
    }
}

function loadBook(index) {
    const book = books[index];
    const container = document.getElementById("detailsContent");
    if (!book || !container) return;

    document.title = `${book.title} - BookSphere`;

    const progress = getProgress(index);
    const favorite = getFavorites().includes(index);
    const status = progress === 100 ? "Finished" : progress > 0 ? "In progress" : "Not started";

    container.innerHTML = `
        <section class="hero">
            <div>
                <img class="cover-large" src="${book.cover}" alt="${escapeHTML(book.title)} cover">
            </div>

            <div>
                <span class="category">${escapeHTML(book.category)}</span>
                <div class="title-line">
                    <h1 class="details-title">${escapeHTML(book.title)}</h1>
                    <button class="title-heart${favorite ? " is-favorite" : ""}" onclick="toggleFavorite(${index})" aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}" aria-pressed="${favorite}">♥</button>
                </div>
                <div class="details-author">by ${escapeHTML(book.author)}</div>
                <div class="rating"><span>★★★★★</span> ${book.rating} <em>· Reader rating</em></div>
                <p class="description">${escapeHTML(book.description)}</p>

                <div class="info-grid">
                    <div class="info-box">
                        <div class="info-label">Published</div>
                        <div class="info-value">${book.year}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Pages</div>
                        <div class="info-value">${book.pages}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Category</div>
                        <div class="info-value">${escapeHTML(book.category)}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Reading status</div>
                        <div class="info-value status-value">${status}</div>
                    </div>
                </div>

            </div>
        </section>

        <section class="compact-progress" aria-label="Reading progress">
            <div class="progress-top">
                <span>Reading progress</span>
                <span id="progressValue">${progress}%</span>
            </div>
            <div class="progress-bar progress-interactive" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" aria-label="Reading progress" onclick="setProgressFromPointer(event, ${index})" onkeydown="handleProgressKey(event, ${index})">
                <div id="progressFill" class="progress-fill" style="width:${progress}%"></div>
            </div>
        </section>
    `;

    requestAnimationFrame(() => container.classList.add("content-enter"));
    setTimeout(() => container.classList.remove("content-enter"), 420);
}

function changeProgress(index, amount) {
    setProgress(index, getProgress(index) + amount);
}

function setProgress(index, value) {
    const previousProgress = getProgress(index);
    const progress = Math.max(0, Math.min(100, Math.round(value)));
    if (progress === previousProgress) return;
    localStorage.setItem(`booksphere-progress-${index}`, progress);
    loadBook(index);
    const fill = document.getElementById("progressFill");
    if (fill) {
        fill.style.width = `${previousProgress}%`;
        requestAnimationFrame(() => {
            fill.style.width = `${progress}%`;
            fill.classList.add("is-changing");
        });
    }
    showToast(progress === 100 ? "Book finished — congratulations!" : "Reading progress updated");
}

function setProgressFromPointer(event, index) {
    const bar = event.currentTarget;
    const bounds = bar.getBoundingClientRect();
    setProgress(index, ((event.clientX - bounds.left) / bounds.width) * 100);
}

function handleProgressKey(event, index) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        setProgress(index, getProgress(index) + 5);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        setProgress(index, getProgress(index) - 5);
    } else if (event.key === "Home") {
        event.preventDefault();
        setProgress(index, 0);
    } else if (event.key === "End") {
        event.preventDefault();
        setProgress(index, 100);
    }
}

function getProgress(index) {
    return Number(localStorage.getItem(`booksphere-progress-${index}`) || 0);
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("booksphere-favorites") || "[]");
    } catch {
        return [];
    }
}

function toggleFavorite(index) {
    let favorites = getFavorites();
    favorites = favorites.includes(index)
        ? favorites.filter(item => item !== index)
        : [...favorites, index];

    localStorage.setItem("booksphere-favorites", JSON.stringify(favorites));
    const detailsFrame = window.parent.frames["detailsFrame"];
    if (detailsFrame && typeof detailsFrame.loadBook === "function") {
        detailsFrame.loadBook(index);
    } else {
        loadBook(index);
    }
    if (document.getElementById("bookList")) renderBooks();
    if (favorites.includes(index)) {
        const button = document.querySelector(".title-heart, .card-heart");
        if (button) button.classList.add("heart-pop");
        showToast("Added to your favorites");
    } else {
        showToast("Removed from your favorites");
    }
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove("show");
    requestAnimationFrame(() => toast.classList.add("show"));
    clearTimeout(window.bookSphereToastTimer);
    window.bookSphereToastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function openRandomBook() {
    const index = Math.floor(Math.random() * books.length);
    const frame = parent.frames["detailsFrame"];

    if (frame && typeof frame.loadBook === "function") {
        frame.loadBook(index);
    } else {
        window.open(`book-details.html?book=${index}`, "_self");
    }
}

function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    try {
        const otherFrame = window.parent.frames["booksFrame"] === window
            ? window.parent.frames["detailsFrame"]
            : window.parent.frames["booksFrame"];

        if (otherFrame && otherFrame.document && otherFrame.document.documentElement) {
            otherFrame.document.documentElement.dataset.theme = nextTheme;
            if (typeof otherFrame.updateThemeToggle === "function") {
                otherFrame.updateThemeToggle();
            }
        }
    } catch (error) {
        // Frames may not be available during initial page loading.
    }
}

function setTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const button = document.querySelector(".icon-btn");
    if (!button) return;
    const isDark = document.documentElement.dataset.theme === "dark";
    button.textContent = isDark ? "☀" : "☾";
    button.title = isDark ? "Switch to light theme" : "Switch to dark theme";
    button.setAttribute("aria-label", button.title);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme") || localStorage.getItem("booksphere-theme");
    setTheme(savedTheme === "light" ? "light" : "dark");
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
