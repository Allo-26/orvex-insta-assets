// Reel «L'Ara china la testa e chiede i grattini sulla nuca» (storytelling), montato come al Mac: ogni cosa inventata per la sua frase.
// Parola della voce → cosa si vede:
//   «Abbassa la testa e gonfia il collo»  C1: la ripresa lo mostra già; su «gonfia» la camera si gonfia con lei (spinta 1,07 → 1,11)
//   «Che cosa vuole?»                     il fumetto del pensiero coi tre puntini che saltano, in alto a sinistra; su «vuole?» i puntini diventano un «?»
//   «mi fissa»                            C2 (ara sul trespolo che guarda in camera): colpo di camera secco su «fissa»
//   «china il capo e arruffa le piume»    la ripresa china il capo; sulla nuca sei linee sottili senape che spuntano sdraiate e su «nuca» si drizzano a ventaglio
//   «In natura è il compagno…»            C3 (due are, una liscia la nuca dell'altra): un cuore grande e trasparente si disegna intorno alle due teste (idea di Allo)
//   «dove il becco non arriva»            la camera stringe sulle due teste
//   «Ora lo chiede a me»                  C4 (la mano gratta la nuca): schermo stretto, bande rosa-arancio ai lati, l'ara e la mano in mezzo
//   «Gratto piano, seguendo le piume»     su «Gratto» le bande si aprono e lo schermo torna intero; su «seguendo» la camera accompagna piano
//   «Occhi socchiusi»                     taglio veloce su C3 (l'ara lisciata chiude gli occhi) e lo schermo socchiude le palpebre: due bande navy dall'alto e dal basso
//   «va bene così»                        le palpebre si riaprono su C5 (primo piano, occhio socchiuso), che continua sotto il velo e l'invito fissi
const { scrivi, T, C, BASE } = require('./kit/pagina');

const f3 = (n) => +(+n).toFixed(3);
const fr = (t) => T.giu4(Math.round(t * 30) / 30); // inizio sul fotogramma, per difetto a 4 decimali
const batt = (t, max = 0.15) => { const b = T.battito(t, max); return f3(b === null ? t : b); };
const sc = (k) => f3(BASE * k);
const ROSA = '#F4D2BF';
const OMBRA = 'filter: drop-shadow(0 0 4px rgba(18,38,60,.9)) drop-shadow(0 8px 18px rgba(10,20,32,.55));';

let html = '', css = '', js = '';

// ---- tagli: sulle pause della voce, sul battito ----
const c1 = fr(3.014);   // pausa 2,56-3,13 dopo «vuole?»
const c2 = fr(7.193);   // pausa 7,18-7,64 dopo «nuca.»
const c3 = fr(10.769);  // pausa 10,7-11,21 dopo «arriva.»
const c4 = fr(14.554);  // pausa 14,28-14,67 dopo «piume.»
const c5 = fr(15.761);  // pausa 15,46-15,94 dopo «socchiusi:»
const D = T.D;

// ---- riprese ----
const shot = (id, clip, da, a, media, z) => {
  const st = fr(da), du = f3((a === D ? D : fr(a)) - st);
  html += `      <div class="wrap" id="w${id}" style="z-index:${z}"><div class="inner" id="i${id}"><video id="${id}" class="shot" src="assets/clips/${clip}.mp4" muted playsinline data-start="${st}" data-duration="${du}" data-media-start="${media}"></video></div></div>\n`;
};
shot('S1', 'C1', 0, c1, 0, 10);
shot('S2', 'C2', c1, c2, 0.5, 11);
shot('S3', 'C3', c2, c3, 0.3, 12);
shot('S4', 'C4', c3, c4, 0, 13);
shot('S5', 'C3', c4, c5, 3.9, 14);   // seconda parte di C3, mai gli stessi fotogrammi di S3 (che finisce a 3,87)
shot('S6', 'C5', c5, D, 0.1, 15);
css += `      .wrap, .inner { position: absolute; inset: 0; overflow: hidden; }
      .shot { position: absolute; left: -81px; top: -144px; width: 1242px; height: 2208px; object-fit: cover; }
`;
js += `  gsap.set('.shot', {scale: ${sc(1)}, transformOrigin: '50% 50%'});\n`;

// ---- S1 «Abbassa la testa e gonfia il collo»: la testa sta alta (ripresa alzata); su «gonfia» la camera si gonfia con lei ----
const tGonfia = T.s('gonfia');
js += `  gsap.set('#S1', {scale: ${sc(1.07)}, y: -60, x: 0});
  tl.to('#S1', {scale: ${sc(1.11)}, y: -105, duration: 0.45, ease: 'power2.out'}, ${tGonfia});
  tl.to('#S1', {x: -14, duration: ${f3(c1 - tGonfia - 0.45)}, ease: 'none'}, ${f3(tGonfia + 0.45)});\n`;

// ---- «Che cosa vuole?»: il fumetto del pensiero coi puntini che saltano; su «vuole?» i puntini diventano un «?» ----
const tChe = T.s('Che'), tVuole = T.s('vuole?');
const tNuv = f3(tChe - 0.07);
html += `      <div id="pensa" class="clip" data-start="${tNuv}" data-duration="${f3(c1 - tNuv)}"><svg viewBox="0 0 440 360" width="440" height="360">
        <path id="nuvola" d="M 60 180 C 20 180 20 110 70 100 C 60 50 140 30 170 60 C 200 20 300 20 320 70 C 380 50 420 110 390 150 C 430 190 390 250 340 236 C 330 280 240 290 210 256 C 180 290 90 280 90 230 C 50 240 30 200 60 180 Z"/>
        <circle class="nuv" cx="372" cy="292" r="26"/><circle class="nuv" cx="412" cy="334" r="14"/>
        <g id="puntini"><circle cx="160" cy="156" r="17"/><circle cx="222" cy="156" r="17"/><circle cx="284" cy="156" r="17"/></g>
        <text id="domanda" x="222" y="218" text-anchor="middle">?</text>
      </svg></div>\n`;
css += `      #pensa { position: absolute; left: 30px; top: 30px; width: 440px; height: 360px; z-index: 30; }
      #pensa svg { ${OMBRA} overflow: visible; }
      #nuvola, #pensa .nuv { fill: ${C.crema}; stroke: ${C.navy}; stroke-width: 4; }
      #puntini circle { fill: ${C.navy}; }
      #domanda { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 190px; fill: ${C.senape}; }
`;
js += `  gsap.set('#pensa svg', {scale: 0, transformOrigin: '88% 96%'});
  gsap.set('#domanda', {scale: 0, transformOrigin: '50% 50%'});
  tl.to('#pensa svg', {scale: 1, duration: 0.3, ease: 'back.out(1.8)'}, ${tNuv});
  tl.to('#puntini circle', {y: -16, duration: 0.13, stagger: 0.08, yoyo: true, repeat: 3, ease: 'sine.inOut'}, ${f3(tChe + 0.1)});
  tl.to('#puntini', {opacity: 0, scale: 0.3, transformOrigin: '50% 50%', duration: 0.12}, ${f3(tVuole + 0.04)});
  tl.to('#domanda', {scale: 1, duration: 0.3, ease: 'back.out(2.2)'}, ${f3(tVuole + 0.1)});
  tl.to('#pensa svg', {scale: 0, opacity: 0, duration: 0.16, ease: 'power2.in'}, ${f3(c1 - 0.17)});\n`;

// ---- S2 «L'Ara sul trespolo mi fissa, poi china il capo»: deriva lenta; colpo di camera secco su «fissa» ----
const tFissa = batt(T.s('fissa,'));
js += `  gsap.set('#S2', {scale: ${sc(1.0)}});
  gsap.set('#iS2', {transformOrigin: '50% 42%'});
  tl.to('#S2', {scale: ${sc(1.06)}, duration: ${f3(c2 - c1)}, ease: 'none'}, ${c1});
  tl.to('#iS2', {scale: 1.035, duration: 0.1, ease: 'power3.out'}, ${tFissa});
  tl.to('#iS2', {scale: 1, duration: 0.5, ease: 'power2.out'}, ${f3(tFissa + 0.1)});\n`;

// ---- «arruffa le piume della nuca»: sei linee sottili sulla nuca della testa china, spuntano sdraiate e su «nuca» si drizzano a ventaglio ----
const tArr = batt(T.s('arruffa')), tNuca = batt(T.s('nuca.'));
const BASI = [[373, 636, -82, -32, 150], [425, 600, -70, -19, 168], [488, 584, -50, -7, 182], [550, 582, 50, 7, 182], [613, 596, 70, 19, 168], [665, 626, 82, 32, 150]]; // x, y della base, angolo sdraiato, angolo dritto, lunghezza
const tA0 = f3(tArr - 0.05);
html += `      <div id="arruffa" class="clip" data-start="${tA0}" data-duration="${f3(c2 - tA0)}"><svg viewBox="0 0 1080 1920" width="1080" height="1920">
${BASI.map(([x, y, , , L], k) => `        <path id="rf${k}" d="M ${x} ${y} L ${x} ${y - L}"/>`).join('\n')}
      </svg></div>\n`;
css += `      #arruffa { position: absolute; inset: 0; z-index: 30; pointer-events: none; }
      #arruffa svg { ${OMBRA} }
      #arruffa path { fill: none; stroke: ${C.senape}; stroke-width: 10; stroke-linecap: round; }
`;
BASI.forEach(([x, y, giu, su], k) => {
  js += `  gsap.set('#rf${k}', {svgOrigin: '${x} ${y}', rotation: ${giu}, scaleY: 0});
  tl.to('#rf${k}', {scaleY: 1, duration: 0.22, ease: 'power2.out'}, ${f3(tArr + 0.06 * k)});
  tl.to('#rf${k}', {rotation: ${su}, duration: 0.34, ease: 'back.out(1.7)'}, ${f3(tNuca + 0.04 * k)});
  tl.to('#rf${k}', {rotation: ${su + (k % 2 ? 5 : -5)}, duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut'}, ${f3(tNuca + 0.4 + 0.04 * k)});\n`;
});
js += `  tl.to('#arruffa', {opacity: 0, duration: 0.15}, ${f3(c2 - 0.17)});\n`;

// ---- S3 «In natura è il compagno a lisciarle lì»: un cuore grande e trasparente si disegna intorno alle due teste, batte due volte ----
const tComp = f3(T.s('compagno') + 0.06), tLi = batt(T.s('lì,')), tBecco = batt(T.s('becco'));
const tC0 = f3(tComp - 0.05);
html += `      <div id="cuoreBox" class="clip" data-start="${tC0}" data-duration="${f3(c3 - tC0)}"><svg id="cuore" viewBox="90 230 860 840" width="860" height="840">
        <path id="cuoreP" d="M 520 1050 C 330 900, 100 760, 100 520 C 100 350, 230 250, 360 250 C 440 250, 500 300, 520 370 C 540 300, 600 250, 680 250 C 810 250, 940 350, 940 520 C 940 760, 710 900, 520 1050 Z"/>
      </svg></div>\n`;
css += `      #cuoreBox { position: absolute; left: 90px; top: 230px; width: 860px; height: 840px; z-index: 30; pointer-events: none; }
      #cuore { ${OMBRA} overflow: visible; }
      #cuoreP { fill: ${C.crema}; stroke: ${C.senape}; stroke-width: 12; stroke-linejoin: round; stroke-linecap: round; }
`;
js += `  { const p = document.getElementById('cuoreP'); const L = p.getTotalLength(); gsap.set(p, {strokeDasharray: L, strokeDashoffset: L, fillOpacity: 0}); }
  gsap.set('#cuore', {transformOrigin: '50% 50%'});
  gsap.set('#S3', {scale: ${sc(1.02)}});
  tl.to('#S3', {scale: ${sc(1.03)}, duration: ${f3(tBecco - c2)}, ease: 'none'}, ${c2});
  tl.to('#cuoreP', {strokeDashoffset: 0, duration: 0.65, ease: 'power1.inOut'}, ${tComp});
  tl.to('#cuoreP', {fillOpacity: 0.14, duration: 0.3}, ${f3(tComp + 0.5)});
  tl.to('#cuore', {scale: 1.05, duration: 0.17, yoyo: true, repeat: 1, ease: 'sine.inOut'}, ${tLi});
  tl.to('#cuore', {scale: 1.05, duration: 0.17, yoyo: true, repeat: 1, ease: 'sine.inOut'}, ${f3(tLi + 0.4)});
  tl.to('#S3', {scale: ${sc(1.09)}, duration: 0.8, ease: 'power2.out'}, ${tBecco});
  tl.to('#cuore', {scale: 1.07, duration: 0.8, ease: 'power2.out'}, ${tBecco});
  tl.to('#cuoreBox', {opacity: 0, duration: 0.18}, ${f3(c3 - 0.2)});\n`;

// ---- S4 «Ora lo chiede a me»: schermo stretto con bande rosa-arancio ai lati, l'ara e la mano in mezzo; su «Gratto» le bande si aprono ----
const tGratto = batt(T.s('Gratto')), tSeg = batt(T.s('seguendo'));
html += `      <div id="bande" class="clip" data-effetto="schermo" data-start="${c3}" data-duration="${f3(tGratto + 0.5 - c3)}"><div id="bandaL"></div><div id="bandaR"></div></div>\n`;
css += `      #bande { position: absolute; inset: 0; z-index: 20; pointer-events: none; }
      #bandaL, #bandaR { position: absolute; top: 0; bottom: 0; width: 220px; background: ${ROSA}; }
      #bandaL { left: 0; border-right: 6px solid ${C.navy}; }
      #bandaR { right: 0; border-left: 6px solid ${C.navy}; }
`;
js += `  gsap.set('#S4', {scale: ${sc(1.11)}, x: 220, y: 0});
  gsap.set('#wS4', {clipPath: 'inset(0px 220px 0px 220px)'});
  tl.to('#S4', {y: -24, duration: ${f3(tGratto - c3)}, ease: 'none'}, ${c3});
  tl.to('#wS4', {clipPath: 'inset(0px 0px 0px 0px)', duration: 0.4, ease: 'power3.inOut'}, ${tGratto});
  tl.to('#bandaL', {x: -232, duration: 0.4, ease: 'power3.inOut'}, ${tGratto});
  tl.to('#bandaR', {x: 232, duration: 0.4, ease: 'power3.inOut'}, ${tGratto});
  tl.to('#S4', {scale: ${sc(1.04)}, x: 0, duration: 0.5, ease: 'power3.inOut'}, ${tGratto});
  tl.to('#S4', {scale: ${sc(1.09)}, y: -40, duration: ${f3(c4 - tSeg)}, ease: 'sine.inOut'}, ${tSeg});\n`;

// ---- S5 «Occhi socchiusi»: taglio veloce sull'ara lisciata che chiude gli occhi; lo schermo socchiude le palpebre (due bande navy) ----
// ---- S6 «va bene così»: le palpebre si riaprono sul primo piano con l'occhio socchiuso, che continua sotto il velo ----
const tSoc = f3(T.s('socchiusi:') - 0.07), tVa = f3(T.s('va') + 0.01);
html += `      <div id="palpebre" class="clip" data-effetto="schermo" data-start="${c4}" data-duration="${f3(tVa + 0.5 - c4)}"><div id="palpA"></div><div id="palpB"></div></div>\n`;
css += `      #palpebre { position: absolute; inset: 0; z-index: 22; pointer-events: none; }
      #palpA, #palpB { position: absolute; left: -120px; right: -120px; height: 1100px; background: ${C.navy}; }
      #palpA { top: -1100px; border-radius: 0 0 50% 50% / 0 0 220px 220px; box-shadow: 0 10px 30px rgba(10,20,32,.6); }
      #palpB { top: 1920px; border-radius: 50% 50% 0 0 / 220px 220px 0 0; box-shadow: 0 -10px 30px rgba(10,20,32,.6); }
`;
js += `  gsap.set('#palpA, #palpB', {y: 0});
  gsap.set('#S5', {scale: ${sc(1.06)}});
  tl.to('#S5', {scale: ${sc(1.09)}, duration: ${f3(c5 - c4)}, ease: 'none'}, ${c4});
  tl.to('#palpA', {y: 430, duration: 0.45, ease: 'power2.inOut'}, ${tSoc});
  tl.to('#palpB', {y: -680, duration: 0.45, ease: 'power2.inOut'}, ${tSoc});
  tl.to('#palpA', {y: 0, duration: 0.42, ease: 'power2.inOut'}, ${tVa});
  tl.to('#palpB', {y: 0, duration: 0.42, ease: 'power2.inOut'}, ${tVa});
  gsap.set('#S6', {scale: ${sc(1.02)}});
  tl.to('#S6', {scale: ${sc(1.07)}, duration: ${f3(D - c5)}, ease: 'sine.inOut'}, ${c5});\n`;

scrivi({ html, css, js, sottotitoli: 'karaoke' });
console.log('tagli:', [c1, c2, c3, c4, c5].join(' / '), '· fumetto', tNuv, '· fissa', tFissa, '· arruffa', tArr, '· nuca', tNuca, '· cuore', tComp, '· becco', tBecco, '· gratto', tGratto, '· socchiusi', tSoc, '· va', tVa);
