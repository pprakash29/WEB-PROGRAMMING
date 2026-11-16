
const fileInput = document.getElementById("xmlFile");
const dropZone = document.getElementById("dropZone");
const tableBody = document.getElementById("employeeData");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const statusFilter = document.getElementById("statusFilter");
const typeFilter = document.getElementById("typeFilter");
const sortFilter = document.getElementById("sortFilter");
const clearButton = document.getElementById("clearButton");
const fileStatus = document.getElementById("fileStatus");
const resultStatus = document.getElementById("resultStatus");
const employees = [];
let sortKey = "id";
let sortDirection = "asc";
sortFilter.value = "id";

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) readXmlFile(file);
});

["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.add("is-dragging");
    });
});

["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.remove("is-dragging");
    });
});

dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files[0];
    if (file) readXmlFile(file);
});

searchInput.addEventListener("input", render);
[departmentFilter, statusFilter, typeFilter, sortFilter].forEach((control) => {
    control.addEventListener("change", () => {
        if (control === sortFilter) {
            sortKey = sortFilter.value;
            sortDirection = sortKey === "salary" ? "desc" : "asc";
        }
        render();
    });
});

document.querySelectorAll(".sort-button").forEach((button) => {
    button.addEventListener("click", () => {
        const newKey = button.dataset.sort;
        sortDirection = sortKey === newKey && sortDirection === "asc" ? "desc" : "asc";
        sortKey = newKey;
        render();
    });
});
clearButton.addEventListener("click", () => {
    employees.length = 0;
    fileInput.value = "";
    searchInput.value = "";
    departmentFilter.innerHTML = '<option value="all">All departments</option>';
    statusFilter.innerHTML = '<option value="all">All statuses</option>';
    typeFilter.innerHTML = '<option value="all">All types</option>';
    sortFilter.value = "id";
    sortKey = "id";
    sortDirection = "asc";
    setControlsEnabled(false);
    fileStatus.textContent = "No file selected yet.";
    render();
});

function readXmlFile(file) {
    if (!file.name.toLowerCase().endsWith(".xml")) {
        fileStatus.textContent = "Please choose a valid .xml file.";
        fileStatus.className = "status error";
        return;
    }

    const reader = new FileReader();
    reader.onload = () => parseXml(reader.result);
    reader.onerror = () => {
        fileStatus.textContent = "The file could not be read. Please try again.";
        fileStatus.className = "status error";
    };
    reader.readAsText(file);
}

// Parse only the selected XML file; employee data is never hardcoded.
function parseXml(xmlText) {
    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
    if (xmlDoc.querySelector("parsererror")) {
        fileStatus.textContent = "Invalid XML. Please check the file and try again.";
        fileStatus.className = "status error";
        return;
    }

    const parsedEmployees = [...xmlDoc.getElementsByTagName("employee")].map((employee) => ({
        id: Number.parseInt(getValue(employee, "id"), 10) || 0,
        name: getValue(employee, "name"),
        title: getValue(employee, "title") || "Team member",
        department: getValue(employee, "department"),
        email: getValue(employee, "email") || "Not provided",
        phone: getValue(employee, "phone") || "Not provided",
        location: getValue(employee, "location") || "Not provided",
        joiningDate: getValue(employee, "joiningDate") || "Not provided",
        type: getValue(employee, "employmentType") || "Full-time",
        status: getValue(employee, "employmentStatus") || "Active",
        manager: getValue(employee, "manager") || "Not assigned",
        salary: Number.parseFloat(getValue(employee, "salary")) || 0
    })).filter((employee) => employee.name);

    if (parsedEmployees.length === 0) {
        fileStatus.textContent = "No employee records found in this XML file.";
        fileStatus.className = "status error";
        return;
    }

    employees.splice(0, employees.length, ...parsedEmployees);
    sortKey = "id";
    sortDirection = "asc";
    sortFilter.value = "id";
    fileStatus.textContent = "";
    fileStatus.className = "status";
    setControlsEnabled(true);
    updateDepartmentOptions();
    render();
}

function getValue(employee, tagName) {
    return employee.getElementsByTagName(tagName)[0]?.textContent.trim() || "";
}

function setControlsEnabled(enabled) {
    searchInput.disabled = !enabled;
    departmentFilter.disabled = !enabled;
    statusFilter.disabled = !enabled;
    typeFilter.disabled = !enabled;
    clearButton.disabled = !enabled;
}

function updateDepartmentOptions() {
    const departments = [...new Set(employees.map((employee) => employee.department).filter(Boolean))].sort();
    const statuses = [...new Set(employees.map((employee) => employee.status).filter(Boolean))].sort();
    const types = [...new Set(employees.map((employee) => employee.type).filter(Boolean))].sort();
    departmentFilter.innerHTML = '<option value="all">All departments</option>';
    statusFilter.innerHTML = '<option value="all">All statuses</option>';
    typeFilter.innerHTML = '<option value="all">All types</option>';
    departments.forEach((department) => {
        addFilterOption(departmentFilter, department);
    });
    statuses.forEach((status) => {
        addFilterOption(statusFilter, status);
    });
    types.forEach((type) => {
        addFilterOption(typeFilter, type);
    });
}

function addFilterOption(select, value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
}

function render() {
    const query = searchInput.value.toLowerCase().trim();
    const department = departmentFilter.value;
    const status = statusFilter.value;
    const type = typeFilter.value;
    const visibleEmployees = employees.filter((employee) => {
        const matchesQuery = [employee.id, employee.name, employee.email, employee.title]
            .some((value) => String(value).toLowerCase().includes(query));
        return matchesQuery
            && (department === "all" || employee.department === department)
            && (status === "all" || employee.status === status)
            && (type === "all" || employee.type === type);
    }).sort((first, second) => {
        const firstValue = first[sortKey];
        const secondValue = second[sortKey];
        const comparison = typeof firstValue === "number"
            ? firstValue - secondValue
            : firstValue.localeCompare(secondValue);
        return sortDirection === "asc" ? comparison : -comparison;
    });

    tableBody.innerHTML = "";
    if (visibleEmployees.length === 0) {
        tableBody.appendChild(document.getElementById("emptyTemplate").content.cloneNode(true));
    } else {
        visibleEmployees.forEach((employee) => {
            const row = document.createElement("tr");
            row.tabIndex = 0;
            row.setAttribute("aria-label", `View details for ${employee.name}`);
            row.appendChild(createEmployeeCell(employee));
            [employee.id, employee.title]
                .forEach((value) => {
                    const cell = document.createElement("td");
                    cell.textContent = value;
                    row.appendChild(cell);
                });
            const departmentCell = document.createElement("td");
            departmentCell.appendChild(createDepartmentBadge(employee.department));
            row.appendChild(departmentCell);
            [employee.email, employee.location].forEach((value) => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            const statusCell = document.createElement("td");
            statusCell.appendChild(createStatusBadge(employee.status));
            row.appendChild(statusCell);
            const actionCell = document.createElement("td");
            const actionButton = document.createElement("button");
            actionButton.className = "details-button";
            actionButton.type = "button";
            actionButton.textContent = "View details";
            actionButton.addEventListener("click", (event) => {
                event.stopPropagation();
                showDetails(employee);
            });
            actionCell.appendChild(actionButton);
            row.appendChild(actionCell);
            row.addEventListener("click", () => showDetails(employee));
            row.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") showDetails(employee);
            });
            tableBody.appendChild(row);
        });
    }

    resultStatus.textContent = employees.length
        ? `Showing ${visibleEmployees.length} of ${employees.length} employees`
        : "Employee records will appear here after XML upload.";
    document.getElementById("totalEmployees").textContent = employees.length || "—";
    const departmentCount = new Set(employees.map((employee) => employee.department).filter(Boolean)).size;
    document.getElementById("totalDepartments").textContent = employees.length
        ? departmentCount
        : "—";
    const average = employees.length
        ? employees.reduce((sum, employee) => sum + employee.salary, 0) / employees.length
        : 0;
    document.getElementById("averageSalary").textContent = employees.length ? formatSalary(average) : "—";
    const highest = employees.length
        ? Math.max(...employees.map((employee) => employee.salary))
        : 0;
    document.getElementById("highestSalary").textContent = employees.length ? formatSalary(highest) : "—";
    document.getElementById("directoryCount").textContent = `${employees.length} employee${employees.length === 1 ? "" : "s"}`;
    document.getElementById("directoryTotal").textContent = employees.length;
    document.getElementById("directoryActive").textContent = employees.filter((employee) => employee.status.toLowerCase() === "active").length;
    document.getElementById("directoryLeave").textContent = employees.filter((employee) => employee.status.toLowerCase() === "on leave").length;
    document.getElementById("directoryDepartments").textContent = departmentCount;
    document.querySelectorAll(".sort-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.sort === sortKey);
        button.querySelector("span").textContent = button.dataset.sort === sortKey
            ? (sortDirection === "asc" ? "↑" : "↓")
            : "↕";
    });
}

function createEmployeeCell(employee) {
    const cell = document.createElement("td");
    cell.className = "employee-cell";
    const avatar = document.createElement("span");
    avatar.className = "profile-avatar";
    avatar.textContent = getInitials(employee.name);
    const details = document.createElement("span");
    details.className = "employee-cell-details";
    const name = document.createElement("strong");
    name.textContent = employee.name;
    const title = document.createElement("small");
    title.textContent = employee.title;
    details.append(name, title);
    cell.append(avatar, details);
    return cell;
}

function createStatusBadge(status) {
    const badge = document.createElement("span");
    badge.className = `status-badge ${status.toLowerCase().replace(/\s+/g, "-")}`;
    badge.textContent = status;
    return badge;
}

function createDepartmentBadge(department) {
    const badge = document.createElement("span");
    const departmentClass = department.toLowerCase().replace(/\s+/g, "-");
    badge.className = `department-badge ${departmentClass}`;
    badge.textContent = department;
    return badge;
}

function getInitials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

function formatSalary(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}

function showDetails(employee) {
    document.getElementById("dialogAvatar").textContent = getInitials(employee.name);
    document.getElementById("dialogName").textContent = employee.name;
    document.getElementById("dialogTitle").textContent = employee.title;
    document.getElementById("dialogTitleDetail").textContent = employee.title;
    document.getElementById("dialogId").textContent = `Employee ID · ${employee.id}`;
    document.getElementById("dialogDepartment").textContent = employee.department;
    document.getElementById("dialogEmail").textContent = employee.email;
    document.getElementById("dialogPhone").textContent = employee.phone;
    document.getElementById("dialogLocation").textContent = employee.location;
    document.getElementById("dialogJoiningDate").textContent = employee.joiningDate;
    document.getElementById("dialogType").textContent = employee.type;
    document.getElementById("dialogStatus").textContent = employee.status;
    document.getElementById("dialogStatus").className = `status-badge ${employee.status.toLowerCase().replace(/\s+/g, "-")}`;
    document.getElementById("dialogSalary").textContent = formatSalary(employee.salary);
    document.getElementById("dialogManager").textContent = employee.manager;
    document.getElementById("employeeDialog").showModal();
}

// Load the default XML through Live Server when the dashboard opens.
async function loadDefaultXml() {
    try {
        const response = await fetch("employee.xml", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const xmlText = await response.text();
        parseXml(xmlText);
    } catch (error) {
        fileStatus.textContent = "Could not load employee.xml automatically. Use the upload area to select it.";
        fileStatus.className = "status error";
        console.error("Automatic employee XML loading failed:", error);
    }
}

document.getElementById("closeDialog").addEventListener("click", () => {
    document.getElementById("employeeDialog").close();
});

render();
loadDefaultXml();
