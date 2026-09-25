const canvas=document.querySelector('#world'),scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x03080b,.038);const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,120);camera.position.set(0,1.2,8);const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
const world=new THREE.Group();scene.add(world);const grid=new THREE.GridHelper(70,90,0x12677a,0x0b2730);grid.position.y=-3;grid.material.transparent=true;grid.material.opacity=.18;world.add(grid);
const pg=new THREE.BufferGeometry(),N=900,p=new Float32Array(N*3);for(let i=0;i<N;i++){p[i*3]=(Math.random()-.5)*50;p[i*3+1]=(Math.random()-.4)*24;p[i*3+2]=-Math.random()*55}pg.setAttribute('position',new THREE.BufferAttribute(p,3));const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x20ddff,size:.026,transparent:true,opacity:.38}));world.add(particles);
const nodeGroup=new THREE.Group();for(let i=0;i<55;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.025,7,7),new THREE.MeshBasicMaterial({color:i%9===0?0xf5b84b:0x20ddff}));m.position.set((Math.random()-.5)*18,(Math.random()-.5)*9,-2-Math.random()*18);nodeGroup.add(m)}world.add(nodeGroup);
const columns=new THREE.Group();for(let i=0;i<34;i++){const h=.4+Math.random()*5,m=new THREE.Mesh(new THREE.BoxGeometry(.08,h,.08),new THREE.MeshBasicMaterial({color:i%6?0x0d4250:0xf5b84b,transparent:true,opacity:.32}));m.position.set((Math.random()-.5)*20,-3+h/2,-4-Math.random()*20);columns.add(m)}world.add(columns);
scene.add(new THREE.AmbientLight(0x74a6b5,.35));const cyan=new THREE.PointLight(0x20ddff,3,24);cyan.position.set(-5,3,2);scene.add(cyan);const gold=new THREE.PointLight(0xf5b84b,4,18);gold.position.set(5,2,1);scene.add(gold);
let mx=0,my=0,target=0,smooth=0;const cursor=document.querySelector('#cursor');addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});
const sections=[...document.querySelectorAll('.scene')],railNo=document.querySelector('#railChapter'),railName=document.querySelector('#railName');function updateScroll(){target=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);document.querySelector('#progress').style.width=target*100+'%';let active=sections[0];sections.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.52)active=s});railNo.textContent=active.dataset.no;railName.textContent=active.dataset.name}addEventListener('scroll',updateScroll,{passive:true});updateScroll();
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active')}),{threshold:.24});sections.forEach(s=>obs.observe(s));
function tick(t){requestAnimationFrame(tick);smooth+=(target-smooth)*.035;camera.position.x+=(mx*.6-camera.position.x)*.025;camera.position.y+=(1.2-my*.3-camera.position.y)*.025;camera.position.z=8-smooth*2.8;camera.lookAt(0,0,-5-smooth*5);particles.rotation.y=t*.000008;nodeGroup.rotation.y=-t*.000013;columns.position.z=smooth*6;const cyber=Math.max(0,Math.min(1,(smooth-.38)*5));grid.material.opacity=.14+cyber*.36;particles.material.opacity=.28+cyber*.55;cyan.intensity=2+cyber*5;gold.intensity=4-cyber*2.2;renderer.render(scene,camera)}tick(0);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
addEventListener('load',()=>setTimeout(()=>document.querySelector('#boot').classList.add('hide'),900));
document.querySelectorAll('a').forEach(a=>a.addEventListener('mouseenter',()=>{if(cursor){cursor.style.width='48px';cursor.style.height='48px';cursor.style.borderColor='#f5b84b'}}));document.querySelectorAll('a').forEach(a=>a.addEventListener('mouseleave',()=>{if(cursor){cursor.style.width='30px';cursor.style.height='30px';cursor.style.borderColor='#20ddff77'}}));
/* Eagle choreography only until a real rigged character GLB is installed. */
const eagleActor=document.querySelector('.eagleActor');
let lastY=scrollY,lastT=performance.now();
function cinematicActors(){
 requestAnimationFrame(cinematicActors);
 if(!eagleActor)return;
 const take=Math.min(1,target*8),ret=Math.max(0,(target-.86)/.14),time=performance.now();
 const x=take*(innerWidth*.22)-ret*(innerWidth*.15),y=-take*95+Math.sin(time*.0015)*10+ret*135;
 eagleActor.style.transform='translate3d('+x+'px,'+y+'px,0) rotate('+(take*7-ret*10)+'deg)';
 const flap=Math.sin(time*.012)*(16+take*20),w=eagleActor.querySelectorAll('.wing');
 if(w[0])w[0].style.transform='rotate('+flap+'deg)';
 if(w[1])w[1].style.transform='scaleX(-1) rotate('+flap+'deg)';
 document.body.classList.toggle('cyber-on',target>.42);
}
cinematicActors();