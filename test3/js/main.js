"use strict";

function _classCallCheck(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

function fillOptions(e) { var t = []; return e.map(function(e) { t.push({ contentId: e.id + "-content", id: e.id, logoUrl: "about" === e.id ? "/img/logo-black.svg" : "/img/logo.svg", logoMobileUrl: "/img/logo-black.svg", isLogoVisible: "hero" !== e.id, isInvert: "about" === e.id }) }), t }

function onResize() { isMobie = document.documentElement.clientWidth < 1024, breakpoints = [], windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); var e = Math.ceil(windowHeight / 2);
    sections.forEach(function(t) { breakpoints.push({ id: t.id, breakpointTop: t.offsetTop, offset: e }) }), scrollWatchers.forEach(function(t) { t.setBreakpoints(breakpoints), t.setOffsets(e) }) }

function sideTextMove() { side.style.transform = "scale(-1, -1) translateY(" + document.body.getBoundingClientRect().top + "px)", contact.getBoundingClientRect().top < windowHeight ? sideTextBottom.style.transform = "scale(-1, -1) translateY(" + (windowHeight - contact.getBoundingClientRect().top) + "px)" : sideTextBottom.style.transform = "scale(-1, -1)" }

function onScroll() { var e = document.body.getBoundingClientRect().top,
        t = e > lastScrollPosition,
        n = void 0,
        o = findCurrentBlock(breakpoints, -e, t); if (scrollWatchers.forEach(function(t) { t.onScroll(-e) }), isPage && sideTextMove(), n = findCurrentSection(pageYOffset, breakpoints), currentSectionForMenu = findCurrentSectionForMenu(pageYOffset, breakpoints), currentSectionForEffects = findCurrentSectionForEffects(pageYOffset, breakpoints), t ? isMobie ? (logoWrapper.style.top = "0", invert(menuImg, "hero" !== n)) : invert(menuImg, "about" === n) : (logoWrapper.style.top = "-6rem", invert(menuImg, "about" === n)), lastSection !== n) { var r = sectionOptions.find(function(e) { return e.id === n });
        setActiveLink(r), r.isLogoVisible ? (logo.src = isMobie ? r.logoMobileUrl : r.logoUrl, logoWrapper.classList.add("logo-visible")) : logoWrapper.classList.remove("logo-visible") } if (lastSectionForMenu !== currentSectionForMenu) { var i = sectionOptions.find(function(e) { return e.id === currentSectionForMenu });
        invert(linesMenuItems, i.isInvert), lastSectionForEffects = i.contentId } lastSectionForMenu = currentSectionForMenu, lastScrollPosition = e, lastSection = n, lastBlock = o }

function setActiveLink(e) { for (var t = 0; t < linesMenuItems.length; t++) { var n = linesMenuItems[t],
            o = n.dataset.link;
        o === e.id ? n.classList.add("lines-menu__item-active") : n.classList.remove("lines-menu__item-active") } }

function findCurrentSection(e, t) { for (var n = 0; n < t.length; n++) { var o = t[n]; if (!(e > o.breakpointTop && t[n + 1]) || e < t[n + 1].breakpointTop) return o && o.id } }

function findCurrentSectionForMenu(e, t) { for (var n = 0; n < t.length; n++) { var o = t[n]; if (!(e > o.breakpointTop && t[n + 1]) || e < t[n + 1].breakpointTop - t[n + 1].offset) return o.id } }

function findCurrentSectionForEffects(e, t) { for (var n = 0; n < t.length; n++) { var o = t[n]; if (!(e > o.breakpointTop + windowHeight && t[n + 1]) || e < t[n + 1].breakpointTop - t[n + 1].offset) return o.id } }

function invert(e, t) { var n = t ? "add" : "remove";
    e = Array.isArray(e) ? e : [e], e.forEach(function(e) { return e.classList[n]("invert") }) }

function calculateTranslateTop(e, t) { return e * -.1 + ((t + 1) % 2 !== 0 ? 40 * (t + 1) : 40 * t) }

function calculateTranslateBottom(e, t) { return .1 * e - ((t + 1) % 2 !== 0 ? 100 * (t + 1) : 100 * t) }

function ready(e) { "loading" != document.readyState ? e() : document.addEventListener("DOMContentLoaded", e) }

function findCurrentBlock(e, t, n, o) { if (Array.isArray(o) || (o = [0, 0]), n) { for (var r = e.length - 1; r >= 0; r--)
            if (e[r].breakpointTop < t) return e[r] } else
        for (var i = 0; i < e.length; i++)
            if (e[i].breakpointTop > t) return e[i - 1]; return n ? e[0] : e[e.length - 1] }

function setActiveSection(e, t) { var n = void 0;
    t.forEach(function(t) { var o = ["section_active", "section_higher", "section_lower"],
            r = void 0;
        t.id === e ? (r = 0, n = !0) : r = n ? 2 : 1, o.map(function(e, n, o) { var i = n === r ? "add" : "remove";
            t.classList[i](e) }) }) }
var _createClass = function() {
        function e(e, t) { for (var n = 0; n < t.length; n++) { var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o) } } return function(t, n, o) { return n && e(t.prototype, n), o && e(t, o), t } }(),
    logo = document.getElementById("logo"),
    logoWrapper = document.getElementById("logo-wrapper"),
    menuImg = document.getElementById("menu-image"),
    sections = Array.from(document.getElementsByTagName("section")),
    linesMenuItems = Array.from(document.getElementsByClassName("lines-menu__item")),
    side = document.getElementById("side"),
    contact = document.getElementById("contact"),
    sideTextBottom = document.getElementById("side-text-bottom"),
    contactLink = document.getElementById("contact-link"),
    sectionOptions = fillOptions(sections),
    currentSection = "",
    currentSectionForMenu = "",
    currentSectionForEffects = "",
    lastSection = "",
    lastSectionForMenu = "",
    lastSectionForEffects = "",
    lastScrollPosition = "",
    lastBlock = void 0,
    windowHeight = 0,
    breakpoints = [],
    isPage = null !== document.getElementById("page"),
    isMobie = !1,
    scrollWatchers = [];
! function() { var e = document.body,
        t = document.getElementById("menu-close"),
        n = document.getElementById("menu-content");
    contactLink.addEventListener("click", function() { return n.classList.toggle("menu-show") }); var o = function() { n.classList.toggle("menu-show") };
    menuImg.addEventListener("click", o), t.addEventListener("click", o), menuImg.addEventListener("mouseover", function() { e.classList.add("navbar-trigger_active") }), menuImg.addEventListener("mouseout", function() { e.classList.remove("navbar-trigger_active") }) }();
var SectionChangeWatcher = function() {
    function e(t) { _classCallCheck(this, e); var n = { breakpoints: [], currentSection: null, name: null, offsetBottom: 0, offsetTop: 0, onChange: function() {}, scrollTrigger: !0 };
        t = Object.assign({}, n, t), Object.assign(this, t) } return _createClass(e, [{ key: "_init", value: function() { var e = this; if (this.scrollTrigger) { var t = document.body.getBoundingClientRect().top;
                window.addEventListener("scroll", function() { return e.onScroll(t) }) } } }, { key: "setBreakpoints", value: function(e) { Array.isArray(e) || console.warn('"breakpoints" should be an array.'), this.breakpoints = e } }, { key: "setOffsets", value: function(e, t) { this.offsetTop = e || this.offsetTop, this.offsetBottom = t || e } }, { key: "findCurrentSection", value: function(e, t, n) { if (n) { t += this.offsetTop; for (var o = e.length - 1; o >= 0; o--)
                    if (e[o].breakpointTop < t) return e[o] } else { t += this.offsetTop; for (var r = 0; r < e.length; r++)
                    if (e[r].breakpointTop > t) return e[r - 1] } return n ? e[0] : e[e.length - 1] } }, { key: "onScroll", value: function(e) { var t = this.findCurrentSection(this.breakpoints, e, this.scrollPosition < e);
            this.scrollPosition = e, this.currentSection !== t && (this.currentSection = t, this.onChange(t)) } }]), e }();
window.addEventListener("resize", onResize), window.addEventListener("scroll", onScroll);
var form = document.getElementsByTagName("form")[0],
    email = document.getElementById("email"),
    formName = document.getElementById("name"),
    errorEmail = document.querySelector(".form-email-error"),
    errorName = document.querySelector(".form-name-error");
email.addEventListener("input", function(e) { errorEmail.innerHTML = "", errorEmail.className = "form-email-error" }, !1), formName.addEventListener("input", function(e) { errorName.innerHTML = "", errorName.className = "form-name-error" }, !1), form.addEventListener("submit", function(e) { var t = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        n = 0 !== email.value.length && t.test(email.value),
        o = 0 === formName.value.length; return n ? (errorEmail.innerHTML = "", errorEmail.className = "form-email-error", o ? (errorName.innerHTML = "error", errorName.className = "form-name-error form-error_active", e.preventDefault(), !1) : (errorName.innerHTML = "", void(errorName.className = "form-name-error"))) : (errorEmail.innerHTML = "error", errorEmail.className = "form-email-error form-error_active", e.preventDefault(), !1) }, !1);
var loading = { avgTime: 3e3, finished: !1, preloader: document.querySelector(".preloader"), preloaderBar: document.querySelector(".preloader > .preloaderBar"), state: 0, trg: 1, loaded: function(e) {++loading.state === loading.trg || e === !0 ? (loading.status(1), setTimeout(loading.done, 500)) : loading.status(loading.state / loading.trg / 1.1) }, status: function(e) { if (!loading.finished) { var t = Math.ceil(100 * e);
            loading.preloaderBar.style.width = t + "%" } }, restart: function() { loading.status(0), loading.preloader.classList.remove("preloader_loaded") }, done: function() { loading.finished || (loading.preloader.classList.add("preloader_loaded"), loading.status(0), loading.finished = !0) } };
setTimeout(function() { loading.loaded(!0) }, 1e4), window.onload = function() { loading.loaded(!0) }, ready(function() { var e = Array.from(document.querySelectorAll("img"));
        e.forEach(function(e) { e.complete || (loading.trg++, e.addEventListener("load", loading.loaded)) }); var t = Array.from(document.querySelectorAll("a"));
        t.forEach(function(e) { var t = e.getAttribute("href"),
                n = new RegExp("^#|mailto|tel").test(t);
            t && !n && e.addEventListener("click", function(e) { loading.restart(), e.preventDefault(), setTimeout(function() { document.location.href = t }, 400) }) }), scrollWatchers.push(new SectionChangeWatcher({ name: "animations", onChange: function(e) { setActiveSection(e.id, sections) }, scrollTrigger: !1 })), onResize(), onScroll() }),
    function() { var e = document.querySelector(".navbar-trigger"),
            t = document.body;
        e.addEventListener("mouseover", function() { t.classList.add("navbar-trigger_active") }), e.addEventListener("mouseout", function() { t.classList.remove("navbar-trigger_active") }) }();