// ===== Configuration =====
const ITEMS_PER_PAGE = 10;
const defaultProducts = [
    { id: "P101", name: "Smartphone", brand: "Samsung", category: "Electronics", price: 50000, stock: 25 },
    { id: "P102", name: "Laptop", brand: "Dell", category: "Computer", price: 85000, stock: 15 },
    { id: "P103", name: "Headphones", brand: "Sony", category: "Accessories", price: 12000, stock: 40 },
    { id: "P104", name: "Smart Watch", brand: "Apple", category: "Wearables", price: 39000, stock: 18 },
    { id: "P105", name: "Tablet", brand: "iPad", category: "Electronics", price: 55000, stock: 12 },
    { id: "P106", name: "Wireless Mouse", brand: "Logitech", category: "Accessories", price: 2500, stock: 85 },
    { id: "P107", name: "Mechanical Keyboard", brand: "Corsair", category: "Accessories", price: 8500, stock: 22 },
    { id: "P108", name: "24\" Monitor", brand: "LG", category: "Computer", price: 18000, stock: 8 },
    { id: "P109", name: "USB-C Cable", brand: "Belkin", category: "Accessories", price: 1200, stock: 150 },
    { id: "P110", name: "Portable SSD 1TB", brand: "Samsung", category: "Storage", price: 12000, stock: 35 },
    { id: "P111", name: "Webcam HD", brand: "Logitech", category: "Computer", price: 4500, stock: 28 },
    { id: "P112", name: "Gaming Laptop", brand: "ASUS", category: "Computer", price: 125000, stock: 5 },
    { id: "P113", name: "Wireless Charger", brand: "Apple", category: "Accessories", price: 3500, stock: 45 },
    { id: "P114", name: "Phone Case", brand: "Spigen", category: "Accessories", price: 800, stock: 200 },
    { id: "P115", name: "Screen Protector", brand: "Gorilla", category: "Accessories", price: 600, stock: 180 },
    { id: "P116", name: "USB Hub", brand: "Anker", category: "Accessories", price: 2200, stock: 62 },
    { id: "P117", name: "External Hard Drive 2TB", brand: "Seagate", category: "Storage", price: 6500, stock: 42 },
    { id: "P118", name: "Graphics Tablet", brand: "Wacom", category: "Computer", price: 18500, stock: 11 },
    { id: "P119", name: "Microphone", brand: "Blue", category: "Accessories", price: 8000, stock: 19 },
    { id: "P120", name: "Ring Light", brand: "Neewer", category: "Accessories", price: 3200, stock: 33 },
    { id: "P121", name: "Phone Stand", brand: "Lamicall", category: "Accessories", price: 1500, stock: 125 },
    { id: "P122", name: "Laptop Stand", brand: "Roost", category: "Computer", price: 4800, stock: 27 },
    { id: "P123", name: "Portable Speaker", brand: "JBL", category: "Electronics", price: 9500, stock: 56 },
    { id: "P124", name: "Action Camera", brand: "GoPro", category: "Electronics", price: 35000, stock: 10 },
    { id: "P125", name: "VR Headset", brand: "Meta", category: "Electronics", price: 45000, stock: 7 },
    { id: "P126", name: "Gaming Mouse Pad", brand: "SteelSeries", category: "Accessories", price: 3800, stock: 38 },
    { id: "P127", name: "Desk Lamp", brand: "TaoTronics", category: "Computer", price: 2800, stock: 48 }
];

// ===== Global State =====
let products = [];
let currentSortField = 'id';
let currentSortDirection = 'asc';
let currentPage = 1;
let currentDetailsIndex = -1;

// ===== Initialization =====
function initData() {
    const saved = localStorage.getItem('products_data');
    if (saved) {
        try {
            products = JSON.parse(saved);
        } catch (e) {
            products = JSON.parse(JSON.stringify(defaultProducts));
        }
    } else {
        products = JSON.parse(JSON.stringify(defaultProducts));
        saveToStorage();
    }
    populateCategories();
    renderDashboard();
}

function saveToStorage() {
    localStorage.setItem('products_data', JSON.stringify(products));
}

// ===== Theme Management =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(newTheme.charAt(0).toUpperCase() + newTheme.slice(1) + ' mode enabled', 'info');
}

function updateThemeIcon(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    const sunIcons = toggle.querySelectorAll('.sun');
    const moonIcon = toggle.querySelector('.moon');
    
    if (theme === 'light') {
        sunIcons.forEach(icon => icon.style.display = 'block');
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        sunIcons.forEach(icon => icon.style.display = 'none');
        if (moonIcon) moonIcon.style.display = 'block';
    }
}

// ===== Utility Functions =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function getStockStatus(stock) {
    if (stock === 0) return { status: 'Out of Stock', color: 'danger' };
    if (stock < 20) return { status: 'Low Stock', color: 'warning' };
    return { status: 'In Stock', color: 'success' };
}

function generateStockBadge(stock) {
    const { status, color } = getStockStatus(stock);
    let badgeClass = 'badge-success';
    if (color === 'warning') badgeClass = 'badge-warning';
    if (color === 'danger') badgeClass = 'badge-danger';
    return `<span class="badge ${badgeClass}"><span class="badge-dot"></span> ${status} · ${stock}</span>`;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Dashboard Updates =====
function renderDashboard() {
    updateStats();
    currentPage = 1;
    renderTable();
}

function updateStats() {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
    const lowStockCount = products.filter(p => p.stock < 20).length;
    const uniqueCategories = new Set(products.map(p => p.category)).size;

    document.getElementById('stat-total-products').textContent = totalProducts;
    document.getElementById('stat-total-value').textContent = formatCurrency(totalValue);
    document.getElementById('stat-low-stock').textContent = lowStockCount;
    document.getElementById('stat-categories').textContent = uniqueCategories;
}

// ===== Filtering & Sorting =====
function populateCategories() {
    const select = document.getElementById('category-filter');
    const currentValue = select.value;
    const categories = Array.from(new Set(products.map(p => p.category))).sort();
    
    select.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
    select.value = currentValue;
}

function getFilteredProducts() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    const categoryFilter = document.getElementById('category-filter').value;
    const stockFilter = document.getElementById('stock-filter').value;

    return products.filter(product => {
        const matchesSearch = 
            product.id.toLowerCase().includes(searchQuery) ||
            product.name.toLowerCase().includes(searchQuery) ||
            product.brand.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery);

        const matchesCategory = !categoryFilter || product.category === categoryFilter;

        let matchesStock = true;
        if (stockFilter === 'in-stock') matchesStock = product.stock >= 20;
        if (stockFilter === 'low-stock') matchesStock = product.stock > 0 && product.stock < 20;
        if (stockFilter === 'out-of-stock') matchesStock = product.stock === 0;

        return matchesSearch && matchesCategory && matchesStock;
    }).sort((a, b) => {
        let valA = a[currentSortField];
        let valB = b[currentSortField];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function sortTable(field) {
    if (currentSortField === field) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortField = field;
        currentSortDirection = 'asc';
    }
    currentPage = 1;
    renderTable();
}

function handleSearchFilter() {
    currentPage = 1;
    renderTable();
}

function updateSortHeaderIcons() {
    ['id', 'name', 'brand', 'category', 'price', 'stock'].forEach(field => {
        const th = document.getElementById(`th-${field}`);
        if (!th) return;
        const iconSpan = th.querySelector('.sort-icon');
        if (field === currentSortField) {
            th.classList.add('active-sort');
            iconSpan.textContent = currentSortDirection === 'asc' ? '▲' : '▼';
        } else {
            th.classList.remove('active-sort');
            iconSpan.textContent = '↕';
        }
    });
}

// ===== Pagination =====
function getPaginatedProducts() {
    const filtered = getFilteredProducts();
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    
    return {
        items: filtered.slice(start, end),
        total: filtered.length,
        totalPages: totalPages,
        currentPage: currentPage,
        start: start + 1,
        end: Math.min(end, filtered.length)
    };
}

function renderPagination(paginationData) {
    const paginationControls = document.getElementById('pagination-controls');
    const pageNumbersDiv = document.getElementById('page-numbers');
    const { total, totalPages, currentPage, start, end } = paginationData;

    if (total <= ITEMS_PER_PAGE) {
        paginationControls.style.display = 'none';
        return;
    }

    paginationControls.style.display = 'flex';
    document.getElementById('page-start').textContent = start;
    document.getElementById('page-end').textContent = end;
    document.getElementById('total-count').textContent = total;

    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;

    pageNumbersDiv.innerHTML = '';
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
        const btn = createPageBtn(1, '1');
        pageNumbersDiv.appendChild(btn);
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.padding = '0.5rem 0.25rem';
            dots.style.color = 'var(--text-muted)';
            pageNumbersDiv.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const btn = createPageBtn(i, String(i));
        if (i === currentPage) btn.classList.add('active');
        pageNumbersDiv.appendChild(btn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.padding = '0.5rem 0.25rem';
            dots.style.color = 'var(--text-muted)';
            pageNumbersDiv.appendChild(dots);
        }
        const btn = createPageBtn(totalPages, String(totalPages));
        pageNumbersDiv.appendChild(btn);
    }
}

function createPageBtn(pageNum, text) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn';
    btn.textContent = text;
    btn.onclick = () => goToPage(pageNum);
    return btn;
}

function goToPage(pageNum) {
    currentPage = pageNum;
    renderTable();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    const { totalPages } = getPaginatedProducts();
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

// ===== Table Rendering =====
function renderTable() {
    const tbody = document.getElementById('product-table-body');
    const emptyState = document.getElementById('empty-state');
    const paginationData = getPaginatedProducts();
    const filteredProducts = getFilteredProducts();

    tbody.innerHTML = '';

    if (filteredProducts.length === 0) {
        emptyState.style.display = 'block';
        document.getElementById('pagination-controls').style.display = 'none';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    paginationData.items.forEach((product) => {
        const realIndex = products.findIndex(p => p.id === product.id);
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><span class="product-id">${product.id}</span></td>
            <td><span class="product-name">${product.name}</span></td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${generateStockBadge(product.stock)}</td>
            <td class="action-cell">
                <button type="button" class="btn-icon edit" onclick="openEditModal(${realIndex}); event.stopPropagation();" title="Edit Product" aria-label="Edit Product">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>
                    </svg>
                </button>
                <button type="button" class="btn-icon delete" onclick="deleteProduct(${realIndex}); event.stopPropagation();" title="Delete Product" aria-label="Delete Product">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 6h18"/>
                        <path d="M8 6V4h8v2"/>
                        <path d="M19 6l-1 14H6L5 6"/>
                        <path d="M10 11v6"/>
                        <path d="M14 11v6"/>
                    </svg>
                </button>
            </td>
        `;
        
        tr.onclick = () => openProductDetails(realIndex);
        tbody.appendChild(tr);
    });

    updateSortHeaderIcons();
    renderPagination(paginationData);
}

// ===== Modal Operations =====
const modal = document.getElementById('product-modal');
const detailsModal = document.getElementById('details-modal');
const deleteModal = document.getElementById('delete-modal');
const resetModal = document.getElementById('reset-modal');
let deleteTargetIndex = -1;

function openAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('edit-index').value = '-1';
    document.getElementById('product-form').reset();
    document.getElementById('prod-id').readOnly = false;
    modal.showModal();
}

function openEditModal(index) {
    const product = products[index];
    if (!product) return;

    document.getElementById('modal-title').textContent = 'Edit Product';
    document.getElementById('edit-index').value = index;
    document.getElementById('prod-id').value = product.id;
    document.getElementById('prod-id').readOnly = false;
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-brand').value = product.brand;
    document.getElementById('prod-category').value = product.category;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-stock').value = product.stock;

    modal.showModal();
}

function closeModal() {
    modal.close();
}

function closeDeleteModal() {
    if (deleteModal) {
        deleteModal.close();
    }
    deleteTargetIndex = -1;
}

function closeResetModal() {
    if (resetModal) {
        resetModal.close();
    }
}

function openDeleteModal(index) {
    const product = products[index];
    if (!product || !deleteModal) return;

    deleteTargetIndex = index;
    const deleteMessage = document.getElementById('delete-message');
    if (deleteMessage) {
        deleteMessage.textContent = `Are you sure you want to delete "${product.name}" (${product.id})?`;
    }

    deleteModal.showModal();
}

function confirmDeleteProduct() {
    if (deleteTargetIndex < 0) return;

    const product = products[deleteTargetIndex];
    if (!product) {
        closeDeleteModal();
        return;
    }

    products.splice(deleteTargetIndex, 1);
    saveToStorage();
    populateCategories();
    renderDashboard();
    closeDeleteModal();
    showToast(`✓ Product "${product.name}" deleted.`, 'danger');
}

function openProductDetails(index) {
    const product = products[index];
    if (!product) return;

    currentDetailsIndex = index;
    const { status } = getStockStatus(product.stock);
    const inventoryValue = product.price * product.stock;

    document.getElementById('details-id').textContent = product.id;
    document.getElementById('details-name').textContent = product.name;
    document.getElementById('details-brand').textContent = product.brand;
    document.getElementById('details-category').textContent = product.category;
    document.getElementById('details-price').textContent = formatCurrency(product.price);
    document.getElementById('details-stock-badge').innerHTML = generateStockBadge(product.stock);
    document.getElementById('details-stock').textContent = product.stock;
    document.getElementById('details-inventory-value').textContent = formatCurrency(inventoryValue);

    detailsModal.showModal();
}

function closeDetailsModal() {
    detailsModal.close();
    currentDetailsIndex = -1;
}

function editFromDetails() {
    closeDetailsModal();
    openEditModal(currentDetailsIndex);
}

// ===== Product CRUD =====
function saveProduct(e) {
    e.preventDefault();
    const editIndex = parseInt(document.getElementById('edit-index').value, 10);
    
    const newProduct = {
        id: document.getElementById('prod-id').value.trim().toUpperCase(),
        name: document.getElementById('prod-name').value.trim(),
        brand: document.getElementById('prod-brand').value.trim(),
        category: document.getElementById('prod-category').value.trim(),
        price: parseFloat(document.getElementById('prod-price').value),
        stock: parseInt(document.getElementById('prod-stock').value, 10)
    };

    // Validation
    if (!newProduct.id || !newProduct.name || !newProduct.brand || !newProduct.category || newProduct.price < 0 || newProduct.stock < 0) {
        showToast("Please fill in all required fields with valid values.", "danger");
        return;
    }

    if (editIndex === -1) {
        // Adding new product - check for duplicate ID
        if (products.some(p => p.id === newProduct.id)) {
            showToast(`Product ID "${newProduct.id}" already exists!`, "danger");
            return;
        }
        products.push(newProduct);
        showToast(`✓ Product "${newProduct.name}" added successfully.`, "success");
    } else {
        // Editing existing product - check for duplicate ID (excluding current product)
        if (products.some((p, idx) => p.id === newProduct.id && idx !== editIndex)) {
            showToast(`Product ID "${newProduct.id}" already exists!`, "danger");
            return;
        }
        products[editIndex] = newProduct;
        showToast(`✓ Product "${newProduct.name}" updated successfully.`, "success");
    }

    saveToStorage();
    populateCategories();
    renderDashboard();
    closeModal();
}

function deleteProduct(index) {
    openDeleteModal(index);
}

function confirmResetData() {
    products = JSON.parse(JSON.stringify(defaultProducts));
    currentSortField = 'id';
    currentSortDirection = 'asc';
    currentPage = 1;
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('stock-filter').value = '';
    
    saveToStorage();
    populateCategories();
    renderDashboard();
    closeResetModal();
    showToast("✓ Inventory data restored to defaults.", "info");
}

function resetDefaults() {
    if (resetModal) {
        resetModal.showModal();
    }
}

// ===== Initialization =====
initTheme();
initData();
