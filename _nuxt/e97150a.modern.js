(window.webpackJsonp=window.webpackJsonp||[]).push([[8,4,5],{256:function(t,e,n){var content=n(259);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("2dc3df63",content,!0,{sourceMap:!1})},258:function(t,e,n){"use strict";n(256)},259:function(t,e,n){var r=n(31)((function(i){return i[1]}));r.push([t.i,".hero{height:70vh;background:url(/imgs/my-photo-no-bg.png) bottom/contain no-repeat}.hero__title{font-size:clamp(3rem,10vw,8rem)}",""]),r.locals={},t.exports=r},263:function(t,e,n){"use strict";n.r(e);var r=n(3),o={data:()=>({about:{}}),fetch(){var t=this;return Object(r.a)((function*(){var e=yield t.$content("about-me").fetch();t.about=e}))()}},l=o,c=n(15),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"bg-black"},[n("nuxt-content",{staticClass:"\n      mx-auto\n      prose prose-lg\n      prose-headings:text-center\n      prose-headings:text-white\n      prose-strong:text-secondary\n      text-white\n    ",attrs:{document:t.about,tag:"article"}})],1)}),[],!1,null,null,null);e.default=component.exports},264:function(t,e,n){"use strict";n.r(e);n(258);var r=n(15),component=Object(r.a)({},(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"hero relative flex flex-col justify-end items-center"},[n("div",{staticClass:"flex items-center justify-center text-center h-full"},[n("h1",{staticClass:"hero__title",attrs:{"data-text":"Hello! I'm Yeshua"}},[n("span",[t._v("Hello! I'm Yeshua")])])]),t._v(" "),n("div",{staticClass:"text-center"},[n("p",{staticClass:"mb-4 font-bold text-lg"},[t._v("\n      and these are Missô and Karê\n    ")])])])}],!1,null,null,null);e.default=component.exports},278:function(t,e,n){"use strict";n.r(e);var r=n(0).a.extend({}),o=n(15),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"content"}},[n("HomeHeroBanner"),t._v(" "),n("HomeAbout")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{HomeHeroBanner:n(264).default,HomeAbout:n(263).default})}}]);