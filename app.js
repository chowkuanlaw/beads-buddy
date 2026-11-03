(()=>{'use strict';
const $=id=>document.getElementById(id), MAX=99999, MAX_OPERANDS=40;
const labels=[{en:'ones',zh:'个位'},{en:'tens',zh:'十位'},{en:'hundreds',zh:'百位'},{en:'thousands',zh:'千位'},{en:'ten-thousands',zh:'万位'}];
const T={
 en:{levels:['Direct moves','5 & 10 friends','Big numbers','Multiply / divide'],question:'Math question · enter a chain of numbers',show:'Show',new:'New',terms:'Numbers per question',random:'Unlimited random questions · level-aware',shows:'BEADS SHOW',beads:'Top bead = 5 · Each lower bead = 1 · Tap beads in Practice mode',guide:'Guide',try:'Practice',tryAgain:'Try again!',voiceOn:'Voice on',voiceOff:'Voice off',prev:'Back',next:'Next',play:'Play',pause:'Pause',hear:'Hear',answer:'Your answer',check:'Check',reveal:'Reveal',hint:'Type an answer, or choose Practice to move the beads yourself.',start:'Start here',direct:'Direct move',small:'Small friend of 5',big:'Big friend of 10',group:'Equal groups',quotient:'Show the quotient',complete:'Great work!',calculate:'Next operation',step:'Step',of:'of',op:'Operation',ready:'Ready to try!',correct:'Correct. One point earned.',correctAgain:'Correct. Well done.',wrong:(a)=>`Not quite. You entered ${a}. Try moving the beads or use Reveal.`,missing:'Enter an answer first, or use Practice to set the beads.',revealText:(n)=>`The answer is ${n}. Follow the steps to learn why.`,tryHelp:'Touch the beads to show the answer. Then press Check.',started:(n)=>`Start by showing ${n} on the abacus.`,startWhy:'A top bead is worth 5 and each lower bead is worth 1.',move:(amount,type,place)=>`Move ${type==='upper'?'the top 5-bead':Math.abs(amount)+' lower bead'+(Math.abs(amount)!==1?'s':'')} ${amount>0?'toward':'away from'} the beam in the ${labels[place].en} column.`,fiveWhy:(n)=>`Use the friend of 5. For ${n}, think of 5 and its partner.`,tenWhy:(n)=>`Use the friend of 10. For ${n}, carry or borrow to the next column.`,directWhy:'These beads can move directly.',subtotal:(a,op,b,n)=>`Now ${a} ${op==='+'?'plus':'minus'} ${b} makes ${n}.`,reset:(n)=>`Now return to the main calculation. Show ${n} on the abacus.`,groupText:(i,count,unit,isMul,n)=>isMul?`Group ${i} of ${count}: add ${unit}. Now the beads show ${n}.`:`Take away group ${i} of ${count}, ${unit} beads. ${n} remains.`,groupWhy:(isMul)=>isMul?'Multiplication means adding equal groups.':'Division means taking away equal groups and counting how many groups.',quotientText:(n)=>`We counted the groups. Reset the beads to show the answer ${n}.`,finished:(n)=>`Well done! The full answer is ${n}.`,error:'Enter whole numbers joined by +, −, ×, or ÷ (for example: 8 + 5 − 3 + 12 − 7).',zero:'Division by zero is not possible.',whole:'For beginner abacus lessons, division must give a whole-number result.',nonnegative:'Every running total must stay zero or above. Try changing the subtraction.',limit:'The five-rod abacus supports running values from 0 to 99,999. Multiplication and division use up to 12 equal groups.',tooLong:'This lesson supports up to 40 numbers per question.',about:'Parent tips & formula reference',aboutText:'Small friends: +3 = +5 −2. Big friends: +5 = +10 −5. Mixed multiplication and division follow standard precedence before addition/subtraction. Level 4 teaches × and ÷ through equal groups rather than advanced Soroban multiplication. Use the number selector to generate as many fresh questions as you like.'},
 zh:{levels:['直接拨珠','凑五与凑十','多位数计算','乘法与除法'],question:'输入算式 · 可以连续输入多个数字',show:'演示',new:'换题',terms:'每题数字个数',random:'无限随机出题 · 按等级调整难度',shows:'算盘显示',beads:'上珠 = 5 · 每颗下珠 = 1 · 在“自己试”模式可拨珠',guide:'教学',try:'自己试',tryAgain:'再试一次！',voiceOn:'语音开',voiceOff:'语音关',prev:'上一步',next:'下一步',play:'播放',pause:'暂停',hear:'朗读',answer:'你的答案',check:'检查',reveal:'看答案',hint:'输入答案，或选“自己试”拨珠后检查。',start:'开始摆珠',direct:'直加直减',small:'小朋友：凑 5',big:'大朋友：凑 10',group:'相同的组',quotient:'拨出商',complete:'太棒了！',calculate:'下一步算式',step:'第',of:'步，共',op:'运算',ready:'准备好啦！',correct:'答对了！得一分。',correctAgain:'答对了！继续加油！',wrong:(a)=>`还没答对哦。你填写了 ${a}，再试一次！`,missing:'请先输入答案，或在“自己试”模式拨出答案。',revealText:(n)=>`正确答案是 ${n}。跟着步骤一起学习吧！`,tryHelp:'动手拨珠显示答案，再点击检查。',started:(n)=>`先在算盘上拨出 ${n}。`,startWhy:'上珠代表五，每颗下珠代表一。',move:(amount,type,place)=>`在${labels[place].zh}，把${type==='upper'?'上珠（5）':Math.abs(amount)+' 颗下珠'}${amount>0?'拨向':'拨离'}横梁。`,fiveWhy:(n)=>`用凑五口诀。${n} 的小朋友是 ${5-n}。`,tenWhy:(n)=>`用凑十口诀。${n} 的大朋友是 ${10-n}，要进位或借位。`,directWhy:'珠子够用，可以直接拨。',subtotal:(a,op,b,n)=>`现在 ${a} ${op==='+'?'加':'减'} ${b} 等于 ${n}。`,reset:(n)=>`回到原来的算式，在算盘上重新拨出 ${n}。`,groupText:(i,count,unit,isMul,n)=>isMul?`第 ${i} 组，共 ${count} 组，加上 ${unit}，现在是 ${n}。`:`减去第 ${i} 组，共 ${count} 组，每组 ${unit}，还剩 ${n}。`,groupWhy:(isMul)=>isMul?'乘法就是重复加上相同的数。':'除法就是重复减去相同的数，数一数有几组。',quotientText:(n)=>`已经数出组数。重新拨珠，显示答案 ${n}。`,finished:(n)=>`太棒了！整道题的答案是 ${n}。`,error:'请输入用加减乘除连接的整数，如 8 + 5 − 3 + 12 − 7。',zero:'不能除以零。',whole:'初级算盘除法需要能够整除，答案必须是整数。',nonnegative:'每一步的计算结果都不能小于零，请调整减法。',limit:'五档算盘范围为 0 到 99,999。乘除法最多使用 12 组。',tooLong:'每题最多支持 40 个数字。',about:'家长提示与口诀',aboutText:'小朋友凑五：+3 = +5 −2。大朋友凑十：+5 = +10 −5。混合运算遵循先乘除后加减。第四关通过重复加减法介绍乘除，不是高级算盘乘除算法。可以不断生成随机练习题。'}
};
let lang='en',level=1,question=null,steps=[],index=0,tryMode=false,tryDigits=[0,0,0,0,0],lastMove=null,stars=0,earned=false,revealed=false,voiceOn=true,errKey='',timer=null,history=[];
try{stars=Math.max(0,Number(localStorage.getItem('beadBuddyStarsV3')||localStorage.getItem('beadBuddyStars')||0))}catch(_e){}
const VERSION='v3.2',save=(k,v)=>{try{localStorage.setItem('beadBuddy_'+k,String(v))}catch(_e){}},load=k=>{try{return localStorage.getItem('beadBuddy_'+k)}catch(_e){return null}};
const digits=n=>Array.from({length:5},(_,i)=>Math.floor(n/10**i)%10), readDigits=d=>d.reduce((s,v,i)=>s+v*10**i,0), sign=n=>n<0?'−'+(-n):'+'+n;
const prettyOp=op=>op==='*'?'×':op==='/'?'÷':op==='-'?'−':op;
const displayExpr=s=>s.replace(/\*/g,'×').replace(/\//g,'÷').replace(/-/g,'−').replace(/([+−×÷])/g,' $1 ').replace(/\s+/g,' ').trim();
function fmtMove(d,e,delta,kind,place){const p=10**place,n=Math.abs(delta),sg=Math.sign(delta);
 if(kind==='small')return `${sign(delta*p)} = ${sign(sg*5*p)} ${sign(-sg*(5-n)*p)}`;
 if(kind==='big')return `${sign(delta*p)} = ${sign(sg*10*p)} ${sign(-sg*(10-n)*p)}`;
 if(Math.floor(d/5)!==Math.floor(e/5)){const up=e>=5?5:-5,lo=e%5-d%5;return `${sign(delta*p)} = ${sign(up*p)}${lo?' '+sign(lo*p):''}`}
 return sign(delta*p);
}
function baseStep(value,formula,kind='start',note=''){
 return{digits:digits(value),kind,formula,focus:-1,moveType:null,amount:0,text:{en:T.en.started(value),zh:T.zh.started(value)},why:{en:T.en.startWhy,zh:T.zh.startWhy},note};
}
function buildSteps(a,op,b){
 if(a<0||a>MAX||b<0||b>MAX||!Number.isInteger(a)||!Number.isInteger(b))throw Error('limit');
 const final=op==='+'?a+b:a-b;
 if(final<0)throw Error('nonnegative');if(final>MAX)throw Error('limit');
 const ds=digits(a),out=[baseStep(a,`${a} ${prettyOp(op)} ${b} = ?`)];let group=0;
 function change(place,target,ctx){const before=ds[place];if(before===target)return;
  let moves=[];if((before>=5)!==(target>=5))moves.push({type:'upper',amount:(target>=5?1:-1)*5});
  if(before%5!==target%5)moves.push({type:'lower',amount:target%5-before%5});
  for(const m of moves){ds[place]+=m.amount;out.push({digits:[...ds],kind:ctx.kind,formula:ctx.formula,focus:place,moveType:m.type,amount:m.amount,group:ctx.group,text:{en:T.en.move(m.amount,m.type,place),zh:T.zh.move(m.amount,m.type,place)},why:ctx.why})}
 }
 function process(place,delta,parent=null){if(!delta)return;if(place>4)throw Error('limit');
  let d=ds[place],target=d+delta,small=target>=0&&target<=9&&Math.abs(delta)<5&&((delta>0&&d<5&&target>=5)||(delta<0&&d>=5&&target<5));
  const kind=target>9||target<0?'big':small?'small':'direct', n=Math.abs(delta);
  const ctx=parent||{kind,group:++group,formula:fmtMove(d,Math.max(0,Math.min(9,target)),delta,kind,place),why:{en:kind==='big'?T.en.tenWhy(n):kind==='small'?T.en.fiveWhy(n):T.en.directWhy,zh:kind==='big'?T.zh.tenWhy(n):kind==='small'?T.zh.fiveWhy(n):T.zh.directWhy}};
  if(kind==='big'){
    const complement=10-n;
    if(delta>0){process(place+1,1,ctx);change(place,d-complement,ctx)}
    else{process(place+1,-1,ctx);change(place,d+complement,ctx)}
  }else change(place,target,ctx);
 }
 for(let place=4;place>=0;place--){const d=Math.floor(b/10**place)%10;if(d)process(place,(op==='+'?1:-1)*d)}
 if(readDigits(ds)!==final)throw Error('mismatch');
 out.push({digits:[...ds],kind:'subtotal',formula:`${a} ${prettyOp(op)} ${b} = ${final}`,focus:-1,moveType:null,amount:0,text:{en:T.en.subtotal(a,op,b,final),zh:T.zh.subtotal(a,op,b,final)},why:{en:'Watch the new total on the abacus.',zh:'看看算盘上的新数字。'}});
 return out;
}
function buildGroups(a,op,b){
 if(op==='*'&&b>12&&a<=12)[a,b]=[b,a];
 if(op==='*'&&(a>MAX||b>12))throw Error('limit');
 if(op==='/'&&b===0)throw Error('zero');
 if(op==='/'&&(a%b!==0))throw Error('whole');
 const times=op==='*'?b:a/b,unit=op==='*'?a:b,answer=op==='*'?a*b:a/b,isMul=op==='*';
 if(times>12||answer>MAX||answer<0)throw Error('limit');
 const out=[baseStep(isMul?0:a,`${a} ${prettyOp(op)} ${b} = ?`,'start')];
 out[0].why={en:T.en.groupWhy(isMul),zh:T.zh.groupWhy(isMul)};
 let n=isMul?0:a;
 for(let i=1;i<=times;i++){
   const next=isMul?n+unit:n-unit;
   for(const s of buildSteps(n,isMul?'+':'-',unit).slice(1,-1))out.push({...s,stage:i});
   n=next;
   out.push({digits:digits(n),kind:'group',formula:isMul?`${unit} × ${i} = ${n}`:`${a} − ${unit} × ${i} = ${n}`,focus:-1,moveType:null,text:{en:T.en.groupText(i,times,unit,isMul,n),zh:T.zh.groupText(i,times,unit,isMul,n)},why:{en:T.en.groupWhy(isMul),zh:T.zh.groupWhy(isMul)}});
 }
 if(!isMul){out.push({digits:digits(0),kind:'quotient',formula:`${a} ÷ ${b} = ${answer}`,focus:-1,moveType:null,text:{en:T.en.quotientText(answer),zh:T.zh.quotientText(answer)},why:{en:T.en.groupWhy(false),zh:T.zh.groupWhy(false)}});
  for(const s of buildSteps(0,'+',answer).slice(1,-1))out.push(s);
 }
 if(readDigits(out.at(-1).digits)!==answer)throw Error('mismatch');
 out.push({digits:digits(answer),kind:'subtotal',formula:`${a} ${prettyOp(op)} ${b} = ${answer}`,focus:-1,moveType:null,text:{en:T.en.subtotal(a,'+',0,answer),zh:T.zh.subtotal(a,'+',0,answer)},why:{en:T.en.groupWhy(isMul),zh:T.zh.groupWhy(isMul)}});
 return out;
}
function parseExpression(raw){
 const clean=raw.replace(/[，,]/g,'').replace(/[－—–−]/g,'-').replace(/[＋]/g,'+').replace(/[×xX＊]/g,'*').replace(/[÷／]/g,'/').replace(/\s/g,'');
 if(!/^\d+(?:[+\-*/]\d+)*$/.test(clean))throw Error('error');
 const tokens=clean.match(/\d+|[+\-*/]/g), count=(tokens.length+1)/2;
 if(count>MAX_OPERANDS)throw Error('tooLong');
 const values=tokens.filter((_,i)=>i%2===0).map(Number),ops=tokens.filter((_,i)=>i%2===1);
 if(values.some(n=>!Number.isSafeInteger(n)||n>MAX))throw Error('limit');
 let groups=[],cur={sign:1,nums:[values[0]],ops:[]};
 for(let i=0;i<ops.length;i++){
  let op=ops[i],b=values[i+1];
  if(op==='+'||op==='-'){groups.push(cur);cur={sign:op==='+'?1:-1,nums:[b],ops:[]}}
  else{cur.ops.push(op);cur.nums.push(b)}
 }
 groups.push(cur);
 let total=0;
 for(let g of groups){let term=g.nums[0];
  for(let i=0;i<g.ops.length;i++){
   let b=g.nums[i+1],op=g.ops[i];
   if(op==='/'&&b===0)throw Error('zero');if(op==='/'&&term%b!==0)throw Error('whole');
   if(op==='*'&&Math.min(term,b)>12||op==='/'&&(term/b>12))throw Error('limit');
   term=op==='*'?term*b:term/b;
   if(!Number.isInteger(term)||term>MAX||term<0)throw Error('limit');
  }
  g.value=term;
  total+=g.sign*term;
  if(total<0)throw Error('nonnegative');if(total>MAX)throw Error('limit');
 }
 return{groups,answer:total,expression:displayExpr(clean),count};
}
function buildExpression(parsed){
 const out=[];let running=0,opNo=0;
 for(let k=0;k<parsed.groups.length;k++){
  const g=parsed.groups[k];let term=g.nums[0];
  if(g.ops.length){for(let i=0;i<g.ops.length;i++){
     const op=g.ops[i],b=g.nums[i+1];
     const sub=buildGroups(term,op,b);
     opNo++;
     for(let j=0;j<sub.length;j++)out.push({...sub[j],operation:opNo,phase:`${term} ${prettyOp(op)} ${b}`,part:k+1});
     term=op==='*'?term*b:term/b;
   }}
  if(k===0){if(!g.ops.length)out.push({...baseStep(term,parsed.expression+' = ?'),operation:1,phase:parsed.expression,part:1});running=term;continue}
  if(g.ops.length)out.push({digits:digits(running),kind:'start',formula:`${running} ${g.sign>0?'+':'−'} ${term}`,focus:-1,moveType:null,operation:opNo+1,part:k+1,phase:{en:'Main calculation',zh:'主算式'},text:{en:T.en.reset(running),zh:T.zh.reset(running)},why:{en:T.en.startWhy,zh:T.zh.startWhy}});
  const signOp=g.sign>0?'+':'-', sub=buildSteps(running,signOp,term),previous=running;
  opNo++;
  for(const s of sub.slice(1))out.push({...s,operation:opNo,part:k+1,phase:`${previous} ${prettyOp(signOp)} ${term}`});
  running+=g.sign*term;
 }
 if(!out.length)out.push({...baseStep(running,parsed.expression),operation:1,part:1});
 out.push({digits:digits(parsed.answer),kind:'finished',formula:`${parsed.expression} = ${parsed.answer}`,focus:-1,moveType:null,operation:Math.max(1,opNo),part:parsed.groups.length,phase:{en:'Finished',zh:'已完成'},text:{en:T.en.finished(parsed.answer),zh:T.zh.finished(parsed.answer)},why:{en:'Every step is complete. Nice work!',zh:'全部算完啦！'}});
 if(readDigits(out.at(-1).digits)!==parsed.answer)throw Error('mismatch');
 if(out.length>3500)throw Error('limit');
 return out;
}
let rodRefs=[];
function rodHTML(place){return `<div class="rod" data-place="${place}"><div class="rod-label"></div><button type="button" class="bead upper off" data-bead="upper" aria-pressed="false"></button>${[0,1,2,3].map(i=>`<button type="button" class="bead lower" data-bead="lower" data-lower="${i}" style="--i:${i}" aria-pressed="false"></button>`).join('')}<div class="digit">0</div></div>`}
function setupBoard(){$('abacusInner').insertAdjacentHTML('beforeend',[4,3,2,1,0].map(rodHTML).join(''));for(let place=0;place<5;place++){
 const el=document.querySelector(`.rod[data-place="${place}"]`);
 rodRefs[place]={el,upper:el.querySelector('.upper'),lower:[...el.querySelectorAll('.lower')],label:el.querySelector('.rod-label'),digit:el.querySelector('.digit')};
 el.addEventListener('click',ev=>{const b=ev.target.closest('.bead');if(!tryMode||!b)return;
  const old=tryDigits[place];let high=old>=5?5:0,low=old%5;
  if(b.dataset.bead==='upper')high=high===5?0:5;
  else{let j=Number(b.dataset.lower);low=j<low?j:j+1}
  tryDigits[place]=high+low;lastMove={focus:place,moveType:b.dataset.bead,amount:tryDigits[place]-old};
  $('answerInput').value='';$('feedback').textContent='';hideMascot();renderBoard(tryDigits,lastMove);
 });
 }}
function renderBoard(ds,step){for(let place=0;place<5;place++){
 const r=rodRefs[place],v=ds[place],upper=v>=5,lower=v%5;
 r.label.textContent=lang==='zh'?['个','十','百','千','万'][place]:['1','10','100','1k','10k'][place];
 r.digit.textContent=v;r.el.classList.toggle('focus',step?.focus===place);
 r.upper.classList.toggle('on',upper);r.upper.classList.toggle('off',!upper);r.upper.classList.toggle('moved',step?.focus===place&&step?.moveType==='upper');r.upper.setAttribute('aria-pressed',String(upper));r.upper.tabIndex=tryMode?0:-1;
 r.lower.forEach((b,j)=>{let on=j<lower;b.classList.toggle('on',on);const amount=step?.amount||0;
 const moved=step?.focus===place&&step?.moveType==='lower'&&(amount>0?j>=lower-amount&&j<lower:amount<0?j>=lower&&j<lower-amount:false);
 b.classList.toggle('moved',moved);b.setAttribute('aria-pressed',String(on));b.tabIndex=tryMode?0:-1;});
 }$('currentValue').textContent=readDigits(ds).toLocaleString('en-US');
}
function buttonText(id,value){const el=$(id),span=el.querySelector('[data-label]');if(span)span.textContent=value;else el.textContent=value}
function translateUI(){const t=T[lang];document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 $('questionLabel').textContent=t.question;$('solveBtn').textContent=t.show;buttonText('randomBtn',t.new);$('termsLabel').textContent=t.terms;$('randHint').textContent=t.random;
 $('showsLabel').textContent=t.shows;$('beadInstruction').textContent=t.beads;$('guideMode').textContent=t.guide;$('tryMode').textContent=t.try;
 $('voiceLabel').textContent=voiceOn?t.voiceOn:t.voiceOff;$('voiceToggle').classList.toggle('off',!voiceOn);$('voiceToggle').setAttribute('aria-pressed',String(voiceOn));$('guideMode').setAttribute('aria-pressed',String(!tryMode));$('tryMode').setAttribute('aria-pressed',String(tryMode));buttonText('prevBtn',t.prev);buttonText('nextBtn',t.next);
 $('answerInput').placeholder=t.answer;buttonText('checkBtn',t.check);$('revealBtn').textContent=t.reveal;$('practiceHint').textContent=t.hint;
 $('aboutSummary').textContent=t.about;$('aboutText').textContent=t.aboutText;
 for(let i=1;i<=4;i++){const el=document.querySelector(`[data-level="${i}"]`);el.querySelector('b').textContent=(lang==='zh'?['基础','凑数','多位数','乘除']:['Basics','Friends','Multi-digit','× / ÷'])[i-1];el.querySelector('small').textContent=t.levels[i-1];el.classList.toggle('active',level===i);el.setAttribute('aria-pressed',String(level===i))}
 $('scoreLabel').textContent=lang==='zh'?'答对':'Correct';$('langEn').classList.toggle('selected',lang==='en');$('langZh').classList.toggle('selected',lang==='zh');$('langEn').setAttribute('aria-pressed',String(lang==='en'));$('langZh').setAttribute('aria-pressed',String(lang==='zh'));
 $('stars').textContent=String(stars);
 $('keypad').setAttribute('aria-label',lang==='zh'?'运算符':'Operators');
 document.querySelectorAll('.bead').forEach(b=>{const place=Number(b.closest('.rod').dataset.place),nm=labels[place][lang];b.setAttribute('aria-label',lang==='zh'?(b.dataset.bead==='upper'?`${nm}上珠（5）`:`${nm}下珠 ${Number(b.dataset.lower)+1}`):(b.dataset.bead==='upper'?`Upper 5-bead, ${nm}`:`Lower bead ${Number(b.dataset.lower)+1}, ${nm}`))});
 if(errKey)$('error').textContent=T[lang][errKey]||T[lang].error;
}
function render(){translateUI();$('expression').textContent=question?.expression||'';$('expression').title=question?.expression||'';
 $('guideMode').classList.toggle('active',!tryMode);$('tryMode').classList.toggle('active',tryMode);
 const s=steps[index],t=T[lang];if(!s)return;
 renderBoard(tryMode?tryDigits:s.digits,tryMode?lastMove:s);
 $('stepCounter').textContent=lang==='zh'?`第 ${index} 步，共 ${steps.length-1} 步`:`Step ${index} of ${steps.length-1}`;
 $('opCounter').textContent=typeof s.phase==='object'?s.phase[lang]:(s.phase||(lang==='zh'?'开始练习':'Let’s calculate'));
 $('progressFill').style.width=(index/Math.max(1,steps.length-1)*100)+'%';$('stepSlider').max=String(Math.max(1,steps.length-1));$('stepSlider').value=String(index);$('stepSlider').disabled=tryMode;
 const names={start:t.start,direct:t.direct,small:t.small,big:t.big,group:t.group,quotient:t.quotient,subtotal:t.calculate,finished:t.complete};
 $('formulaTag').textContent=names[s.kind]||t.calculate;$('formula').textContent=s.formula;$('moveDescription').textContent=tryMode?t.tryHelp:s.text[lang];$('whyDescription').textContent=tryMode?'':s.why[lang];
 $('explain').className='explain'+(s.kind==='small'?' small':s.kind==='big'?' big':'');
 $('prevBtn').disabled=tryMode||index===0;$('nextBtn').disabled=tryMode||index>=steps.length-1;
 $('playBtn').disabled=tryMode;buttonText('playBtn',timer?t.pause:t.play);$('playBtn').classList.toggle('is-playing',!!timer);
}
function stopPlay(){if(timer){clearTimeout(timer);timer=null}buttonText('playBtn',T[lang].play);$('playBtn').classList.remove('is-playing')}
function speak(msg,onend){if(!voiceOn||!window.speechSynthesis){onend&&onend();return}window.speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(msg);u.lang=lang==='zh'?'zh-CN':'en-US';u.rate=lang==='zh'?.88:.9;u.pitch=1.08;
 const voices=window.speechSynthesis.getVoices();const prefer=lang==='zh'?'zh':'en';u.voice=voices.find(v=>v.lang.toLowerCase().startsWith(prefer)&&v.localService)||voices.find(v=>v.lang.toLowerCase().startsWith(prefer))||null;
 if(onend){u.onend=onend;u.onerror=onend}
 window.speechSynthesis.speak(u);
}
function speakStep(onend){const s=steps[index];if(!s){onend&&onend();return}let math=s.formula.replace(/\+/g,lang==='zh'?' 加 ':' plus ').replace(/−/g,lang==='zh'?' 减 ':' minus ').replace(/×/g,lang==='zh'?' 乘 ':' times ').replace(/÷/g,lang==='zh'?' 除以 ':' divided by ').replace(/=/g,lang==='zh'?' 等于 ':' equals ');
 const t=lang==='zh'?`口诀：${math}。${s.why.zh} ${s.text.zh}`:`Formula: ${math}. ${s.why.en} ${s.text.en}`;speak(tryMode?T[lang].tryHelp:t,onend);
}
function goStep(n,voice=true){if(tryMode)return;index=Math.min(steps.length-1,Math.max(0,n));render();if(voice&&voiceOn)speakStep()}
function autoPlay(){if(timer){stopPlay();return}if(tryMode||index>=steps.length-1)return;
 const tick=()=>{timer=null;if(index>=steps.length-1){render();return}
  goStep(index+1,false);if(index>=steps.length-1){if(voiceOn)speakStep();render();return}
  const voiced=voiceOn&&window.speechSynthesis;let done=false,mine;
  const next=()=>{if(done||timer!==mine)return;done=true;clearTimeout(mine);timer=setTimeout(tick,600);mine=timer};
  timer=mine=setTimeout(next,12000); /* safety net if speech never ends */
  if(voiced)speakStep(next);else{clearTimeout(mine);timer=mine=setTimeout(tick,1050)}
  render()};
 timer=setTimeout(tick,100);render()}
function setQuestion(raw,voice=false){try{
 const parsed=parseExpression(raw),newSteps=buildExpression(parsed);
 question=parsed;steps=newSteps;hideMascot();index=0;earned=false;revealed=false;tryDigits=digits(0);lastMove=null;stopPlay();
 $('question').value=parsed.expression;errKey='';$('error').textContent='';$('feedback').textContent='';$('feedback').classList.remove('bad');$('answerInput').value='';
 render();if(voice&&voiceOn)speakStep();return true;
 }catch(e){errKey=T[lang][e.message]?e.message:'error';$('error').textContent=T[lang][errKey];return false}}
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=arr=>arr[ri(0,arr.length-1)];
function makeRandom(count,lv){
 let segments=[];
 if(lv===1){let current=ri(1,8);segments.push(String(current));for(let i=1;i<count;i++){
  const choices=[];for(let target=0;target<=9;target++){if(target===current)continue;
    const b=Math.abs(target-current),op=target>current?'+':'-';
    try{let st=buildSteps(current,op,b);if(st.every(s=>!['small','big'].includes(s.kind)))choices.push([op,b,target])}catch(_e){}
  }
  if(!choices.length)choices.push(['+',0,current]);const [op,b,target]=pick(choices);segments.push(`${op} ${b}`);current=target;
 }}
 if(lv===2){let current=ri(2,15);segments.push(String(current));for(let i=1;i<count;i++){
  const add=current<7||(current<=80&&Math.random()<.55), b=ri(1,9),op=add?'+':'-';
  if(op==='-'&&current<b){segments.push(`+ ${b}`);current+=b}else{segments.push(`${op} ${b}`);current+=op==='+'?b:-b}
 }}
 if(lv===3){let current=ri(20,800);segments.push(String(current));for(let i=1;i<count;i++){
  const b=ri(10,Math.random()<.55?90:500),op=(Math.random()<.5||current<b)?'+':'-';
  if(op==='+'&&current+b>99000){segments.push('- '+b);current-=b}else{segments.push(`${op} ${b}`);current+=op==='+'?b:-b}
 }}
 if(lv===4){
  let current=0,used=0,paired=false;
  while(used<count){
   const remaining=count-used;
   const pair=remaining>=2&&(!paired&&remaining===2||Math.random()<.28);
   let term,termValue,units;
   if(pair){const a=ri(2,12),b=ri(2,10),isMul=Math.random()<.55;
     term=isMul?`${a} × ${b}`:`${a*b} ÷ ${b}`;termValue=isMul?a*b:a;units=2;paired=true;
   }else{termValue=ri(2,18);term=String(termValue);units=1}
   const op=used===0?'':current>=termValue&&Math.random()<.45?'−':'+';
   segments.push(`${op} ${term}`.trim());current=used===0?termValue:current+(op==='+'?termValue:-termValue);
   used+=units;
  }
 }

 return segments.join(' ').replace(/^\s+/,'');
}
function newQuestion(){stopPlay();const count=Number($('termCount').value);for(let i=0;i<70;i++){
 const expr=makeRandom(count,level);if(history.slice(-8).includes(expr))continue;
 if(setQuestion(expr,false)){history.push(expr);if(history.length>75)history.shift();return}
 }
 errKey='limit';$('error').textContent=T[lang].limit;
}
function showMascot(kind){const w=$('mascotWrap'),b=$('bubble');w.hidden=false;w.classList.remove('happy','try');b.classList.remove('pop');void w.offsetWidth;
 w.classList.add(kind);b.hidden=kind!=='try';if(kind==='try'){b.textContent=T[lang].tryAgain;b.classList.add('pop')}
 w.scrollIntoView?.({block:'nearest',behavior:'smooth'})}
function hideMascot(){$('mascotWrap').hidden=true;$('bubble').hidden=true;$('mascotWrap').classList.remove('happy','try')}
function enterMode(value){hideMascot();stopPlay();tryMode=value;save('mode',value?'try':'guide');lastMove=null;tryDigits=digits(0);$('answerInput').value='';$('feedback').textContent='';render()}
function checkAnswer(){const raw=$('answerInput').value.trim();let n;
 if(raw===''){if(!tryMode){hideMascot();$('feedback').textContent=T[lang].missing;$('feedback').classList.add('bad');return}n=readDigits(tryDigits)}
 else n=Number(raw);
 if(!Number.isInteger(n)||n<0){hideMascot();$('feedback').textContent=T[lang].missing;$('feedback').classList.add('bad');return}
 const correct=n===question.answer;
 $('feedback').classList.toggle('bad',!correct);
 let msg=correct?(earned||revealed?T[lang].correctAgain:T[lang].correct):T[lang].wrong(n);
 if(correct&&!earned&&!revealed){earned=true;stars++;try{localStorage.setItem('beadBuddyStarsV3',String(stars))}catch(_e){}$('stars').textContent=String(stars)}
 $('feedback').textContent=msg;showMascot(correct?'happy':'try');if(correct)speak(msg);
}
function init(){setupBoard();
 $('version').textContent=VERSION;
 voiceOn=load('voice')!=='0';tryMode=load('mode')==='try';
 const sl=load('lang'),sv=load('level'),st=load('terms');
 lang=sl==='en'||sl==='zh'?sl:(/^zh/i.test(navigator.language||'')?'zh':'en');
 if(['1','2','3','4'].includes(sv))level=Number(sv);
 if(st&&[...$('termCount').options].some(o=>o.value===st))$('termCount').value=st;
 $('termCount').addEventListener('change',()=>save('terms',$('termCount').value));
 document.querySelectorAll('[data-ins]').forEach(b=>b.addEventListener('click',()=>{const i=$('question'),a=i.selectionStart??i.value.length,z=i.selectionEnd??a,v=i.value.slice(0,a)+(a&&!/\s$/.test(i.value.slice(0,a))?' ':'')+b.dataset.ins+' ';i.value=v+i.value.slice(z);i.focus();i.setSelectionRange(v.length,v.length)}));
 $('backspaceBtn').addEventListener('click',()=>{const i=$('question');i.value=i.value.replace(/\s*[^\s]\s*$/,'');i.focus()});
 if('speechSynthesis' in window)window.speechSynthesis.addEventListener?.('voiceschanged',()=>window.speechSynthesis.getVoices());
 $('mathForm').addEventListener('submit',e=>{e.preventDefault();setQuestion($('question').value,true)});
 $('randomBtn').addEventListener('click',newQuestion);
 document.querySelectorAll('.level').forEach(el=>el.addEventListener('click',()=>{level=Number(el.dataset.level);save('level',level);newQuestion()}));
 $('langEn').addEventListener('click',()=>{lang='en';save('lang',lang);window.speechSynthesis?.cancel();render()});$('langZh').addEventListener('click',()=>{lang='zh';save('lang',lang);window.speechSynthesis?.cancel();render()});
 $('guideMode').addEventListener('click',()=>enterMode(false));$('tryMode').addEventListener('click',()=>enterMode(true));
 $('prevBtn').addEventListener('click',()=>{stopPlay();goStep(index-1)});$('nextBtn').addEventListener('click',()=>{stopPlay();goStep(index+1)});
 $('playBtn').addEventListener('click',autoPlay);
 $('voiceToggle').addEventListener('click',()=>{voiceOn=!voiceOn;save('voice',voiceOn?'1':'0');if(!voiceOn)window.speechSynthesis?.cancel();render()});
 $('stepSlider').addEventListener('input',e=>{stopPlay();goStep(Number(e.target.value),false)});$('stepSlider').addEventListener('change',()=>{if(voiceOn)speakStep()});
 $('answerInput').addEventListener('input',e=>{e.target.value=e.target.value.replace(/\D/g,'');hideMascot()});
 $('checkBtn').addEventListener('click',checkAnswer);$('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();checkAnswer()}});
 $('revealBtn').addEventListener('click',()=>{stopPlay();hideMascot();revealed=true;if(tryMode){tryDigits=digits(question.answer);lastMove=null}else index=steps.length-1;render();$('feedback').classList.remove('bad');$('feedback').textContent=T[lang].revealText(question.answer)});
 if(level!==1||load('level'))newQuestion();else setQuestion('8 + 5 - 3 + 12 - 7',false);
}
init();
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
window.BeadBuddyTest={buildSteps,buildGroups,parseExpression,buildExpression,makeRandom,setQuestion,newQuestion,readDigits,digits,getState:()=>({question,steps,index,level,tryMode,stars})};
})();
