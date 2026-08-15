# Product Inventory Dashboard

A professional, modern, and fully functional inventory management web application built with vanilla HTML, CSS, and JavaScript. Manage products with ease, track inventory values, and monitor stock levels in real-time.

## ✨ Features

- **📊 Real-Time Dashboard Statistics**
  - Total product count
  - Total inventory value (Price × Stock)
  - Low stock alerts (< 20 units)
  - Unique product categories

- **🔍 Advanced Search & Filtering**
  - Search by Product ID, Name, Brand, or Category (real-time)
  - Filter by category (dynamically populated)
  - Filter by stock level: All / In Stock / Low Stock / Out of Stock

- **↕️ Smart Sorting**
  - Sort by any column: ID, Name, Brand, Category, Price, Stock
  - Toggle between ascending and descending order
  - Visual indicators for active sort column

- **📦 Product Management**
  - Add new products with validation
  - Edit all product details including ID
  - Delete products with confirmation dialog
  - View comprehensive product details in a modal

- **📄 Pagination**
  - Auto-pagination for large product lists (10 items per page)
  - Page navigation with smart button generation
  - Showing X–Y of Z products counter

- **💾 Data Persistence**
  - LocalStorage integration for automatic data saving
  - Survives browser refresh and session restart
  - Reset to default 27 sample products anytime

- **🎨 Modern UI/UX**
  - Dark theme with gradient accents
  - Smooth animations and transitions
  - Responsive design (Desktop, Tablet, Mobile)
  - Professional toast notifications
  - Clean, accessible modals

- **📱 Fully Responsive**
  - Desktop optimized layout
  - Tablet-friendly interface
  - Mobile-first design with compact views

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling, CSS variables, media queries
- **JavaScript (Vanilla)** - No frameworks or dependencies
- **LocalStorage API** - Client-side data persistence
- **Responsive Design** - Mobile-first approach

## 🚀 How to Run

### Option 1: Direct File Access
1. Download or clone the project
2. Open `index.html` in your web browser
3. Start managing products!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### Option 3: Live Server (VS Code)
1. Install the "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
product-inventory-dashboard/
├── index.html                 # Main HTML file
├── css/
│   └── style.css             # All CSS styling
├── js/
│   └── script.js             # All JavaScript logic
├── assets/
│   └── images/               # Images (if any)
├── README.md                 # Project documentation
└── .gitignore               # Git ignore rules
```

## 📖 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Main application page with HTML structure, modals, and dialogs |
| `css/style.css` | Complete styling with dark theme, animations, and responsive design |
| `js/script.js` | All application logic: CRUD operations, filtering, sorting, pagination |
| `README.md` | This documentation file |
| `.gitignore` | Files to exclude from version control |

## 🎯 Key Features Explained

### Search & Filter
- Real-time search across all product fields
- Category filter auto-populated from existing products
- Stock level filter with 4 options (All, In Stock, Low Stock, Out of Stock)
- All filters work together seamlessly

### Sorting
- Click any column header to sort
- First click: Ascending (▲)
- Second click: Descending (▼)
- Active sort column highlighted with arrow indicator

### Product Details
- Click any row to view complete product information
- Shows inventory value calculation (Price × Stock)
- Quick edit option from details modal

### Pagination
- Automatically appears when products exceed 10 per page
- Smart page button generation
- Previous/Next navigation
- Direct page number jumping

### Stock Status
- **In Stock**: 20+ units (Green badge)
- **Low Stock**: 1-19 units (Yellow badge)
- **Out of Stock**: 0 units (Red badge)

### Data Storage
- All changes automatically saved to LocalStorage
- Data persists across browser sessions
- Reset to default data available anytime

## ✅ Testing Checklist

All features have been tested and verified:
- ✅ Search functionality (ID, Name, Brand, Category)
- ✅ Category filter (dynamic population)
- ✅ Stock level filter (4 options)
- ✅ Sorting (all 6 columns, bi-directional)
- ✅ Add product (validation, duplicate prevention)
- ✅ Edit product (including Product ID)
- ✅ Delete product (confirmation dialog)
- ✅ Product details modal (complete info display)
- ✅ Dashboard statistics (real-time updates)
- ✅ Pagination (smart navigation)
- ✅ Reset data (restore defaults)
- ✅ LocalStorage persistence (survives refresh)
- ✅ Toast notifications (success/error/info)
- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ No console errors (clean code)

## 🎨 Design Features

### Dark Theme
- Professional dark navy background (#0f172a)
- Subtle gradient accents
- High contrast text for readability
- Glassmorphism effect on cards

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Text**: Slate (#f8fafc, #94a3b8)

### Typography
- Font: Plus Jakarta Sans (Google Fonts)
- Weights: 400, 500, 600, 700, 800
- Professional and modern appearance

## 📊 Sample Data

The dashboard includes 27 pre-loaded products across 6 categories:
- **Electronics**: Smartphone, Tablet, Portable Speaker, Action Camera, VR Headset
- **Computer**: Laptop, Monitor, Gaming Laptop, Webcam, Graphics Tablet, Laptop Stand, Desk Lamp
- **Accessories**: Headphones, Wireless Mouse, Mechanical Keyboard, USB Cable, Wireless Charger, Phone Case, Screen Protector, USB Hub, Microphone, Ring Light, Phone Stand, Gaming Mouse Pad
- **Wearables**: Smart Watch
- **Storage**: Portable SSD, External Hard Drive

All sample data can be reset anytime via the Reset button.

## 🔒 Security & Best Practices

- No sensitive data stored (only local product inventory)
- Client-side data validation
- No API calls or external dependencies
- Input sanitization for product IDs
- Confirmation dialogs for destructive operations
- Clean, readable, and maintainable code

## 🚀 Future Improvements

- [ ] Export to CSV/PDF functionality
- [ ] Product images with image upload
- [ ] Multi-user support with authentication
- [ ] Real backend API integration
- [ ] Advanced analytics and reporting
- [ ] Barcode/QR code scanning
- [ ] Mobile app version
- [ ] Dark/Light theme toggle
- [ ] Multilingual support
- [ ] Data backup and restore functionality

## 🤝 Contributing

This is a personal project. Feel free to fork, modify, and use as needed for your own purposes.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a professional inventory management solution.

## 📞 Support

For issues or questions, please refer to the code comments or review the functionality in the browser's developer console (F12).

---

**Last Updated**: August 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
