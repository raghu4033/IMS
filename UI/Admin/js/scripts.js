function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    sidebar.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const isClickInsideUserInfo = document.querySelector('.user-info').contains(event.target);
    const isClickInsideSidebar = document.querySelector('.dashboard-sidebar').contains(event.target);
    const toggleSidebarButton = document.querySelector('.toggle-sidebar').contains(event.target);

    if (!isClickInsideUserInfo) {
        document.querySelector('.dropdown-menu').style.display = 'none';
    }

    if (!isClickInsideSidebar && !toggleSidebarButton && window.innerWidth <= 768) {
        document.querySelector('.dashboard-sidebar').classList.remove('active');
    }
});
