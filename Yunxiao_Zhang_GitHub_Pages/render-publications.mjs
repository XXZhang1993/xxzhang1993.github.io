import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const publications = JSON.parse(await readFile(path.join(root, 'content/publications.json'), 'utf8'));
const htmlPath = path.join(root, 'index.html');
const html = await readFile(htmlPath, 'utf8');
const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const link = (url, label) => `<a href="${escape(url)}">${escape(label)} <span aria-hidden="true">↗</span></a>`;

for (const paper of publications) {
  if (!paper.title || !paper.authors?.length || !paper.year || !paper.url || !paper.venue) throw new Error('A publication is missing a required field.');
  for (const url of [paper.url, paper.arxiv, paper.pdf, paper.dataset].filter(Boolean)) {
    if (new URL(url).protocol !== 'https:') throw new Error('Publication links must use HTTPS.');
  }
}
const years = [...new Set(publications.map(paper => paper.year))].sort((a, b) => b - a);
const rendered = years.map(year => {
  const papers = publications.filter(paper => paper.year === year).map(paper => {
    const authors = paper.authors.map(author => {
      const name = author === 'Yunxiao Zhang' ? `<strong>${escape(author)}</strong>` : escape(author);
      return name + (paper.equalContribution?.includes(author) ? '<sup aria-label="equal contribution">*</sup>' : '');
    }).join(', ');
    const links = [link(paper.url, paper.preprint ? 'Preprint' : 'Paper')];
    if (paper.arxiv && paper.arxiv !== paper.url) links.push(link(paper.arxiv, 'arXiv'));
    if (paper.pdf) links.push(link(paper.pdf, 'PDF'));
    if (paper.dataset) links.push(link(paper.dataset, 'ADD-C dataset'));
    const details = [paper.volume ? `vol. ${paper.volume}` : '', paper.issue ? `no. ${paper.issue}` : '', paper.pages ? `pp. ${paper.pages}` : '', paper.article ? `article ${paper.article}` : ''].filter(Boolean).join(', ');
    return `            <article class="publication" data-topics="${escape(paper.topics.join(' '))}">
              <h4><a href="${escape(paper.url)}">${escape(paper.title)}</a>${paper.preprint ? ' <span class="preprint-label">Preprint</span>' : ''}</h4>
              <p>${authors}</p>
              <p class="venue"><em>${escape(paper.venue)}</em>${details ? `, ${escape(details)}` : ''}, ${year}.${paper.reviewStatus ? ` ${escape(paper.reviewStatus)}.` : ''}</p>
${paper.equalContribution?.length ? '              <p class="contribution-note">* Equal contribution.</p>\n' : ''}\
              <div class="publication-links">${links.join('')}</div>
            </article>`;
  }).join('\n');
  return `          <div class="publication-year" aria-labelledby="year-${year}">
            <h3 id="year-${year}">${year}</h3>
            <div class="year-papers">
${papers}
            </div>
          </div>`;
}).join('\n');
const start = '<!-- PUBLICATIONS_START -->';
const end = '<!-- PUBLICATIONS_END -->';
if (!html.includes(start) || !html.includes(end)) throw new Error('Publication markers are missing.');
const output = html.slice(0, html.indexOf(start) + start.length) + '\n' + rendered + '\n          ' + html.slice(html.indexOf(end));
await writeFile(htmlPath, output);
console.log(`Rendered ${publications.length} publications across ${years.length} years.`);
