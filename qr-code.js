/*
The MIT License (MIT)
---------------------
Copyright (c) 2012 davidshimjs

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

QR Code is a registered trademark of Denso Wave
 */

var QRCode;!function(){function t(t){this.mode=a.MODE_8BIT_BYTE,this.data=t,this.parsedData=[],t=0;for(var e=this.data.length;t<e;t++){var r=[],o=this.data.charCodeAt(t);65536<o?(r[0]=240|(1835008&o)>>>18,r[1]=128|(258048&o)>>>12,r[2]=128|(4032&o)>>>6,r[3]=128|63&o):2048<o?(r[0]=224|(61440&o)>>>12,r[1]=128|(4032&o)>>>6,r[2]=128|63&o):128<o?(r[0]=192|(1984&o)>>>6,r[1]=128|63&o):r[0]=o,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function r(t,e){if(null==t.length)throw Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function o(t,e){this.totalCount=t,this.dataCount=e}function i(){this.buffer=[],this.length=0}function n(){var t=!1,e=navigator.userAgent;return/android/i.test(e)&&(t=!0,(e=e.toString().match(/android ([0-9]\.[0-9])/i))&&e[1]&&(t=parseFloat(e[1]))),t}t.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},e.prototype={addData:function(e){e=new t(e),this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,r){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++){this.modules[o]=Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++)this.modules[o][i]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,r),7<=this.typeNumber&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},setupPositionProbePattern:function(t,e){for(var r=-1;7>=r;r++)if(!(-1>=t+r||this.moduleCount<=t+r))for(var o=-1;7>=o;o++)-1>=e+o||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&6>=r&&(0==o||6==o)||0<=o&&6>=o&&(0==r||6==r)||2<=r&&4>=r&&2<=o&&4>=o)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;8>r;r++){this.makeImpl(!0,r);var o=h.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){for(t=t.createEmptyMovieClip(e,r),this.make(),e=0;e<this.modules.length;e++){r=1*e;for(var o=0;o<this.modules[e].length;o++){var i=1*o;this.modules[e][o]&&(t.beginFill(0,100),t.moveTo(i,r),t.lineTo(i+1,r),t.lineTo(i+1,r+1),t.lineTo(i,r+1),t.endFill())}}return t},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=0==t%2)},setupPositionAdjustPattern:function(){for(var t=h.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],i=t[r];if(null==this.modules[o][i])for(var n=-2;2>=n;n++)for(var a=-2;2>=a;a++)this.modules[o+n][i+a]=-2==n||2==n||-2==a||2==a||0==n&&0==a}},setupTypeNumber:function(t){for(var e=h.getBCHTypeNumber(this.typeNumber),r=0;18>r;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;18>r;r++)o=!t&&1==(e>>r&1),this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o},setupTypeInfo:function(t,e){for(var r=h.getBCHTypeInfo(this.errorCorrectLevel<<3|e),o=0;15>o;o++){var i=!t&&1==(r>>o&1);6>o?this.modules[o][8]=i:8>o?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;15>o;o++)i=!t&&1==(r>>o&1),8>o?this.modules[8][this.moduleCount-o-1]=i:9>o?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,i=7,n=0,a=this.moduleCount-1;0<a;a-=2)for(6==a&&a--;;){for(var s=0;2>s;s++)if(null==this.modules[o][a-s]){var l=!1;n<t.length&&(l=1==(t[n]>>>i&1)),h.getMask(e,o,a-s)&&(l=!l),this.modules[o][a-s]=l,-1==--i&&(n++,i=7)}if(0>(o+=r)||this.moduleCount<=o){o-=r,r=-r;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,r,n){r=o.getRSBlocks(t,r);for(var a=new i,s=0;s<n.length;s++){var l=n[s];a.put(l.mode,4),a.put(l.getLength(),h.getLengthInBits(l.mode,t)),l.write(a)}for(s=t=0;s<r.length;s++)t+=r[s].dataCount;if(a.getLengthInBits()>8*t)throw Error("code length overflow. ("+a.getLengthInBits()+">"+8*t+")");for(a.getLengthInBits()+4<=8*t&&a.put(0,4);0!=a.getLengthInBits()%8;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*t)&&(a.put(e.PAD0,8),!(a.getLengthInBits()>=8*t));)a.put(e.PAD1,8);return e.createBytes(a,r)},e.createBytes=function(t,e){for(var o=0,i=0,n=0,a=Array(e.length),s=Array(e.length),l=0;l<e.length;l++){var u=e[l].dataCount,g=e[l].totalCount-u;i=Math.max(i,u),n=Math.max(n,g),a[l]=Array(u);for(var f=0;f<a[l].length;f++)a[l][f]=255&t.buffer[f+o];for(o+=u,f=h.getErrorCorrectPolynomial(g),u=new r(a[l],f.getLength()-1).mod(f),s[l]=Array(f.getLength()-1),f=0;f<s[l].length;f++)g=f+u.getLength()-s[l].length,s[l][f]=0<=g?u.get(g):0}for(f=l=0;f<e.length;f++)l+=e[f].totalCount;for(o=Array(l),f=u=0;f<i;f++)for(l=0;l<e.length;l++)f<a[l].length&&(o[u++]=a[l][f]);for(f=0;f<n;f++)for(l=0;l<e.length;l++)f<s[l].length&&(o[u++]=s[l][f]);return o};for(var a={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},s={L:1,M:0,Q:3,H:2},h={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;0<=h.getBCHDigit(e)-h.getBCHDigit(h.G15);)e^=h.G15<<h.getBCHDigit(e)-h.getBCHDigit(h.G15);return(t<<10|e)^h.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;0<=h.getBCHDigit(e)-h.getBCHDigit(h.G18);)e^=h.G18<<h.getBCHDigit(e)-h.getBCHDigit(h.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return h.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case 0:return 0==(e+r)%2;case 1:return 0==e%2;case 2:return 0==r%3;case 3:return 0==(e+r)%3;case 4:return 0==(Math.floor(e/2)+Math.floor(r/3))%2;case 5:return 0==e*r%2+e*r%3;case 6:return 0==(e*r%2+e*r%3)%2;case 7:return 0==(e*r%3+(e+r)%2)%2;default:throw Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new r([1],0),o=0;o<t;o++)e=e.multiply(new r([1,l.gexp(o)],0));return e},getLengthInBits:function(t,e){if(1<=e&&10>e)switch(t){case a.MODE_NUMBER:return 10;case a.MODE_ALPHA_NUM:return 9;case a.MODE_8BIT_BYTE:case a.MODE_KANJI:return 8;default:throw Error("mode:"+t)}else if(27>e)switch(t){case a.MODE_NUMBER:return 12;case a.MODE_ALPHA_NUM:return 11;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 10;default:throw Error("mode:"+t)}else{if(!(41>e))throw Error("type:"+e);switch(t){case a.MODE_NUMBER:return 14;case a.MODE_ALPHA_NUM:return 13;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 12;default:throw Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var i=0;i<e;i++){for(var n=0,a=t.isDark(o,i),s=-1;1>=s;s++)if(!(0>o+s||e<=o+s))for(var h=-1;1>=h;h++)0>i+h||e<=i+h||(0!=s||0!=h)&&a==t.isDark(o+s,i+h)&&n++;5<n&&(r+=3+n-5)}for(o=0;o<e-1;o++)for(i=0;i<e-1;i++)n=0,t.isDark(o,i)&&n++,t.isDark(o+1,i)&&n++,t.isDark(o,i+1)&&n++,t.isDark(o+1,i+1)&&n++,(0==n||4==n)&&(r+=3);for(o=0;o<e;o++)for(i=0;i<e-6;i++)t.isDark(o,i)&&!t.isDark(o,i+1)&&t.isDark(o,i+2)&&t.isDark(o,i+3)&&t.isDark(o,i+4)&&!t.isDark(o,i+5)&&t.isDark(o,i+6)&&(r+=40);for(i=0;i<e;i++)for(o=0;o<e-6;o++)t.isDark(o,i)&&!t.isDark(o+1,i)&&t.isDark(o+2,i)&&t.isDark(o+3,i)&&t.isDark(o+4,i)&&!t.isDark(o+5,i)&&t.isDark(o+6,i)&&(r+=40);for(i=n=0;i<e;i++)for(o=0;o<e;o++)t.isDark(o,i)&&n++;return r+Math.abs(100*n/e/e-50)/5*10}},l={glog:function(t){if(1>t)throw Error("glog("+t+")");return l.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;256<=t;)t-=255;return l.EXP_TABLE[t]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},u=0;8>u;u++)l.EXP_TABLE[u]=1<<u;for(u=8;256>u;u++)l.EXP_TABLE[u]=l.EXP_TABLE[u-4]^l.EXP_TABLE[u-5]^l.EXP_TABLE[u-6]^l.EXP_TABLE[u-8];for(u=0;255>u;u++)l.LOG_TABLE[l.EXP_TABLE[u]]=u;r.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=Array(this.getLength()+t.getLength()-1),o=0;o<this.getLength();o++)for(var i=0;i<t.getLength();i++)e[o+i]^=l.gexp(l.glog(this.get(o))+l.glog(t.get(i)));return new r(e,0)},mod:function(t){if(0>this.getLength()-t.getLength())return this;for(var e=l.glog(this.get(0))-l.glog(t.get(0)),o=Array(this.getLength()),i=0;i<this.getLength();i++)o[i]=this.get(i);for(i=0;i<t.getLength();i++)o[i]^=l.gexp(l.glog(t.get(i))+e);return new r(o,0).mod(t)}},o.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.getRSBlocks=function(t,e){var r=o.getRsBlockTable(t,e);if(null==r)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var i=r.length/3,n=[],a=0;a<i;a++)for(var s=r[3*a],h=r[3*a+1],l=r[3*a+2],u=0;u<s;u++)n.push(new o(h,l));return n},o.getRsBlockTable=function(t,e){switch(e){case s.L:return o.RS_BLOCK_TABLE[4*(t-1)];case s.M:return o.RS_BLOCK_TABLE[4*(t-1)+1];case s.Q:return o.RS_BLOCK_TABLE[4*(t-1)+2];case s.H:return o.RS_BLOCK_TABLE[4*(t-1)+3]}},i.prototype={get:function(t){return 1==(this.buffer[Math.floor(t/8)]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var g,f=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],d=((g=function(t,e){this._el=t,this._htOption=e}).prototype.draw=function(t){function e(t,e){var r,o=document.createElementNS("http://www.w3.org/2000/svg",t);for(r in e)e.hasOwnProperty(r)&&o.setAttribute(r,e[r]);return o}var r=this._htOption,o=this._el,i=t.getModuleCount();this.clear();var n=e("svg",{viewBox:"0 0 "+String(i)+" "+String(i),width:"100%",height:"100%",fill:r.colorLight});for(n.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),o.appendChild(n),n.appendChild(e("rect",{fill:r.colorLight,width:"100%",height:"100%"})),n.appendChild(e("rect",{fill:r.colorDark,width:"1",height:"1",id:"template"})),r=0;r<i;r++)for(o=0;o<i;o++)if(t.isDark(r,o)){var a=e("use",{x:String(o),y:String(r)});a.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),n.appendChild(a)}},g.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},g),c="svg"===document.documentElement.tagName.toLowerCase()?d:"undefined"==typeof CanvasRenderingContext2D?function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,r=this._el,o=t.getModuleCount(),i=Math.floor(e.width/o),n=Math.floor(e.height/o),a=['<table style="border:0;border-collapse:collapse;">'],s=0;s<o;s++){a.push("<tr>");for(var h=0;h<o;h++)a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+i+"px;height:"+n+"px;background-color:"+(t.isDark(s,h)?e.colorDark:e.colorLight)+';"></td>');a.push("</tr>")}a.push("</table>"),r.innerHTML=a.join(""),t=r.childNodes[0],r=(e.width-t.offsetWidth)/2,e=(e.height-t.offsetHeight)/2,0<r&&0<e&&(t.style.margin=e+"px "+r+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}():function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(this._android&&2.1>=this._android){var e=1/window.devicePixelRatio,r=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,o,i,n,a,s,h,l,u){if("nodeName"in t&&/img/i.test(t.nodeName))for(var g=arguments.length-1;1<=g;g--)arguments[g]*=e;else void 0===l&&(arguments[1]*=e,arguments[2]*=e,arguments[3]*=e,arguments[4]*=e);r.apply(this,arguments)}}var o=function(t,e){this._bIsPainted=!1,this._android=n(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return o.prototype.draw=function(t){var e=this._elImage,r=this._oContext,o=this._htOption,i=t.getModuleCount(),n=o.width/i,a=o.height/i,s=Math.round(n),h=Math.round(a);for(e.style.display="none",this.clear(),e=0;e<i;e++)for(var l=0;l<i;l++){var u=t.isDark(e,l),g=l*n,f=e*a;r.strokeStyle=u?o.colorDark:o.colorLight,r.lineWidth=1,r.fillStyle=u?o.colorDark:o.colorLight,r.fillRect(g,f,n,a),r.strokeRect(Math.floor(g)+.5,Math.floor(f)+.5,s,h),r.strokeRect(Math.ceil(g)-.5,Math.ceil(f)-.5,s,h)}this._bIsPainted=!0},o.prototype.makeImage=function(){this._bIsPainted&&function(t,e){var r=this;if(r._fFail=e,r._fSuccess=t,null===r._bSupportDataURI){var o=document.createElement("img"),i=function(){r._bSupportDataURI=!1,r._fFail&&r._fFail.call(r)};o.onabort=i,o.onerror=i,o.onload=function(){r._bSupportDataURI=!0,r._fSuccess&&r._fSuccess.call(r)},o.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="}else!0===r._bSupportDataURI&&r._fSuccess?r._fSuccess.call(r):!1===r._bSupportDataURI&&r._fFail&&r._fFail.call(r)}.call(this,t)},o.prototype.isPainted=function(){return this._bIsPainted},o.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},o.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},o}();(QRCode=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:s.H},"string"==typeof e&&(e={text:e}),e)for(var r in e)this._htOption[r]=e[r];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(c=d),this._android=n(),this._el=t,this._oQRCode=null,this._oDrawing=new c(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)}).prototype.makeCode=function(t){var r=this._htOption.correctLevel,o=1,i=encodeURI(t).toString().replace(/%[0-9a-fA-F]{2}/g,"a");i=i.length+(i.length!=t?3:0);for(var n=0,a=f.length;n<=a;n++){var h=0;switch(r){case s.L:h=f[n][0];break;case s.M:h=f[n][1];break;case s.Q:h=f[n][2];break;case s.H:h=f[n][3]}if(i<=h)break;o++}if(o>f.length)throw Error("Too long data");this._oQRCode=new e(o,this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||3<=this._android)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=s}();