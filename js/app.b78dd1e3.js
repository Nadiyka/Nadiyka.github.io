webpackJsonp([1],{"+VGo":function(e,t){},0:function(e,t,n){e.exports=n("NHnr")},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("j1ja");var s=n("/5sW"),a={asc:"ascending",desc:"descending"},i={base:"#FFA69E",positioning:"#FF686B",sorting:"#A5FFD6",sorted:"#84DCC6"},r=(n("mJx5"),{name:"sort-set-parameters",data:function(){return{maxElementsQuantity:10,elementsQuantity:10,elementsRange:{min:0,max:100},elementsRangeLimits:{min:0,max:999},elements:[],parametersInput:"",direction:""}},watch:{"elementsRange.max":function(e){if("number"!==typeof e){var t=parseInt(e,10);isNaN(t)?this.elementsRange.max=this.elementsRange.min+1:this.elementsRange.max=t}this.elementsRange.max<this.elementsRangeLimits.min&&(this.elementsRange.max=Math.abs(this.elementsRange.max)),this.elementsRange.max>this.elementsRangeLimits.max&&(this.elementsRange.max=this.elementsRangeLimits.max)},"elementsRange.min":function(e){if("number"!==typeof e){var t=parseInt(e,10);isNaN(t)?this.elementsRange.min=0:this.elementsRange.min=t}this.elementsRange.min<this.elementsRangeLimits.min&&(this.elementsRange.min=this.elementsRangeLimits.min),this.elementsRange.min<this.elementsRangeLimits.max&&(this.elementsRange.min=this.elementsRange.max)},elementsQuantity:function(e){if("number"!==typeof e){var t=parseInt(e,10);isNaN(t)||(this.elementsQuantity=t)}this.elementsQuantity<=0&&(this.elementsQuantity=Math.abs(this.elementsQuantity)||1)}},methods:{generateRandomElements:function(){if(this.elementsRange.max<this.elementsRange.min){var e=this.elementsRange.max;this.elementsRange.max=this.elementsRange.min,this.elementsRange.min=e}var t=[],n=this.elementsQuantity>this.maxElementsQuantity?this.maxElementsQuantity:this.elementsQuantity,s=this.elementsRange.max+1-this.elementsRange.min;while(n--){var a=Math.floor(Math.random()*s)+this.elementsRange.min;t.push(a)}this.parametersInput=t.join(),this.elements=t},returnParameters:function(){this.$emit("set-parameters",this.elements)},setElements:function(){var e=this,t=[",",".",";"],n=[this.parametersInput.trim()];t.forEach(function(e){var t=[];n.forEach(function(n){t=t.concat(n.split(e))}),n=t}),n=n.map(function(t){return t=parseInt(t),isNaN(t)?e.elementsRangeLimits.min:t>e.elementsRangeLimits.max?e.elementsRangeLimits.max:Math.abs(t)}),n.length>this.maxElementsQuantity&&(n=n.slice(0,this.maxElementsQuantity)),this.elements=n}}}),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sort-page_parameters"},[n("div",{staticClass:"sort-parameters"},[n("h3",{staticClass:"sort-parameters_header"},[e._v(" Ввести элементы вручную")]),n("div",{staticClass:"sort-parameters_block"},[n("div",{staticClass:"sort-parameters_group"},[n("label",{attrs:{for:"sortElements"}},[e._v("Список элементов")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.parametersInput,expression:"parametersInput"}],attrs:{id:"sortElements"},domProps:{value:e.parametersInput},on:{blur:e.setElements,input:function(t){t.target.composing||(e.parametersInput=t.target.value)}}})])])]),n("div",{staticClass:"sort-parameters sort-parameters--generate"},[n("h3",[e._v("Сгенерировать элементы случайным образом")]),n("div",{staticClass:"sort-parameters_block"},[n("div",{staticClass:"sort-parameters_group"},[n("label",{attrs:{for:"randomMin"}},[e._v(" Минимальное случайное значение ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.elementsRange.min,expression:"elementsRange.min"}],attrs:{id:"randomMin",type:"number",min:e.elementsRangeLimits.min,max:e.elementsRange.max},domProps:{value:e.elementsRange.min},on:{input:function(t){t.target.composing||e.$set(e.elementsRange,"min",t.target.value)}}})]),n("div",{staticClass:"sort-parameters_group"},[n("label",{attrs:{for:"randomMax"}},[e._v(" Максимальное случайное значение ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.elementsRange.max,expression:"elementsRange.max"}],attrs:{id:"randomMax",type:"number",min:e.elementsRange.min,max:e.elementsRangeLimits.max},domProps:{value:e.elementsRange.max},on:{input:function(t){t.target.composing||e.$set(e.elementsRange,"max",t.target.value)}}})]),n("div",{staticClass:"sort-parameters_group"},[n("label",{attrs:{for:"randomQuantity"}},[e._v(" Количество элементов ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.elementsQuantity,expression:"elementsQuantity"}],attrs:{id:"randomQuantity",type:"number",min:1,max:e.maxElementsQuantity},domProps:{value:e.elementsQuantity},on:{input:function(t){t.target.composing||(e.elementsQuantity=t.target.value)}}})])]),n("button",{staticClass:"btn btn--medium btn--generate",attrs:{type:"button"},on:{click:e.generateRandomElements}},[e._v("\n            Сгенерировать\n        ")])]),n("div",{staticClass:"sort-parameters sort-parameters--controls"},[n("button",{staticClass:"btn btn--big btn--set",attrs:{type:"button"},on:{click:e.returnParameters}},[e._v("\n            Применить\n        ")])])])},o=[],m=n("XyMi"),u=!1,c=null,h=null,d=null,p=Object(m["a"])(r,l,o,u,c,h,d),g=p.exports,f=(n("uDYd"),n("fKPv")),v=n.n(f),b=(n("n12u"),function(e){return e.reduce(function(e,t){return Object.assign(e,v()({},t,(e[t]||0)+1))},{})}),y=function e(t,n){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:500,y:0,step:200},a=[],r=null,l=15,o=50,m=50,u=i.positioning;if(!n||!n.leftNode&&!n.rightNode)return a;a.push({backgroundColor:u,top:s.y,left:s.x+l}),a.push({backgroundColor:u,top:s.y,left:s.x-l}),a.push({backgroundColor:u,top:s.y,left:s.x}),s.y+=m,t<n.getValue()?(r=n.leftNode,s.x-=s.step):(s.x+=s.step,r=n.rightNode),s.step>o&&(s.step/=2),a.push({backgroundColor:u,top:s.y,left:s.x});var c=e(t,r,s);return a=a.concat(c),a},_=function(e,t,n){var s=y(e,t),a=[];s.forEach(function(e){var t={targets:n,duration:150,delay:0};e&&(e.left&&(t.left=e.left),e.top&&(t.top=e.top),e.backgroundColor&&(t.backgroundColor=e.backgroundColor),(t.left||t.top)&&a.push(t))});var r=a[a.length-1];return r.backgroundColor=i.base,a.push(r),a},k=function(e,t){var n=[],s=2;return n.push({targets:e,duration:50,delay:100,backgroundColor:i.sorting,left:t.left-s,top:t.top}),n.push({targets:e,duration:75,delay:100,backgroundColor:i.sorting,left:t.left+s,top:t.top}),n.push({targets:e,duration:50,delay:100,backgroundColor:i.sorting,left:t.left-s,top:t.top}),n.push({targets:e,duration:75,delay:100,backgroundColor:i.sorting,left:t.left+s,top:t.top}),n.push({targets:e,duration:100,delay:100,backgroundColor:i.sorted,left:t.left,top:t.top}),n},x=n("Z60a"),S=n.n(x),C=n("C9uT"),R=n.n(C),N=n("A5qe"),E=n.n(N),w=function(){function e(t,n){S()(this,e),this.value=t,this.el=n,this.lastState={translateX:500,translateY:0},this.leftNode=null,this.rightNode=null,this.animateSort=E()({targets:n,scale:1.5,delay:300,direction:"alternate",easing:"easeInOutSine",loop:!1,autoplay:!1})}return R()(e,[{key:"addNode",value:function(e){e.getValue()<this.value?null!==this.leftNode?this.leftNode.addNode(e):this.leftNode=e:null!==this.rightNode?this.rightNode.addNode(e):this.rightNode=e}},{key:"getValue",value:function(){return this.value}},{key:"visitNode",value:function(e){null!==this.leftNode&&this.leftNode.visitNode(e),e(this.value,this.el,this.lastState),null!==this.rightNode&&this.rightNode.visitNode(e)}},{key:"setLastState",value:function(e){this.lastState=e}}]),e}(),Q=w,$={name:"sort-tree",props:{elements:{type:Array,required:!0,default:function(){return[]}},direction:{type:String,required:!0,default:a.asc}},data:function(){return{tree:null,activeNode:!1,initialElements:[],nodeElements:[],sortedElements:[],timeline:null,colors:i,height:0,sortSteps:{build:"build",sort:"sort",finished:"finished"},currentSortStep:""}},watch:{elements:{handler:function(){var e=this,t=b(this.elements);this.clearCurrentSort(),this.currentSortStep="",this.elements.forEach(function(n){var s;t[n]>1?(t[n]--,s={value:n,key:"".concat(n,"dupl").concat(t[n])}):s={value:n,key:"".concat(n)},e.initialElements.push(s),e.nodeElements.push(s)})},deep:!0}},methods:{createTree:function(){var e=this,t=10,n=t;return this.timeline=E.a.timeline({autoplay:!1}),this.initialElements.forEach(function(s){var a=new Q(s.value,e.$refs[s.key]);if(e.timeline.add({targets:e.$refs[s.key],opacity:{value:1,duration:100,delay:0},backgroundColor:{value:i.base,easing:"easeInOutSine",duration:100,delay:0}}),e.tree){e.tree.addNode(a);var r=_(a.getValue(),e.tree,e.$refs[s.key]),l=null;r.forEach(function(t){e.timeline.add(t),l=t}),t+=10,n=l.top+t,a.setLastState(l)}else e.tree=a,e.timeline.add({targets:e.$refs[s.key],left:500}),a.setLastState({left:500})}),this.timeline.play(),this.height=n,this.timeline.finished},printNode:function(e,t,n){var s=this,a=k(t,n);a.forEach(function(e){s.timeline.add(e)}),this.sortedElements.push(e)},startSorting:function(){var e=this;this.tree=null,this.sortedElements=[],this.initialElements.forEach(function(t){e.$refs[t.key]&&(e.$refs[t.key][0].style.opacity=0,e.$refs[t.key][0].style.top=0,e.$refs[t.key][0].style.left=0)}),this.currentSortStep=this.sortSteps.build,this.createTree().then(function(){e.activeNode=!1,e.tree&&(e.currentSortStep=e.sortSteps.sort,e.timeline=E.a.timeline({autoplay:!1}),e.tree.visitNode(e.printNode),e.timeline.play(),e.timeline.finished.then(function(){e.currentSortStep=e.sortSteps.finished,e.timeline=null}))})},clearCurrentSort:function(){this.tree=null,this.activeNode=!1,this.timeline=null,this.initialElements=[],this.nodeElements=[],this.sortedElements=[],this.currentSortStep=""},pauseSorting:function(){this.timeline&&this.timeline.pause()},resumeSorting:function(){this.timeline&&this.timeline.play()}}},L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sort-block"},[n("div",{staticClass:"sort-block_list"},[n("h3",{staticClass:"sort-block_header"},[e._v("Исходные элементы:")]),n("ul",{staticClass:"sort-block_elements"},e._l(e.initialElements,function(t){return n("li",{key:t.key,class:{active:!1!==e.activeNode&&e.activeNode===t.key},style:{"background-color":e.colors.base}},[e._v(e._s(t.value))])})),n("button",{staticClass:"btn btn--medium btn--sort",attrs:{type:"button"},on:{click:e.startSorting}},[e._v("\n            Начать сортировку\n        ")]),n("div",{directives:[{name:"show",rawName:"v-show",value:null!==this.timeline,expression:"this.timeline !== null"}],staticClass:"sort-block_controls"},[n("button",{staticClass:"btn btn--small btn--pause",attrs:{type:"button",disabled:null===this.timeline},on:{click:e.pauseSorting}},[e._v("\n                ❙❙\n            ")]),n("button",{staticClass:"btn btn--small btn--resume",attrs:{type:"button",disabled:null===this.timeline},on:{click:e.resumeSorting}},[e._v("\n                ►\n            ")])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.currentSortStep,expression:"currentSortStep"}],staticClass:"sort-block_steps"},[n("h3",{staticClass:"sort-block_header"},[e._v(" Шаг сортировки:")]),n("ol",[n("li",{class:{active:e.currentSortStep===e.sortSteps.build,done:e.currentSortStep===e.sortSteps.finished||e.currentSortStep===e.sortSteps.sort}},[e._v("Построение бинарного дерева")]),n("li",{class:{active:e.currentSortStep===e.sortSteps.sort,done:e.currentSortStep===e.sortSteps.finished}},[e._v("Обход дерева")])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.tree,expression:"tree"}],staticClass:"sort-block_list"},[n("h3",{staticClass:"sort-block_header"},[e._v("Построенное дерево:")]),n("ul",{staticClass:"tree",style:{height:e.height+"px"}},e._l(e.nodeElements,function(t){return n("li",{ref:t.key,refInFor:!0,style:{"background-color":e.colors.base}},[e._v("\n                    "+e._s(t.value)+"\n                    "),n("span",{staticClass:"tree-line"})])}))]),e.sortedElements.length?n("div",{staticClass:"sort-block_list"},[n("h3",{staticClass:"sort-block_header"},[e._v("Отсортированные элементы:")]),n("ul",{staticClass:"sort-block_elements"},e._l(e.sortedElements,function(t){return n("li",{style:{"background-color":e.colors.sorted}},[e._v(" "+e._s(t)+" ")])}))]):e._e()])},I=[],M=!1,P=null,j=null,O=null,F=Object(m["a"])($,L,I,M,P,j,O),A=F.exports,V={name:"sort-component",components:{SortSetParameters:g,SortTree:A},data:function(){return{elements:[],direction:a.asc}},methods:{setParameters:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.asc;this.elements=e,this.direction=t}}},T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("sort-tree",{directives:[{name:"show",rawName:"v-show",value:e.elements.length,expression:"elements.length"}],attrs:{elements:e.elements,direction:e.direction}}),n("sort-set-parameters",{on:{"set-parameters":e.setParameters}})],1)},X=[],q=!1,D=null,G=null,H=null,J=Object(m["a"])(V,T,X,q,D,G,H),Y=J.exports,B={name:"app",components:{SortComponent:Y}},K=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sort-page",attrs:{id:"app"}},[e._m(0),e._m(1),n("sort-component"),e._m(2)],1)},W=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"sort-page_header"},[n("h1",[e._v("Сортировка с помощью дерева")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"sort-page_description"},[n("p",[e._v("На данной странице можно наглядно увидеть сортировку при помощи бинарного дерева:\n         построение дерева и его обход.")]),n("p",[e._v(" Для запуска сртировки необходимо: ")]),n("ol",[n("li",[e._v('\n                Создать массив для сортировки: ввести значение в текстовое поле "Список элементов" или сгенерировать массив.\n            ')]),n("li",[e._v("Для создания массива вручную качестве разделителей можно использовать ',', '.', и ';'. Например:  '1 4, 3. 6; 0'.")]),n("li",[e._v('Для генерации массива нужно задать минимальное(от 0) и максимальное(до 999) значения в соответствующих полях, затем ввести количество\n                 сортируемых элементов (до 10) и нажать "Сгенерировать".- элементы появятся в текстовом поле "Список элементов".')]),n("li",[e._v('После создания списка сортируемых элементов необходимо нажать "Применть". Появится блок для управления сортировкой.')]),n("li",[e._v('\n                Для начала сортировки нажмите на кноку "Начать сортировку", для паузы сортировки, нажмте на кнопку с символом "❙❙", для ее\n                продолжения - на кнопку с символом "►".\n            ')])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"sort-page_footer"},[n("a",{staticClass:"link",attrs:{href:"https://github.com/Nadiyka/Nadiyka.github.io",target:"_blank"}},[e._v("GitHub репозиторий")]),n("a",{staticClass:"link link--info",attrs:{href:"https://vuejs.org/",target:"_blank"}},[e._v("⚒&☠")])])}];function Z(e){n("+VGo")}var z=!1,U=Z,ee=null,te=null,ne=Object(m["a"])(B,K,W,z,U,ee,te),se=ne.exports;n("uMhA"),n("XRwP");s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(se)}}).$mount("#app")},XRwP:function(e,t){},uMhA:function(e,t){}},[0]);
//# sourceMappingURL=app.b78dd1e3.js.map