/**
 * Original, self-made illustrations (black / white / grey / orange only).
 * They are used for DEMO content so the interface looks complete without hosted photos.
 * To use real photographs: put files in /public/eventsphere/ and set `image` to their path
 * (the real backend `image` field is used automatically when present).
 */
const K = '#000', W = '#fff', G = '#5d5d5d', O = '#f66e02';
const rng = (seed) => { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };
export const toUri = (svg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
const wrap = (w, h, body, bg = K) => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='xMidYMid slice'><rect width='${w}' height='${h}' fill='${bg}'/>${body}</svg>`;

function audience(r, w, y0, rows, color, scale = 1) {
  let out = '';
  for (let row = 0; row < rows; row++) {
    const y = y0 + row * 70 * scale, size = (26 + row * 7) * scale, step = size * 1.7;
    for (let x = -((row % 2) * step) / 2; x < w + step; x += step) {
      const jitter = (r() - 0.5) * 10, h = size * (1.5 + r() * 0.3);
      out += `<g fill='${color}'><circle cx='${x + jitter}' cy='${y - h * 0.62}' r='${size * 0.42}'/><path d='M${x - size * 0.8 + jitter} ${y + size} q0 -${size * 1.6} ${size * 0.8} -${size * 1.6} t${size * 0.8} ${size * 1.6}z'/></g>`;
    }
  }
  return out;
}

const beams = (cx, topY, spread, bottomY, color, op) =>
  `<defs><linearGradient id='b${cx}' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${color}' stop-opacity='${op}'/><stop offset='1' stop-color='${color}' stop-opacity='0'/></linearGradient></defs><path d='M${cx - 14} ${topY} L${cx - spread} ${bottomY} L${cx + spread} ${bottomY} L${cx + 14} ${topY}z' fill='url(#b${cx})'/>`;

/** Wide hero: stage, glowing screen, light beams, audience silhouettes. */
export function heroArt() {
  const r = rng(7), w = 2000, h = 1200;
  let b = '';
  // floor perspective
  for (let i = 0; i <= 14; i++) b += `<path d='M${1000 + (i - 7) * 40} 640 L${1000 + (i - 7) * 330} ${h}' stroke='${G}' stroke-opacity='.35' stroke-width='1.5'/>`;
  for (let i = 0; i < 7; i++) b += `<path d='M0 ${660 + i * i * 14} H${w}' stroke='${G}' stroke-opacity='.3' stroke-width='1.5'/>`;
  // truss + beams
  b += `<rect x='260' y='90' width='1480' height='14' fill='${G}'/>`;
  [[520, O, .7], [820, W, .35], [1180, W, .35], [1480, O, .7]].forEach(([x, c, o]) => { b += beams(x, 104, 190, 700, c, o); b += `<circle cx='${x}' cy='104' r='16' fill='${c}'/>`; });
  // big screen
  b += `<rect x='560' y='250' width='880' height='360' fill='${K}' stroke='${W}' stroke-opacity='.5' stroke-width='3'/>`;
  b += `<rect x='580' y='270' width='840' height='320' fill='${O}'/>`;
  b += `<circle cx='1000' cy='430' r='120' fill='none' stroke='${K}' stroke-width='14'/><ellipse cx='1000' cy='430' rx='120' ry='42' fill='none' stroke='${K}' stroke-width='10'/><ellipse cx='1000' cy='430' rx='42' ry='120' fill='none' stroke='${K}' stroke-width='10'/>`;
  b += `<rect x='620' y='540' width='260' height='14' fill='${K}' opacity='.6'/><rect x='620' y='312' width='190' height='14' fill='${K}' opacity='.6'/>`;
  // stage
  b += `<rect x='380' y='640' width='1240' height='46' fill='${W}' opacity='.9'/><rect x='380' y='686' width='1240' height='26' fill='${G}'/>`;
  b += `<g fill='${W}'><circle cx='1180' cy='575' r='20'/><rect x='1160' y='598' width='40' height='42' rx='10'/></g>`;
  // audience (dark, layered)
  b += audience(r, w, 900, 1, '#1a1a1a', 1.2) + audience(r, w, 1000, 1, '#0d0d0d', 1.6) + audience(r, w, 1120, 1, '#000', 2.2);
  return toUri(wrap(w, h, b));
}

const W2 = 1400, H2 = 875;
const GEN = {
  stage: (s) => { const r = rng(s); let b = beams(420, 0, 260, 600, O, .75) + beams(980, 0, 260, 600, W, .4);
    b += `<rect x='430' y='250' width='540' height='230' fill='${W}'/><rect x='450' y='270' width='500' height='190' fill='${O}'/><text x='700' y='390' text-anchor='middle' font-family='Inter,Arial' font-weight='900' font-size='110' fill='${K}'>2027</text>`;
    b += `<rect x='300' y='520' width='800' height='30' fill='${G}'/>` + audience(r, W2, 700, 2, '#161616', 1.1) + audience(r, W2, 820, 1, K, 1.6); return wrap(W2, H2, b); },
  skyline: (s) => { const r = rng(s); let b = `<circle cx='1060' cy='250' r='150' fill='${O}'/>`;
    for (let i = 0; i < 16; i++) { const w = 70 + r() * 60, h = 200 + r() * 420, x = i * 90 - 20, y = H2 - h; b += `<rect x='${x}' y='${y}' width='${w}' height='${h}' fill='${i % 3 ? '#161616' : G}'/>`;
      for (let wy = y + 20; wy < H2 - 20; wy += 34) for (let wx = x + 12; wx < x + w - 14; wx += 22) if (r() > 0.55) b += `<rect x='${wx}' y='${wy}' width='10' height='14' fill='${r() > .85 ? O : W}' opacity='.75'/>`; }
    return wrap(W2, H2, b); },
  booths: (s) => { const r = rng(s); let b = '';
    for (let row = 0; row < 3; row++) for (let c = 0; c < 6; c++) { const x = 90 + c * 215 + row * 40, y = 120 + row * 230, accent = r() > .72;
      b += `<g><rect x='${x}' y='${y + 60}' width='170' height='110' fill='${accent ? O : W}'/><rect x='${x}' y='${y}' width='170' height='60' fill='${accent ? W : G}'/><rect x='${x + 14}' y='${y + 82}' width='60' height='10' fill='${K}' opacity='.7'/><rect x='${x + 14}' y='${y + 102}' width='100' height='10' fill='${K}' opacity='.4'/></g>`; }
    return wrap(W2, H2, b); },
  pulse: () => { let b = `<g fill='none' stroke='${G}' stroke-opacity='.4'>` + [160, 260, 360, 460].map((rad) => `<circle cx='700' cy='437' r='${rad}'/>`).join('') + '</g>';
    b += `<path d='M0 437 H420 l40 -40 l50 120 l70 -300 l70 420 l50 -200 l40 0 H1400' fill='none' stroke='${O}' stroke-width='10' stroke-linejoin='round'/>`;
    b += `<rect x='655' y='150' width='90' height='260' fill='${W}'/><rect x='570' y='235' width='260' height='90' fill='${W}'/><circle cx='700' cy='437' r='16' fill='${O}'/>`; return wrap(W2, H2, b); },
  learn: () => { let b = `<path d='M700 250 L240 330 V700 L700 620z' fill='${W}'/><path d='M700 250 L1160 330 V700 L700 620z' fill='${G}'/><path d='M700 250 V620' stroke='${K}' stroke-width='8'/>`;
    for (let i = 0; i < 6; i++) b += `<rect x='290' y='${380 + i * 40}' width='${300 - (i % 3) * 40}' height='10' fill='${K}' opacity='.45'/>`;
    b += `<circle cx='1060' cy='210' r='70' fill='${O}'/><path d='M130 150 q180 -90 360 0' fill='none' stroke='${O}' stroke-width='8'/>`; return wrap(W2, H2, b); },
  network: (s) => { const r = rng(s), pts = Array.from({ length: 22 }, () => [90 + r() * 1220, 90 + r() * 700]); let b = '';
    pts.forEach((p, i) => pts.slice(i + 1).forEach((q) => { const d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < 300) b += `<line x1='${p[0]}' y1='${p[1]}' x2='${q[0]}' y2='${q[1]}' stroke='${W}' stroke-opacity='.35' stroke-width='2'/>`; }));
    pts.forEach((p, i) => { b += `<circle cx='${p[0]}' cy='${p[1]}' r='${i % 5 === 0 ? 26 : 13}' fill='${i % 5 === 0 ? O : W}'/>`; }); return wrap(W2, H2, b); },
  shapes: (s) => { const r = rng(s); let b = '';
    for (let i = 0; i < 9; i++) { const x = r() * W2, y = r() * H2, sz = 90 + r() * 200, c = [O, W, G][i % 3];
      b += i % 2 ? `<circle cx='${x}' cy='${y}' r='${sz / 2}' fill='${c}' opacity='.9'/>` : `<rect x='${x}' y='${y}' width='${sz}' height='${sz}' fill='${c}' opacity='.9' transform='rotate(${r() * 40} ${x} ${y})'/>`; }
    b += `<circle cx='700' cy='437' r='190' fill='none' stroke='${W}' stroke-width='6'/>`; return wrap(W2, H2, b); },
  pitch: () => { let b = beams(700, 0, 320, 760, O, .8) + `<ellipse cx='700' cy='770' rx='260' ry='34' fill='${O}' opacity='.55'/>`;
    b += `<path d='M610 770 L630 470 H770 L790 770z' fill='${W}'/><rect x='600' y='455' width='200' height='22' fill='${G}'/><circle cx='700' cy='330' r='46' fill='${W}'/><path d='M640 455 q0 -90 60 -90 t60 90z' fill='${W}'/>`;
    b += `<text x='700' y='640' text-anchor='middle' font-family='Inter,Arial' font-weight='900' font-size='58' fill='${K}'>PITCH</text>`; return wrap(W2, H2, b); },
};
export const eventArt = (kind, seed = 1) => toUri(GEN[kind](seed));
export const smallArt = () => toUri(GEN.network(11));
