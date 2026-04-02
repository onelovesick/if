"use client"
import { useEffect } from 'react'

const statementHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.stmt *, .stmt *::before, .stmt *::after { box-sizing: border-box; margin: 0; padding: 0; }

.stmt {
  --accent: #47B5FF;
  --navy:   #0B3C5D;
  --mono:   'DM Mono', monospace;

  position: relative;
  background: var(--navy);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: clamp(32px,4vw,64px);
  padding: clamp(48px,5vw,80px) clamp(40px,6%,120px);
}

/* Label */
.stmt-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Vertical divider */
.stmt-divider {
  width: 1px;
  align-self: stretch;
  min-height: 40px;
  background: rgba(71,181,255,0.25);
  flex-shrink: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.stmt.stmt-active .stmt-divider {
  transform: scaleY(1);
}

/* Statement text */
.stmt-text {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(20px,2.4vw,38px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
}

/* Each word wrapped in a span by JS */
.stmt-text .stmt-w {
  display: inline-block;
  opacity: 0.08;
  transform: translateY(4px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.stmt-text .stmt-w.stmt-lit {
  opacity: 1;
  transform: translateY(0);
}

.stmt-text .stmt-highlight .stmt-w.stmt-lit {
  color: var(--accent);
  opacity: 1;
  filter: drop-shadow(0 0 20px rgba(71,181,255,0.4));
}
.stmt-text .stmt-highlight {
  font-weight: 800;
}

/* ══ RESPONSIVE ══ */
@media (min-width: 1600px) {
  .stmt { padding: 72px 8%; }
  .stmt-text { font-size: 36px; }
  .stmt-label { font-size: 11px; }
}

@media (min-width: 2200px) {
  .stmt { padding: 88px 10%; gap: 72px; }
  .stmt-text { font-size: 42px; }
  .stmt-label { font-size: 12px; letter-spacing: 0.35em; }
}

@media (min-width: 3200px) {
  .stmt { padding: 100px 12%; gap: 80px; }
  .stmt-text { font-size: 50px; }
}

@media (max-width: 768px) {
  .stmt {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 48px 24px;
  }
  .stmt-divider {
    width: 40px;
    height: 1px;
    min-height: 0;
    align-self: auto;
    transform: scaleX(0);
    transform-origin: left;
  }
  .stmt.stmt-active .stmt-divider { transform: scaleX(1); }
  .stmt-text { font-size: 20px; }
}
</style>

<section class="stmt" id="stmtRoot" aria-label="How we work">
  <div class="stmt-label">How We Work</div>
  <div class="stmt-divider"></div>
  <div class="stmt-text" id="stmtText">Infrastructure projects don't fail from lack of tools. They fail from lack of structure. We connect every team around <span class="stmt-highlight">one source of truth.</span></div>
</section>`

const statementScript = `(function(){
  var root = document.getElementById('stmtRoot');
  var textEl = document.getElementById('stmtText');
  if(!root || !textEl) return;

  /* Wrap every word in a span while preserving the .stmt-fade wrapper */
  function wrapWords(el) {
    var children = Array.prototype.slice.call(el.childNodes);
    children.forEach(function(node) {
      if (node.nodeType === 3) {
        var words = node.textContent.split(/( +)/);
        var frag = document.createDocumentFragment();
        words.forEach(function(w) {
          if (!w) return;
          if (/^\\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else {
            var s = document.createElement('span');
            s.className = 'stmt-w';
            s.textContent = w;
            frag.appendChild(s);
            frag.appendChild(document.createTextNode(' '));
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        wrapWords(node);
      }
    });
  }
  wrapWords(textEl);

  var allWords = textEl.querySelectorAll('.stmt-w');
  var total = allWords.length;
  var activated = false;

  function onScroll() {
    var rect = root.getBoundingClientRect();
    var vh = window.innerHeight;

    /* Progress: 0 when section top hits 70% of viewport, 1 when section top hits 50% */
    var start = vh * 0.7;
    var end = vh * 0.5;
    var progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    if (progress > 0 && !activated) {
      activated = true;
      root.classList.add('stmt-active');
    }

    /* Light up words progressively */
    var wordsToShow = Math.floor(progress * total);
    for (var i = 0; i < total; i++) {
      if (i < wordsToShow) {
        allWords[i].classList.add('stmt-lit');
      }
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  onScroll();
}());`

export default function SectionStatement() {
  useEffect(() => {
    setTimeout(() => {
      try {
        new Function(statementScript)()
      } catch(e) {
        console.error('SectionStatement script error:', e)
      }
    }, 300)
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: statementHtml }}
    />
  )
}
