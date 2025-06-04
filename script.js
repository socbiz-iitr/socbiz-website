// Scroll down when clicking the arrow
document.querySelector('.arrow').addEventListener('click', () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
});

//TYPING think,build,analyse
const textParts = [
  'THINK. ',
  '<span class="green">BUILD.</span> ',
  'ANALYSE.'
];
const typingSpeed = 150; // milliseconds per character
const container = document.getElementById('typing-text');

let partIndex = 0;
let charIndex = 0;
let currentHTML = '';

function type() {
  if (partIndex >= textParts.length) {
    container.style.borderRight = 'none'; // stop cursor
    return;
  }

  let part = textParts[partIndex];

  if (!part.startsWith('<')) {
    // Plain text part - type character by character
    currentHTML += part.charAt(charIndex);
    container.innerHTML = currentHTML;
    charIndex++;
    if (charIndex >= part.length) {
      partIndex++;
      charIndex = 0;
    }
  } else {
    // Handle span part with tags

    const tagStart = part.indexOf('<');
    const tagEnd = part.indexOf('>') + 1;
    const openTag = part.substring(tagStart, tagEnd);          // e.g. <span class="green">
    const closeTag = part.substring(part.lastIndexOf('<'));    // e.g. </span>
    const innerText = part.substring(tagEnd, part.lastIndexOf('<')); // e.g. BUILD.

    if (charIndex === 0) {
      // Insert opening tag once
      currentHTML += openTag;
    }

    if (charIndex < innerText.length) {
      // Add inner text letter by letter
      currentHTML += innerText.charAt(charIndex);
      container.innerHTML = currentHTML + closeTag;
      charIndex++;
    } else {
      // After finishing inner text, add closing tag once
      currentHTML += closeTag;
      container.innerHTML = currentHTML;
      partIndex++;
      charIndex = 0;
    }
  }

  setTimeout(type, typingSpeed);
}

type();

