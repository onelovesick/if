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

/* Each character is a span, no transition needed since we set opacity directly */
.stmt-text .stmt-c {
  opacity: 0.08;
  transition: none;
}

/* Highlight characters get accent color when lit */
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

  var isHighlight = [];

  /* Wrap every character in a span, preserving the highlight wrapper */
  function wrapChars(el, inHighlight) {
    var children = Array.prototype.slice.call(el.childNodes);
    children.forEach(function(node) {
      if (node.nodeType === 3) {
        var text = node.textContent;
        var frag = document.createDocumentFragment();
        for (var i = 0; i < text.length; i++) {
          var s = document.createElement('span');
          s.className = 'stmt-c';
          s.textContent = text[i];
          frag.appendChild(s);
          isHighlight.push(!!inHighlight);
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        wrapChars(node, inHighlight || node.classList.contains('stmt-highlight'));
      }
    });
  }
  wrapChars(textEl, false);

  var allChars = textEl.querySelectorAll('.stmt-c');
  var total = allChars.length;

  function onScroll() {
    var rect = root.getBoundingClientRect();
    var vh = window.innerHeight;

    /* Start when section center hits 75% of viewport, end when it hits 35% */
    var sectionCenter = rect.top + rect.height * 0.5;
    var start = vh * 0.8;
    var end = vh * 0.25;
    var progress = (start - sectionCenter) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    if (progress > 0) {
      root.classList.add('stmt-active');
    } else {
      root.classList.remove('stmt-active');
    }

    /* How many chars to fully reveal */
    var revealed = progress * total;

    for (var i = 0; i < total; i++) {
      /* Each char fades individually over a ~3 char softness range */
      var charProgress = (revealed - i) / 3;
      charProgress = Math.max(0, Math.min(1, charProgress));

      var opacity = 0.08 + charProgress * 0.92;

      if (isHighlight[i] && charProgress >= 1) {
        allChars[i].style.opacity = '1';
        allChars[i].style.color = '#47B5FF';
        allChars[i].style.filter = 'drop-shadow(0 0 18px rgba(71,181,255,0.35))';
      } else {
        allChars[i].style.opacity = opacity;
        allChars[i].style.color = '';
        allChars[i].style.filter = '';
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
