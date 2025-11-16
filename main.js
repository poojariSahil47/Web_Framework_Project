// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // header controls
  const notifBtn = document.getElementById('notifBtn');
  const newBtn = document.getElementById('newBtn');
  const profileBtn = document.getElementById('profileBtn');

  // modals and menus
  const notifModal = document.getElementById('notifModal');
  const closeNotif = document.getElementById('closeNotif');
  const createModal = document.getElementById('createModal');
  const closeCreate = document.getElementById('closeCreate');
  const createForm = document.getElementById('createForm');
  const profileMenu = document.getElementById('profileMenu');
  const logoutBtn = document.getElementById('logoutBtn');

  // Sidebar open/close for mobile
  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    body.classList.add('no-scroll');
    menuBtn.setAttribute('aria-expanded', 'true');
    sidebar.querySelector('a, button')?.focus();
  }
  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    body.classList.remove('no-scroll');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeSidebar();
    else openSidebar();
  });
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // theme toggle
  let dark = false;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      dark = !dark;
      if (dark) document.documentElement.setAttribute('data-theme', 'light');
      else document.documentElement.removeAttribute('data-theme','dark');
    });
  }

  // resize handler
  function handleResize() {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.add('hidden');
      body.classList.remove('no-scroll');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      if (!sidebar.classList.contains('-translate-x-full')) {
        // keep it visible if user opened
      } else {
        sidebar.classList.add('-translate-x-full');
      }
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // Header buttons: Notifications
  function openNotif() { notifModal.classList.remove('hidden'); notifModal.classList.add('flex'); }
  function closeNotifModal() { notifModal.classList.add('hidden'); notifModal.classList.remove('flex'); }
  notifBtn?.addEventListener('click', openNotif);
  closeNotif?.addEventListener('click', closeNotifModal);
  notifModal?.addEventListener('click', (e) => { if (e.target === notifModal) closeNotifModal(); });

  // Create / New
  function openCreate() { createModal.classList.remove('hidden'); createModal.classList.add('flex'); }
  function closeCreateModal() { createModal.classList.add('hidden'); createModal.classList.remove('flex'); }
  newBtn?.addEventListener('click', openCreate);
  closeCreate?.addEventListener('click', closeCreateModal);
  createModal?.addEventListener('click', (e) => { if (e.target === createModal) closeCreateModal(); });

  createForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // placeholder action — you can send to API or create local entry
    alert('Created! (placeholder)');
    createForm.reset();
    closeCreateModal();
  });

  // Profile menu toggle
  profileBtn?.addEventListener('click', (e) => {
    const shown = !profileMenu.classList.contains('hidden');
    if (shown) profileMenu.classList.add('hidden');
    else profileMenu.classList.remove('hidden');
    e.stopPropagation();
  });

  // close profile menu when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!profileMenu) return;
    if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
      profileMenu.classList.add('hidden');
    }
  });
// Ensure profile menu is appended to body to avoid clipping by sidebar/header
if (profileMenu && !document.body.contains(profileMenu)) {
  document.body.appendChild(profileMenu);
  // add safe fixed positioning so it appears near top-right
  profileMenu.style.position = 'fixed';
  profileMenu.style.top = '56px';   // adjust if header height differs
  profileMenu.style.right = '12px';
  profileMenu.style.zIndex = '80';
  profileMenu.style.width = '220px';
}
// close sidebar when any sidebar link is clicked (good UX on mobile)
const sidebarLinks = document.querySelectorAll('#sidebar a[href]');
sidebarLinks.forEach(a => {
  a.addEventListener('click', () => {
    // small delay so navigation starts, then close UI
    setTimeout(() => {
      // reuse closeSidebar if available
      if (typeof closeSidebar === 'function') closeSidebar();
      else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        body.classList.remove('no-scroll');
      }
    }, 80);
  });
});

  // Logout action placeholder
  logoutBtn?.addEventListener('click', () => {
    alert('You clicked logout (placeholder).');
  });

});
