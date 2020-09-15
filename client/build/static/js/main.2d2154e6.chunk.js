(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{400:function(e,t,a){},401:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(8),r=a.n(c),o=a(54),i=a(10),v=a(13),g=a(29),l=a.n(g),u=a(20);function m(e){return s.a.createElement("div",{className:"header"},s.a.createElement(l.a,{className:"logo",path:u.c,color:"#ffffff"}),"News ",s.a.createElement("b",null,"Reader"),s.a.createElement("div",{className:"settings"},s.a.createElement(l.a,{path:u.a,color:"#ffffff"})))}var d=a(32),f=a.n(d),p=a(41),b=a(42),E=a.n(b);function h(e){var t=e.article,a=t.title,n=t.description,c=t.imageURL,r=t.author,o=t.published;return s.a.createElement("div",{className:"article"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"image-container"},c?s.a.createElement("img",{src:c,alt:"Article Image"}):s.a.createElement("div",{className:"fail-container"},s.a.createElement("div",{className:"image-fail"},"No image exists for this article"))),s.a.createElement("div",{className:"text"},s.a.createElement("div",{className:"title"},a),s.a.createElement("div",{className:"description"},n)),s.a.createElement("div",{className:"article-footer"},s.a.createElement("div",{className:"author"},r),s.a.createElement("div",{className:"published"},E()(o).format("ddd Do MMMM YYYY")))))}function O(e){var t=e.location.state,a=function(e){var t=Object(n.useState)([]),a=Object(v.a)(t,2),s=a[0],c=a[1];return Object(n.useEffect)((function(){f.a.get("./api/news/?search=".concat(e)).then((function(e){return c(e.data)})).catch((function(e){return alert("Cloud not load articles")}))}),[e]),s}(t?t.title:""),c=Object(n.useState)(!1),r=Object(v.a)(c,2),o=r[0],i=r[1];return Object(n.useEffect)((function(){i(a.length>0)}),[a]),s.a.createElement("div",{className:"explore"},s.a.createElement(m,{changeVoice:function(){}}),s.a.createElement(p.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOutRight",animationInDuration:1e3,animationOutDuration:1e3,isVisible:o},a.map((function(e,t){var a=document.createElement("div");return a.innerHTML=e.description,e.description=a.textContent,s.a.createElement(h,{key:e.title,article:e})}))),e.location.state?e.location.state.title:"","explore")}var j=a(38),k=a.n(j),N=a(55);function y(e){var t=Object(n.useState)(f),a=Object(v.a)(t,2),c=a[0],r=a[1],o=e.playing,i=e.audio,g=e.progress,m=e.duration;return Object(n.useEffect)((function(){r(f)}),[o,i]),s.a.createElement("div",{className:"footer"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"previous",onClick:function(){return e.onPrevious()}},s.a.createElement(l.a,{className:"previous",path:u.g,size:"4rem",color:"#1c1e26"})),s.a.createElement("div",{className:"control-container",onClick:function(){e.onToggle(),r(f)}},s.a.createElement(l.a,{path:c,size:"4rem",color:"#dedede",spin:c==u.b})),s.a.createElement("div",{className:"next",onClick:function(){return e.onNext()}},s.a.createElement(l.a,{className:"next",path:u.f,size:"4rem",color:"#1c1e26"}))),s.a.createElement("div",{className:"timer"},s.a.createElement("div",{className:"progress-time"},d(Math.floor(g))),s.a.createElement("div",{className:"progress-bar"},s.a.createElement("div",{className:"progress-complete",style:{width:"".concat(g/m*100,"%")}})),s.a.createElement("div",{className:"progress-time"},d(Math.floor(m)))));function d(e){return E()().startOf("day").seconds(e).format("mm:ss")}function f(){var t=e.playing,a=e.audio;return t&&a?u.d:t&&!a?u.b:u.e}}var w=a(4),x=a(433),S=Object(w.a)({switchBase:{color:"#dedede","&$checked":{color:"#1c1e26"},"&$checked + $track":{backgroundColor:"#1c1e26"}},checked:{},track:{}})(x.a),z=a(432),C=Object(w.a)({root:{"& .MuiInput-underline:before":{borderBottomColor:"#dedede"},"& .MuiInput-underline:after":{borderBottomColor:"#1c1e26"}}})(z.a),M=a(431),I=Object(w.a)({root:{background:"#1c1e26",borderRadius:100,height:"58px",width:"18rem",color:"white",fontSize:"1rem",fontFamily:"'Poppins', sans-serif",textTransform:"none","&:hover":{background:"#1c1e26",boxShadow:"0 0 15px rgba(100, 100, 100, 0.5)"}}})(M.a),T=a(434),A=a(89),U=(a(395),a(48)),B=(a(396),a(88)),D=a.n(B);function L(){var e=Object(i.f)(),t=Object(n.useState)("AU"),a=Object(v.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)(""),g=Object(v.a)(o,2),l=g[0],u=g[1],d=function(e,t){var a=Object(n.useState)([]),s=Object(v.a)(a,2),c=s[0],r=s[1];return Object(n.useEffect)((function(){f.a.get("./api/news/headlines?country=".concat(e).concat(function(e){return e.length>0?"&search=".concat(e):""}(t))).then((function(e){return r(e.data)})).catch((function(e){return alert("Cloud not load articles")}))}),[e,t]),c}(c,l),b=Object(n.useState)(d[0]),E=Object(v.a)(b,2),O=E[0],j=E[1],w=Object(n.useState)(0),x=Object(v.a)(w,2),z=x[0],M=x[1],B=Object(n.useState)(!1),L=Object(v.a)(B,2),q=L[0],F=L[1],R=Object(n.useState)(void 0),V=Object(v.a)(R,2),Y=V[0],$=V[1],H=Object(n.useState)(!1),W=Object(v.a)(H,2),J=W[0],K=W[1],_=Object(n.useState)(0),G=Object(v.a)(_,2),Q=G[0],X=G[1],Z=Object(n.useState)(0),ee=Object(v.a)(Z,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(!0),se=Object(v.a)(ne,2),ce=se[0],re=se[1];function oe(){ae(0),X(0),$(void 0)}function ie(e){return ve.apply(this,arguments)}function ve(){return(ve=Object(N.a)(k.a.mark((function e(t){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("./api/voice/get/".concat(t));case 2:a=e.sent,$(a.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ge(){return le.apply(this,arguments)}function le(){return(le=Object(N.a)(k.a.mark((function e(){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Y){e.next=3;break}return e.next=3,f.a.delete("./api/voice/delete/".concat(Y));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){oe(),M(0),F(d.length>0)}),[d]),Object(n.useEffect)((function(){oe(),ge(),j(d[z])}),[z]),Object(n.useEffect)((function(){J&&ie("".concat(O.title,". ").concat(O.description))}),[O]),Object(n.useEffect)((function(){J&&!Y&&ie("".concat(O.title,". ").concat(O.description))}),[J]),s.a.createElement("div",{className:"home"},s.a.createElement(m,{changeVoice:function(){}}),s.a.createElement("div",{className:"content"},s.a.createElement("div",{className:"auto-play"},s.a.createElement(T.a,{control:s.a.createElement(S,{checked:ce,onChange:function(){return re(!ce)},name:"checkedA"}),label:"Auto Play",labelPlacement:"start"})),s.a.createElement("div",{className:"input-fields"},s.a.createElement("div",{className:"country-select"},s.a.createElement("div",{className:"text"},"Top Articles From:"),s.a.createElement(A.a,{defaultCountry:"AU",countries:["AU","GB","US","IE"],onSelect:function(e){F(!1),r(e)}})),s.a.createElement("div",{className:"search"},s.a.createElement("div",{className:"text"},"Keywords:"),s.a.createElement(C,{placeholder:"i.e. Technology",onBlur:function(e){return u(e.target.value)},onKeyPress:function(e){return function(e){"Enter"==e.key&&u(e.target.value)}(e)}}))),s.a.createElement("div",{className:"carousel-container"},s.a.createElement(p.Animated,{animationIn:"fadeInUp",animationOut:"fadeOutDown",animationInDuration:1e3,animationOutDuration:1e3,isVisible:q},s.a.createElement(U.a,{naturalSlideWidth:100,naturalSlideHeight:100,totalSlides:d.length,visibleSlides:1,currentSlide:z,dragEnabled:!1},s.a.createElement(U.c,null,d.map((function(e,t){var a=document.createElement("div");return a.innerHTML=e.description,e.description=a.textContent,s.a.createElement(U.b,{key:t,index:t},s.a.createElement(h,{key:e.title,article:e}))})))),s.a.createElement("div",{className:"button-container"},s.a.createElement(D.a,{style:{color:"#ffffff"}}),s.a.createElement(I,{onClick:function(){return function(){var t=O?O.title:d[0].title;e.push({pathname:"/explore",state:{title:t}})}()}},"Learn More")))),Y?s.a.createElement("audio",{id:"audio",autoPlay:!0,onTimeUpdate:function(e){return X(e.currentTarget.currentTime)},onLoadedMetadata:function(e){return ae(e.currentTarget.duration)},onEnded:function(){ce?M(P(z,d.length)):($(void 0),K(!1),ge())},src:"".concat("","/audio/").concat(Y)}):s.a.createElement(s.a.Fragment,null)),s.a.createElement(y,{onPrevious:function(){return M(function(e){if(e>0)return e-1;return e}(z))},onNext:function(){return M(P(z,d.length))},onToggle:function(){return function(){if(K(!J),Y){var e=document.getElementById("audio");try{J?e.pause():e.play()}catch(t){console.log(t)}}else j(d[z])}()},playing:J,audio:Y,progress:Q,duration:te}))}function P(e,t){return e<t?e+1:e}function q(){return s.a.createElement("div",{className:"App"},s.a.createElement(o.a,null,s.a.createElement(i.c,null,s.a.createElement(i.a,{path:"/explore",component:O}),s.a.createElement(i.a,{path:"/",component:L}))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(400);r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},82:function(e,t,a){var n={"./ad.svg":173,"./ae.svg":174,"./af.svg":175,"./ag.svg":176,"./ai.svg":177,"./al.svg":178,"./am.svg":179,"./ao.svg":180,"./ar.svg":181,"./as.svg":182,"./at.svg":183,"./au.svg":184,"./aw.svg":185,"./az.svg":186,"./ba.svg":187,"./bb.svg":188,"./bd.svg":189,"./be.svg":190,"./bf.svg":191,"./bg.svg":192,"./bh.svg":193,"./bi.svg":194,"./bj.svg":195,"./bm.svg":196,"./bo.svg":197,"./br.svg":198,"./bs.svg":199,"./bt.svg":200,"./bw.svg":201,"./by.svg":202,"./bz.svg":203,"./ca.svg":204,"./cd.svg":205,"./cf.svg":206,"./cg.svg":207,"./ch.svg":208,"./ci.svg":209,"./ck.svg":210,"./cl.svg":211,"./cm.svg":212,"./cn.svg":213,"./co.svg":214,"./cr.svg":215,"./cu.svg":216,"./cv.svg":217,"./cw.svg":218,"./cy.svg":219,"./cz.svg":220,"./de.svg":221,"./dj.svg":222,"./dk.svg":223,"./dm.svg":224,"./do.svg":225,"./dz.svg":226,"./ec.svg":227,"./ee.svg":228,"./eg.svg":229,"./er.svg":230,"./es.svg":231,"./et.svg":232,"./fi.svg":233,"./fj.svg":234,"./fk.svg":235,"./fm.svg":236,"./fo.svg":237,"./fr.svg":238,"./ga.svg":239,"./gb.svg":240,"./gd.svg":241,"./ge.svg":242,"./gg.svg":243,"./gh.svg":244,"./gi.svg":245,"./gl.svg":246,"./gm.svg":247,"./gn.svg":248,"./gq.svg":249,"./gr.svg":250,"./gt.svg":251,"./gu.svg":252,"./gw.svg":253,"./hk.svg":254,"./hn.svg":255,"./hr.svg":256,"./ht.svg":257,"./hu.svg":258,"./id.svg":259,"./ie.svg":260,"./il.svg":261,"./im.svg":262,"./in.svg":263,"./io.svg":264,"./iq.svg":265,"./ir.svg":266,"./is.svg":267,"./it.svg":268,"./je.svg":269,"./jm.svg":270,"./jo.svg":271,"./jp.svg":272,"./ke.svg":273,"./kg.svg":274,"./kh.svg":275,"./ki.svg":276,"./km.svg":277,"./kn.svg":278,"./kp.svg":279,"./kr.svg":280,"./kw.svg":281,"./ky.svg":282,"./kz.svg":283,"./la.svg":284,"./lb.svg":285,"./li.svg":286,"./lk.svg":287,"./lr.svg":288,"./ls.svg":289,"./lt.svg":290,"./lu.svg":291,"./lv.svg":292,"./ly.svg":293,"./ma.svg":294,"./mc.svg":295,"./md.svg":296,"./me.svg":297,"./mg.svg":298,"./mh.svg":299,"./mk.svg":300,"./ml.svg":301,"./mm.svg":302,"./mn.svg":303,"./mo.svg":304,"./mp.svg":305,"./mq.svg":306,"./mr.svg":307,"./ms.svg":308,"./mt.svg":309,"./mu.svg":310,"./mv.svg":311,"./mw.svg":312,"./mx.svg":313,"./my.svg":314,"./mz.svg":315,"./na.svg":316,"./nato.svg":317,"./ne.svg":318,"./nf.svg":319,"./ng.svg":320,"./ni.svg":321,"./nl.svg":322,"./no.svg":323,"./np.svg":324,"./nr.svg":325,"./nu.svg":326,"./nz.svg":327,"./om.svg":328,"./pa.svg":329,"./pe.svg":330,"./pf.svg":331,"./pg.svg":332,"./ph.svg":333,"./pk.svg":334,"./pl.svg":335,"./pn.svg":336,"./pr.svg":337,"./ps.svg":338,"./pt.svg":339,"./pw.svg":340,"./py.svg":341,"./qa.svg":342,"./ro.svg":343,"./rs.svg":344,"./ru.svg":345,"./rw.svg":346,"./sa.svg":347,"./sb.svg":348,"./sc.svg":349,"./sd.svg":350,"./se.svg":351,"./sg.svg":352,"./si.svg":353,"./sk.svg":354,"./sl.svg":355,"./sm.svg":356,"./sn.svg":357,"./so.svg":358,"./sr.svg":359,"./ss.svg":360,"./st.svg":361,"./sv.svg":362,"./sx.svg":363,"./sy.svg":364,"./sz.svg":365,"./tc.svg":366,"./td.svg":367,"./tg.svg":368,"./th.svg":369,"./tibet.svg":370,"./tj.svg":371,"./tk.svg":372,"./tm.svg":373,"./tn.svg":374,"./to.svg":375,"./tr.svg":376,"./tt.svg":377,"./tv.svg":378,"./tw.svg":379,"./tz.svg":380,"./ua.svg":381,"./ug.svg":382,"./us.svg":383,"./uy.svg":384,"./uz.svg":385,"./ve.svg":386,"./vi.svg":387,"./vn.svg":388,"./vu.svg":389,"./ws.svg":390,"./ye.svg":391,"./za.svg":392,"./zm.svg":393,"./zw.svg":394};function s(e){var t=c(e);return a(t)}function c(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}s.keys=function(){return Object.keys(n)},s.resolve=c,e.exports=s,s.id=82},97:function(e,t,a){e.exports=a(401)}},[[97,1,2]]]);
//# sourceMappingURL=main.2d2154e6.chunk.js.map