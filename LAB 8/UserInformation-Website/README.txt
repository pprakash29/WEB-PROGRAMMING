# User Information Form

## Files
- `index.html`: form page
- `style.css`: shared page styling
- `form.js`: validates and stores form data
- `display.html`: results page
- `display.js`: reads and displays saved data

## Features
- Live form validation with completion progress
- Automatic local draft recovery if the form is left unfinished
- Profile summary actions: edit and delete
- All data remains in browser `localStorage`

## Run
1. Keep all files in the same folder.
2. Open `index.html` in a browser, or open the folder in VS Code and use Live Server.
3. Fill in the form and click Submit Details.

The example uses browser `localStorage`, not a server or database. Do not use it to store sensitive personal information on a shared/public computer. Drafts are stored under a separate local key so an unfinished form can be recovered.
