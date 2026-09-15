# 📚 BookSphere - Book Information Website

A modern and interactive **college lab assignment** built using HTML, CSS and JavaScript.

## 🎯 Assignment

**Design a web site for book information using frames. The home page should contain two parts:**
- Left part: books list
- Right part: information about the selected book

This project uses a classic HTML `<frameset>` layout to satisfy the frames requirement.

## ✨ Features

- 10 books with detailed information
- Two-frame layout
- Search by title or author with one-click clear
- Category filtering and sorting by title, rating or publication year
- Favorites-only shelf view
- Random book / Surprise Me button
- Interactive reading progress
- Favorite button
- Dark/light theme
- Reading status badges and completion tracking
- Keyboard-accessible book cards
- Responsive styling inside each frame
- LocalStorage for saving theme, favorites and reading progress
- Separate HTML, CSS and JavaScript files
- Curated local book cover artwork — no external image dependency

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript
- LocalStorage
- JPG, PNG and JPEG cover images

## 📁 Project Structure

```text
book-information-website/
├── index.html
├── books.html
├── book-details.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── The_Wings_of_fire.jpeg
    ├── The Hobbit.jpg
    ├── sapiens.png
    └── ... (book cover artwork)
```

## ▶️ How to Run

1. Download or clone this repository.
2. Keep all files and the `images` folder in the same structure.
3. Open `index.html` in a web browser.
4. Click a book in the left frame to view its information on the right.

For the best result, use a browser such as Chrome, Edge or Firefox.

## 🚀 GitHub Commands

```bash
git init
git add .
git commit -m "Create BookSphere book information website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 🎓 Viva Points

### Why frames?
The assignment specifically asks for a two-part frames layout. The `<frameset>` element divides the browser window into independent frames.

### Why JavaScript?
JavaScript makes the site interactive by handling:
- book selection
- searching
- category filtering
- favorites
- reading progress
- random book selection
- theme switching

### Why LocalStorage?
LocalStorage keeps user preferences and reading progress saved in the browser even after refreshing the page.

## ⚠️ Note

`<frameset>` is a legacy HTML feature and is not recommended for modern production websites. It is used here intentionally because it is required by the college laboratory assignment.
