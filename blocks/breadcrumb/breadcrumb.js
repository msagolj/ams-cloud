export default async function decorate(block) {
  const [enablePageTitle, showHidden, hideCurrent] = [...block.children].map(
    (row) => row.textContent.trim() === 'true',
  );

  block.textContent = '';

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const paths = window.location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
  const links = paths.map((segment, i) => {
    const href = `/${paths.slice(0, i + 1).join('/')}`;
    const name = segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return i < paths.length - 1
      ? `<a href="${href}">${name}</a>`
      : `<span>${hideCurrent ? '' : name}</span>`;
  });

  if (showHidden || enablePageTitle) {
    // placeholder for additional nav items
  }

  nav.innerHTML = `<div class="breadcrumb-links">
    <a href="/">Home</a>
    ${links.map((l) => `<span class="separator">/</span>${l}`).join('')}
  </div>`;

  block.append(nav);
}
