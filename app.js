const zero = '+[]';
const one = '+!![]';

const number = n => n == 0 ? zero : Array.from({length: n}, () => one).join(" + ");
const fromString = s => s.split('').map(x => {
    if(!(x in map)){
        const charCode = x.charCodeAt(0);
        return `([] + [])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(charCode)})`;
    }
    return map[x]
}).join('+');

const map = {};
//object as number: NaN, as string, 1st index
map.a = '(+{}+[])[+!![]]';
//object as str: "[object Object]"
map.o = `({} + [])[${number(1)}]`;
map.b = `({} + [])[${number(2)}]`;
map.e = `({} + [])[${number(4)}]`;
map.c = `({} + [])[${number(5)}]`;
map.t = `({} + [])[${number(6)}]`;
map[' '] = `({} + [])[${number(7)}]`;
//true/false as strings
map.f = `(![] + [])[${number(0)}]`;
map.s = `(![] + [])[${number(3)}]`;
map.r = `(!![] + [])[${number(1)}]`;
map.u = `(!![] + [])[${number(2)}]`;
//Infinity as string
map.i = `((+!![]/+[])+[])[${number(3)}]`;
map.n = `((+!![]/+[])+[])[${number(1)}]`;
//toString constructor
map.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`;
map.g = `([] + ([]+[])[${fromString('constructor')}])[${number(14)}]`;
//Regexp constructor
map.p = `([] + (/-/)[${fromString('constructor')}])[${number(14)}]`
map['\\'] = `(/\\\\/ + [])[${number(1)}]`
//Getting letter from different number base systems
map.d = `(${number(13)})[${fromString("toString")}](${number(14)})`;
map.h = `(${number(17)})[${fromString("toString")}](${number(18)})`;
map.m = `(${number(22)})[${fromString("toString")}](${number(23)})`;
//Making a function to return 'C'
map.C = `((()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']}))[${number(2)}]`;

const compiler = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;

console.log(compiler(`
//CODE HERE
`));