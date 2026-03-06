/* ============================================
   Mohamed Hashim - Data Analyst Portfolio
   script.js — Updated with Circular AI Node
   ============================================ */

/* ── 1. NAVBAR SCROLL ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── 2. MOBILE MENU ───────────────────────────────────── */
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('active');
  mobileBtn.classList.toggle('active', isOpen);
  mobileBtn.setAttribute('aria-expanded', String(isOpen));
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    mobileBtn.classList.remove('active');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

/* ── 3. SMOOTH SCROLL ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── 4. SCROLL REVEAL ANIMATION ───────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.skill-card, .project-card, .contact-card, .finding-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

/* ── 5. SKILL BAR ANIMATION ───────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.style.getPropertyValue('--fill-width') ||
                  getComputedStyle(bar).getPropertyValue('--fill-width');
        bar.style.width = w;
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

/* ── 6. PROJECT SLIDER ────────────────────────────────── */
const CIRCULAR_AI_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDEyMDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMEQxQjJBIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMEEyNTQwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzBEMUIyQSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idGVhbCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwRTdDN0IiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTRBOUE4Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJnb2xkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNCODg2MEIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRDRBMDE3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmVlbiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwQTVDNDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjJDMDZCIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJnbG93MSIgY3g9IjMwJSIgY3k9IjUwJSIgcj0iNDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzE0QTlBODtzdG9wLW9wYWNpdHk6MC4xOCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNEE5QTg7c3RvcC1vcGFjaXR5OjAiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9Imdsb3cyIiBjeD0iNzAlIiBjeT0iNTAlIiByPSI0MCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjJDMDZCO3N0b3Atb3BhY2l0eTowLjEyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzIyQzA2QjtzdG9wLW9wYWNpdHk6MCIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9ImJsdXIiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz48L2ZpbHRlcj4KICA8L2RlZnM+CgogIDwhLS0gQmFja2dyb3VuZCAtLT4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjYmcpIi8+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dsb3cxKSIvPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnbG93MikiLz4KCiAgPCEtLSBHcmlkIGxpbmVzIC0tPgogIDxnIG9wYWNpdHk9IjAuMDYiIHN0cm9rZT0iIzE0QTlBOCIgc3Ryb2tlLXdpZHRoPSIwLjUiPgogICAgPGxpbmUgeDE9IjAiIHkxPSI1MCIgeDI9IjEyMDAiIHkyPSI1MCIvPjxsaW5lIHgxPSIwIiB5MT0iMTAwIiB4Mj0iMTIwMCIgeTI9IjEwMCIvPgogICAgPGxpbmUgeDE9IjAiIHkxPSIxNTAiIHgyPSIxMjAwIiB5Mj0iMTUwIi8+PGxpbmUgeDE9IjAiIHkxPSIyMDAiIHgyPSIxMjAwIiB5Mj0iMjAwIi8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjI1MCIgeDI9IjEyMDAiIHkyPSIyNTAiLz48bGluZSB4MT0iMCIgeTE9IjMwMCIgeDI9IjEyMDAiIHkyPSIzMDAiLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMzUwIiB4Mj0iMTIwMCIgeTI9IjM1MCIvPgogICAgPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSI0MDAiLz48bGluZSB4MT0iMjAwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjQwMCIvPgogICAgPGxpbmUgeDE9IjMwMCIgeTE9IjAiIHgyPSIzMDAiIHkyPSI0MDAiLz48bGluZSB4MT0iNDAwIiB5MT0iMCIgeDI9IjQwMCIgeTI9IjQwMCIvPgogICAgPGxpbmUgeDE9IjUwMCIgeTE9IjAiIHgyPSI1MDAiIHkyPSI0MDAiLz48bGluZSB4MT0iNjAwIiB5MT0iMCIgeDI9IjYwMCIgeTI9IjQwMCIvPgogICAgPGxpbmUgeDE9IjcwMCIgeTE9IjAiIHgyPSI3MDAiIHkyPSI0MDAiLz48bGluZSB4MT0iODAwIiB5MT0iMCIgeDI9IjgwMCIgeTI9IjQwMCIvPgogICAgPGxpbmUgeDE9IjkwMCIgeTE9IjAiIHgyPSI5MDAiIHkyPSI0MDAiLz48bGluZSB4MT0iMTAwMCIgeTE9IjAiIHgyPSIxMDAwIiB5Mj0iNDAwIi8+CiAgICA8bGluZSB4MT0iMTEwMCIgeTE9IjAiIHgyPSIxMTAwIiB5Mj0iNDAwIi8+CiAgPC9nPgoKICA8IS0tIOKUgOKUgCBMRUZUOiBEYXRhIENlbnRyZSBibG9jayDilIDilIAgLS0+CiAgPHJlY3QgeD0iODAiIHk9IjE0MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSIjMEMxRTMzIiBzdHJva2U9IiMxRDVGQTgiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgPCEtLSBzZXJ2ZXIgcmFjayByb3dzIC0tPgogIDxyZWN0IHg9Ijk1IiB5PSIxNTUiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjMUQ1RkE4IiBvcGFjaXR5PSIwLjciLz4KICA8cmVjdCB4PSI5NSIgeT0iMTczIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzFENUZBOCIgb3BhY2l0eT0iMC41Ii8+CiAgPHJlY3QgeD0iOTUiIHk9IjE5MSIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IiMxRDVGQTgiIG9wYWNpdHk9IjAuNyIvPgogIDxyZWN0IHg9Ijk1IiB5PSIyMDkiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjMUQ1RkE4IiBvcGFjaXR5PSIwLjUiLz4KICA8cmVjdCB4PSI5NSIgeT0iMjI3IiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzFENUZBOCIgb3BhY2l0eT0iMC43Ii8+CiAgPCEtLSBibGlua2luZyBMRURzIC0tPgogIDxjaXJjbGUgY3g9IjEwOCIgY3k9IjE2MSIgcj0iMyIgZmlsbD0iIzIyQzA2QiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MSIgcj0iMyIgZmlsbD0iIzIyQzA2QiIgb3BhY2l0eT0iMC41Ii8+CiAgPGNpcmNsZSBjeD0iMTA4IiBjeT0iMTc5IiByPSIzIiBmaWxsPSIjMTRBOUE4Ii8+PGNpcmNsZSBjeD0iMTIwIiBjeT0iMTc5IiByPSIzIiBmaWxsPSIjMTRBOUE4IiBvcGFjaXR5PSIwLjUiLz4KICA8Y2lyY2xlIGN4PSIxMDgiIGN5PSIxOTciIHI9IjMiIGZpbGw9IiMyMkMwNkIiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSIxOTciIHI9IjMiIGZpbGw9IiMyMkMwNkIiLz4KICA8Y2lyY2xlIGN4PSIxMDgiIGN5PSIyMTUiIHI9IjMiIGZpbGw9IiMxNEE5QTgiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSIyMTUiIHI9IjMiIGZpbGw9IiMxNEE5QTgiIG9wYWNpdHk9IjAuNyIvPgogIDxjaXJjbGUgY3g9IjEwOCIgY3k9IjIzMyIgcj0iMyIgZmlsbD0iIzIyQzA2QiIgb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iMTIwIiBjeT0iMjMzIiByPSIzIiBmaWxsPSIjMjJDMDZCIi8+CiAgPHRleHQgeD0iMTYwIiB5PSIyNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3QTk2QjgiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTEiPkFJIFNlcnZlcnM8L3RleHQ+CgogIDwhLS0g4pSA4pSAIENJUkNVTEFSIExPT1AgQVJST1dTIChjZW50ZXIpIOKUgOKUgCAtLT4KICA8IS0tIE91dGVyIHJpbmcgLS0+CiAgPGNpcmNsZSBjeD0iNTIwIiBjeT0iMjAwIiByPSIxMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE0QTlBOCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI2LDQiIG9wYWNpdHk9IjAuMyIvPgogIDwhLS0gSW5uZXIgcmluZyAtLT4KICA8Y2lyY2xlIGN4PSI1MjAiIGN5PSIyMDAiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxRDVGQTgiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNCw2IiBvcGFjaXR5PSIwLjI1Ii8+CgogIDwhLS0gQ2lyY3VsYXIgYXJyb3dzIC0gdG9wIGFyYyAoaGVhdCB0byBPUkMpIC0tPgogIDxwYXRoIGQ9Ik0gNDMwIDE0NSBRIDQ1MCA4MCA1MjAgNzAgUSA1OTAgODAgNjEwIDE0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI3RlYWwpIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI2MTUsMTQ4IDYwNSwxMzIgNjIzLDEzNiIgZmlsbD0iIzE0QTlBOCIvPgoKICA8IS0tIENpcmN1bGFyIGFycm93cyAtIGJvdHRvbSBhcmMgKGNvb2wgd2F0ZXIgcmV0dXJuKSAtLT4KICA8cGF0aCBkPSJNIDYxNSAyNTUgUSA1OTAgMzIwIDUyMCAzMzAgUSA0NTAgMzIwIDQzMCAyNTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNncmVlbikiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cG9seWdvbiBwb2ludHM9IjQyNSwyNTIgNDE1LDI2OCA0MzMsMjY0IiBmaWxsPSIjMjJDMDZCIi8+CgogIDwhLS0gQ2VudGVyIGxhYmVsIC0tPgogIDxjaXJjbGUgY3g9IjUyMCIgY3k9IjIwMCIgcj0iNTUiIGZpbGw9IiMwQzFFMzMiIHN0cm9rZT0iIzE0QTlBOCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICA8dGV4dCB4PSI1MjAiIHk9IjE5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzE0QTlBOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9ImJvbGQiPkNJUkNVTEFSPC90ZXh0PgogIDx0ZXh0IHg9IjUyMCIgeT0iMjA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTRBOUE4IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iYm9sZCI+QUkgTk9ERTwvdGV4dD4KICA8dGV4dCB4PSI1MjAiIHk9IjIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzdBOTZCOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSI5Ij5aRVJPIFdBU1RFPC90ZXh0PgoKICA8IS0tIOKUgOKUgCBPUkMgVFVSQklORSAodG9wKSDilIDilIAgLS0+CiAgPHJlY3QgeD0iNDU1IiB5PSIzMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSI2MCIgcng9IjYiIGZpbGw9IiMwQzFFMzMiIHN0cm9rZT0iI0Q0QTAxNyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICA8Y2lyY2xlIGN4PSI0OTAiIGN5PSI2MCIgcj0iMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0Q0QTAxNyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICA8cGF0aCBkPSJNNDkwLDQ2IEw0OTQsNTYgTDUwNCw1MiBMNDk4LDYyIEw1MDgsNjYgTDQ5Nyw2OCBMNDkzLDc4IEw0ODksNjggTDQ3OSw3MiBMNDg0LDYyIEw0NzQsNTggTDQ4NSw1NSBaIiBmaWxsPSIjRDRBMDE3IiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSI1MzAiIHk9IjU2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRDRBMDE3IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+T1JDPC90ZXh0PgogIDx0ZXh0IHg9IjUzMCIgeT0iNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3QTk2QjgiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iOSI+VFVSQklORTwvdGV4dD4KICA8IS0tIGhlYXQgYXJyb3cgZG93biB0byBPUkMgLS0+CiAgPGxpbmUgeDE9IjQzMCIgeTE9IjE0MCIgeDI9IjQ5MCIgeTI9Ijk1IiBzdHJva2U9IiNENEEwMTciIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI0LDMiLz4KICA8dGV4dCB4PSI0NDUiIHk9IjExNSIgZmlsbD0iI0Q0QTAxNyIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSI5Ij5IRUFUIOKGkjwvdGV4dD4KCiAgPCEtLSDilIDilIAgWkxEIFBMQU5UIChib3R0b20pIOKUgOKUgCAtLT4KICA8cmVjdCB4PSI0NTUiIHk9IjMxMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSI2MCIgcng9IjYiIGZpbGw9IiMwQzFFMzMiIHN0cm9rZT0iIzIyQzA2QiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICA8Y2lyY2xlIGN4PSI1MjAiIGN5PSIzNDAiIHI9IjEyIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMkMwNkIiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgPHBhdGggZD0iTTUyMCwzMjggQzUxMCwzMzQgNTA2LDM0NCA1MTIsMzUyIEM1MTYsMzU4IDUyNCwzNTggNTI4LDM1MiBDNTM0LDM0NCA1MzAsMzM0IDUyMCwzMjhaIiBmaWxsPSIjMjJDMDZCIiBvcGFjaXR5PSIwLjciLz4KICA8dGV4dCB4PSI1NDUiIHk9IjMzNiIgZmlsbD0iIzIyQzA2QiIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiPlpMRDwvdGV4dD4KICA8dGV4dCB4PSI1NDUiIHk9IjM1MCIgZmlsbD0iIzdBOTZCOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSI5Ij5UUkVBVE1FTlQ8L3RleHQ+CgogIDwhLS0g4pSA4pSAIFJJR0hUOiBPVVRQVVRTIOKUgOKUgCAtLT4KICA8IS0tIEVsZWN0cmljaXR5IG91dHB1dCAtLT4KICA8cmVjdCB4PSI5MDAiIHk9IjYwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iIzBDMUUzMyIgc3Ryb2tlPSIjRDRBMDE3IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogIDx0ZXh0IHg9IjEwMDAiIHk9Ijg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRDRBMDE3IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiPuKaoTwvdGV4dD4KICA8dGV4dCB4PSIxMDAwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNENEEwMTciIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIj5Scy4gNy42OCBMIC8geXI8L3RleHQ+CiAgPHRleHQgeD0iMTAwMCIgeT0iMTI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjN0E5NkI4IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjkiPk9SQyBFTEVDVFJJQ0lUWSBSRVZFTlVFPC90ZXh0PgoKICA8IS0tIFdhdGVyIHNhdmluZyBvdXRwdXQgLS0+CiAgPHJlY3QgeD0iOTAwIiB5PSIxNjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjMEMxRTMzIiBzdHJva2U9IiMxNEE5QTgiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgPHRleHQgeD0iMTAwMCIgeT0iMTg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTRBOUE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiPvCfkqc8L3RleHQ+CiAgPHRleHQgeD0iMTAwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTRBOUE4IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iYm9sZCI+MzBNIEdhbCBTYXZlZCAvIHlyPC90ZXh0PgogIDx0ZXh0IHg9IjEwMDAiIHk9IjIyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzdBOTZCOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSI5Ij5aRVJPIExJUVVJRCBESVNDSEFSR0U8L3RleHQ+CgogIDwhLS0gQ08yIG91dHB1dCAtLT4KICA8cmVjdCB4PSI5MDAiIHk9IjI2MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI4MCIgcng9IjgiIGZpbGw9IiMwQzFFMzMiIHN0cm9rZT0iIzIyQzA2QiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICA8dGV4dCB4PSIxMDAwIiB5PSIyODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMyMkMwNkIiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCI+8J+MvzwvdGV4dD4KICA8dGV4dCB4PSIxMDAwIiB5PSIzMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMyMkMwNkIiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIj4yODMgVG9ubmVzIENP4oKCIC8geXI8L3RleHQ+CiAgPHRleHQgeD0iMTAwMCIgeT0iMzI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjN0E5NkI4IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjkiPkNBUkJPTiBPRkZTRVQ8L3RleHQ+CgogIDwhLS0gQ29ubmVjdGluZyBsaW5lcyBmcm9tIGNlbnRlciB0byBvdXRwdXRzIC0tPgogIDxsaW5lIHgxPSI2NTAiIHkxPSIxNzAiIHgyPSI4OTUiIHkyPSIxMDAiIHN0cm9rZT0iI0Q0QTAxNyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDMiIG9wYWNpdHk9IjAuNiIvPgogIDxsaW5lIHgxPSI2NTAiIHkxPSIyMDAiIHgyPSI4OTUiIHkyPSIyMDAiIHN0cm9rZT0iIzE0QTlBOCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDMiIG9wYWNpdHk9IjAuNiIvPgogIDxsaW5lIHgxPSI2NTAiIHkxPSIyMzAiIHgyPSI4OTUiIHkyPSIzMDAiIHN0cm9rZT0iIzIyQzA2QiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDMiIG9wYWNpdHk9IjAuNiIvPgoKICA8IS0tIExpbmVzIGZyb20gc2VydmVyIHRvIGxvb3AgLS0+CiAgPGxpbmUgeDE9IjI0MCIgeTE9IjIwMCIgeDI9IjM4NSIgeTI9IjIwMCIgc3Ryb2tlPSIjMUQ1RkE4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWRhc2hhcnJheT0iNSwzIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIzODUsMTk1IDM5OCwyMDAgMzg1LDIwNSIgZmlsbD0iIzE0QTlBOCIvPgoKICA8IS0tIOKUgOKUgCBUT1AgVElUTEUg4pSA4pSAIC0tPgogIDx0ZXh0IHg9IjUyMCIgeT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNFOEVFRjciIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iMiI+Q0lSQ1VMQVIgQUkgRU5FUkdZICZhbXA7IFdBVEVSIFBMQU5UPC90ZXh0PgoKICA8IS0tIOKUgOKUgCBCT1RUT00gS1BJIFNUUklQIOKUgOKUgCAtLT4KICA8cmVjdCB4PSI2MCIgeT0iMzY4IiB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIyNiIgcng9IjQiIGZpbGw9IiMwQzFFMzMiIHN0cm9rZT0iIzFENUZBOCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzdBOTZCOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+Q0FQRVg6IFJzLjEwNi40NiBDcjwvdGV4dD4KICA8dGV4dCB4PSI0MDAiIHk9IjM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzIyQzA2QiIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+T1BFWCBTQVZJTkc6IOKIkjY3JTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0Q0QTAxNyIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+UEFZQkFDSzogNS40IFlSUzwvdGV4dD4KICA8dGV4dCB4PSI4MDAiIHk9IjM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzE0QTlBOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+MTUtWVIgTlBWOiBScy41MS43NyBDcjwvdGV4dD4KICA8dGV4dCB4PSIxMDAwIiB5PSIzODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMyMkMwNkIiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiPkNPTU1VTklUWTogUnMuMjEuOTcgTC95cjwvdGV4dD4KPC9zdmc+Cg==';

const slides = [
  {
    title: 'Web Scraping & Data Analysis Pipeline',
    description: 'End-to-end automated pipeline that scrapes, cleans and visualises web data using Python, Excel & Power BI. 500+ data points across 3 interactive dashboards.',
    image: 'assets/images/dataimage.png',
    badge: 'Web Scraping & Analysis',
    tags: ['Python', 'Excel', 'Power BI'],
    stats: ['500+ Data Points', '3 Dashboards', '100% Automated'],
    color: 'hsl(172,66%,50%)',
    highlight: false
  },
  {
    title: 'HR Analytics Dashboard',
    description: '60-employee synthetic dataset with KPI cards, department bar charts, attendance scatter plots, performance pie charts and top-performer rankings.',
    image: 'assets/images/imagedata.png',
    badge: 'HR Analytics',
    tags: ['Python', 'Excel', 'Power BI'],
    stats: ['60+ Records', '6 Charts', '4 KPI Cards'],
    color: 'hsl(262,83%,68%)',
    highlight: false
  },
  {
    title: 'VisoryBI — Offline BI Platform',
    description: 'Privacy-first offline BI platform with 18+ dashboard templates, 15+ chart types, cross-filter analysis and 100% local data processing.',
    image: 'assets/images/visorybi-logo.png',
    badge: 'Business Intelligence',
    tags: ['React', 'IndexedDB', 'Chart.js'],
    stats: ['1000+ Rows', '15+ Chart Types', '18+ Templates', '100% Offline'],
    color: 'hsl(262,83%,68%)',
    highlight: false
  },
  {
    title: 'Circular AI Node — Data Centre Analysis',
    description: 'Full investment proposal to Google Inc. — Circular AI data centre eliminating water waste, capturing heat as electricity via ORC turbine, delivering Rs. 21.97 L/yr in community returns.',
    image: CIRCULAR_AI_IMG,
    badge: 'Google Proposal · Infrastructure Analysis',
    tags: ['Excel Model', 'Power BI', 'Investment Report', 'Market Research'],
    stats: ['Rs. 51.77 Cr NPV', '5.4-yr Payback', '-67% OPEX', '283t CO2/yr'],
    color: '#14A9A8',
    highlight: true
  }
];

let currentSlide = 0;
let autoTimer    = null;

function buildSlideHTML(s) {
  const imgStyle = s.highlight
    ? 'style="object-fit:contain;background:#0D1B2A;padding:10px;border-radius:8px;"'
    : '';

  const viewBtn = s.highlight
    ? '<div style="margin-top:1rem">' +
        '<a href="#projects" class="slide-cta-btn" ' +
        'onmouseover="this.style.background='rgba(20,169,168,0.28)'" ' +
        'onmouseout="this.style.background='rgba(20,169,168,0.12)'">' +
        'View Full Project &darr;' +
        '</a>' +
      '</div>'
    : '';

  const tagsHTML  = s.tags.map(t =>
    '<span class="slide-tag" style="border-color:' + s.color + ';color:' + s.color + '">' + t + '</span>'
  ).join('');

  const statsHTML = s.stats.map(st =>
    '<div class="slide-stat">' + st + '</div>'
  ).join('');

  return (
    '<div class="slide' + (s.highlight ? ' slide--highlight' : '') + '">' +
      (s.highlight ? '<div class="slide-glow"></div>' : '') +
      '<div class="featured-badge">' + s.badge + '</div>' +
      '<img src="' + s.image + '" alt="' + s.title + '" ' + imgStyle +
        ' onerror="this.style.display='none'" />' +
      '<div class="slide-content">' +
        '<h3 style="color:' + s.color + '">' + s.title + '</h3>' +
        '<p>' + s.description + '</p>' +
        '<div class="slide-tags">' + tagsHTML + '</div>' +
        '<div class="slide-stats">' + statsHTML + '</div>' +
        viewBtn +
      '</div>' +
    '</div>'
  );
}

function buildDotsHTML() {
  return slides.map((_, i) => {
    const active = i === currentSlide;
    const activeStyle = active
      ? 'background:#14A9A8;border-color:#14A9A8;width:24px'
      : '';
    return '<button class="slider-dot' + (active ? ' active' : '') + '"' +
           ' onclick="goToSlide(' + i + ')"' +
           ' aria-label="Slide ' + (i + 1) + '"' +
           (activeStyle ? ' style="' + activeStyle + '"' : '') +
           '></button>';
  }).join('');
}

function renderSlider() {
  const container     = document.getElementById('project-slider');
  const dotsContainer = document.getElementById('sliderDots');
  if (!container || !dotsContainer) return;
  container.innerHTML     = buildSlideHTML(slides[currentSlide]);
  dotsContainer.innerHTML = buildDotsHTML();
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  renderSlider();
  resetAutoPlay();
}

function goToSlide(idx) {
  currentSlide = idx;
  renderSlider();
  resetAutoPlay();
}

function resetAutoPlay() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => changeSlide(1), 5000);
}

/* ── 7. KEYBOARD NAVIGATION ──────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

/* ── 8. TOUCH SWIPE SUPPORT ──────────────────────────── */
let touchStartX = 0;
document.addEventListener('DOMContentLoaded', () => {
  const sliderEl = document.getElementById('project-slider');
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    sliderEl.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
    }, { passive: true });
  }
});

/* ── 9. INIT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSlider();
  resetAutoPlay();
});
