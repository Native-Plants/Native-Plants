(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t,a){},105:function(e,t,a){},106:function(e,t,a){},112:function(e,t,a){},113:function(e,t,a){},115:function(e,t,a){},134:function(e,t,a){},135:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(10),r=a.n(l),i=(a(104),a(105),a(46));a(106);var o=function(e){var t=e.navObjects.map((function(e){return c.a.createElement(i.b,{to:e.path,key:e.id},c.a.createElement("li",{key:e.id},e.name))}));return c.a.createElement(n.Fragment,null,c.a.createElement("ul",{className:"navList"},t))};a(112);var s=function(){return c.a.createElement(n.Fragment,null,c.a.createElement("h1",null,"This is the home page. More information will be displayed once we know what we want."))};a(113);var u=function(){return c.a.createElement(n.Fragment,null,c.a.createElement("h1",null,"This is the about page. More information will be displayed once we know what we want."))},m=a(78),d=a(62),p=a.n(d),h=a(79),b=a(12),v=a(63),E=a.n(v),f=a(80),O=a(4),g=a(183),w=a(184),j=a(174),y=a(173),S=a(186),C=a(182),N=a(187),k=a(188),P=a(175),L=a(176),A=a(177),x=a(136),F=a(178),T=a(179),G=a(180),H=a(138),I=a(181),J=(a(115),a(81)),B=a.n(J),D=a(86),R=a.n(D),M=a(85),U=a.n(M),V=a(88),W=a.n(V),q=a(87),z=a.n(q),$=Object(O.a)({root:{color:E.a[400],"&$checked":{color:E.a[600]}},checked:{}})((function(e){return c.a.createElement(g.a,Object.assign({color:"default"},e))})),_={};function X(e){e.props.selectedPlant;return c.a.createElement(f.a,{url:"https://www.inaturalist.org",id:"myId",className:"dialogBody",display:"initial",position:"relative"})}_.shadeToleranceOptions=["Tolerant","Intermediate","Intolerant"],_.durationOptions=["Perennial","Biennial","Annual"],_.growthHabitOptions=["Tree","Shrub","Forb","Herb","Graminoid","Subshrub","Vine"],_.activeGrowthPeriodOptions=["Fall","Winter","Spring","Summer"],_.commercialAvailabilityOptions=["Contracting Only","Field Collections Only","Routinely Available"];var Y=function(){var e=Object(n.useState)(_.shadeToleranceOptions),t=Object(b.a)(e,2),a=t[0],l=(t[1],Object(n.useState)([])),r=Object(b.a)(l,2),i=r[0],o=r[1],s=Object(n.useState)(_.durationOptions),u=Object(b.a)(s,2),d=u[0],v=(u[1],Object(n.useState)([])),E=Object(b.a)(v,2),f=E[0],O=E[1],g=Object(n.useState)(_.growthHabitOptions),J=Object(b.a)(g,2),D=J[0],M=(J[1],Object(n.useState)([])),V=Object(b.a)(M,2),q=V[0],Y=V[1],K=Object(n.useState)(_.activeGrowthPeriodOptions),Q=Object(b.a)(K,2),Z=Q[0],ee=(Q[1],Object(n.useState)([])),te=Object(b.a)(ee,2),ae=te[0],ne=te[1],ce=Object(n.useState)(_.commercialAvailabilityOptions),le=Object(b.a)(ce,2),re=le[0],ie=(le[1],Object(n.useState)([])),oe=Object(b.a)(ie,2),se=oe[0],ue=oe[1],me=Object(n.useState)(!1),de=Object(b.a)(me,2),pe=de[0],he=de[1],be=Object(n.useState)(!0),ve=Object(b.a)(be,2),Ee=ve[0],fe=ve[1],Oe=Object(n.useState)([]),ge=Object(b.a)(Oe,2),we=ge[0],je=ge[1],ye=Object(n.useState)(0),Se=Object(b.a)(ye,2),Ce=Se[0],Ne=Se[1],ke=Object(n.useState)(10),Pe=Object(b.a)(ke,2),Le=Pe[0],Ae=Pe[1],xe=Object(n.useState)((function(){var e=localStorage.getItem("favoratePlants");return e?JSON.parse(e):[]})),Fe=Object(b.a)(xe,2),Te=Fe[0],Ge=Fe[1],He=Object(n.useState)(""),Ie=Object(b.a)(He,2),Je=Ie[0],Be=Ie[1],De=Object(n.useState)(""),Re=Object(b.a)(De,2),Me=Re[0],Ue=Re[1],Ve=Object(n.useState)(!1),We=Object(b.a)(Ve,2),qe=We[0],ze=We[1],$e=Object(n.useState)({}),_e=Object(b.a)($e,2),Xe=_e[0],Ye=_e[1];function Ke(e,t,a,n){var l=n.filter((function(e){return t.includes(e)}));return c.a.createElement("div",{className:"plantFilter"},c.a.createElement(y.a,null,c.a.createElement(S.a,null,e),c.a.createElement(C.a,{renderValue:function(){return c.a.createElement("div",null,l.map((function(e){return c.a.createElement(N.a,{color:"primary",key:e,label:e,variant:"outlined",id:e})})))},style:{width:"150px"},value:t,onChange:function(e){a(e.target.value)},multiple:!0},n.map((function(e){return c.a.createElement(k.a,{key:e,value:e,id:e},c.a.createElement($,{checked:t.includes(e)}),c.a.createElement(P.a,{primary:e}))})))))}function Qe(e,t){var a=JSON.parse(JSON.stringify(Te));!1===e?(a.splice(a.indexOf(t),1),Ge(a)):Ge(Te.concat(t))}function Ze(e,t){var a,n=!1,c=Object(m.a)(t);try{for(c.s();!(a=c.n()).done;){var l=a.value;e.toLowerCase().includes(l.toLowerCase())&&(n=!0)}}catch(r){c.e(r)}finally{c.f()}return n}Object(n.useEffect)((function(){function e(){return(e=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:B.a.init({key:"1xq_h1oDzlFt8wU4qLwVUHDN6P-z9v_A39bgNyb9rOng",callback:function(e){fe(!1),je(e)},simpleSheet:!0});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}localStorage.setItem("favoratePlants",JSON.stringify(Te)),function(){e.apply(this,arguments)}()}),[Te]);var et=we.filter((function(e){var t=!1===pe||Te.includes(e.id),a=0===i.length||i.includes(e.shadeTolerance),n=0===f.length||Ze(e.duration,f),c=0===q.length||Ze(e.growthHabit,q),l=0===ae.length||"Year Round"===e.activeGrowthPeriod||Ze(e.activeGrowthPeriod,ae),r=0===se.length||se.includes(e.commercialAvailability);return(""===Me||e.genus.toLowerCase().includes(Me.toLowerCase())||e.species.toLowerCase().includes(Me.toLowerCase())||e.commonName.toLowerCase().includes(Me.toLowerCase()))&&a&&n&&c&&l&&r&&t})),tt=Ce+Le>et.length?et.length:Ce+Le,at=et.slice(Ce,tt),nt=0===at.length?c.a.createElement("div",null,c.a.createElement("h1",null,"There are no plants that match this filter")):at.map((function(e){return c.a.createElement("div",{className:"plantConainter"},c.a.createElement("div",{className:"favoratePlantContainer"},c.a.createElement(A.a,null,Te.includes(e.id)?c.a.createElement(U.a,{onClick:function(){return Qe(!1,e.id)}}):c.a.createElement(R.a,{onClick:function(){Qe(!0,e.id)}}))),c.a.createElement("div",{className:"plantDetailContainer",key:e.id,onClick:function(){ze(!0),Ye(e)}},c.a.createElement("span",{className:"plant"}," ","Common Name: "+e.commonName," "),c.a.createElement("span",{className:"plant"}," ","Scientific Name: ".concat(e.genus," ").concat(e.species)," "),c.a.createElement("div",{className:"content"},c.a.createElement("img",{alt:e.photoName,className:"plantImage",src:"./images/".concat(e.genus.toLowerCase(),"-").concat(e.species,".jpg")}),c.a.createElement("div",{className:"attributes"},c.a.createElement("div",null,"States and Province: ".concat(e.stateAndProvince)," "),c.a.createElement("div",null,"Duration: ".concat(e.duration)," "),c.a.createElement("div",null,"Growth Habit: ".concat(e.growthHabit)," "),c.a.createElement("div",null,"Native Status: ".concat(e.nativeStatus)," "),c.a.createElement("div",null,"Active Growth Period: ".concat(e.activeGrowthPeriod)," "),c.a.createElement("div",null,"Shade Tolerance: ".concat(e.shadeTolerance)," "),c.a.createElement("div",null,"Commercial Availability: ".concat(e.commercialAvailability)," "))),c.a.createElement("div",null,"Photo by user ".concat(e.uploader," submitted to iNaturalist.org"))))})),ct=c.a.createElement("div",{className:"plantsPerPage"},c.a.createElement("p",null,"Showing Plants ".concat(Ce+1,"-").concat(tt," Of ").concat(et.length)),c.a.createElement(x.a,{disabled:0===Ce,onClick:function(){Ne(Ce-Le<0?0:Ce-Le)}},c.a.createElement(z.a,null)),c.a.createElement(x.a,{disabled:Ce+Le>=et.length,onClick:function(){return Ne(Ce+Le)}},c.a.createElement(W.a,null)),c.a.createElement("p",null,"Rows Per Page"),c.a.createElement(C.a,{style:{width:"50px",marginLeft:"10px"},value:Le,onChange:function(e){Ae(e.target.value)}},[10,25,50].map((function(e){return c.a.createElement(k.a,{key:e,value:e,id:e},c.a.createElement(P.a,{primary:e}))})))),lt=c.a.createElement(F.a,{control:c.a.createElement(T.a,{color:"primary",checked:pe,onChange:function(){he(!pe)}}),label:"Show Favorates Only",labelPlacement:"start"}),rt={selectedPlant:Xe};return c.a.createElement("div",{className:"plantListContainer"},c.a.createElement("div",{className:"plantFilterBars"},Ke("Shade Tolerances",i,o,a),Ke("Durations",f,O,d),Ke("Growth Habits",q,Y,D),Ke("Active Growth Habits",ae,ne,Z),Ke("Commercial Availability",se,ue,re),c.a.createElement("div",{className:"plantFilter"},c.a.createElement(w.a,{style:{width:"150px"},label:"Search",value:Je,onChange:function(e){return Be(e.target.value)},InputProps:{endAdornment:c.a.createElement(j.a,{position:"end",onClick:function(){Be(""),Ue("")}},"X")}})),c.a.createElement(L.a,{onClick:function(){Ue(Je),Ne(0)}},"Search"),lt),Ee?null:ct,Ee?null:nt,c.a.createElement(G.a,{fullScreen:!0,open:qe,onClose:function(){ze(!1)}},c.a.createElement(L.a,{className:"header",onClick:function(){ze(!1),Ye({})}},"Close"),c.a.createElement(X,{props:rt})),c.a.createElement(H.a,{className:"backdrop",open:Ee},c.a.createElement(I.a,{color:"inherit"})))};a(134);var K=function(){return c.a.createElement(n.Fragment,null,c.a.createElement("h1",null,"404"," "),c.a.createElement("h4",null,"The URL you typed is invalid."))},Q=a(11);var Z=function(){var e=[{id:1,name:"Home",path:"/",exact:!0,display:!0,component:s},{id:2,name:"About",path:"/about",exact:!0,display:!0,component:u},{id:3,name:"Plants List",path:"/plant-list",exact:!0,display:!0,component:Y}],t=e.filter((function(e){return!0===e.display})),a=e.map((function(e){return c.a.createElement(Q.a,{key:e.id,path:e.path,exact:e.exact,component:e.component})}));return c.a.createElement(i.a,{basename:"/Native-Plants"},c.a.createElement(o,{navObjects:t}),c.a.createElement("div",{className:"componentContainer"},c.a.createElement(Q.c,null,a,c.a.createElement(Q.a,{component:K}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},99:function(e,t,a){e.exports=a(135)}},[[99,1,2]]]);
//# sourceMappingURL=main.83021e97.chunk.js.map