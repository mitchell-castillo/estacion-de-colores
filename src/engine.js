export const STORAGE_KEY='daily-games:estacion-de-colores:v1';
export const COLORS=[{name:'Coral',symbol:'●',css:'coral'},{name:'Azul',symbol:'◆',css:'blue'},{name:'Ámbar',symbol:'▲',css:'amber'},{name:'Violeta',symbol:'✚',css:'violet'},{name:'Verde',symbol:'★',css:'green'}];
export function clone(tubes){return tubes.map(t=>[...t]);}
export function isWon(tubes,capacity){return tubes.length>0&&tubes.some(t=>t.length>0)&&tubes.every(t=>!t.length||(t.length===capacity&&t.every(c=>c===t[0])));}
export function move(tubes,from,to,capacity){
 if(!Number.isInteger(from)||!Number.isInteger(to)||from===to||!tubes[from]||!tubes[to])return null;
 const a=tubes[from],b=tubes[to];if(!a.length||b.length>=capacity)return null;
 const color=a.at(-1);if(b.length&&b.at(-1)!==color)return null;
 let count=0;for(let i=a.length-1;i>=0&&a[i]===color;i--)count++;
 count=Math.min(count,capacity-b.length);const next=clone(tubes);next[from].splice(-count);next[to].push(...Array(count).fill(color));return {tubes:next,count};
}
// Tube-order canonicalization removes equivalent permutations without changing the stored actual path.
export function solve(initial,capacity,maxStates=300000){
 const key=t=>t.map(a=>a.join('')).sort().join('|');const queue=[{tubes:clone(initial),parent:-1,action:null}];const seen=new Set([key(initial)]);
 for(let head=0;head<queue.length;head++){const node=queue[head];if(isWon(node.tubes,capacity)){const actions=[];let i=head;while(queue[i].parent!==-1){actions.push(queue[i].action);i=queue[i].parent;}return {actions:actions.reverse(),visited:seen.size};}
 for(let a=0;a<node.tubes.length;a++)for(let b=0;b<node.tubes.length;b++){const result=move(node.tubes,a,b,capacity);if(!result)continue;const k=key(result.tubes);if(seen.has(k))continue;if(seen.size>=maxStates)return null;seen.add(k);queue.push({tubes:result.tubes,parent:head,action:[a,b]});}}
 return null;
}
export const LEVELS=[
 {name:'Primer transbordo',capacity:3,tubes:[[0,1,0],[1,0,1],[2,2,2],[],[]]},
 {name:'Andén de ámbar',capacity:3,tubes:[[0,1,2],[1,2,0],[2,0,1],[],[]]},
 {name:'Hora azul',capacity:4,tubes:[[0,1,2,0],[2,0,1,1],[1,2,0,2],[],[]]},
 {name:'Cruce violeta',capacity:3,tubes:[[0,1,2],[1,2,3],[2,3,0],[3,0,1],[],[]]},
 {name:'Cinco destinos',capacity:3,tubes:[[0,1,2],[1,2,3],[2,3,4],[3,4,0],[4,0,1],[],[]]},
 {name:'Última conexión',capacity:4,tubes:[[0,1,2,3],[1,2,3,0],[2,3,0,1],[3,0,1,2],[],[]]}
];
export function freshRun(level){return {tubes:clone(LEVELS[level].tubes),moves:0,history:[]};}
export function emptyState(){return {version:1,currentLevel:0,completed:{},run:LEVELS.map((_,i)=>freshRun(i)),updatedAt:null};}
function validTubes(tubes,level){const p=LEVELS[level];if(!Array.isArray(tubes)||tubes.length!==p.tubes.length||!tubes.every(t=>Array.isArray(t)&&t.length<=p.capacity&&t.every(c=>Number.isInteger(c)&&c>=0&&c<COLORS.length)))return false;const counts=t=>t.flat().sort().join(',');return counts(tubes)===counts(p.tubes);}
export function parseState(raw){try{const x=JSON.parse(raw);if(!x||x.version!==1||!Number.isInteger(x.currentLevel)||x.currentLevel<0||x.currentLevel>=LEVELS.length||!(x.updatedAt===null||(typeof x.updatedAt==='string'&&Number.isFinite(Date.parse(x.updatedAt))))||!x.completed||typeof x.completed!=='object'||Array.isArray(x.completed))return null;
 const clean=emptyState();clean.currentLevel=x.currentLevel;clean.updatedAt=x.updatedAt;for(const [k,v]of Object.entries(x.completed))if(/^[0-5]$/.test(k)&&Number.isInteger(v?.bestMoves)&&v.bestMoves>0&&v.bestMoves<100000)clean.completed[k]={bestMoves:v.bestMoves};
 if(x.run!==null){if(!Array.isArray(x.run)||x.run.length!==LEVELS.length)return null;for(let i=0;i<LEVELS.length;i++){const r=x.run[i];if(!r||!validTubes(r.tubes,i)||!Number.isInteger(r.moves)||r.moves<0||r.moves>=100000||!Array.isArray(r.history)||r.history.length>100||!r.history.every(t=>validTubes(t,i)))return null;clean.run[i]={tubes:clone(r.tubes),moves:r.moves,history:r.history.map(clone)};}}
 return clean;}catch{return null;}}
