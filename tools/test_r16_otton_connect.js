/* R16 - validação isolada dos 39 estágios do Otton Connect. */
'use strict';
const fs=require('fs');
const vm=require('vm');
const src=fs.readFileSync('src/modules/04-education-daily-quiz.js','utf8');
const start=src.indexOf('  const WORD_BANK=['), end=src.indexOf('  function subjectLevelRecord',start);
if(start<0||end<0)throw new Error('Bloco pedagógico R16 não encontrado.');
const block=src.slice(start,end)+`\nthis.API={SUBJECT_LEVELS,educationStageCode,educationStageData,educationStageCriteria,educationStageRoundCount,generateEducationRounds};`;
const context={clamp:(value,min,max)=>Math.max(min,Math.min(max,value)),console};
vm.createContext(context);vm.runInContext(block,context);
const {API}=context,fail=[];let questions=0;
for(const subject of ['math','portuguese','english']){
  const stages=API.SUBJECT_LEVELS[subject]||[];
  if(stages.length!==13)fail.push(`${subject}: esperado 13 estágios, recebido ${stages.length}`);
  for(let level=1;level<=stages.length;level++){
    const rounds=API.generateEducationRounds(subject,level,16000+level,8);
    if(rounds.length!==8)fail.push(`${subject}/${level}: quantidade de tarefas inválida`);
    for(const q of rounds){
      questions++;
      if(!q.prompt||q.answer===undefined)fail.push(`${subject}/${level}: questão incompleta`);
      if(q.kind==='choice'&&(!Array.isArray(q.options)||q.options.length<2||!q.options.some(v=>String(v).toUpperCase()===String(q.answer).toUpperCase())))fail.push(`${subject}/${level}: alternativas inválidas`);
      if(q.kind==='sequence'&&(!Array.isArray(q.tokens)||!q.tokens.length))fail.push(`${subject}/${level}: sequência inválida`);
    }
  }
}
const result={passed:fail.length===0,subjects:3,stages:39,questionsValidated:questions,codes:['M0','M12','P0','P12','I0','I12'],fail};
console.log(JSON.stringify(result,null,2));
process.exit(result.passed?0:1);
