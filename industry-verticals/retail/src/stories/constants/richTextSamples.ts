export const RICH_MARKUP_INNER_HTML = `
  <h1>Main Title (H1)</h1>
  <p>This is a sample paragraph introducing the content.</p>

  <h2>Section Title (H2)</h2>
  <p>Some descriptive text for this section.</p>

  <h3>Subsection (H3)</h3>
  <p>More details go here.</p>

  <h4>Sub-subsection (H4)</h4>
  <p>Supporting information.</p>

  <h5>Minor Heading (H5)</h5>
  <p>Additional notes.</p>

  <h6>Smallest Heading (H6)</h6>
  <p>Fine print or footnote-level info.</p>

  <h2>Unordered List</h2>
  <ul>
    <li>Item one</li>
    <li>
      Item two
      <ul>
        <li>Nested item A</li>
        <li>Nested item B</li>
      </ul>
    </li>
    <li>Item three</li>
  </ul>

  <h2>Ordered List</h2>
  <ol>
    <li>Step one</li>
    <li>
      Step two
      <ol>
        <li>Sub-step 2.1</li>
        <li>Sub-step 2.2</li>
      </ol>
    </li>
    <li>Step three</li>
  </ol>

  <p>
    This is the first paragraph where I use <strong>bold text</strong> to highlight an important idea.
    Sometimes, a word looks better in <em>italics</em> when you want to stress tone or style.
    If you’d like to learn more about typography basics, you can visit
    <a href="https://www.smashingmagazine.com" target="_blank" rel="noopener noreferrer">this resource</a>.
  </p>

  <p>
    In the second paragraph, I’ll show how emphasis changes the meaning when read aloud.
    Mixing <strong>strong statements</strong> with <em>gentle hints</em> can create balance in your writing.
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">Links</a>
    are also handy to direct readers to official HTML docs.
  </p>

  <p>
    Finally, the third paragraph demonstrates all styles working together. For example, you can
    <strong><em>bold and italicize</em></strong> at the same time for extra weight,
    or place <em>emphasis</em> where the context requires attention.
    Combining these thoughtfully helps create content that is clear and engaging.
  </p>
`.trim();
