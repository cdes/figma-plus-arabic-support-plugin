!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){"use strict";var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var e,i=(function(C){!function(t){var r,e=Object.prototype,f=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},s=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",n=i.toStringTag||"@@toStringTag",o=t.regeneratorRuntime;if(o)C.exports=o;else{(o=t.regeneratorRuntime=C.exports).wrap=y;var m="suspendedStart",h="suspendedYield",d="executing",u="completed",p={},l={};l[s]=function(){return this};var c=Object.getPrototypeOf,g=c&&c(c(S([])));g&&g!==e&&f.call(g,s)&&(l=g);var v=k.prototype=x.prototype=Object.create(l);w.prototype=v.constructor=k,k.constructor=w,k[n]=w.displayName="GeneratorFunction",o.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},o.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,n in t||(t[n]="GeneratorFunction")),t.prototype=Object.create(v),t},o.awrap=function(t){return{__await:t}},_(L.prototype),L.prototype[a]=function(){return this},o.AsyncIterator=L,o.async=function(t,e,i,a){var s=new L(y(t,e,i,a));return o.isGeneratorFunction(e)?s:s.next().then(function(t){return t.done?t.value:s.next()})},_(v),v[n]="Generator",v[s]=function(){return this},v.toString=function(){return"[object Generator]"},o.keys=function(i){var a=[];for(var t in i)a.push(t);return a.reverse(),function t(){for(;a.length;){var e=a.pop();if(e in i)return t.value=e,t.done=!1,t}return t.done=!0,t}},o.values=S,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&f.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(i){if(this.done)throw i;var a=this;function t(t,e){return n.type="throw",n.arg=i,a.next=t,e&&(a.method="next",a.arg=r),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var s=this.tryEntries[e],n=s.completion;if("root"===s.tryLoc)return t("end");if(s.tryLoc<=this.prev){var o=f.call(s,"catchLoc"),l=f.call(s,"finallyLoc");if(o&&l){if(this.prev<s.catchLoc)return t(s.catchLoc,!0);if(this.prev<s.finallyLoc)return t(s.finallyLoc)}else if(o){if(this.prev<s.catchLoc)return t(s.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return t(s.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;0<=i;--i){var a=this.tryEntries[i];if(a.tryLoc<=this.prev&&f.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var s=a;break}}s&&("break"===t||"continue"===t)&&s.tryLoc<=e&&e<=s.finallyLoc&&(s=null);var n=s?s.completion:{};return n.type=t,n.arg=e,s?(this.method="next",this.next=s.finallyLoc,p):this.complete(n)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var i=this.tryEntries[e];if(i.finallyLoc===t)return this.complete(i.completion,i.afterLoc),O(i),p}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var i=this.tryEntries[e];if(i.tryLoc===t){var a=i.completion;if("throw"===a.type){var s=a.arg;O(i)}return s}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,i){return this.delegate={iterator:S(t),resultName:e,nextLoc:i},"next"===this.method&&(this.arg=r),p}}}function y(t,e,i,a){var n,o,l,r,s=e&&e.prototype instanceof x?e:x,f=Object.create(s.prototype),c=new T(a||[]);return f._invoke=(n=t,o=i,l=c,r=m,function(t,e){if(r===d)throw new Error("Generator is already running");if(r===u){if("throw"===t)throw e;return I()}for(l.method=t,l.arg=e;;){var i=l.delegate;if(i){var a=E(i,l);if(a){if(a===p)continue;return a}}if("next"===l.method)l.sent=l._sent=l.arg;else if("throw"===l.method){if(r===m)throw r=u,l.arg;l.dispatchException(l.arg)}else"return"===l.method&&l.abrupt("return",l.arg);r=d;var s=b(n,o,l);if("normal"===s.type){if(r=l.done?u:h,s.arg===p)continue;return{value:s.arg,done:l.done}}"throw"===s.type&&(r=u,l.method="throw",l.arg=s.arg)}}),f}function b(t,e,i){try{return{type:"normal",arg:t.call(e,i)}}catch(t){return{type:"throw",arg:t}}}function x(){}function w(){}function k(){}function _(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function L(r){var e;this._invoke=function(i,a){function t(){return new Promise(function(t,e){!function e(t,i,a,s){var n=b(r[t],r,i);if("throw"!==n.type){var o=n.arg,l=o.value;return l&&"object"==typeof l&&f.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,a,s)},function(t){e("throw",t,a,s)}):Promise.resolve(l).then(function(t){o.value=t,a(o)},function(t){return e("throw",t,a,s)})}s(n.arg)}(i,a,t,e)})}return e=e?e.then(t,t):t()}}function E(t,e){var i=t.iterator[e.method];if(i===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,E(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=b(i,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,p;var s=a.arg;return s?s.done?(e[t.resultName]=s.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,p):s:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(e){if(e){var t=e[s];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,a=function t(){for(;++i<e.length;)if(f.call(e,i))return t.value=e[i],t.done=!1,t;return t.value=r,t.done=!0,t};return a.next=a}}return{next:I}}function I(){return{value:r,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")())}(e={exports:{}},e.exports),e.exports),a=function(){return this||"object"==typeof self&&self}()||Function("return this")(),s=a.regeneratorRuntime&&0<=Object.getOwnPropertyNames(a).indexOf("regeneratorRuntime"),n=s&&a.regeneratorRuntime;a.regeneratorRuntime=void 0;var o=i;if(s)a.regeneratorRuntime=n;else try{delete a.regeneratorRuntime}catch(t){a.regeneratorRuntime=void 0}var f=o;function r(t,e,i,a,s,n,o){try{var l=t[n](o),r=l.value}catch(t){return void i(t)}l.done?e(r):Promise.resolve(r).then(a,s)}var l=function(l){return function(){var t=this,o=arguments;return new Promise(function(e,i){var a=l.apply(t,o);function s(t){r(a,e,i,s,n,"next",t)}function n(t){r(a,e,i,s,n,"throw",t)}s(void 0)})}};var c=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function m(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var h=function(t,e,i){return e&&m(t.prototype,e),i&&m(t,i),t},d=NaN,u="[object Symbol]",p=/^\s+|\s+$/g,g=/^[-+]0x[0-9a-f]+$/i,v=/^0b[01]+$/i,y=/^0o[0-7]+$/i,b=parseInt,x="object"==typeof t&&t&&t.Object===Object&&t,w="object"==typeof self&&self&&self.Object===Object&&self,k=x||w||Function("return this")(),_=Object.prototype.toString,L=Math.max,E=Math.min,j=function(){return k.Date.now()};function O(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function T(t){if("number"==typeof t)return t;if("symbol"==typeof(e=t)||(i=e)&&"object"==typeof i&&_.call(e)==u)return d;var e,i;if(O(t)){var a="function"==typeof t.valueOf?t.valueOf():t;t=O(a)?a+"":a}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(p,"");var s=v.test(t);return s||y.test(t)?b(t.slice(2),s?2:8):g.test(t)?d:+t}var S=function(a,s,t){var n,o,l,r,f,c,m=0,h=!1,d=!1,e=!0;if("function"!=typeof a)throw new TypeError("Expected a function");function u(t){var e=n,i=o;return n=o=void 0,m=t,r=a.apply(i,e)}function p(t){var e=t-c;return void 0===c||s<=e||e<0||d&&l<=t-m}function g(){var t,e,i=j();if(p(i))return v(i);f=setTimeout(g,(e=s-((t=i)-c),d?E(e,l-(t-m)):e))}function v(t){return f=void 0,e&&n?u(t):(n=o=void 0,r)}function i(){var t,e=j(),i=p(e);if(n=arguments,o=this,c=e,i){if(void 0===f)return m=t=c,f=setTimeout(g,s),h?u(t):r;if(d)return f=setTimeout(g,s),u(c)}return void 0===f&&(f=setTimeout(g,s)),r}return s=T(s)||0,O(t)&&(h=!!t.leading,l=(d="maxWait"in t)?L(T(t.maxWait)||0,s):l,e="trailing"in t?!!t.trailing:e),i.cancel=function(){void 0!==f&&clearTimeout(f),n=c=o=f=void(m=0)},i.flush=function(){return void 0===f?r:v(j())},i},I=function(i){return new Promise(function t(e){i()?e():setTimeout(function(){return t(e)},500)})},C=[{matches:["بسم ","الله ","الرحمن ","الرحيم"],forms:{isolated:"﷽"}},{matches:["جل جلاله"],forms:{isolated:"ﷻ"}},{matches:["صلى ","الله ","عليه ","وسلم"],forms:{isolated:"ﷺ"}},{matches:["الله"],forms:{isolated:"ﷲ"}},{matches:["أكبر"],forms:{isolated:"ﷳ"}},{matches:["عليه"],forms:{isolated:"ﷷ"}},{matches:["محمد"],forms:{isolated:"ﷴ"}},{matches:["رسول"],forms:{isolated:"ﷶ"}},{matches:["صلعم"],forms:{isolated:"ﷵ"}},{matches:["صلى"],forms:{isolated:"ﷹ"}},{matches:["وسلم"],forms:{isolated:"ﷸ"}},{matches:["ر[یي]ال"],forms:{isolated:"﷼"}},{matches:["عى"],forms:{isolated:"ﳷ",final:"ﴓ"}},{matches:["عج"],forms:{isolated:"ﰩ",initial:"ﲺ"}},{matches:["عجم"],forms:{initial:"ﷄ",final:"ﵵ"}},{matches:["عم"],forms:{isolated:"ﰪ",initial:"ﲻ"}},{matches:["عمى"],forms:{final:"ﵸ"}},{matches:["عمم"],forms:{initial:"ﵷ",final:"ﵶ"}},{matches:["عمي"],forms:{final:"ﶶ"}},{matches:["عي"],forms:{isolated:"ﳸ",final:"ﴔ"}},{matches:["ىٰ"],forms:{isolated:"ﱝ",final:"ﲐ"}},{matches:["اً"],forms:{isolated:"ﴽ",final:"ﴼ"}},{matches:["بى"],forms:{isolated:"ﰉ",final:"ﱮ"}},{matches:["بح"],forms:{isolated:"ﰆ",initial:"ﲝ"}},{matches:["بحي"],forms:{final:"ﷂ"}},{matches:["به"],forms:{initial:"ﲠ",medial:"ﳢ"}},{matches:["بج"],forms:{isolated:"ﰅ",initial:"ﲜ"}},{matches:["بخ"],forms:{isolated:"ﰇ",initial:"ﲞ"}},{matches:["بخي"],forms:{final:"ﶞ"}},{matches:["بم"],forms:{isolated:"ﰈ",initial:"ﲟ",medial:"ﳡ",final:"ﱬ"}},{matches:["بن"],forms:{final:"ﱭ"}},{matches:["بر"],forms:{final:"ﱪ"}},{matches:["عى"],forms:{isolated:"ﳷ",final:"ﴓ"}},{matches:["عج"],forms:{isolated:"ﰩ",initial:"ﲺ"}},{matches:["عجم"],forms:{inital:"ﷄ",final:"ﵵ"}},{matches:["عم"],forms:{isolated:"ﰪ",initial:"ﲻ"}},{matches:["عمى"],forms:{final:"ﵸ"}},{matches:["عمم"],forms:{initial:"ﵷ",final:"ﵶ"}},{matches:["عمي"],forms:{final:"ﶶ"}},{matches:["عي"],forms:{isolated:"ﳸ",final:"ﴔ"}},{matches:["ىٰ"],forms:{isolated:"ﱝ",final:"ﲐ"}},{matches:["اً"],forms:{isolated:"ﴽ",final:"ﴼ"}},{matches:["بى"],forms:{isolated:"ﰉ",final:"ﱮ"}},{matches:["بح"],forms:{isolated:"ﰆ",initial:"ﲝ"}},{matches:["بحي"],forms:{final:"ﷂ"}},{matches:["به"],forms:{initial:"ﲠ",medial:"ﳢ"}},{matches:["بج"],forms:{isolated:"ﰅ",initial:"ﲜ"}},{matches:["بخ"],forms:{isolated:"ﰇ",initial:"ﲞ"}},{matches:["بخي"],forms:{final:"ﶞ"}},{matches:["بم"],forms:{isolated:"ﰈ",initial:"ﲟ",medial:"ﳡ",final:"ﱬ"}},{matches:["بن"],forms:{final:"ﱭ"}},{matches:["بر"],forms:{final:"ﱪ"}},{matches:["بي"],forms:{isolated:"ﰊ",final:"ﱯ"}},{matches:["بز"],forms:{final:"ﱫ"}},{matches:["ضى"],forms:{isolated:"ﴇ",final:"ﴣ"}},{matches:["ضح"],forms:{isolated:"ﰣ",initial:"ﲵ"}},{matches:["ضحى"],forms:{final:"ﵮ"}},{matches:["ضحي"],forms:{final:"ﶫ"}},{matches:["ضج"],forms:{isolated:"ﰢ",initial:"ﲴ"}},{matches:["ضخ"],forms:{isolated:"ﰤ",initial:"ﲶ"}},{matches:["ضخم"],forms:{initial:"ﵰ",final:"ﵯ"}},{matches:["ضم"],forms:{isolated:"ﰥ",initial:"ﲷ"}},{matches:["ضر"],forms:{isolated:"ﴐ",final:"ﴬ"}},{matches:["ضي"],forms:{isolated:"ﴈ",final:"ﴤ"}},{matches:["فى"],forms:{isolated:"ﰱ",final:"ﱼ"}},{matches:["فح"],forms:{isolated:"ﰮ",initial:"ﲿ"}},{matches:["فج"],forms:{isolated:"ﰭ",initial:"ﲾ"}},{matches:["فخ"],forms:{isolated:"ﰯ",initial:"ﳀ"}},{matches:["فخم"],forms:{initial:"ﵽ",final:"ﵼ"}},{matches:["فم"],forms:{isolated:"ﰰ",initial:"ﳁ"}},{matches:["فمي"],forms:{final:"ﷁ"}},{matches:["في"],forms:{isolated:"ﰲ",final:"ﱽ"}},{matches:["غى"],forms:{isolated:"ﳹ",final:"ﴕ"}},{matches:["غج"],forms:{isolated:"ﰫ",initial:"ﲼ"}},{matches:["غم"],forms:{isolated:"ﰬ",initial:"ﲽ"}},{matches:["غمى"],forms:{final:"ﵻ"}},{matches:["غمم"],forms:{final:"ﵹ"}},{matches:["غمي"],forms:{final:"ﵺ"}},{matches:["غي"],forms:{isolated:"ﳺ",final:"ﴖ"}},{matches:["حى"],forms:{isolated:"ﳿ",final:"ﴛ"}},{matches:["حج"],forms:{isolated:"ﰗ",initial:"ﲩ"}},{matches:["حجي"],forms:{final:"ﶿ"}},{matches:["حم"],forms:{isolated:"ﰘ",initial:"ﲪ"}},{matches:["حمى"],forms:{final:"ﵛ"}},{matches:["حمي"],forms:{final:"ﵚ"}},{matches:["حي"],forms:{isolated:"ﴀ",final:"ﴜ"}},{matches:["هى"],forms:{isolated:"ﱓ"}},{matches:["هج"],forms:{isolated:"ﱑ",initial:"ﳗ"}},{matches:["هم"],forms:{isolated:"ﱒ",initial:"ﳘ"}},{matches:["همج"],forms:{initial:"ﶓ"}},{matches:["همم"],forms:{initial:"ﶔ"}},{matches:["هٰ"],forms:{initial:"ﳙ"}},{matches:["هي"],forms:{isolated:"ﱔ"}},{matches:["جى"],forms:{isolated:"ﴁ",final:"ﴝ"}},{matches:["جح"],forms:{isolated:"ﰕ",initial:"ﲧ"}},{matches:["جحى"],forms:{final:"ﶦ"}},{matches:["جحي"],forms:{final:"ﶾ"}},{matches:["جم"],forms:{isolated:"ﰖ",initial:"ﲨ"}},{matches:["جمى"],forms:{final:"ﶧ"}},{matches:["جمح"],forms:{initial:"ﵙ",final:"ﵘ"}},{matches:["جمي"],forms:{final:"ﶥ"}},{matches:["جي"],forms:{isolated:"ﴂ",final:"ﴞ"}},{matches:["كا"],forms:{isolated:"ﰷ",final:"ﲀ"}},{matches:["كى"],forms:{isolated:"ﰽ",final:"ﲃ"}},{matches:["كح"],forms:{isolated:"ﰹ",initial:"ﳅ"}},{matches:["كج"],forms:{isolated:"ﰸ",initial:"ﳄ"}},{matches:["كخ"],forms:{isolated:"ﰺ",initial:"ﳆ"}},{matches:["كل"],forms:{isolated:"ﰻ",initial:"ﳇ",medial:"ﳫ",final:"ﲁ"}},{matches:["كم"],forms:{isolated:"ﰼ",initial:"ﳈ",medial:"ﳬ",final:"ﲂ"}},{matches:["كمم"],forms:{initial:"ﷃ",final:"ﶻ"}},{matches:["كمي"],forms:{final:"ﶷ"}},{matches:["كي"],forms:{isolated:"ﰾ",final:"ﲄ"}},{matches:["خى"],forms:{isolated:"ﴃ",final:"ﴟ"}},{matches:["خح"],forms:{isolated:"ﰚ"}},{matches:["خج"],forms:{isolated:"ﰙ",initial:"ﲫ"}},{matches:["خم"],forms:{isolated:"ﰛ",initial:"ﲬ"}},{matches:["خي"],forms:{isolated:"ﴄ",final:"ﴠ"}},{matches:["لا"],forms:{isolated:"ﻻ",final:"ﻼ"}},{matches:["لى"],forms:{isolated:"ﱃ",final:"ﲆ"}},{matches:["لأ"],forms:{isolated:"ﻷ",final:"ﻸ"}},{matches:["لإ"],forms:{isolated:"ﻹ",final:"ﻺ"}},{matches:["لآ"],forms:{isolated:"ﻵ",final:"ﻶ"}},{matches:["لح"],forms:{isolated:"ﱀ",initial:"ﳊ"}},{matches:["لحى"],forms:{final:"ﶂ"}},{matches:["لحم"],forms:{initial:"ﶵ",final:"ﶀ"}},{matches:["لحي"],forms:{final:"ﶁ"}},{matches:["له"],forms:{initial:"ﳍ"}},{matches:["لج"],forms:{isolated:"ﰿ",initial:"ﳉ"}},{matches:["لجج"],forms:{initial:"ﶃ",final:"ﶄ"}},{matches:["لجم"],forms:{initial:"ﶺ",final:"ﶼ"}},{matches:["لجي"],forms:{final:"ﶬ"}},{matches:["لخ"],forms:{isolated:"ﱁ",initial:"ﳋ"}},{matches:["لخم"],forms:{initial:"ﶆ",final:"ﶅ"}},{matches:["لم"],forms:{isolated:"ﱂ",initial:"ﳌ",medial:"ﳭ",final:"ﲅ"}},{matches:["لمح"],forms:{initial:"ﶈ",final:"ﶇ"}},{matches:["لمي"],forms:{final:"ﶭ"}},{matches:["لي"],forms:{isolated:"ﱄ",final:"ﲇ"}},{matches:["ما"],forms:{final:"ﲈ"}},{matches:["مى"],forms:{isolated:"ﱉ"}},{matches:["مح"],forms:{isolated:"ﱆ",initial:"ﳏ"}},{matches:["محج"],forms:{initial:"ﶉ"}},{matches:["محم"],forms:{initial:"ﶊ"}},{matches:["محي"],forms:{final:"ﶋ"}},{matches:["مج"],forms:{isolated:"ﱅ",initial:"ﳎ"}},{matches:["مجح"],forms:{initial:"ﶌ"}},{matches:["مجخ"],forms:{initial:"ﶒ"}},{matches:["مجم"],forms:{initial:"ﶍ"}},{matches:["مجي"],forms:{final:"ﷀ"}},{matches:["مخ"],forms:{isolated:"ﱇ",initial:"ﳐ"}},{matches:["مخج"],forms:{initial:"ﶎ"}},{matches:["مخم"],forms:{initial:"ﶏ"}},{matches:["مخي"],forms:{final:"ﶹ"}},{matches:["مم"],forms:{isolated:"ﱈ",initial:"ﳑ",final:"ﲉ"}},{matches:["ممي"],forms:{final:"ﶱ"}},{matches:["مي"],forms:{isolated:"ﱊ"}},{matches:["نى"],forms:{isolated:"ﱏ",final:"ﲎ"}},{matches:["نح"],forms:{isolated:"ﱌ",initial:"ﳓ"}},{matches:["نحى"],forms:{final:"ﶖ"}},{matches:["نحم"],forms:{initial:"ﶕ"}},{matches:["نحي"],forms:{final:"ﶳ"}},{matches:["نه"],forms:{initial:"ﳖ",medial:"ﳯ"}},{matches:["نج"],forms:{isolated:"ﱋ",initial:"ﳒ"}},{matches:["نجى"],forms:{final:"ﶙ"}},{matches:["نجح"],forms:{initial:"ﶸ",final:"ﶽ"}},{matches:["نجم"],forms:{initial:"ﶘ",final:"ﶗ"}},{matches:["نجي"],forms:{final:"ﷇ"}},{matches:["نخ"],forms:{isolated:"ﱍ",initial:"ﳔ"}},{matches:["نم"],forms:{isolated:"ﱎ",initial:"ﳕ",medial:"ﳮ",final:"ﲌ"}},{matches:["نمى"],forms:{final:"ﶛ"}},{matches:["نمي"],forms:{final:"ﶚ"}},{matches:["نن"],forms:{final:"ﲍ"}},{matches:["نر"],forms:{final:"ﲊ"}},{matches:["ني"],forms:{isolated:"ﱐ",final:"ﲏ"}},{matches:["نز"],forms:{final:"ﲋ"}},{matches:["قى"],forms:{isolated:"ﰵ",final:"ﱾ"}},{matches:["قح"],forms:{isolated:"ﰳ",initial:"ﳂ"}},{matches:["قم"],forms:{isolated:"ﰴ",initial:"ﳃ"}},{matches:["قمح"],forms:{initial:"ﶴ",final:"ﵾ"}},{matches:["قمم"],forms:{final:"ﵿ"}},{matches:["قمي"],forms:{final:"ﶲ"}},{matches:["قي"],forms:{isolated:"ﰶ",final:"ﱿ"}},{matches:["رٰ"],forms:{isolated:"ﱜ"}},{matches:["صى"],forms:{isolated:"ﴅ",final:"ﴡ"}},{matches:["صح"],forms:{isolated:"ﰠ",initial:"ﲱ"}},{matches:["صحح"],forms:{initial:"ﵥ",final:"ﵤ"}},{matches:["صحي"],forms:{final:"ﶩ"}},{matches:["صخ"],forms:{initial:"ﲲ"}},{matches:["صم"],forms:{isolated:"ﰡ",initial:"ﲳ"}},{matches:["صمم"],forms:{initial:"ﷅ",final:"ﵦ"}},{matches:["صر"],forms:{isolated:"ﴏ",final:"ﴫ"}},{matches:["صي"],forms:{isolated:"ﴆ",final:"ﴢ"}},{matches:["سى"],forms:{isolated:"ﳻ",final:"ﴗ"}},{matches:["سح"],forms:{isolated:"ﰝ",initial:"ﲮ",medial:"ﴵ"}},{matches:["سحج"],forms:{initial:"ﵜ"}},{matches:["سه"],forms:{initial:"ﴱ",medial:"ﳨ"}},{matches:["سج"],forms:{isolated:"ﰜ",initial:"ﲭ",medial:"ﴴ"}},{matches:["سجى"],forms:{final:"ﵞ"}},{matches:["سجح"],forms:{initial:"ﵝ"}},{matches:["سخ"],forms:{isolated:"ﰞ",initial:"ﲯ",medial:"ﴶ"}},{matches:["سخى"],forms:{final:"ﶨ"}},{matches:["سخي"],forms:{final:"ﷆ"}},{matches:["سم"],forms:{isolated:"ﰟ",initial:"ﲰ",medial:"ﳧ"}},{matches:["سمح"],forms:{initial:"ﵠ",final:"ﵟ"}},{matches:["سمج"],forms:{initial:"ﵡ"}},{matches:["سمم"],forms:{initial:"ﵣ",final:"ﵢ"}},{matches:["سر"],forms:{isolated:"ﴎ",final:"ﴪ"}},{matches:["سي"],forms:{isolated:"ﳼ",final:"ﴘ"}},{matches:["ـُّ"],forms:{medial:"ﳳ"}},{matches:["ـَّ"],forms:{medial:"ﳲ"}},{matches:["ـِّ"],forms:{medial:"ﳴ"}},{matches:["شى"],forms:{isolated:"ﳽ",final:"ﴙ"}},{matches:["شح"],forms:{isolated:"ﴊ",initial:"ﴮ",medial:"ﴸ",final:"ﴦ"}},{matches:["شحم"],forms:{initial:"ﵨ",final:"ﵧ"}},{matches:["شحي"],forms:{final:"ﶪ"}},{matches:["شه"],forms:{initial:"ﴲ",medial:"ﳪ"}},{matches:["شج"],forms:{isolated:"ﴉ",initial:"ﴭ",medial:"ﴷ",final:"ﴥ"}},{matches:["شجي"],forms:{final:"ﵩ"}},{matches:["شخ"],forms:{isolated:"ﴋ",initial:"ﴯ",medial:"ﴹ",final:"ﴧ"}},{matches:["شم"],forms:{isolated:"ﴌ",initial:"ﴰ",medial:"ﳩ",final:"ﴨ"}},{matches:["شمخ"],forms:{initial:"ﵫ",final:"ﵪ"}},{matches:["شمم"],forms:{initial:"ﵭ",final:"ﵬ"}},{matches:["شر"],forms:{isolated:"ﴍ",final:"ﴩ"}},{matches:["شي"],forms:{isolated:"ﳾ",final:"ﴚ"}},{matches:["طى"],forms:{isolated:"ﳵ",final:"ﴑ"}},{matches:["طح"],forms:{isolated:"ﰦ",initial:"ﲸ"}},{matches:["طم"],forms:{isolated:"ﰧ",initial:"ﴳ",medial:"ﴺ"}},{matches:["طمح"],forms:{initial:"ﵲ",final:"ﵱ"}},{matches:["طمم"],forms:{initial:"ﵳ"}},{matches:["طمي"],forms:{final:"ﵴ"}},{matches:["طي"],forms:{isolated:"ﳶ",final:"ﴒ"}},{matches:["تى"],forms:{isolated:"ﰏ",final:"ﱴ"}},{matches:["تح"],forms:{isolated:"ﰌ",initial:"ﲢ"}},{matches:["تحج"],forms:{initial:"ﵒ",final:"ﵑ"}},{matches:["تحم"],forms:{initial:"ﵓ"}},{matches:["ته"],forms:{initial:"ﲥ",medial:"ﳤ"}},{matches:["تج"],forms:{isolated:"ﰋ",initial:"ﲡ"}},{matches:["تجى"],forms:{final:"ﶠ"}},{matches:["تجم"],forms:{initial:"ﵐ"}},{matches:["تجي"],forms:{final:"ﶟ"}},{matches:["تخ"],forms:{isolated:"ﰍ",initial:"ﲣ"}},{matches:["تخى"],forms:{final:"ﶢ"}},{matches:["تخم"],forms:{initial:"ﵔ"}},{matches:["تخي"],forms:{final:"ﶡ"}},{matches:["تم"],forms:{isolated:"ﰎ",initial:"ﲤ",medial:"ﳣ",final:"ﱲ"}},{matches:["تمى"],forms:{final:"ﶤ"}},{matches:["تمح"],forms:{initial:"ﵖ"}},{matches:["تمج"],forms:{initial:"ﵕ"}},{matches:["تمخ"],forms:{initial:"ﵗ"}},{matches:["تمي"],forms:{final:"ﶣ"}},{matches:["تن"],forms:{final:"ﱳ"}},{matches:["تر"],forms:{final:"ﱰ"}},{matches:["تي"],forms:{isolated:"ﰐ",final:"ﱵ"}},{matches:["تز"],forms:{final:"ﱱ"}},{matches:["ذٰ"],forms:{isolated:"ﱛ"}},{matches:["ثى"],forms:{isolated:"ﰓ",final:"ﱺ"}},{matches:["ثه"],forms:{medial:"ﳦ"}},{matches:["ثج"],forms:{isolated:"ﰑ"}},{matches:["ثم"],forms:{isolated:"ﰒ",initial:"ﲦ",medial:"ﳥ",final:"ﱸ"}},{matches:["ثن"],forms:{final:"ﱹ"}},{matches:["ثر"],forms:{final:"ﱶ"}},{matches:["ثي"],forms:{isolated:"ﰔ",final:"ﱻ"}},{matches:["ثز"],forms:{final:"ﱷ"}},{matches:["ئى"],forms:{isolated:"ﯹ",initial:"ﯻ",final:"ﯺ"}},{matches:["يى"],forms:{isolated:"ﱙ",final:"ﲕ"}},{matches:["يح"],forms:{isolated:"ﱖ",initial:"ﳛ"}},{matches:["يحي"],forms:{final:"ﶮ"}},{matches:["ئە"],forms:{isolated:"ﯬ",final:"ﯭ"}},{matches:["ئا"],forms:{isolated:"ﯪ",final:"ﯫ"}},{matches:["ئى"],forms:{isolated:"ﰃ",final:"ﱨ"}},{matches:["ئې"],forms:{isolated:"ﯶ",initial:"ﯸ",final:"ﯷ"}},{matches:["ئح"],forms:{isolated:"ﰁ",initial:"ﲘ"}},{matches:["ئه"],forms:{initial:"ﲛ",medial:"ﳠ"}},{matches:["ئج"],forms:{isolated:"ﰀ",initial:"ﲗ"}},{matches:["ئخ"],forms:{initial:"ﲙ"}},{matches:["ئم"],forms:{isolated:"ﰂ",initial:"ﲚ",medial:"ﳟ",final:"ﱦ"}},{matches:["ئن"],forms:{final:"ﱧ"}},{matches:["ئۆ"],forms:{isolated:"ﯲ",final:"ﯳ"}},{matches:["ئر"],forms:{final:"ﱤ"}},{matches:["ئۇ"],forms:{isolated:"ﯰ",final:"ﯱ"}},{matches:["ئو"],forms:{isolated:"ﯮ",final:"ﯯ"}},{matches:["ئي"],forms:{isolated:"ﰄ",final:"ﱩ"}},{matches:["ئۈ"],forms:{isolated:"ﯴ",final:"ﯵ"}},{matches:["ئز"],forms:{final:"ﱥ"}},{matches:["يه"],forms:{initial:"ﳞ",medial:"ﳱ"}},{matches:["يج"],forms:{isolated:"ﱕ",initial:"ﳚ"}},{matches:["يجي"],forms:{final:"ﶯ"}},{matches:["يخ"],forms:{isolated:"ﱗ",initial:"ﳜ"}},{matches:["يم"],forms:{isolated:"ﱘ",initial:"ﳝ",medial:"ﳰ",final:"ﲓ"}},{matches:["يمم"],forms:{initial:"ﶝ",final:"ﶜ"}},{matches:["يمي"],forms:{final:"ﶰ"}},{matches:["ين"],forms:{final:"ﲔ"}},{matches:["ير"],forms:{final:"ﲑ"}},{matches:["يي"],forms:{isolated:"ﱚ",final:"ﲖ"}},{matches:["يز"],forms:{final:"ﲒ"}},{matches:["ظم"],forms:{isolated:"ﰨ",initial:"ﲹ",medial:"ﴻ"}}],A={"ء":{isolated:"ﺀ"},"آ":{isolated:"ﺁ",final:"ﺂ"},"أ":{isolated:"ﺃ",final:"ﺄ"},"ؤ":{isolated:"ﺅ",final:"ﺆ"},"إ":{isolated:"ﺇ",final:"ﺈ"},"ئ":{isolated:"ﺉ",initial:"ﺋ",medial:"ﺌ",final:"ﺊ"},"ا":{isolated:"ﺍ",final:"ﺎ"},"ب":{isolated:"ﺏ",initial:"ﺑ",medial:"ﺒ",final:"ﺐ"},"ة":{isolated:"ﺓ",final:"ﺔ"},"ت":{isolated:"ﺕ",initial:"ﺗ",medial:"ﺘ",final:"ﺖ"},"ث":{isolated:"ﺙ",initial:"ﺛ",medial:"ﺜ",final:"ﺚ"},"ج":{isolated:"ﺝ",initial:"ﺟ",medial:"ﺠ",final:"ﺞ"},"ح":{isolated:"ﺡ",initial:"ﺣ",medial:"ﺤ",final:"ﺢ"},"خ":{isolated:"ﺥ",initial:"ﺧ",medial:"ﺨ",final:"ﺦ"},"د":{isolated:"ﺩ",final:"ﺪ"},"ذ":{isolated:"ﺫ",final:"ﺬ"},"ر":{isolated:"ﺭ",final:"ﺮ"},"ز":{isolated:"ﺯ",final:"ﺰ"},"س":{isolated:"ﺱ",initial:"ﺳ",medial:"ﺴ",final:"ﺲ"},"ش":{isolated:"ﺵ",initial:"ﺷ",medial:"ﺸ",final:"ﺶ"},"ص":{isolated:"ﺹ",initial:"ﺻ",medial:"ﺼ",final:"ﺺ"},"ض":{isolated:"ﺽ",initial:"ﺿ",medial:"ﻀ",final:"ﺾ"},"ط":{isolated:"ﻁ",initial:"ﻃ",medial:"ﻄ",final:"ﻂ"},"ظ":{isolated:"ﻅ",initial:"ﻇ",medial:"ﻈ",final:"ﻆ"},"ع":{isolated:"ﻉ",initial:"ﻋ",medial:"ﻌ",final:"ﻊ"},"غ":{isolated:"ﻍ",initial:"ﻏ",medial:"ﻐ",final:"ﻎ"},"ـ":{isolated:"ـ",initial:"ـ",medial:"ـ",final:"ـ"},"ف":{isolated:"ﻑ",initial:"ﻓ",medial:"ﻔ",final:"ﻒ"},"ق":{isolated:"ﻕ",initial:"ﻗ",medial:"ﻘ",final:"ﻖ"},"ك":{isolated:"ﻙ",initial:"ﻛ",medial:"ﻜ",final:"ﻚ"},"ل":{isolated:"ﻝ",initial:"ﻟ",medial:"ﻠ",final:"ﻞ"},"م":{isolated:"ﻡ",initial:"ﻣ",medial:"ﻤ",final:"ﻢ"},"ن":{isolated:"ﻥ",initial:"ﻧ",medial:"ﻨ",final:"ﻦ"},"ه":{isolated:"ﻩ",initial:"ﻫ",medial:"ﻬ",final:"ﻪ"},"و":{isolated:"ﻭ",final:"ﻮ"},"ى":{isolated:"ﻯ",final:"ﻰ"},"ي":{isolated:"ﻱ",initial:"ﻳ",medial:"ﻴ",final:"ﻲ"},"ٱ":{isolated:"ﭐ",final:"ﭑ"},"ٷ":{isolated:"ﯝ"},"ٹ":{isolated:"ﭦ",initial:"ﭨ",medial:"ﭩ",final:"ﭧ"},"ٺ":{isolated:"ﭞ",initial:"ﭠ",medial:"ﭡ",final:"ﭟ"},"ٻ":{isolated:"ﭒ",initial:"ﭔ",medial:"ﭕ",final:"ﭓ"},"پ":{isolated:"ﭖ",initial:"ﭘ",medial:"ﭙ",final:"ﭗ"},"ٿ":{isolated:"ﭢ",initial:"ﭤ",medial:"ﭥ",final:"ﭣ"},"ڀ":{isolated:"ﭚ",initial:"ﭜ",medial:"ﭝ",final:"ﭛ"},"ڃ":{isolated:"ﭶ",initial:"ﭸ",medial:"ﭹ",final:"ﭷ"},"ڄ":{isolated:"ﭲ",initial:"ﭴ",medial:"ﭵ",final:"ﭳ"},"چ":{isolated:"ﭺ",initial:"ﭼ",medial:"ﭽ",final:"ﭻ"},"ڇ":{isolated:"ﭾ",initial:"ﮀ",medial:"ﮁ",final:"ﭿ"},"ڈ":{isolated:"ﮈ",final:"ﮉ"},"ڌ":{isolated:"ﮄ",final:"ﮅ"},"ڍ":{isolated:"ﮂ",final:"ﮃ"},"ڎ":{isolated:"ﮆ",final:"ﮇ"},"ڑ":{isolated:"ﮌ",final:"ﮍ"},"ژ":{isolated:"ﮊ",final:"ﮋ"},"ڤ":{isolated:"ﭪ",initial:"ﭬ",medial:"ﭭ",final:"ﭫ"},"ڦ":{isolated:"ﭮ",initial:"ﭰ",medial:"ﭱ",final:"ﭯ"},"ک":{isolated:"ﮎ",initial:"ﮐ",medial:"ﮑ",final:"ﮏ"},"ڭ":{isolated:"ﯓ",initial:"ﯕ",medial:"ﯖ",final:"ﯔ"},"گ":{isolated:"ﮒ",initial:"ﮔ",medial:"ﮕ",final:"ﮓ"},"ڱ":{isolated:"ﮚ",initial:"ﮜ",medial:"ﮝ",final:"ﮛ"},"ڳ":{isolated:"ﮖ",initial:"ﮘ",medial:"ﮙ",final:"ﮗ"},"ں":{isolated:"ﮞ",final:"ﮟ"},"ڻ":{isolated:"ﮠ",initial:"ﮢ",medial:"ﮣ",final:"ﮡ"},"ھ":{isolated:"ﮪ",initial:"ﮬ",medial:"ﮭ",final:"ﮫ"},"ۀ":{isolated:"ﮤ",final:"ﮥ"},"ہ":{isolated:"ﮦ",initial:"ﮨ",medial:"ﮩ",final:"ﮧ"},"ۅ":{isolated:"ﯠ",final:"ﯡ"},"ۆ":{isolated:"ﯙ",final:"ﯚ"},"ۇ":{isolated:"ﯗ",final:"ﯘ"},"ۈ":{isolated:"ﯛ",final:"ﯜ"},"ۉ":{isolated:"ﯢ",final:"ﯣ"},"ۋ":{isolated:"ﯞ",final:"ﯟ"},"ی":{isolated:"ﯼ",initial:"ﯾ",medial:"ﯿ",final:"ﯽ"},"ې":{isolated:"ﯤ",initial:"ﯦ",medial:"ﯧ",final:"ﯥ"},"ے":{isolated:"ﮮ",final:"ﮯ"},"ۓ":{isolated:"ﮰ",final:"ﮱ"}},G=new RegExp("[ؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۨ-ۭࣔ-࣡ࣔ-࣭ࣣ-ࣿ]");function P(t){if(!A[t])return!1;var e=A[t];return e.final||e.medial}function N(t){if(!A[t])return!1;var e=A[t];return e.initial||e.medial}var R=function(t,e){if(!t)return"";e||(e={});for(var i,a=[],s=e.delete_harakat||!1,n=0;n<t.length;n++){var o=t[n];if(s&&G.match(o)&&a.push(["",-1]),A[o])if(a.length){var l=a[a.length-1];-1===l[1]?a.push([o,"isolated"]):P(o)&&N(l[0])&&("final"!==l[1]||(i=l[0],A[i]&&A[i].medial))?("isolated"==l[1]?a[a.length-1][1]="initial":a[a.length-1][1]="medial",a.push([o,"final"])):a.push([o,"isolated"])}else a.push([o,"isolated"]);else a.push([o,-1])}if(!1!==e.ligatures)for(var r=0;r<C.length;r++)for(var f=C[r],c=0;c<f.matches.length;c++)for(var m=f.matches[c],h=t,d=0;-1<h.indexOf(m);){var u=h.indexOf(m),p=a[u+d][1],g=a[u+d+m.length-1][1],v=null;if(v="isolated"===p||"initial"===p?"isolated"===g||"final"===g?"isolated":"initial":"isolated"===g||"final"===g?"final":"medial",f.forms[v]){a[u+d][0]=f.forms[v],a[u+d][1]=-1;for(var y=u+d+1;y<u+d+m.length;y++)a[y]=["",-1];d+=u+1,h=h.substring(d)}else d+=u+1,h=h.substring(d)}return a.map(function(t){return-1===t[1]&&t[0].length?t[0]:e.ignoreIsolates&&"isolated"===t[1]?t[0]||"":(A[t[0]]||{})[t[1]]||""}).join("")},F=function(t){if(t=String(t||""),Z.test(t))return"rtl";if(M.test(t))return"ltr";return"neutral"},H="֑-߿יִ-﷽ﹰ-ﻼ",B="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿",Z=new RegExp("^[^"+B+"]*["+H+"]"),M=new RegExp("^[^"+H+"]*["+B+"]");var Y=function(t){return t.split("").reverse().join("")},D=function(t){return"ltr"===F(t)},J=function(t){var e,i,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},s=a.spaceHack,n=void 0!==s&&s,o=a.ligatures,l=void 0!==o&&o,r=a.ignoreIsolates,f=void 0===r||r,c=t.split("").filter(function(t){return"neutral"===F(t)});(e=0===c.length?D(t)?t:Y(t):function(t,e){for(var i=e[0],a=1;a<e.length;a++)t=t.split(e[a]).join(i);return t=t.split(i)}(t,c).map(function(t){if(D(t))return t;var e=R(t,{ligatures:l,ignoreIsolates:f});return Y(e)}),Array.isArray(e))?i=e.map(function(t,e){return[t,c[e]]}).reduce(function(t,e){return t.concat(e)}).reverse().join(""):i=e;return n&&(i=i.split("").join(" ")),i};if("undefined"!=typeof process&&process.env.ROLLUP_WATCH){console.log(J("أنا دائم التألق بالكتابة بالعربي with English. والعربية أيضاm",{ligatures:!1}))}var X=function(t){return t.reduce(function(t,e,i){return t+e*Math.pow(256,i)})},$=function(){function t(){c(this,t),this.inject(),window.App.fromFullscreen.on("selection:replaceSelectors",this.onLayersSelected.bind(this)),window.App.fromFullscreen.on("selection:addSelectors",this.onLayersSelected.bind(this)),setInterval(this.inject.bind(this),100)}var e;return h(t,[{key:"getPanel",value:function(){return document.getElementById("arabic-support")}},{key:"getTextarea",value:function(){return document.getElementById("arabic-support-textarea")}},{key:"getLigaturesCheckbox",value:function(){return document.getElementById("enable-ligatures")}},{key:"getIsolatesCheckbox",value:function(){return document.getElementById("ignore-isolates")}},{key:"getSpacerHackCheckbox",value:function(){return document.getElementById("spacer-hack")}},{key:"inject",value:(e=l(f.mark(function t(){var i,a,s,n,o,l,r;return f.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I(function(){return"design"===(!!(e=document.querySelector(".properties_panel--activeTab--eBYRG.properties_panel--tab--1g-EF"))&&e.textContent)&&"TEXT"===(1===(t=Object.keys(window.App._state.mirror.sceneGraphSelection)).length&&window.App._state.mirror.sceneGraph.get(t[0]).type);var t,e});case 2:if(this.getPanel()){t.next=21;break}return e='\n<div id="arabic-support" class="raw_components--panel--3IcXg " style="display: block;">\n    <div>\n        <div class="raw_components--panelTitle--7MaOu raw_components--base--3TpZG raw_components--row--3dLxJ collapsible_property_panel--panelTitle--1cZql">\n            <div class="collapsible_property_panel--panelTitleText--3GA0U">Arabic Support</div>\n        </div>\n        <span></span>\n        <div>\n            <div class="raw_components--row--3dLxJ type_panel--twoCol--Fj7rw" style="height: auto;"><label class="" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: stretch;width: 100%;"><textarea dir="rtl" id="arabic-support-textarea" type="text" spellcheck="false" value="0" style="background: #fcfcfc;width: 100%;height: 24px;padding: 4px;box-sizing: border-box;border: 1px solid #d4d4d4;border-radius: 3px;height: 80px;margin-bottom: 8px;"></textarea></label></div>\n        </div>\n        <div class="raw_components--row--3dLxJ "><input type="checkbox" id="enable-ligatures" class=" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg"><label for="enable-ligatures" class="raw_components--label--34YmO raw_components--base--3TpZG ">Enable Ligatures</label>\n        <div style="flex-grow: 1;"></div>\n            <span tabindex="0" class="raw_components--iconButton--1XZ77">\n              <span class="gc358a75c" data-tooltip-text="Some fonts pack great ligatures, some don\'t"></span>\n            </span>\n        </div>\n        <div class="raw_components--row--3dLxJ "><input type="checkbox" id="ignore-isolates" class=" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg" checked="checked"><label for="ignore-isolates" class="raw_components--label--34YmO raw_components--base--3TpZG ">Ignore Isolates</label>\n            <div style="flex-grow: 1;"></div>\n            <span tabindex="0" class="raw_components--iconButton--1XZ77">\n              <span class="gc358a75c" data-tooltip-text="Some fonts don\'t have proper isolates glyphs. You\'ll notice this when some glyphs disappear from your text."></span>\n            </span>\n        </div>\n        <div class="raw_components--row--3dLxJ "><input type="checkbox" id="spacer-hack" class=" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg"><label for="spacer-hack" class="raw_components--label--34YmO raw_components--base--3TpZG ">Enable Spacer Hack</label>\n            <div style="flex-grow: 1;"></div>\n            <span tabindex="0" class="raw_components--iconButton--1XZ77">\n              <span class="gc358a75c" data-tooltip-text="Figma partially reshapes Arabic glyphs with an unexpected behavior.  This hack will add a tiny space between all characters to prevent Figma from reshaping, you need to decrease character spacing by about %2 to counter this increase."></span>\n            </span>\n        </div>\n    </div>\n</div>\n',i=document.createRange().createContextualFragment(e),[].slice.call(document.querySelectorAll(".properties_panel--propertiesPanel--3PCth span span .cachedSubtree")).filter(function(t){return-1!==t.textContent.indexOf("Text")})[0].appendChild(i),a=this.getTextarea(),s=this.getLigaturesCheckbox(),n=this.getIsolatesCheckbox(),o=this.getSpacerHackCheckbox(),l=Object.keys(App._state.mirror.sceneGraphSelection)[0],this.selectedNodeId=l,t.next=14,I(function(){return void 0!==l});case 14:r=this.getOriginalData(),a.value=r.text,r.settings&&(s.checked=r.settings[0],n.checked=r.settings[1],o.checked=r.settings[2]),a.addEventListener("input",S(this.handleInput.bind(this),150)),s.addEventListener("change",S(this.handleCheckbox.bind(this),150)),n.addEventListener("change",S(this.handleCheckbox.bind(this),150)),o.addEventListener("change",S(this.handleCheckbox.bind(this),150));case 21:case"end":return t.stop()}var e},t,this)})),function(){return e.apply(this,arguments)})},{key:"onLayersSelected",value:function(t){var e=this.getPanel(),i=Array.from(t.buffer),a=Object.keys(window.App._state.mirror.sceneGraphSelection);if(!(null===e||8!==i.length||1<a.length)){var s,n,o,l,r=(n=(s=i).slice(0,Math.floor(s.length/2)),o=s.slice(Math.floor(s.length/2),s.length),"".concat(X(n),":").concat(X(o)));if(this.selectedNodeId=r,"TEXT"===(l=r,window.App._state.mirror.sceneGraph.get(l).type)){e.style.display="block";var f=this.getTextarea(),c=this.getLigaturesCheckbox(),m=this.getIsolatesCheckbox(),h=this.getSpacerHackCheckbox(),d=this.getOriginalData();f.value=d.text,d.settings&&(c.checked=d.settings[0],m.checked=d.settings[1],h.checked=d.settings[2])}else{e.style.display="none";var u=this.getTextarea(),p=this.getLigaturesCheckbox(),g=this.getIsolatesCheckbox(),v=this.getSpacerHackCheckbox();u.value="",this.selectedNodeId=null,p.checked=!1,g.checked=!0,v.checked=!1}}}},{key:"getOriginalData",value:function(){var t=App._state.mirror.sceneGraph.get(this.selectedNodeId).name;if(-1===t.indexOf("\x3c!--ARS["))return{text:""};var e=JSON.parse(t.match(/\[([\s\S]*?)\]/)[0]);return{text:t.replace(/<!--([\s\S]*?)-->/,""),settings:e}}},{key:"saveOriginalData",value:function(t,e){var i="\x3c!--ARS[".concat(e.ligatures,",").concat(e.ignoreIsolates,",").concat(e.spaceHack,"]--\x3e").concat(t);App.sendMessage("setNodeProperty",{nodeId:this.selectedNodeId,property:"name",value:i})}},{key:"handleInput",value:function(t){this.transformText(t.target.value)}},{key:"handleCheckbox",value:function(){var t=this.getTextarea().value;this.transformText(t)}},{key:"transformText",value:function(t){var e={ligatures:this.getLigaturesCheckbox().checked,ignoreIsolates:this.getIsolatesCheckbox().checked,spaceHack:this.getSpacerHackCheckbox().checked},i=window.figmaPlus.scene.selection[0];this.saveOriginalData(t,e);var a=J(t,e);i.characters=a,this.getTextarea().focus()}}]),t}();"undefined"!=typeof window&&(window.arabicSupport=new $)});
