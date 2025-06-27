// --- Pixel RPG Character Generator - Responsive, EN, Options, Modern Menu ---

// --- Utilities ---
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function maybe(p) { return Math.random() < p; }
function colorShade(hex, percent) {
    let num = parseInt(hex.slice(1),16), amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

// --- New: Keyboard Shortcuts ---
document.addEventListener('keydown', function(e) {
    if(document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return; // Do not trigger in form fields
    if(e.key === "n") { document.getElementById('generateBtn').click(); }
    if(e.key === "g") { document.getElementById('multiBtn').click(); }
    if(e.key === "s") { document.getElementById('spritesheetBtn').click(); }
    if(e.key === "d") { document.getElementById('downloadBtn').click(); }
    if(e.key === "c") { document.getElementById('copyBtn').click(); }
    if(e.key === "k") { document.getElementById('showCodeBtn').click(); }
    if(e.key === "t") { document.getElementById('settingsBtn').click(); }
    if(e.key === "a") { document.getElementById('aboutBtn').click(); }
    if(e.key === "Escape") {
        document.getElementById('settingsPanel').style.display = "none";
        document.getElementById('aboutPanel').style.display = "none";
        hideCodeBox();
    }
});
// --- End Keyboard Shortcuts ---

// --- Palettes & Variants ---
const skinTones = ["#ead196","#c9a06c","#b88756","#603d1b","#f7e3c5","#d1b7a3","#7d5b35"];
const hairColors = ["#31210b","#a86932","#c0c7bf","#fff200","#6d402f","#2e5c2e","#3954a3","#b0002b","#222","#b872d6","#f6b0b8"];
const armorColors = ["#a2b9ce","#6f8a99","#e0d8c3","#e7b77c","#b5b5b5","#d95a5a","#c9c9c9","#8b6d8f"];
const clothesColors = ["#e7e774","#7dc9c0","#d1a3fc","#f8b7b7","#9ddc63","#b5b5b5","#8cbbf2","#f2e7b1"];
const eyeColors = ["#222","#0ff","#ff0","#6cf","#f00","#fff","#39f","#f80"];
const shoeColors = ["#302015","#504d3b","#15151b","#7a5d43","#3e2d20"];
const accessoriesColors = ["#ffd800","#b3e9ff","#e3aaff","#9ae8d6","#ff80b0","#a0f0ad","#f2b134"];
const beardColors = hairColors;
const facesVariants = [0,1,2];
const nosesVariants = [0,1,2,3];
const eyesVariants = [0,1,2,3,4];
const mouthVariants = [0,1,2,3];
const browsVariants = [0,1,2];
const hairVariants = [0,1,2,3,4,5];
const beardVariants = [0,1,2,3];
const hatVariants = [0,1,2,3,4];
const accessoriesVariants = [0,1,2,3,4,5];

const races = [
    "Human","Elf","Dwarf","Orc","Goblin","Skeleton","Demon","Halfling","Gnome"
];
const classes = [
    "Warrior","Mage","Rogue","Hunter","Paladin","Necromancer","Barbarian","Monk","Bard"
];
const weapons = [
    {name:"Sword",color:"#ccc",detail:"#8c6d3f"},
    {name:"Axe",color:"#c0c0c0",detail:"#64523c"},
    {name:"Bow",color:"#7c5e3d",detail:"#d4b481"},
    {name:"Staff",color:"#a37c4b",detail:"#b3e9ff"},
    {name:"Dagger",color:"#b6c6be",detail:"#909090"},
    {name:"Scythe",color:"#bbb",detail:"#3c3c3c"},
    {name:"Hammer",color:"#b9b9b9",detail:"#b09160"},
    {name:"Mace",color:"#f8d35c",detail:"#bfa33c"}
];
const shields = [
    null,
    {name:"Round Shield",color:"#fff9c0",detail:"#876e1b"},
    {name:"Metal Shield",color:"#b9c3cf",detail:"#2e2e2e"},
    {name:"Forest Shield",color:"#6f8a5c",detail:"#c6e3a4"},
    {name:"Runic Shield",color:"#d1a3fc",detail:"#542e6c"}
];
const accessories = [
    null,"headband","earring","glasses","eyepatch","tattoo","freckles"
];

// --- Character Data Generator ---
function generateCharacterData(seed=null) {
    if (seed !== null && seed !== "" && !isNaN(Number(seed))) {
        let s = Number(seed);
        function seededRand(max) {
            s = (s * 9301 + 49297) % 233280;
            return Math.floor((s / 233280) * max);
        }
        function sr(arr) { return arr[seededRand(arr.length)]; }
        function smaybe(p) { return seededRand(1000)/1000 < p; }
        return {
            skin: sr(skinTones),
            faceVariant: sr(facesVariants),
            noseVariant: sr(nosesVariants),
            eyeVariant: sr(eyesVariants),
            browVariant: sr(browsVariants),
            mouthVariant: sr(mouthVariants),
            hairVariant: sr(hairVariants),
            hair: sr(hairColors),
            beard: smaybe(0.4) ? sr(beardVariants) : -1,
            beardColor: sr(beardColors),
            hat: smaybe(0.32) ? sr(hatVariants) : -1,
            hatColor: sr(armorColors),
            armor: sr(armorColors),
            armor2: colorShade(sr(armorColors), seededRand(31)-18),
            clothes: sr(clothesColors),
            pants: colorShade(sr(clothesColors), seededRand(41)-30),
            shoes: sr(shoeColors),
            eye: sr(eyeColors),
            race: sr(races),
            cls: sr(classes),
            gender: smaybe(0.55) ? "♂" : "♀",
            age: smaybe(0.2) ? seededRand(41)+40 : smaybe(0.23) ? seededRand(5)+13 : seededRand(22)+18,
            weapon: sr(weapons),
            shield: smaybe(0.45) ? sr(shields) : null,
            accessory: smaybe(0.4) ? sr(accessoriesVariants) : null,
            accessoryColor: sr(accessoriesColors),
            hasScar: smaybe(0.14),
            hasFreckles: smaybe(0.10),
            hasTattoo: smaybe(0.12),
            stats: {
                "Strength": seededRand(16)+3,
                "Agility": seededRand(16)+3,
                "Intelligence": seededRand(16)+3,
                "Charisma": seededRand(16)+3,
                "Endurance": seededRand(16)+3
            },
            seed
        };
    }
    const skin = rand(skinTones);
    const faceVariant = rand(facesVariants);
    const noseVariant = rand(nosesVariants);
    const eyeVariant = rand(eyesVariants);
    const browVariant = rand(browsVariants);
    const mouthVariant = rand(mouthVariants);

    const hairVariant = rand(hairVariants);
    const hair = rand(hairColors);

    const beard = maybe(0.4) ? rand(beardVariants) : -1;
    const beardColor = rand(beardColors);

    const hat = maybe(0.32) ? rand(hatVariants) : -1;
    const hatColor = rand(armorColors);

    const armor = rand(armorColors);
    const armor2 = colorShade(armor, randint(-18,12));
    const clothes = rand(clothesColors);
    const pants = colorShade(clothes, randint(-30,10));
    const shoes = rand(shoeColors);

    const eye = rand(eyeColors);

    const race = rand(races);
    const cls = rand(classes);
    const gender = maybe(0.55) ? "♂" : "♀";
    const age = maybe(0.2) ? randint(40,80) : maybe(0.23) ? randint(13,17) : randint(18,39);

    const weapon = rand(weapons);
    const shield = maybe(0.45) ? rand(shields) : null;
    const accessory = maybe(0.4) ? rand(accessoriesVariants) : null;
    const accessoryColor = rand(accessoriesColors);

    const hasScar = maybe(0.14);
    const hasFreckles = maybe(0.10);
    const hasTattoo = maybe(0.12);

    const stats = {
        "Strength": randint(3, 18),
        "Agility": randint(3, 18),
        "Intelligence": randint(3, 18),
        "Charisma": randint(3, 18),
        "Endurance": randint(3, 18)
    };

    const s = seed || (Date.now() + Math.floor(Math.random()*1000000));
    return {
        skin, faceVariant, noseVariant, eyeVariant, browVariant, mouthVariant,
        hairVariant, hair, beard, beardColor, hat, hatColor, armor, armor2, clothes, pants, shoes, eye,
        race, cls, gender, age, weapon, shield, accessory, accessoryColor,
        hasScar, hasFreckles, hasTattoo, stats, seed: s
    };
}

const px = 8;
function pr(x,y,w=1,h=1,c="#fff") {
    return `<rect x="${x*px}" y="${y*px}" width="${w*px}" height="${h*px}" fill="${c}" shape-rendering="crispEdges"/>`;
}
function drawFace(ch) {
    if(ch.faceVariant===0) return pr(7,3,6,5,ch.skin);
    if(ch.faceVariant===1) return pr(6,3,8,6,ch.skin);
    if(ch.faceVariant===2) return pr(7,2,6,7,ch.skin);
}
function drawNose(ch) {
    if(ch.noseVariant===0) return pr(10,6,1,1,colorShade(ch.skin,-14));
    if(ch.noseVariant===1) return pr(9,6,2,1,colorShade(ch.skin,-8));
    if(ch.noseVariant===2) return pr(10,5,1,2,colorShade(ch.skin,8));
    if(ch.noseVariant===3) return pr(9,6,2,1,colorShade(ch.skin,14));
}
function drawEyes(ch) {
    if(ch.eyeVariant===0) return pr(8,5,1,1,ch.eye)+pr(12,5,1,1,ch.eye);
    if(ch.eyeVariant===1) return pr(8,5,1,2,ch.eye)+pr(12,5,1,2,ch.eye);
    if(ch.eyeVariant===2) return pr(8,6,1,1,ch.eye)+pr(12,6,1,1,ch.eye);
    if(ch.eyeVariant===3) return pr(8,5,2,1,ch.eye)+pr(11,5,2,1,ch.eye);
    if(ch.eyeVariant===4) return pr(9,5,1,1,ch.eye)+pr(11,5,1,1,ch.eye);
}
function drawBrows(ch) {
    if(ch.browVariant===0) return pr(8,4,1,1,"#321")+pr(12,4,1,1,"#321");
    if(ch.browVariant===1) return pr(8,4,2,1,"#321")+pr(11,4,2,1,"#321");
    if(ch.browVariant===2) return pr(8,4,1,1,"#654")+pr(12,4,1,1,"#654");
}
function drawMouth(ch) {
    if(ch.mouthVariant===0) return pr(10,8,1,1,"#a66");
    if(ch.mouthVariant===1) return pr(9,8,3,1,"#a66");
    if(ch.mouthVariant===2) return pr(10,9,1,1,"#a66");
    if(ch.mouthVariant===3) return pr(9,8,1,1,"#a66")+pr(11,8,1,1,"#a66");
}
function drawHair(ch) {
    let c = ch.hair;
    if(ch.hairVariant===0) return pr(7,2,6,2,c);
    if(ch.hairVariant===1) return pr(6,2,8,2,c)+pr(6,4,2,3,c);
    if(ch.hairVariant===2) return pr(7,1,6,2,c)+pr(13,2,1,4,c);
    if(ch.hairVariant===3) return pr(6,2,8,2,c)+pr(7,4,2,2,c)+pr(12,4,2,2,c);
    if(ch.hairVariant===4) return pr(6,2,8,2,c)+pr(6,4,2,5,c);
    if(ch.hairVariant===5) return pr(8,1,4,3,c)+pr(7,2,6,1,c);
    return "";
}
function drawBeard(ch) {
    let c = ch.beardColor;
    if(ch.beard===0) return pr(8,9,4,2,c);
    if(ch.beard===1) return pr(9,9,2,3,c);
    if(ch.beard===2) return pr(7,9,6,2,c);
    if(ch.beard===3) return pr(8,10,4,2,c);
    return "";
}
function drawHat(ch) {
    let c = ch.hatColor;
    if(ch.hat===0) return pr(6,1,8,2,c) + pr(7,0,6,1,colorShade(c,30));
    if(ch.hat===1) return pr(7,0,6,2,c) + pr(6,2,8,1,colorShade(c,-18));
    if(ch.hat===2) return pr(8,0,4,2,c) + pr(7,2,6,1,colorShade(c,14));
    if(ch.hat===3) return pr(7,1,6,2,c) + pr(8,0,4,1,colorShade(c,30));
    if(ch.hat===4) return pr(6,0,8,2,c)+pr(7,2,6,1,colorShade(c,-8));
    return "";
}
function drawScar(ch) {
    if(!ch.hasScar) return "";
    return `<rect x="${11*px}" y="${6*px}" width="2" height="7" fill="#e12" shape-rendering="crispEdges"/>`;
}
function drawFreckles(ch) {
    if(!ch.hasFreckles) return "";
    return pr(10,7,1,1,"#b88838") + pr(12,7,1,1,"#b88838");
}
function drawTattoo(ch) {
    if(!ch.hasTattoo) return "";
    return pr(8,8,1,1,"#66f") + pr(11,7,1,1,"#66f");
}
function drawAccessory(ch) {
    if(ch.accessory==null) return "";
    if(ch.accessory===1) return pr(8,2,4,1,ch.accessoryColor);
    if(ch.accessory===2) return pr(7,7,1,1,ch.accessoryColor);
    if(ch.accessory===3) return pr(10,5,1,1,"#fff")+pr(10,5,1,1,ch.accessoryColor);
    if(ch.accessory===4) return pr(7,6,2,1,"#333");
    if(ch.accessory===5) return pr(11,6,1,1,"#039");
    if(ch.accessory===6) return pr(9,7,1,1,"#d88");
    return "";
}
function drawBody(ch) {
    let s = pr(10,8,1,2,ch.skin);
    s += pr(7,10,6,6,ch.armor);
    s += pr(8,16,4,2,ch.armor2);
    s += pr(8,12,4,4,ch.clothes);
    s += pr(5,10,2,6,ch.armor);
    s += pr(13,10,2,6,ch.armor);
    s += pr(4,16,2,5,ch.skin);
    s += pr(14,16,2,5,ch.skin);
    s += pr(8,18,2,4,ch.pants);
    s += pr(10,18,2,4,ch.pants);
    s += pr(8,22,2,2,ch.shoes);
    s += pr(10,22,2,2,ch.shoes);
    return s;
}
function drawWeapon(ch) {
    let s = "";
    if(ch.weapon.name==="Sword") {
        s += pr(14,19,1,5,ch.weapon.color);
        s += pr(14,24,1,1,ch.weapon.detail);
    } else if(ch.weapon.name==="Axe") {
        s += pr(14,18,1,7,ch.weapon.color)+pr(13,22,2,2,ch.weapon.detail);
    } else if(ch.weapon.name==="Bow") {
        s += pr(15,18,1,6,ch.weapon.color)+pr(15,20,1,2,ch.weapon.detail);
    } else if(ch.weapon.name==="Staff") {
        s += pr(14,17,1,9,ch.weapon.color)+pr(14,17,1,1,ch.weapon.detail);
    } else if(ch.weapon.name==="Dagger") {
        s += pr(14,20,1,3,ch.weapon.color)+pr(14,23,1,1,ch.weapon.detail);
    } else if(ch.weapon.name==="Scythe") {
        s += pr(14,16,1,8,ch.weapon.color)+pr(14,15,2,1,ch.weapon.detail);
    } else if(ch.weapon.name==="Hammer") {
        s += pr(14,19,1,5,ch.weapon.color)+pr(13,19,3,1,ch.weapon.detail);
    } else if(ch.weapon.name==="Mace") {
        s += pr(14,20,1,4,ch.weapon.color)+pr(14,23,2,2,ch.weapon.detail);
    }
    return s;
}
function drawShield(ch) {
    if(!ch.shield) return "";
    let s = pr(3,19,2,4,ch.shield.color);
    s += pr(4,20,1,2,ch.shield.detail);
    return s;
}
function drawBg() {
    let s = "";
    const colors = ["#fffdd0","#f2e7b1","#ffe5ad","#e7e774","#cee5b3"];
    for(let i=0;i<24;i++) {
        for(let j=0;j<24;j++) {
            if(Math.random()<0.04) s += pr(i-2,j-2,1,1,rand(colors));
        }
    }
    return s;
}
function drawFrame() {
    return `<rect x="0" y="0" width="${20*px}" height="${20*px}" fill="none" stroke="#ffd800" stroke-width="3" shape-rendering="crispEdges"/>`;
}

// --- Animation/Generation ---
const ANIM_FRAMES = [
    {dx:0,dy:0},
    {dx:0,dy:1},
    {dx:1,dy:0},
    {dx:-1,dy:0},
];

function generateAnimSVG(ch, frame=0, opts={frame:true, scale:1}) {
    const move = ANIM_FRAMES[frame % ANIM_FRAMES.length];
    function shift(svg, dx, dy) {
        return `<g transform="translate(${dx*px},${dy*px})">${svg}</g>`;
    }
    let s = `<svg class="pixel-svg" width="100%" height="auto" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">`;
    if(opts.frame!==false) s += drawFrame();
    s += drawBg();
    s += shift(drawBody(ch), move.dx, move.dy);
    s += shift(drawShield(ch), move.dx, move.dy);
    s += shift(drawWeapon(ch), move.dx, move.dy);
    s += shift(drawFace(ch), move.dx, move.dy);
    s += shift(drawHair(ch), move.dx, move.dy);
    s += shift(drawBeard(ch), move.dx, move.dy);
    s += shift(drawHat(ch), move.dx, move.dy);
    s += shift(drawBrows(ch), move.dx, move.dy);
    s += shift(drawEyes(ch), move.dx, move.dy);
    s += shift(drawNose(ch), move.dx, move.dy);
    s += shift(drawFreckles(ch), move.dx, move.dy);
    s += shift(drawTattoo(ch), move.dx, move.dy);
    s += shift(drawAccessory(ch), move.dx, move.dy);
    s += shift(drawScar(ch), move.dx, move.dy);
    s += shift(drawMouth(ch), move.dx, move.dy);
    s += `<text x="7" y="156" font-size="12" fill="#ffd800" font-family="Press Start 2P">${ch.gender}</text>`;
    s += `<text x="128" y="156" font-size="10" fill="#ffd800" font-family="Press Start 2P">${ch.age}</text>`;
    s += "</svg>";
    return s;
}

function generateSpriteSheetSVG(ch, opts={frame:true, scale:1}) {
    let s = `<svg width="${160*4}" height="160" viewBox="0 0 ${160*4} 160" xmlns="http://www.w3.org/2000/svg">`;
    for(let i=0;i<4;i++)
        s += `<g transform="translate(${i*160},0)">${generateAnimSVG(ch,i,{frame:opts.frame,scale:opts.scale}).replace(/^<svg[^>]+>|<\/svg>$/g,'')}</g>`;
    s += "</svg>";
    return s;
}

// --- State ---
let lastSVG = '';
let lastCharData = null;
let lastSeed = null;
let lastScale = 1;
let lastTheme = "fantasy";
let lastShowFrame = true;
let lastAutoDownload = false;
let lastShowNames = true;

// --- UI ---
function updateStatusbar() {
    document.getElementById('statusbar').innerHTML =
        `Seed: <b>${lastCharData?.seed || ''}</b> | Size: <b>${lastScale}x</b> | Theme: <b>${capitalize(lastTheme)}</b> | Frame: <b>${lastShowFrame?"Yes":"No"}</b>`;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase()+str.slice(1);
}
function setTheme(theme) {
    document.body.classList.remove("theme-fantasy","theme-dark","theme-light");
    document.body.classList.add("theme-"+theme);
    lastTheme = theme;
    updateStatusbar();
}

function renderCharacter(opts={}) {
    document.getElementById('gamebox').style.display = 'flex';
    document.getElementById('multiGrid').style.display = 'none';
    document.getElementById('sheetBox').style.display = 'none';
    document.getElementById('aboutPanel').style.display = 'none';
    hideCodeBox();
    let scale = lastScale;
    let seed = lastSeed;
    let showFrame = lastShowFrame;
    const ch = generateCharacterData(seed);
    lastCharData = ch;
    const svg = generateAnimSVG(ch, 0, {frame: showFrame, scale});
    lastSVG = svg;
    document.getElementById('svgContainer').innerHTML = svg;
    let statsHtml = `<div><b>${ch.race} ${ch.cls}</b> <span style="float:right;">${ch.gender}, ${ch.age} yrs</span></div>`;
    if(ch.hat!==-1) statsHtml += `<div style="color:#e3aaff">Hat/Helmet: <b>${ch.hat+1}</b></div>`;
    if(ch.beard!==-1) statsHtml += `<div style="color:#a86932">Beard: <b>${ch.beard+1}</b></div>`;
    if(ch.accessory) statsHtml += `<div style="color:#ffd800">Accessory: <b>${accessories[ch.accessory]||"special"}</b></div>`;
    statsHtml += `<div>Weapon: <b>${ch.weapon.name}</b>${ch.shield?`, Shield`:""}</div>`;
    statsHtml += `<hr style="border: none; border-top: 1px dashed #ffd800; margin: 3px 0;">`;
    Object.entries(ch.stats).forEach(([k,v]) =>
        statsHtml += `<div class="stat-row"><span>${k}</span><span>${v}</span></div>`
    );
    statsHtml += `<div style="font-size:0.7em;color:#bbb;margin-top:2px;">#${ch.seed.toString(36).slice(-6).toUpperCase()}</div>`;
    document.getElementById('statsContainer').innerHTML = statsHtml;
    updateStatusbar();
    let frame = 0;
    if(window.__mainAnimInterval) clearInterval(window.__mainAnimInterval);
    window.__mainAnimInterval = setInterval(()=>{
        document.getElementById('svgContainer').innerHTML = generateAnimSVG(ch, frame++ % ANIM_FRAMES.length, {frame:showFrame,scale});
    }, 520);
    // Auto-download if enabled
    if(lastAutoDownload) setTimeout(downloadSVG, 300);
}

function renderMulti(n=12) {
    document.getElementById('gamebox').style.display = 'none';
    document.getElementById('multiGrid').style.display = 'flex';
    document.getElementById('sheetBox').style.display = 'none';
    document.getElementById('aboutPanel').style.display = 'none';
    hideCodeBox();
    let html = '';
    let scale = lastScale;
    let showFrame = lastShowFrame;
    for(let i=0;i<n;i++) {
        const ch = generateCharacterData();
        const svg = generateAnimSVG(ch, 0, {frame:showFrame,scale});
        html += `
        <div class="multi-char${lastShowNames?' show-names':''}">
            <div class="anim-frame">${svg}</div>
            <div class="name">${ch.race} ${ch.cls}</div>
        </div>
        `;
    }
    document.getElementById('multiGrid').innerHTML = html;
    // Animation for each
    Array.from(document.querySelectorAll('.multi-char .anim-frame')).forEach((el, i) => {
        const ch = generateCharacterData();
        let frame=0;
        setInterval(()=>{
            el.innerHTML = generateAnimSVG(ch, frame++ % ANIM_FRAMES.length, {frame:showFrame,scale});
        }, 480+Math.random()*200);
    });
    updateStatusbar();
}
function renderSpriteSheet() {
    document.getElementById('gamebox').style.display = 'none';
    document.getElementById('multiGrid').style.display = 'none';
    document.getElementById('sheetBox').style.display = 'block';
    document.getElementById('aboutPanel').style.display = 'none';
    hideCodeBox();
    let scale = lastScale;
    let showFrame = lastShowFrame;
    const ch = generateCharacterData();
    const svg = generateSpriteSheetSVG(ch, {frame:showFrame,scale});
    document.getElementById('sheetBox').innerHTML = svg + `<br><button id="downloadSheetSVG"><span>⬇️</span> Download sprite-sheet SVG</button>`;
    document.getElementById('downloadSheetSVG').onclick = function() {
        const blob = new Blob([svg], {type: "image/svg+xml"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pixel_rpg_spritesheet.svg`;
        document.body.appendChild(a);
        a.click();
        setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},100);
    }
    updateStatusbar();
}

// --- Download, code, copy SVG (single character) ---
function downloadSVG() {
    if(!lastCharData) return;
    let scale = lastScale;
    let showFrame = lastShowFrame;
    const svg = generateAnimSVG(lastCharData, 0, {frame: showFrame, scale});
    const blob = new Blob([svg], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixel_rpg_${(lastCharData ? lastCharData.seed : Date.now())}.svg`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
function showCode() {
    if(!lastSVG) return;
    const codeBox = document.getElementById('codeBox');
    codeBox.textContent = lastSVG;
    codeBox.style.display = "block";
}
function hideCodeBox() {
    const codeBox = document.getElementById('codeBox');
    if(codeBox) codeBox.style.display = "none";
}
function copySVG() {
    if(!lastSVG) return;
    navigator.clipboard.writeText(lastSVG).then(()=>{
        showToast("Copied!");
    });
}
function showToast(msg) {
    let toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(()=>toast.style.display="none", 1200);
}

// --- Settings ---
function openSettings() {
    document.getElementById('settingsPanel').style.display = "block";
    document.getElementById('charScale').value = lastScale;
    document.getElementById('scaleValue').textContent = lastScale+"x";
    document.getElementById('themeSelect').value = lastTheme;
    document.getElementById('seedInput').value = lastSeed || '';
    document.getElementById('showFrame').checked = lastShowFrame;
    document.getElementById('autoDownload').checked = lastAutoDownload;
    document.getElementById('showNames').checked = lastShowNames;
    hideCodeBox();
}
function closeSettings() {
    document.getElementById('settingsPanel').style.display = "none";
}
function applySettings() {
    lastScale = Number(document.getElementById('charScale').value) || 1;
    lastTheme = document.getElementById('themeSelect').value;
    lastSeed = document.getElementById('seedInput').value || null;
    lastShowFrame = document.getElementById('showFrame').checked;
    lastAutoDownload = document.getElementById('autoDownload').checked;
    lastShowNames = document.getElementById('showNames').checked;
    setTheme(lastTheme);
    closeSettings();
    renderCharacter();
}
function resetSettings() {
    document.getElementById('charScale').value = 1;
    document.getElementById('themeSelect').value = "fantasy";
    document.getElementById('seedInput').value = '';
    document.getElementById('showFrame').checked = true;
    document.getElementById('autoDownload').checked = false;
    document.getElementById('showNames').checked = true;
    lastScale = 1;
    lastTheme = "fantasy";
    lastSeed = null;
    lastShowFrame = true;
    lastAutoDownload = false;
    lastShowNames = true;
    setTheme("fantasy");
    closeSettings();
    renderCharacter();
}
document.getElementById('charScale').oninput = function() {
    document.getElementById('scaleValue').textContent = this.value+"x";
};

// --- About ---
function openAbout() {
    document.getElementById('aboutPanel').style.display = "block";
    hideCodeBox();
}
function closeAbout() {
    document.getElementById('aboutPanel').style.display = "none";
}

// --- Menu/Events ---
document.getElementById('generateBtn').onclick = ()=>{lastSeed=null;renderCharacter();};
document.getElementById('multiBtn').onclick = ()=>renderMulti(12);
document.getElementById('spritesheetBtn').onclick = renderSpriteSheet;
document.getElementById('downloadBtn').onclick = downloadSVG;
document.getElementById('showCodeBtn').onclick = showCode;
document.getElementById('copyBtn').onclick = copySVG;
document.getElementById('settingsBtn').onclick = openSettings;
document.getElementById('aboutBtn').onclick = openAbout;
document.getElementById('applySettingsBtn').onclick = applySettings;
document.getElementById('resetSettingsBtn').onclick = resetSettings;
document.getElementById('closeSettingsBtn').onclick = closeSettings;
document.getElementById('closeAboutBtn').onclick = closeAbout;

// Hide code box on view change
["generateBtn","multiBtn","spritesheetBtn","settingsBtn","aboutBtn"].forEach(id=>{
    document.getElementById(id).addEventListener('click',hideCodeBox);
});

// Responsive: re-render SVG with current scale on resize
window.addEventListener('resize', ()=>{
    if(document.getElementById('gamebox').style.display !== 'none') renderCharacter();
});
// Initial theme/character
setTheme("fantasy");
renderCharacter();
