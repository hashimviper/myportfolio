/**
 * portfolio-data.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop this file in the same folder as index.html, then add:
 *   <script src="portfolio-data.js"></script>
 * right before the closing </body> tag in index.html.
 *
 * It reads the data saved by admin.html (localStorage key: portfolioAdminData_v2)
 * and dynamically updates the live portfolio page to match — projects, skills,
 * hero text, and contact info — all without touching your HTML source.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  const KEY = 'portfolioAdminData_v2';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
  }

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function extractYtId(url) {
    if (!url) return null;
    const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function badgeClass(type) {
    return { web: 'badge-primary', bi: 'badge-accent', infra: 'badge-teal', hr: 'badge-accent', custom: 'badge-teal', ds: 'badge-accent' }[type] || 'badge-primary';
  }

  function techTagClass(i) {
    return i % 2 === 0 ? 'tech-primary' : 'tech-accent';
  }

  /* ── DOC LINK ── */
  function docLinkHTML(d) {
    const cls = { word: 'doc-link--word', excel: 'doc-link--excel', dash: 'doc-link--dash', pdf: 'doc-link--word' }[d.type] || 'doc-link--word';
    const isExternal = d.url && (d.url.startsWith('http') || d.url.endsWith('.html'));
    return `<a href="${esc(d.url)}"${isExternal ? ' target="_blank"' : ' download'} class="doc-link ${cls}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      ${esc(d.label)}
    </a>`;
  }

  /* ── TECH TAG ── */
  function techTagHTML(tool, idx) {
    const cls = techTagClass(idx);
    return `<div class="tech-tag ${cls}">
      <svg class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      <span>${esc(tool)}</span>
    </div>`;
  }

  /* ── SINGLE PROJECT CARD ── */
  function buildProjectCard(proj) {
    const bc = badgeClass(proj.badgeType);
    const featuredClass = proj.featured ? ' project-card--featured' : '';

    // Image
    let imgHTML;
    if (proj.imgUrl) {
      imgHTML = `<img src="${esc(proj.imgUrl)}" alt="${esc(proj.title)}" class="project-image"/>`;
    } else {
      imgHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#0D1B2A;color:#4A6580;font-size:1rem">${esc(proj.title.charAt(0))}</div>`;
    }

    // Badges row
    const badgesHTML = `
      <div class="project-badges">
        ${proj.featured ? '<span class="project-badge badge-primary">Featured Project</span>' : ''}
        <span class="project-badge ${bc}">${esc(proj.badgeLabel || proj.badgeType)}</span>
      </div>`;

    // Tools
    const toolsHTML = (proj.tools || []).map((t, i) => techTagHTML(t, i)).join('');

    // Features
    const featuresHTML = (proj.features || []).filter(f => f).map(f =>
      `<div class="feature-item"><span class="feature-bullet">•</span><span>${esc(f)}</span></div>`
    ).join('');

    // Stats
    const statsHTML = (proj.stats || []).map(s =>
      `<div class="stat-item"><span class="stat-value gradient-text">${esc(s.val)}</span><span class="stat-label">${esc(s.label)}</span></div>`
    ).join('');

    // Workflow
    const wfHTML = (proj.workflow || []).map((s, i, arr) =>
      `<span class="workflow-step">${esc(s)}</span>${i < arr.length - 1 ? '<span class="workflow-arrow">→</span>' : ''}`
    ).join('');

    // Docs
    const docsHTML = (proj.docs || []).filter(d => d.label).map(d => docLinkHTML(d)).join('');

    // YouTube
    const ytId = extractYtId(proj.ytUrl || '');
    const ytHTML = ytId ? `
      <div style="margin-top:1.5rem">
        <h4 class="workflow-title" style="margin-bottom:0.875rem">Demo Video</h4>
        <div style="border-radius:0.75rem;overflow:hidden;aspect-ratio:16/9;background:#000">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}"
            title="Project Demo" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen style="display:block;border:none"></iframe>
        </div>
      </div>` : '';

    return `
    <div class="project-card${featuredClass}" data-project-id="${esc(proj.id)}">
      <div class="project-image-wrapper">
        ${imgHTML}
        <div class="project-image-overlay"></div>
        ${badgesHTML}
      </div>
      <div class="project-content">
        <h3 class="project-title">${esc(proj.title)}</h3>
        <p class="project-description">${esc(proj.desc)}</p>

        ${toolsHTML ? `<div class="tech-stack">${toolsHTML}</div>` : ''}
        ${featuresHTML ? `<div class="project-features">${featuresHTML}</div>` : ''}
        ${statsHTML ? `<div class="project-stats">${statsHTML}</div>` : ''}

        ${wfHTML ? `
        <div class="project-workflow">
          <h4 class="workflow-title">Project Workflow</h4>
          <div class="workflow-steps">${wfHTML}</div>
        </div>` : ''}

        ${docsHTML ? `
        <div class="project-docs" style="margin-bottom:2rem">
          <h4 class="docs-title" style="font-size:0.8rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:0.875rem">Project Deliverables</h4>
          <div class="docs-links">${docsHTML}</div>
        </div>` : ''}

        ${ytHTML}
      </div>
    </div>`;
  }

  /* ── SLIDE ITEM FOR BANNER ── */
  function buildSlideItem(proj, idx) {
    const colorMap = {
      web: '#29d9b8', bi: '#a78bfa', infra: '#14A9A8', hr: '#a78bfa', custom: '#22C06B', ds: '#a78bfa'
    };
    const col = colorMap[proj.badgeType] || '#29d9b8';
    const tools = (proj.tools || []).slice(0, 3);
    const stats = (proj.stats || []).slice(0, 3);
    const activeClass = idx === 0 ? ' active' : '';
    const ytId = extractYtId(proj.ytUrl || '');

    return `
    <div class="slide-item${activeClass}" data-slide="${idx}">
      <div class="slide-badge" style="background:${col};color:#0a1628">${esc(proj.badgeLabel || proj.badgeType)}</div>
      <div class="slide-img-col">
        ${proj.imgUrl
          ? `<img src="${esc(proj.imgUrl)}" alt="${esc(proj.title)}" class="slide-img" onerror="this.style.display='none'"/>`
          : `<div class="slide-img" style="background:#0D1B2A;display:flex;align-items:center;justify-content:center;color:#4A6580;font-size:2rem">${esc(proj.title.charAt(0))}</div>`}
      </div>
      <div class="slide-body">
        <h3 class="slide-title" style="color:${col}">${esc(proj.title)}</h3>
        <p class="slide-desc">${esc(proj.desc ? proj.desc.substring(0, 140) + (proj.desc.length > 140 ? '…' : '') : '')}</p>
        <div class="slide-tags">
          ${tools.map(t => `<span class="slide-tag" style="color:${col};border-color:${col}">${esc(t)}</span>`).join('')}
        </div>
        <div class="slide-stats">
          ${stats.map(s => `<span class="slide-stat">${esc(s.val)} ${esc(s.label)}</span>`).join('')}
        </div>
        ${ytId ? `<a href="#projects" class="slide-cta-btn" style="margin-top:0.5rem">▶ Watch Demo</a>` : ''}
        <a href="#projects" class="slide-cta-btn">View Full Project ↓</a>
      </div>
    </div>`;
  }

  /* ══════════════════════════════════════════════════
     INJECT INTO PORTFOLIO PAGE
  ══════════════════════════════════════════════════ */
  function injectAll(data) {
    /* ── 1. HERO ── */
    if (data.hero) {
      const h = data.hero;
      const nameEl = document.querySelector('.hero-title');
      if (nameEl && h.name) {
        nameEl.innerHTML = `Hi, I'm <span class="gradient-text">${esc(h.name)}</span>`;
      }
      const subtitleEl = document.querySelector('.hero-subtitle');
      if (subtitleEl && h.subtitle) subtitleEl.textContent = h.subtitle;

      const badgeEl = document.querySelector('.hero-badge span:last-child');
      if (badgeEl && h.badge) badgeEl.textContent = h.badge;

      const educItems = document.querySelectorAll('.education-item span:last-child');
      if (educItems[0] && h.education) educItems[0].textContent = h.education;
      if (educItems[1] && h.cgpa) educItems[1].textContent = 'CGPA: ' + h.cgpa;

      if (h.certs) {
        const certsList = document.querySelector('.certs-list');
        if (certsList) {
          certsList.innerHTML = h.certs.split(',').map(c => `<span class="cert-tag">${esc(c.trim())}</span>`).join('');
        }
      }
    }

    /* ── 2. CONTACT ── */
    if (data.contact) {
      const c = data.contact;
      const emailA = document.querySelector('a[href*="mailto"], a[href*="email-protection"]');
      if (emailA && c.email) { emailA.href = 'mailto:' + c.email; }
      const emailVal = document.querySelector('.contact-card .contact-value');
      if (emailVal && c.email && emailVal.textContent.includes('@')) emailVal.textContent = c.email;

      document.querySelectorAll('.contact-card').forEach(card => {
        const title = card.querySelector('.contact-title');
        const val = card.querySelector('.contact-value');
        if (!title || !val) return;
        if (title.textContent === 'Email') {
          card.href = 'mailto:' + c.email;
          val.textContent = c.email;
        } else if (title.textContent === 'Phone') {
          card.href = 'tel:' + c.phone.replace(/\s/g, '');
          val.textContent = c.phone;
        } else if (title.textContent === 'LinkedIn' && c.linkedin) {
          card.href = c.linkedin;
        } else if (title.textContent === 'GitHub' && c.github) {
          card.href = c.github;
        }
      });

      const resumeBtn = document.querySelector('.resume-section a');
      if (resumeBtn && c.resume) resumeBtn.href = c.resume;
    }

    /* ── 3. SKILLS ── */
    if (data.skills && data.skills.length) {
      const grid = document.querySelector('.skills-grid');
      if (grid) {
        grid.innerHTML = data.skills.map(s => `
          <div class="skill-card">
            <div class="skill-icon-wrapper">
              <svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 class="skill-name">${esc(s.name)}</h3>
            <p class="skill-description">${esc(s.desc)}</p>
            <div class="skill-bar"><div class="skill-bar-fill" style="--fill-width:${s.pct || 80}%"></div></div>
            <span class="skill-level">${esc(s.level)}</span>
          </div>`).join('');
      }
    }

    /* ── 4. PROJECTS SECTION ── */
    if (data.projects && data.projects.length) {
      const section = document.querySelector('#projects .container');
      if (section) {
        // Remove old project cards (keep header and footer)
        const oldCards = section.querySelectorAll('.project-card');
        oldCards.forEach(c => c.remove());

        const footer = section.querySelector('.projects-footer');
        const newCardsHTML = data.projects.map(p => buildProjectCard(p)).join('');
        if (footer) {
          footer.insertAdjacentHTML('beforebegin', newCardsHTML);
        } else {
          section.insertAdjacentHTML('beforeend', newCardsHTML);
        }
      }

      /* ── 5. BANNER SLIDER ── */
      const sliderOuter = document.querySelector('.slider-outer');
      if (sliderOuter) {
        sliderOuter.innerHTML = data.projects.map((p, i) => buildSlideItem(p, i)).join('');

        // Rebuild dots
        const dotsContainer = document.getElementById('sliderDots');
        if (dotsContainer) {
          dotsContainer.innerHTML = data.projects.map((_, i) =>
            `<button class="slider-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></button>`
          ).join('');
        }

        // Re-init slider if function exists
        if (typeof initSlider === 'function') {
          clearInterval(window._sliderTimer);
          initSlider();
        }
      }
    }
  }

  /* ── RUN AFTER DOM READY ── */
  function run() {
    const data = load();
    if (data) injectAll(data);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
