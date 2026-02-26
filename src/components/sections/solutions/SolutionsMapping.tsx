'use client';

import { useEffect, useRef } from 'react';

const html = `
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&amp;family=Inter:wght@300;400;500;600&amp;family=DM+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<style>
.mp{background:#F2F5F8;padding:120px 0;position:relative;overflow:hidden}
.mp-c{max-width:1200px;margin:0 auto;padding:0 32px;position:relative;z-index:2}

/* Header */
.mp-hd{margin-bottom:64px;opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
.mp-hd.vis{opacity:1;transform:translateY(0)}
.mp-ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#47B5FF;display:flex;align-items:center;gap:12px;margin-bottom:20px}
.mp-ey::before{content:'';width:20px;height:1px;background:#47B5FF;flex-shrink:0}
.mp-hd h2{font-family:'Inter Tight',sans-serif;font-weight:900;font-size:clamp(28px,3vw,40px);text-transform:uppercase;letter-spacing:-.02em;color:#0B3C5D;margin-bottom:16px;line-height:1.08}
.mp-hd h2 em{font-style:italic;color:#47B5FF}
.mp-hd p{font-family:'Inter',sans-serif;font-size:15px;color:#5a7a96;max-width:540px;line-height:1.7}

/* Table card */
.mp-card{background:#fff;border:1px solid rgba(11,60,93,.06);box-shadow:0 1px 3px rgba(11,60,93,.04),0 12px 48px rgba(11,60,93,.06);overflow:hidden;position:relative}
.mp-card::before,.mp-card::after{content:'';position:absolute;width:20px;height:20px;pointer-events:none;z-index:3}
.mp-card::before{top:-1px;left:-1px;border-top:1px solid rgba(71,181,255,.25);border-left:1px solid rgba(71,181,255,.25)}
.mp-card::after{bottom:-1px;right:-1px;border-bottom:1px solid rgba(71,181,255,.25);border-right:1px solid rgba(71,181,255,.25)}

.mp-wrap{overflow-x:auto}

/* Table */
.mp-tbl{width:100%;border-collapse:collapse}

/* Header row */
.mp-tbl thead th{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#0B3C5D;padding:20px 24px;text-align:center;white-space:nowrap;position:relative;background:#fff;border-bottom:2px solid #0B3C5D}
.mp-tbl thead th:first-child{text-align:left;width:200px;padding-left:32px}
.mp-tbl thead th:not(:first-child)::after{content:'';position:absolute;bottom:-2px;left:50%;width:0;height:2px;background:#47B5FF;transform:translateX(-50%);transition:width .3s ease}

/* Column highlight on hover via JS class */
.mp-tbl th.col-hl::after{width:100%!important}
.mp-tbl th.col-hl{color:#47B5FF}

/* Body rows */
.mp-tbl tbody tr{transition:background .3s ease;position:relative}
.mp-tbl tbody tr::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(11,60,93,.06) 10%,rgba(11,60,93,.06) 90%,transparent)}
.mp-tbl tbody tr:last-child::after{display:none}

/* Row entrance animation */
.mp-tbl tbody tr{opacity:0;transform:translateX(-16px);transition:opacity .5s ease,transform .5s ease,background .3s ease}
.mp-tbl tbody tr.vis{opacity:1;transform:translateX(0)}

/* Row hover */
.mp-tbl tbody tr:hover{background:rgba(71,181,255,.04)}
.mp-tbl tbody tr:hover td:first-child{color:#47B5FF}

/* Cells */
.mp-tbl tbody td{padding:22px 24px;font-family:'Inter',sans-serif;font-size:13px;color:#5a7a96;vertical-align:middle;text-align:center;position:relative;transition:background .3s ease}
.mp-tbl tbody td:first-child{font-family:'Inter Tight',sans-serif;font-weight:800;font-size:14px;color:#0B3C5D;text-transform:uppercase;text-align:left;padding-left:32px;transition:color .3s ease}

/* Column highlight cells */
.mp-tbl td.col-hl{background:rgba(71,181,255,.03)}

/* Dots */
.mp-dot{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;position:relative;transition:transform .3s ease,box-shadow .3s ease}

.mp-dot-core{width:12px;height:12px;border-radius:50%;transition:transform .3s ease,box-shadow .3s ease}
.mp-dot-core.pri{background:#47B5FF;box-shadow:0 0 0 3px rgba(71,181,255,.15)}
.mp-dot-core.sec{background:rgba(11,60,93,.12)}

/* Dot animation on scroll */
.mp-dot-core{transform:scale(0)}
.mp-dot-core.pop{animation:dot-in .4s cubic-bezier(.22,1,.36,1) forwards}
@keyframes dot-in{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}

/* Dot hover */
.mp-dot:hover .mp-dot-core.pri{transform:scale(1.3)!important;box-shadow:0 0 0 6px rgba(71,181,255,.15),0 0 16px rgba(71,181,255,.1)}
.mp-dot:hover .mp-dot-core.sec{transform:scale(1.2)!important;background:rgba(11,60,93,.2)}

/* Tooltip */
.mp-tip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(4px);background:#0B3C5D;color:#F4F6F8;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;padding:6px 12px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .25s ease,transform .25s ease;z-index:10;border-radius:2px}
.mp-tip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#0B3C5D}
.mp-dot:hover .mp-tip{opacity:1;transform:translateX(-50%) translateY(0)}

/* Legend */
.mp-legend{display:flex;gap:32px;align-items:center;margin-top:28px;padding:0 32px}
.mp-leg-item{display:flex;align-items:center;gap:10px}
.mp-leg-dot{width:10px;height:10px;border-radius:50%}
.mp-leg-dot.pri{background:#47B5FF;box-shadow:0 0 0 2px rgba(71,181,255,.15)}
.mp-leg-dot.sec{background:rgba(11,60,93,.12)}
.mp-leg-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#5a7a96}

/* Bottom tagline */
.mp-tag{text-align:center;margin-top:56px;opacity:0;transform:translateY(16px);transition:opacity .8s ease,transform .8s ease}
.mp-tag.vis{opacity:1;transform:translateY(0)}
.mp-tag-txt{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#0B3C5D;opacity:.35}

@media(max-width:1024px){.mp-tbl thead th,.mp-tbl tbody td{padding:16px 14px;font-size:11px}.mp-tbl tbody td:first-child{padding-left:16px;font-size:12px}.mp-tbl thead th:first-child{padding-left:16px}}
@media(max-width:640px){.mp{padding:80px 0}.mp-c{padding:0 16px}.mp-legend{padding:0 16px;gap:20px}}
</style>

<section class="mp">
<div class="mp-c">
<div class="mp-hd" data-mp-hd>
<div class="mp-ey">Solution Mapping</div>
<h2>Which layers serve<br/><em>your</em> team?</h2>
<p>Every stakeholder benefits from different layers of our framework. Here's how our solutions map to your role.</p>
</div>

<div class="mp-card">
<div class="mp-wrap">
<table class="mp-tbl" data-mp-tbl>
<thead>
<tr>
<th data-col="0">Stakeholder</th>
<th data-col="1">Strategy</th>
<th data-col="2">Structure</th>
<th data-col="3">Intelligence</th>
<th data-col="4">Execution</th>
<th data-col="5">Project Twin</th>
<th data-col="6">Insights</th>
</tr>
</thead>
<tbody data-mp-body>
<tr data-row>
<td data-col="0">Contractors</td>
<td data-col="1"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="2"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="3"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="4"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="5"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="6"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
</tr>
<tr data-row>
<td data-col="0">Architects</td>
<td data-col="1"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="2"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="3"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="4"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="5"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="6"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
</tr>
<tr data-row>
<td data-col="0">Engineers</td>
<td data-col="1"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="2"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="3"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="4"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="5"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="6"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
</tr>
<tr data-row>
<td data-col="0">Owners</td>
<td data-col="1"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="2"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="3"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="4"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="5"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="6"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
</tr>
<tr data-row>
<td data-col="0">Government</td>
<td data-col="1"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="2"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="3"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="4"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="5"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="6"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
</tr>
<tr data-row>
<td data-col="0">Consultants</td>
<td data-col="1"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="2"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="3"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
<td data-col="4"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="5"><div class="mp-dot"><span class="mp-dot-core sec" data-dc></span><div class="mp-tip">Supporting</div></div></td>
<td data-col="6"><div class="mp-dot"><span class="mp-dot-core pri" data-dc></span><div class="mp-tip">Primary</div></div></td>
</tr>
</tbody>
</table>
</div>

<div class="mp-legend">
<div class="mp-leg-item"><div class="mp-leg-dot pri"></div><span class="mp-leg-label">Primary</span></div>
<div class="mp-leg-item"><div class="mp-leg-dot sec"></div><span class="mp-leg-label">Supporting</span></div>
</div>
</div>

<div class="mp-tag" data-mp-tag>
<div class="mp-tag-txt">Every role covered · Every layer connected</div>
</div>
</div>
</section>
`;

const script = `
(function(){
  var hd = document.querySelector('[data-mp-hd]');
  var body = document.querySelector('[data-mp-body]');
  var tag = document.querySelector('[data-mp-tag]');
  var tbl = document.querySelector('[data-mp-tbl]');
  if (!hd || !body || !tbl) return;

  // Header reveal
  var hdObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('vis'); });
  },{ threshold:.15 });
  hdObs.observe(hd);
  if (tag) hdObs.observe(tag);

  // Staggered row + dot reveal
  var started = false;
  var bodyObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting && !started) {
        started = true;
        var rows = body.querySelectorAll('[data-row]');
        rows.forEach(function(row, ri){
          setTimeout(function(){
            row.classList.add('vis');
            // Pop dots in this row with stagger
            var dots = row.querySelectorAll('[data-dc]');
            dots.forEach(function(dot, di){
              setTimeout(function(){
                dot.classList.add('pop');
              }, di * 60);
            });
          }, ri * 140);
        });
        // Tag after rows
        if (tag) {
          setTimeout(function(){ tag.classList.add('vis'); }, rows.length * 140 + 400);
        }
      }
    });
  },{ threshold:.1 });
  bodyObs.observe(body);

  // Column highlight on hover
  var allTh = tbl.querySelectorAll('thead th');
  var allTd = tbl.querySelectorAll('tbody td');

  tbl.addEventListener('mouseover', function(evt){
    var cell = evt.target.closest('td, th');
    if (!cell) return;
    var colIdx = cell.getAttribute('data-col');
    if (colIdx === null || colIdx === '0') return;

    // Highlight column
    allTh.forEach(function(th){ th.classList.remove('col-hl'); });
    allTd.forEach(function(td){ td.classList.remove('col-hl'); });

    tbl.querySelectorAll('[data-col="' + colIdx + '"]').forEach(function(el){
      el.classList.add('col-hl');
    });
  });

  tbl.addEventListener('mouseleave', function(){
    allTh.forEach(function(th){ th.classList.remove('col-hl'); });
    allTd.forEach(function(td){ td.classList.remove('col-hl'); });
  });
})();
`;

export default function SolutionsMapping() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.innerHTML = html;
    const timer = setTimeout(() => {
      try { new Function(script)(); } catch(e) { console.error(e); }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} suppressHydrationWarning />
  );
}
