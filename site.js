(() => {
  const tools = document.querySelector('.publication-tools');
  const search = document.querySelector('#publication-search');
  const papers = [...document.querySelectorAll('.publication')];
  const years = [...document.querySelectorAll('.publication-year')];
  const empty = document.querySelector('#publication-empty');
  const status = document.querySelector('#publication-status');

  function filterPublications() {
    const query = search.value.trim().toLocaleLowerCase('en-GB');
    let count = 0;
    for (const paper of papers) {
      const matchesQuery = paper.textContent.toLocaleLowerCase('en-GB').includes(query);
      paper.hidden = !matchesQuery;
      if (!paper.hidden) count += 1;
    }
    for (const year of years) year.hidden = !year.querySelector('.publication:not([hidden])');
    empty.hidden = count !== 0;
    status.textContent = `${count} publication${count === 1 ? '' : 's'} shown.`;
  }

  search.addEventListener('input', filterPublications);
  tools.hidden = false;
  filterPublications();

  const navLinks = [...document.querySelectorAll('.main-nav a')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const section = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target;
      let link = navLinks.find(item => item.hash === `#${section.id}`);
      const relatedSection = {news: '#research', funding: '#research', background: '#about'};
      if (!link) link = navLinks.find(item => item.hash === relatedSection[section.id]);
      navLinks.forEach(item => item.removeAttribute('aria-current'));
      if (link) link.setAttribute('aria-current', 'location');
    }, {rootMargin: '-90px 0px -60% 0px', threshold: 0});
    document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));
  }
})();
