import { events as eventItems, navItems, programs as institutionProjects, scriptAction, team, volunteers } from "./data.js";
import { curriculumPrograms } from "./programs.js";
import { modernLandingPage } from "./landing-modern.js";
const theme = {
    purple: "#2c003e",
    plum: "#15001f",
    orange: "#f89d35",
    paper: "#fffdf8",
    white: "#ffffff",
    ink: "#211326",
    muted: "#69566f",
    line: "rgba(44, 0, 62, 0.14)",
    shadow: "0 18px 44px rgba(44, 0, 62, 0.11)",
};
let currentBreakpoint = "desktop";
let menuOpen = false;
let resizeTimer = 0;
const breakpoint = () => (window.innerWidth < 1060 ? "mobile" : "desktop");
const isCompactScreen = () => window.innerWidth < 640;
const isTabletScreen = () => window.innerWidth >= 640 && window.innerWidth < 1060;
const isWideScreen = () => window.innerWidth >= 1440;
const pageGutter = () => (isCompactScreen() ? "22px" : "32px");
const columns = (phone, tablet, desktop, wide = desktop) => {
    const count = currentBreakpoint === "desktop" ? (isWideScreen() ? wide : desktop) : isTabletScreen() ? tablet : phone;
    return `repeat(${count}, minmax(0, 1fr))`;
};
const heroTitleSize = () => (currentBreakpoint === "desktop" ? (isWideScreen() ? "4.35rem" : "4rem") : isCompactScreen() ? "2.28rem" : "2.75rem");
const mediaHeight = (phone, tablet, desktop, wide = desktop) => {
    const height = currentBreakpoint === "desktop" ? (isWideScreen() ? wide : desktop) : isTabletScreen() ? tablet : phone;
    return `${height}px`;
};
const routePaths = new Set(["/", "/about", "/programs", "/projects", "/events", "/volunteer", "/donate", "/contact"]);
const normalizedRoutePath = (path) => path.replace(/\/+$/, "") || "/";
const isSiteRoute = (path) => routePaths.has(normalizedRoutePath(path)) || normalizedRoutePath(path).startsWith("/projects/");
const pageFromPath = () => {
    const path = normalizedRoutePath(window.location.pathname);
    if (path.startsWith("/projects/"))
        return "project-detail";
    if (path !== "/" && isSiteRoute(path)) {
        return path.slice(1);
    }
    return "home";
};
const cssName = (property) => property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const applyStyle = (element, rules = {}) => {
    element.style.setProperty("box-sizing", "border-box");
    Object.entries(rules).forEach(([property, value]) => element.style.setProperty(cssName(property), String(value)));
    return element;
};
const setAttrs = (element, attrs = {}) => {
    Object.entries(attrs).forEach(([name, value]) => {
        if (value === false || value === null || value === undefined)
            return;
        if (value === true) {
            element.setAttribute(name, "");
            return;
        }
        element.setAttribute(name, String(value));
    });
};
const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach((item) => appendChild(parent, item));
        return;
    }
    if (child === null || child === undefined || typeof child === "boolean")
        return;
    parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
};
const create = (tag, options = {}, ...children) => {
    const element = document.createElement(tag);
    applyStyle(element, options.style);
    setAttrs(element, options.attrs);
    if (options.text !== undefined)
        element.textContent = options.text;
    if (options.onClick)
        element.addEventListener("click", (event) => options.onClick?.(event));
    options.children?.forEach((child) => appendChild(element, child));
    children.forEach((child) => appendChild(element, child));
    return element;
};
const container = (...children) => create("div", {
    style: {
        width: `min(100% - ${pageGutter()}, 1180px)`,
        marginInline: "auto",
    },
    children,
});
const wideCardsContainer = (...children) => create("div", {
    style: {
        width: `min(100% - ${pageGutter()}, 1480px)`,
        marginInline: "auto",
    },
    children,
});
const stack = (gap, ...children) => create("div", { style: { display: "grid", gap: `${gap}px` }, children });
const interactive = (element, normal, active) => {
    applyStyle(element, normal);
    element.addEventListener("mouseenter", () => applyStyle(element, active));
    element.addEventListener("mouseleave", () => applyStyle(element, normal));
    element.addEventListener("focus", () => applyStyle(element, active));
    element.addEventListener("blur", () => applyStyle(element, normal));
    return element;
};
/* ── VV-style chevron SVG ── */
const chevronSvg = () => {
    const ns = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", "0 0 10 6");
    s.setAttribute("width", "10");
    s.setAttribute("height", "6");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.6");
    s.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(ns, "polyline");
    p.setAttribute("points", "1 1 5 5 9 1");
    s.appendChild(p);
    return s;
};
const searchSvg = () => {
    const ns = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("width", "20");
    s.setAttribute("height", "20");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "2");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("aria-hidden", "true");
    ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.35-4.35"].forEach(d => {
        const p = document.createElementNS(ns, "path");
        p.setAttribute("d", d);
        s.appendChild(p);
    });
    return s;
};

/* Nav items with optional dropdown children — mirrors VV structure */
const navItemsWithDropdowns = [
    { id: "home", label: "Home", href: "/", children: [] },
    {
        id: "about", label: "About", href: "/about",
        children: [
            { label: "Our Story", href: "/about" },
            { label: "Team", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Partners", href: "/projects" },
        ],
    },
    {
        id: "programs", label: "Programs", href: "/programs",
        children: [
            { label: "All Programs", href: "/programs" },
            { label: "Scratch Programming", href: "/programs#scratch-programming" },
            { label: "Web Development", href: "/programs#web-development" },
            { label: "App Programming", href: "/programs#app-programming" },
            { label: "Hackathons", href: "/programs#hackathons" },
        ],
    },
    {
        id: "projects", label: "Projects", href: "/projects",
        children: [
            { label: "All Projects", href: "/projects" },
            { label: "Mogra Rescue Centre", href: "/projects" },
            { label: "MSDP", href: "/projects" },
            { label: "Highway Senior School", href: "/projects" },
        ],
    },
    { id: "events", label: "Events", href: "/events", children: [] },
    {
        id: "volunteer", label: "Volunteer", href: "/volunteer",
        children: [
            { label: "Volunteer with LEA", href: "/volunteer" },
            { label: "Sign Up", href: "/volunteer#sign-up" },
        ],
    },
    { id: "contact", label: "Contact", href: "/contact", children: [] },
];

/* Single nav item — desktop dropdown version */
const navDropdownItem = (item, activePage) => {
    const isActive = item.id === activePage;
    const hasChildren = item.children && item.children.length > 0;

    /* Dropdown panel */
    const dropdown = hasChildren
        ? create("div", {
            style: {
                display: "none",
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                minWidth: "200px",
                background: theme.white,
                borderTop: `3px solid ${theme.orange}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                zIndex: "200",
                padding: "8px 0",
            },
            children: item.children.map(child =>
                create("a", {
                    attrs: { href: child.href },
                    text: child.label,
                    style: {
                        display: "block",
                        padding: "10px 22px",
                        fontSize: "0.88rem",
                        color: theme.ink,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        borderBottom: `1px solid ${theme.line}`,
                        transition: "background 0.15s, color 0.15s",
                    },
                    onClick: () => { menuOpen = false; },
                })
            ),
        })
        : null;

    /* Hover effects on dropdown links */
    if (dropdown) {
        dropdown.querySelectorAll?.("a")?.forEach?.(a => {
            a.addEventListener("mouseenter", () => { a.style.background = theme.paper; a.style.color = theme.purple; });
            a.addEventListener("mouseleave", () => { a.style.background = ""; a.style.color = theme.ink; });
        });
    }

    const wrapper = create("div", {
        style: {
            position: "relative",
            display: "inline-flex",
            alignItems: "stretch",
        },
    });

    const linkEl = create("a", {
        attrs: { href: item.href, "aria-current": isActive ? "page" : undefined },
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            height: "72px",
            padding: "0 14px",
            fontSize: "0.9rem",
            fontWeight: "600",
            color: isActive ? theme.purple : "#222",
            textDecoration: "none",
            whiteSpace: "nowrap",
            borderBottom: isActive ? `3px solid ${theme.orange}` : "3px solid transparent",
            transition: "color 0.15s, border-color 0.15s",
        },
        onClick: () => { menuOpen = false; },
    });
    linkEl.appendChild(document.createTextNode(item.label));
    if (hasChildren) linkEl.appendChild(chevronSvg());

    /* Show/hide dropdown on hover */
    if (dropdown) {
        wrapper.addEventListener("mouseenter", () => {
            dropdown.style.display = "block";
            linkEl.style.color = theme.purple;
            linkEl.style.borderBottomColor = theme.orange;
        });
        wrapper.addEventListener("mouseleave", () => {
            dropdown.style.display = "none";
            if (!isActive) {
                linkEl.style.color = "#222";
                linkEl.style.borderBottomColor = "transparent";
            }
        });
        appendChild(wrapper, [linkEl, dropdown]);
    } else {
        linkEl.addEventListener("mouseenter", () => { linkEl.style.color = theme.purple; linkEl.style.borderBottomColor = theme.orange; });
        linkEl.addEventListener("mouseleave", () => { if (!isActive) { linkEl.style.color = "#222"; linkEl.style.borderBottomColor = "transparent"; } });
        appendChild(wrapper, linkEl);
    }

    return wrapper;
};

/* Search button */
const searchButton = () => {
    const btn = create("button", {
        attrs: { type: "button", "aria-label": "Search" },
        style: {
            display: currentBreakpoint === "desktop" ? "inline-flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            background: "none",
            border: "none",
            color: "#444",
            cursor: "pointer",
            borderRadius: "4px",
            transition: "color 0.15s",
        },
    });
    btn.appendChild(searchSvg());
    btn.addEventListener("mouseenter", () => { btn.style.color = theme.purple; });
    btn.addEventListener("mouseleave", () => { btn.style.color = "#444"; });
    return btn;
};

/* VV-style Partner button — solid brand color, square corners */
const partnerButton = () => {
    const btn = create("a", {
        attrs: { href: "/contact" },
        text: "Partner",
        style: {
            display: currentBreakpoint === "desktop" ? "inline-flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            height: "42px",
            padding: "0 24px",
            background: theme.orange,
            color: theme.plum,
            fontWeight: "700",
            fontSize: "0.86rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "none",
            borderRadius: "0",
            flexShrink: "0",
            transition: "background 0.18s, color 0.18s",
        },
    });
    btn.addEventListener("mouseenter", () => { btn.style.background = theme.purple; btn.style.color = theme.white; });
    btn.addEventListener("mouseleave", () => { btn.style.background = theme.orange; btn.style.color = theme.plum; });
    return btn;
};

const logo = () => create("a", {
    attrs: { href: "/", "aria-label": "LEA Organization home" },
    style: {
        display: "inline-flex",
        alignItems: "center",
        flexShrink: "0",
        textDecoration: "none",
    },
    children: [
        create("img", {
            attrs: { src: "/images/lea-logo-transparent.png", alt: "LEA Organization logo" },
            style: {
                display: "block",
                width: currentBreakpoint === "desktop" ? "160px" : "120px",
                height: currentBreakpoint === "desktop" ? "58px" : "44px",
                objectFit: "contain",
            },
        }),
    ],
});

/* Hamburger icon — 3 lines */
const hamburgerIcon = () => {
    const wrap = create("div", { style: { display: "flex", flexDirection: "column", gap: "5px" } });
    [0, 1, 2].forEach(() => {
        wrap.appendChild(create("span", { style: { display: "block", width: "22px", height: "2px", background: "#222", borderRadius: "1px" } }));
    });
    return wrap;
};

/* Close (X) icon */
const closeIcon = () => {
    const wrap = create("div", { style: { position: "relative", width: "22px", height: "22px" } });
    [["rotate(45deg)", "top:9px"], ["rotate(-45deg)", "top:9px"]].forEach(([rot, pos]) => {
        const line = create("span", { style: { position: "absolute", left: "0", width: "22px", height: "2px", background: "#222", borderRadius: "1px", transform: rot } });
        line.setAttribute("style", `position:absolute;left:0;${pos};width:22px;height:2px;background:#222;border-radius:1px;transform:${rot}`);
        wrap.appendChild(line);
    });
    return wrap;
};

const menuButton = () => {
    const button = create("button", {
        attrs: { type: "button", "aria-label": menuOpen ? "Close menu" : "Open menu", "aria-expanded": String(menuOpen) },
        style: {
            display: currentBreakpoint === "desktop" ? "none" : "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            background: "none",
            border: `1px solid #ddd`,
            borderRadius: "4px",
            cursor: "pointer",
            flexShrink: "0",
        },
        onClick: () => {
            menuOpen = !menuOpen;
            render();
        },
    });
    button.appendChild(menuOpen ? closeIcon() : hamburgerIcon());
    return button;
};

/* Mobile nav drawer */
const mobileNavDrawer = (activePage) => create("div", {
    style: {
        display: menuOpen && currentBreakpoint !== "desktop" ? "block" : "none",
        position: "fixed",
        top: "62px",
        left: "0",
        right: "0",
        width: "100vw",
        maxWidth: "100vw",
        bottom: "0",
        zIndex: "999",
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        background: theme.white,
        borderTop: `3px solid ${theme.orange}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    },
    children: [
        create("nav", {
            attrs: { "aria-label": "Mobile navigation" },
            style: { display: "grid", width: "100%", boxSizing: "border-box", padding: "16px 24px 32px" },
            children: navItemsWithDropdowns.map(item => {
                const isActive = item.id === activePage;
                const link = create("a", {
                    attrs: { href: item.href, "aria-current": isActive ? "page" : undefined },
                    text: item.label,
                    style: {
                        display: "flex",
                        alignItems: "center",
                        minHeight: "52px",
                        padding: "0 0",
                        fontSize: "1rem",
                        fontWeight: isActive ? "700" : "500",
                        color: isActive ? theme.purple : "#222",
                        textDecoration: "none",
                        borderBottom: `1px solid ${theme.line}`,
                    },
                    onClick: () => { menuOpen = false; render(); },
                });
                return link;
            }),
        }),
        create("div", {
            style: { padding: "16px 24px 24px" },
            children: [
                create("a", {
                    attrs: { href: "/contact" },
                    text: "Partner",
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "48px",
                        background: theme.orange,
                        color: theme.plum,
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                    },
                }),
            ],
        }),
    ],
});

/* Desktop nav — horizontal link row */
const navigation = (activePage) => create("nav", {
    attrs: { "aria-label": "Main navigation" },
    style: {
        display: currentBreakpoint === "desktop" ? "flex" : "none",
        alignItems: "stretch",
        gap: "0",
        height: "72px",
    },
    children: navItemsWithDropdowns.map(item => navDropdownItem(item, activePage)),
});

/* Right-side action group: partner (desktop) */
const headerActions = () => create("div", {
    style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexShrink: "0",
    },
    children: [partnerButton()],
});

/* Top utility bar — like supamamas: thin strip above the nav */
const topBar = () => create("div", {
    style: {
        display: currentBreakpoint === "desktop" ? "block" : "none",
        background: theme.purple,
        borderBottom: `1px solid rgba(255,255,255,0.1)`,
    },
    children: [
        create("div", {
            style: {
                width: `min(100% - ${pageGutter()}, 1240px)`,
                marginInline: "auto",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
            },
            children: [
                /* Left: contact info */
                create("div", {
                    style: { display: "flex", alignItems: "center", gap: "24px" },
                    children: [
                        create("span", {
                            text: "Mon – Sat : 8:00 – 18:00",
                            style: { fontSize: "0.74rem", color: "rgba(255,255,255,0.7)", fontFamily: "Arial,Helvetica,sans-serif" },
                        }),
                        create("a", {
                            attrs: { href: "mailto:leaorganizationke@gmail.com" },
                            text: "leaorganizationke@gmail.com",
                            style: { fontSize: "0.74rem", color: "rgba(255,255,255,0.7)", fontFamily: "Arial,Helvetica,sans-serif", textDecoration: "none", transition: "color .15s" },
                            onClick: () => {},
                        }),
                        create("a", {
                            attrs: { href: "tel:+254746821567" },
                            text: "+254 746 821567",
                            style: { fontSize: "0.74rem", color: "rgba(255,255,255,0.7)", fontFamily: "Arial,Helvetica,sans-serif", textDecoration: "none" },
                        }),
                    ],
                }),
                /* Right: social icons */
                create("div", {
                    style: { display: "flex", alignItems: "center", gap: "10px" },
                    children: [
                        ["https://www.instagram.com/lea_orgke/", "IG"],
                        ["https://x.com/lea_org", "X"],
                        ["https://www.linkedin.com/in/lea-organization-ke/", "in"],
                    ].map(([href, label]) => {
                        const a = create("a", {
                            attrs: { href, target: "_blank", rel: "noreferrer", "aria-label": label },
                            text: label,
                            style: {
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "26px",
                                height: "26px",
                                fontSize: "0.7rem",
                                fontWeight: "700",
                                fontFamily: "Arial,Helvetica,sans-serif",
                                background: "rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.75)",
                                borderRadius: "3px",
                                textDecoration: "none",
                                transition: "background .15s, color .15s",
                            },
                        });
                        a.addEventListener("mouseenter", () => { a.style.background = theme.orange; a.style.color = theme.plum; });
                        a.addEventListener("mouseleave", () => { a.style.background = "rgba(255,255,255,0.12)"; a.style.color = "rgba(255,255,255,0.75)"; });
                        return a;
                    }),
                }),
            ],
        }),
    ],
});

const header = (activePage) => {
    const headerEl = create("header", {
        style: {
            position: "sticky",
            top: "0",
            zIndex: "1000",
            background: theme.white,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        },
    });

    const topBarEl = topBar();

    const inner = create("div", {
        style: {
            width: `min(100% - ${pageGutter()}, 1240px)`,
            marginInline: "auto",
            height: currentBreakpoint === "desktop" ? "72px" : "62px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0",
            borderBottom: `1px solid #e8e8e8`,
        },
    });

    appendChild(inner, [
        logo(),
        navigation(activePage),
        currentBreakpoint === "desktop" ? headerActions() : menuButton(),
    ]);

    appendChild(headerEl, [topBarEl, inner, mobileNavDrawer(activePage)]);
    return headerEl;
};
const emptyPage = () => create("main", {
    attrs: { "aria-label": "Page content" },
    style: {
        minHeight: currentBreakpoint === "desktop" ? "calc(100vh - 86px)" : "calc(100vh - 72px)",
        background: theme.white,
    },
});
const section = (background, padding, ...children) => create("section", { style: { background, padding }, children });
const heading = (text, level, extra = {}) => {
    const size = level === 1
        ? currentBreakpoint === "desktop"
            ? "3.15rem"
            : "2.35rem"
        : level === 2
            ? currentBreakpoint === "desktop"
                ? "2.35rem"
                : "1.85rem"
            : "1.08rem";
    return create(`h${level}`, {
        text,
        style: {
            margin: "0",
            color: theme.ink,
            fontFamily: 'Outfit, Arial, Helvetica, sans-serif',
            fontSize: size,
            fontWeight: "700",
            lineHeight: "1.05",
            letterSpacing: "0",
            ...extra,
        },
    });
};
const copy = (text, extra = {}) => create("p", {
    text,
    style: {
        margin: "0",
        color: theme.muted,
        fontSize: currentBreakpoint === "desktop" ? "1.08rem" : "1rem",
        lineHeight: "1.62",
        ...extra,
    },
});
const eyebrow = (text, extra = {}) => create("span", {
    text,
    style: {
        display: "inline-block",
        color: theme.purple,
        fontSize: "0.78rem",
        fontWeight: "700",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        ...extra,
    },
});
const image = (src, alt, extra = {}) => create("img", {
    attrs: { src, alt, loading: "lazy" },
    style: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...extra,
    },
});
const actionButton = (href, text, variant = "orange") => {
    const link = create("a", {
        attrs: { href },
        text,
        style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: currentBreakpoint === "desktop" ? "46px" : "40px",
            padding: currentBreakpoint === "desktop" ? "12px 20px" : "10px 14px",
            fontSize: currentBreakpoint === "desktop" ? "0.78rem" : "0.68rem",
            borderRadius: "3px",
            fontWeight: variant === "hero" || variant === "hero-purple" ? "500" : "700",
            lineHeight: "1",
            textDecoration: "none",
        },
    });
    if (variant === "outline") {
        return interactive(link, { color: theme.white, background: "transparent", border: "1px solid rgba(255,255,255,0.55)" }, { color: theme.purple, background: theme.white, border: `1px solid ${theme.white}` });
    }
    if (variant === "purple") {
        return interactive(link, { color: theme.white, background: theme.purple, border: `1px solid ${theme.purple}` }, { color: theme.plum, background: theme.orange, border: `1px solid ${theme.orange}` });
    }
    if (variant === "hero-purple") {
        return interactive(link, { color: theme.white, background: theme.purple, border: `1px solid ${theme.purple}` }, { color: theme.plum, background: theme.orange, border: `1px solid ${theme.orange}` });
    }
    return interactive(link, { color: theme.plum, background: theme.orange, border: `1px solid ${theme.orange}` }, { color: theme.white, background: theme.purple, border: `1px solid ${theme.purple}` });
};
const sectionTitle = (label, title, text) => stack(10, eyebrow(label, { textAlign: "center" }), heading(title, 2, { textAlign: "center" }), text ? copy(text, { maxWidth: "650px", marginInline: "auto", textAlign: "center" }) : null);
const cardStyle = (extra = {}) => ({
    overflow: "hidden",
    border: `1px solid ${theme.line}`,
    borderRadius: "7px",
    background: theme.white,
    boxShadow: "0 18px 40px rgba(44, 0, 62, 0.08)",
    ...extra,
});
const landingHero = () => create("section", {
    style: { position: "relative", overflow: "hidden", background: theme.paper, padding: currentBreakpoint === "desktop" ? "30px 0 0" : "18px 0 0" },
    children: [container(create("div", {
        style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "0.92fr 1.08fr" : "1fr", gap: currentBreakpoint === "desktop" ? "56px" : "28px", alignItems: "center", minHeight: currentBreakpoint === "desktop" ? "650px" : "auto", padding: currentBreakpoint === "desktop" ? "58px 0 70px" : "34px 0 46px" },
        children: [
            stack(22, eyebrow("LEA Organization · Nairobi", { color: theme.orange }), create("h1", { style: { margin: "0", color: theme.purple, maxWidth: "620px", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: currentBreakpoint === "desktop" ? "clamp(3.5rem, 6vw, 5.7rem)" : "2.85rem", fontWeight: "800", lineHeight: "0.98", letterSpacing: "-0.055em" }, children: ["A brighter future ", create("span", { text: "starts with code.", style: { color: theme.orange } })] }), copy("We help young learners aged 9–18 discover their voice through coding, mentorship, and projects they can proudly call their own.", { color: theme.ink, maxWidth: "560px", fontSize: currentBreakpoint === "desktop" ? "1.18rem" : "1.04rem", lineHeight: "1.58" }), create("div", { style: { display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "2px" }, children: [actionButton("/programs", "Explore our programs", "orange"), actionButton("/contact", "Bring LEA to your school", "purple")] }), create("div", { style: { display: "flex", flexWrap: "wrap", gap: "22px", paddingTop: "18px", borderTop: `1px solid ${theme.line}`, maxWidth: "540px" }, children: [stack(2, create("strong", { text: "200+", style: { color: theme.purple, fontSize: "1.55rem", lineHeight: "1" } }), copy("young coders trained", { fontSize: "0.82rem", color: theme.muted })), stack(2, create("strong", { text: "35+", style: { color: theme.purple, fontSize: "1.55rem", lineHeight: "1" } }), copy("active volunteers", { fontSize: "0.82rem", color: theme.muted })), stack(2, create("strong", { text: "47", style: { color: theme.purple, fontSize: "1.55rem", lineHeight: "1" } }), copy("counties in reach", { fontSize: "0.82rem", color: theme.muted }))] })),
            create("div", { style: { position: "relative", minHeight: currentBreakpoint === "desktop" ? "560px" : "380px", display: "grid", alignItems: "center" }, children: [create("div", { attrs: { "aria-hidden": "true" }, style: { position: "absolute", width: "78%", height: "78%", right: "0", top: "10%", background: "#f7e8d5", borderRadius: "28px 28px 28px 110px", transform: "rotate(5deg)" } }), create("figure", { style: { position: "relative", zIndex: "2", width: "86%", height: currentBreakpoint === "desktop" ? "500px" : "330px", margin: "0 0 0 auto", overflow: "hidden", borderRadius: "18px 18px 18px 90px", boxShadow: "0 28px 70px rgba(44,0,62,0.22)", background: theme.plum }, children: [image("images/Happy.jpeg", "LEA learners smiling during a learning day", { objectPosition: "center", filter: "saturate(1.06) contrast(1.02)" }), create("div", { style: { position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(44,0,62,0.02), rgba(44,0,62,0.4))" } })] }), create("div", { style: { position: "absolute", zIndex: "3", left: "0", bottom: currentBreakpoint === "desktop" ? "40px" : "18px", width: "min(82%, 320px)", padding: "20px", background: theme.purple, borderRadius: "12px", boxShadow: "0 20px 40px rgba(44,0,62,0.24)" }, children: [eyebrow("What we believe", { color: theme.orange }), create("p", { text: "Every learner deserves a chance to build, belong, and be seen.", style: { margin: "8px 0 0", color: theme.white, fontSize: "1.05rem", fontWeight: "700", lineHeight: "1.3" } })] })] })
        ]
    })), create("div", { style: { height: "8px", background: `linear-gradient(90deg, ${theme.orange} 0 30%, ${theme.purple} 30% 100%)` } })]
});
const missionCardsSection = () => {
    const storyStats = [
        [2, "Years of Experience"],
        [35, "Active Volunteers"],
        [47, "Available Counties"],
        [200, "Young Coders Trained"],
    ];
    return create("section", {
        style: {
            position: "relative",
            zIndex: "4",
            background: theme.white,
            padding: currentBreakpoint === "desktop" ? "0 0 46px" : "24px 0 46px",
            overflow: "visible",
        },
    }, wideCardsContainer(stack(currentBreakpoint === "desktop" ? 34 : 28, create("div", {
        style: {
            position: "relative",
            zIndex: "12",
            display: "grid",
            gridTemplateColumns: currentBreakpoint === "desktop" ? "0.72fr 1.28fr" : "1fr",
            gap: currentBreakpoint === "desktop" ? "0" : "24px",
            alignItems: "stretch",
            minHeight: currentBreakpoint === "desktop" ? "430px" : "auto",
        },
        children: [
            storyGlobe(),
            storyTextPanel(),
        ],
    }), create("div", {
        style: {
            display: "grid",
            gridTemplateColumns: columns(1, 2, 4),
            gap: currentBreakpoint === "desktop" ? "0" : "18px",
            borderTop: `1px solid ${theme.line}`,
        },
        children: storyStats.map(([value, label], index) => storyStat(value, label, index)),
    }))));
};
const storyTextPanel = () => create("div", {
    style: {
        padding: currentBreakpoint === "desktop" ? "36px max(64px, calc((100vw - 1180px) / 2 + 64px)) 36px 48px" : "26px",
        marginRight: currentBreakpoint === "desktop" ? "calc(max(16px, calc((100vw - 1180px) / 2 + 16px)) * -1)" : "0",
        background: theme.purple,
        color: theme.white,
        minHeight: currentBreakpoint === "desktop" ? "430px" : "auto",
        display: "grid",
        alignContent: "center",
        boxShadow: "none",
    },
    children: [
        stack(14, eyebrow("Our Story", { color: theme.orange }), heading("Founded by two coders who wanted to share what changed their own lives.", 2, {
            color: theme.white,
            maxWidth: "940px",
            fontSize: currentBreakpoint === "desktop" ? "2.2rem" : "1.82rem",
        }), copy("LEA was founded on 14 May 2024 by Anne Apiyo and Felistus Kioko. It began with a shared love for coding and a belief that children who are often left behind should meet technology early, not as something distant, but as something they can use, question, and build with.", {
            maxWidth: "940px",
            color: "#f4e8f7",
            fontWeight: "700",
        }), copy("Through coding workshops, hackathons, student projects, and community learning days, we help learners build confidence one session at a time.", {
            maxWidth: "940px",
            color: "#eadbed",
        }), create("a", {
            attrs: { href: "/about" },
            text: "OUR STORY",
            style: {
                display: "inline-flex",
                width: "fit-content",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50px",
                padding: "14px 34px",
                marginTop: "10px",
                background: theme.orange,
                color: theme.plum,
                fontWeight: "700",
                letterSpacing: "0.06em",
                textDecoration: "none",
            },
        })),
    ],
});
const storyGlobe = () => {
    const projects = [
        ["Mogra Rescue Center", "40%", "35%"],
        ["Mukuru Slums Development Project", "39%", "60%"],
        ["Highway Secondary School", "59%", "47%"],
    ];
    const globeFace = image("images/Happy.jpeg", "LEA learners smiling during a learning day", {
        position: "absolute",
        inset: currentBreakpoint === "desktop" ? "8% 4%" : "6% 3%",
        zIndex: "3",
        objectFit: "cover",
        objectPosition: "center",
        opacity: "1",
        filter: "saturate(1.06) contrast(1.04) drop-shadow(0 28px 24px rgba(44,0,62,0.18))",
        clipPath: "polygon(4% 0, 96% 0, 100% 5%, 100% 95%, 96% 100%, 4% 100%, 0 95%, 0 5%)",
        transformOrigin: "50% 50%",
    });
    const globe = create("div", {
        style: {
            position: "relative",
            zIndex: "6",
            width: currentBreakpoint === "desktop" ? (isWideScreen() ? "900px" : "850px") : isTabletScreen() ? "min(90vw, 510px)" : "min(104vw, 360px)",
            height: mediaHeight(320, 408, 680, 720),
            marginInline: currentBreakpoint === "desktop" ? "-154px auto" : "auto",
        },
        children: [
            create("div", {
                attrs: { "aria-hidden": "true" },
                style: {
                    position: "absolute",
                    left: "19%",
                    right: "19%",
                    bottom: currentBreakpoint === "desktop" ? "42px" : "34px",
                    zIndex: "1",
                    height: currentBreakpoint === "desktop" ? "48px" : "34px",
                    borderRadius: "999px",
                    background: "radial-gradient(ellipse, rgba(44,0,62,0.16) 0%, rgba(44,0,62,0.08) 42%, rgba(44,0,62,0) 72%)",
                    filter: "blur(8px)",
                },
            }),
            globeFace,
        ],
    });
    window.requestAnimationFrame(() => {
        globeFace.animate([
            { transform: "translateY(0)" },
            { transform: "translateY(-8px)" },
            { transform: "translateY(0)" },
        ], {
            duration: 9000,
            iterations: Infinity,
            easing: "linear",
        });
    });
    return create("div", {
        style: {
            position: "relative",
            zIndex: "16",
            minHeight: mediaHeight(340, 430, 520, 560),
            display: "grid",
            alignItems: "start",
            justifyItems: currentBreakpoint === "desktop" ? "start" : "center",
            marginTop: currentBreakpoint === "desktop" ? "-72px" : "14px",
            overflow: "visible",
        },
        children: [globe],
    });
};
const storyProjectMarker = (name, left, top, index) => {
    const label = create("span", {
        text: name,
        style: {
            position: "absolute",
            left: "50%",
            bottom: "calc(100% + 12px)",
            transform: "translateX(-50%) translateY(0)",
            width: "max-content",
            minWidth: currentBreakpoint === "desktop" ? "220px" : isCompactScreen() ? "150px" : "190px",
            maxWidth: currentBreakpoint === "desktop" ? "320px" : isCompactScreen() ? "min(72vw, 220px)" : "280px",
            padding: "11px 18px",
            background: theme.orange,
            color: theme.plum,
            boxShadow: "0 14px 32px rgba(248,157,53,0.28)",
            fontSize: currentBreakpoint === "desktop" ? "0.92rem" : "0.8rem",
            fontWeight: "700",
            textAlign: "center",
            whiteSpace: isCompactScreen() ? "normal" : "nowrap",
            opacity: "1",
            pointerEvents: "none",
            transition: "opacity 180ms ease, transform 180ms ease",
        },
    });
    return create("button", {
        attrs: { type: "button", "aria-label": `Show ${name}` },
        onClick: () => {
            const visible = label.style.opacity === "1";
            applyStyle(label, {
                opacity: visible ? "0.68" : "1",
                transform: visible ? "translateX(-50%) translateY(4px)" : "translateX(-50%) translateY(0)",
            });
        },
        style: {
            position: "absolute",
            left,
            top,
            zIndex: "5",
            width: index === 0 ? "18px" : "15px",
            height: index === 0 ? "18px" : "15px",
            padding: "0",
            border: "0",
            borderRadius: "999px",
            background: theme.purple,
            boxShadow: "0 0 0 7px rgba(44,0,62,0.11), 0 6px 16px rgba(44,0,62,0.22)",
            cursor: "pointer",
        },
        children: [
            label,
            create("span", {
                attrs: { "aria-hidden": "true" },
                style: {
                    position: "absolute",
                    inset: "-6px",
                    border: "1px solid rgba(44,0,62,0.28)",
                    borderRadius: "inherit",
                },
            }),
        ],
    });
};
const storyStat = (target, label, index) => {
    const value = create("strong", {
        text: "0",
        style: {
            display: "block",
            color: theme.orange,
            fontSize: currentBreakpoint === "desktop" ? "2.7rem" : "2.1rem",
            lineHeight: "1",
            fontWeight: "700",
            marginBottom: "14px",
        },
    });
    window.requestAnimationFrame(() => {
        const start = performance.now();
        const duration = 1600 + index * 180;
        const tick = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            value.textContent = String(Math.round(target * eased));
            if (progress < 1)
                window.requestAnimationFrame(tick);
        };
        window.requestAnimationFrame(tick);
    });
    return create("article", {
        style: {
            padding: currentBreakpoint === "desktop" ? "30px 32px 0" : "22px 0 0",
            borderLeft: currentBreakpoint === "desktop" && index > 0 ? `1px solid ${theme.line}` : "0",
        },
        children: [
            value,
            create("span", {
                text: label,
                style: {
                    display: "block",
                    color: "#000000",
                    fontSize: "1rem",
                    fontWeight: "700",
                    lineHeight: "1.25",
                },
            }),
        ],
    });
};
const transformationSection = () => create("section", {
    style: {
        position: "relative",
        overflow: "hidden",
        padding: currentBreakpoint === "desktop" ? "76px 0 92px" : "58px 0 66px",
        background: currentBreakpoint === "desktop"
            ? `linear-gradient(90deg, #050505 0 60%, ${theme.purple} 60% 100%)`
            : `linear-gradient(180deg, #050505 0 48%, ${theme.purple} 48% 100%)`,
    },
}, container(stack(currentBreakpoint === "desktop" ? 28 : 22, heading("We Prepare Them For A Future In Technology", 2, {
    color: theme.orange,
    maxWidth: currentBreakpoint === "desktop" ? "760px" : "100%",
    fontSize: currentBreakpoint === "desktop" ? "3rem" : "2.1rem",
    textTransform: "uppercase",
    lineHeight: "1.18",
}), create("div", {
    style: {
        width: currentBreakpoint === "desktop" ? "min(100%, 1120px)" : "100%",
        marginLeft: currentBreakpoint === "desktop" ? "0" : "0",
        transform: currentBreakpoint === "desktop" ? "translateX(24px)" : "none",
    },
    children: [lazyVideoPlayer()],
}))));
const lazyVideoPlayer = () => {
    const frame = create("figure", {
        style: {
            position: "relative",
            overflow: "hidden",
            margin: "0",
            aspectRatio: "16 / 9",
            background: "#050505",
            boxShadow: "0 32px 80px rgba(0,0,0,0.38)",
        },
        children: [
            image("images/video-poster.jpg", "LEA team celebrating together outdoors", {
                position: "absolute",
                inset: "0",
                zIndex: "0",
                objectFit: "cover",
                objectPosition: "center",
            }),
            create("div", {
                attrs: { "aria-hidden": "true" },
                style: {
                    position: "absolute",
                    inset: "0",
                    zIndex: "1",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.72))",
                },
            }),
            create("button", {
                attrs: { type: "button", "aria-label": "Play LEA video" },
                style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    zIndex: "2",
                    width: currentBreakpoint === "desktop" ? "78px" : "64px",
                    height: currentBreakpoint === "desktop" ? "78px" : "64px",
                    display: "grid",
                    placeItems: "center",
                    padding: "0",
                    transform: "translate(-50%, -50%)",
                    border: `3px solid ${theme.orange}`,
                    borderRadius: "999px",
                    background: "#050505",
                    color: theme.orange,
                    cursor: "pointer",
                    boxShadow: "0 18px 46px rgba(0,0,0,0.32)",
                },
                onClick: () => {
                    const video = create("video", {
                        attrs: { controls: true, autoplay: true, preload: "metadata", playsinline: true, poster: "images/video-poster.jpg" },
                        style: {
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            background: "#050505",
                        },
                        children: [create("source", { attrs: { src: "images/Intro (1).mp4", type: "video/mp4" } })],
                    });
                    frame.replaceChildren(video);
                    video.play().catch(() => undefined);
                },
                children: [
                    create("span", {
                        attrs: { "aria-hidden": "true" },
                        style: {
                            display: "block",
                            width: "0",
                            height: "0",
                            marginLeft: "5px",
                            borderTop: currentBreakpoint === "desktop" ? "14px solid transparent" : "11px solid transparent",
                            borderBottom: currentBreakpoint === "desktop" ? "14px solid transparent" : "11px solid transparent",
                            borderLeft: currentBreakpoint === "desktop" ? `22px solid ${theme.orange}` : `18px solid ${theme.orange}`,
                        },
                    }),
                ],
            }),
            create("div", {
                style: {
                    position: "absolute",
                    left: currentBreakpoint === "desktop" ? "24px" : "14px",
                    right: currentBreakpoint === "desktop" ? "24px" : "14px",
                    bottom: currentBreakpoint === "desktop" ? "18px" : "12px",
                    zIndex: "2",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: theme.white,
                    fontWeight: "700",
                },
                children: [
                    create("span", {
                        style: { flex: "1", height: "3px", background: "rgba(255,255,255,0.5)" },
                    }),
                ],
            }),
        ],
    });
    return frame;
};
const programsPage = () => create("main", {
    attrs: { "aria-label": "Our programs content" },
    style: { background: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif" },
    children: [programsHero(), programsLearningPathSection(), programsPathwaySection(), landingFooter()],
});
const programsHero = () => create("section", {
    style: {
        background: theme.plum,
        padding: "0",
    },
    children: [create("div", {
        style: {
            position: "relative",
            minHeight: currentBreakpoint === "desktop" ? "345px" : "420px",
            display: "grid",
            alignItems: "end",
            overflow: "hidden",
        },
        children: [
            image("images/programs-hero-realistic.jpg", "LEA learners coding during a program session", { position: "absolute", inset: "0", objectPosition: "center", filter: "brightness(0.66) saturate(1.02)" }),
            create("div", { style: { position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(10,10,10,0.74) 0%, rgba(10,10,10,0.36) 58%, rgba(10,10,10,0.08) 100%), linear-gradient(0deg, rgba(10,10,10,0.64) 0%, rgba(10,10,10,0.04) 72%)" } }),
            create("div", { style: { position: "relative", zIndex: "2", alignSelf: "end", padding: currentBreakpoint === "desktop" ? "0 max(calc((100vw - 1240px) / 2), 32px) 44px" : "0 24px 44px", maxWidth: "1100px" }, children: [stack(12, create("h1", {
                style: {
                    margin: "0",
                    color: theme.white,
                    maxWidth: "860px",
                    fontFamily: "Outfit, Arial, Helvetica, sans-serif",
                    fontSize: currentBreakpoint === "desktop" ? "clamp(2.15rem, 3.45vw, 3.2rem)" : "1.78rem",
                    fontWeight: "500",
                    lineHeight: "1.04",
                    letterSpacing: "-0.025em",
                    whiteSpace: currentBreakpoint === "desktop" ? "nowrap" : "normal",
                },
                children: ["Four pathways for ", create("span", { text: "young builders", style: { color: theme.white } }), "."],
            }), copy("Learners move from playful coding foundations to websites, app prototypes, and team build challenges that help them explain what they create.", {
                color: "#f4e8f7",
                maxWidth: "740px",
                fontWeight: "400",
                fontSize: currentBreakpoint === "desktop" ? "0.92rem" : "0.8rem",
            }), create("div", {
                style: { display: "flex", flexWrap: "nowrap", gap: currentBreakpoint === "desktop" ? "10px" : "5px", marginTop: "2px", whiteSpace: "nowrap" },
                children: [actionButton("#program-pathways", "Explore programs", "hero"), actionButton("/contact", "Bring LEA to your school", "hero-purple")],
            }))] }),
        ],
    })],
});
const programsOverviewSection = () => section(theme.white, currentBreakpoint === "desktop" ? "96px 0 108px" : "62px 0 76px", container(create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.9fr 1.1fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "64px" : "30px",
        alignItems: "center",
    },
    children: [
        create("div", { style: { minHeight: currentBreakpoint === "desktop" ? "330px" : "260px", overflow: "hidden", background: theme.plum }, children: [image("images/programs-story.jpg", "LEA learners building projects together", { objectPosition: "center", filter: "saturate(1.03) contrast(1.03)" })] }),
        stack(16, eyebrow("Learning Pathway", { color: theme.orange }), heading("Making a difference through practical learning.", 2, {
            fontSize: currentBreakpoint === "desktop" ? "2.7rem" : "2rem",
            fontWeight: "500",
        }), copy("Our programs give young people a welcoming place to learn coding, make useful things, and discover that technology is something they can shape."), copy("From playful first steps to websites, apps, and team challenges, every pathway is designed around confidence, practice, and a clear build outcome.")),
    ],
})));
const programSnapshotCard = (program) => create("a", {
    attrs: { href: `#${programSlug(program.title)}` },
    style: {
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        gap: "14px",
        alignItems: "center",
        padding: "20px",
        background: theme.paper,
        border: `1px solid ${theme.line}`,
        borderLeft: `5px solid ${theme.orange}`,
        color: theme.ink,
        textDecoration: "none",
        boxShadow: "0 14px 32px rgba(44,0,62,0.07)",
    },
    children: [
        create("span", {
            text: program.number,
            style: {
                width: "48px",
                height: "48px",
                display: "inline-grid",
                placeItems: "center",
                background: theme.purple,
                color: theme.white,
                fontWeight: "700",
            },
        }),
        stack(4, heading(program.title, 3, { color: theme.purple, fontSize: "1.2rem" }), copy(program.label, { color: theme.muted, fontSize: "0.95rem", lineHeight: "1.35" })),
    ],
});
const programsSupportBand = () => section("#eef3e8", currentBreakpoint === "desktop" ? "34px 0 38px" : "28px 0 32px", container(create("div", {
    style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" },
    children: [
        create("h2", { text: "With your help, we can uplift communities and bring hope to those in need.", style: { margin: "0", maxWidth: "680px", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "1.55rem" : "1.2rem", fontWeight: "500", lineHeight: "1.15", textTransform: "uppercase" } }),
        actionButton("/donate", "Support Us"),
    ],
})));
const programsStatsSection = () => section(theme.white, currentBreakpoint === "desktop" ? "54px 0 64px" : "42px 0 50px", container(create("div", {
    style: { display: "grid", gridTemplateColumns: columns(2, 2, 4), gap: currentBreakpoint === "desktop" ? "0" : "24px", borderTop: `1px solid ${theme.line}`, paddingTop: "28px" },
    children: [["200+", "Young coders trained"], ["4", "Learning pathways"], ["35+", "Active volunteers"], ["47", "Counties in reach"]].map(([value, label], index) => create("div", { style: { padding: currentBreakpoint === "desktop" ? "0 24px" : "0", borderLeft: currentBreakpoint === "desktop" && index > 0 ? `1px solid ${theme.line}` : "0" }, children: [create("strong", { text: value, style: { display: "block", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.35rem" : "1.8rem", fontWeight: "500", lineHeight: "1" } }), create("span", { text: label, style: { display: "block", marginTop: "8px", color: theme.muted, fontSize: "0.78rem", lineHeight: "1.3" } })] }))
}))); 
const programsDarkFeatureSection = () => section("#050505", currentBreakpoint === "desktop" ? "72px 0 82px" : "52px 0 60px", container(create("div", {
    style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "0.78fr 1.22fr" : "1fr", gap: currentBreakpoint === "desktop" ? "46px" : "26px", alignItems: "center" },
    children: [
        stack(12, eyebrow("LEA learning in action", { color: theme.orange }), create("h2", { text: "Building confidence through practical projects.", style: { margin: "0", color: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.1rem" : "1.75rem", fontWeight: "500", lineHeight: "1.08" } }), copy("Learners work together, test ideas, and turn everyday questions into digital projects they can share.", { color: "#d8d0dc", fontSize: "0.92rem", lineHeight: "1.6" })),
        create("div", { style: { position: "relative", minHeight: currentBreakpoint === "desktop" ? "280px" : "220px", overflow: "hidden" }, children: [image("images/programs-web.jpg", "LEA learners working together on a web project", { objectPosition: "center 42%" }), create("div", { style: { position: "absolute", right: "16px", bottom: "16px", padding: "12px 16px", background: theme.orange, color: theme.plum, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.72rem", fontWeight: "600", textTransform: "uppercase" }, text: "Learn, build, share" })] }),
    ],
})));
const programsSectionIntro = (kicker, title, description, background = "#ffffff") => create("div", {
    style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "minmax(0, 1fr) minmax(300px, 0.9fr)" : "1fr", gap: currentBreakpoint === "desktop" ? "54px" : "18px", alignItems: "end" },
    children: [
        stack(8, create("span", { text: kicker, style: { color: kicker === "How it works" || kicker === "Our Programs" ? theme.orange : theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "clamp(2.1rem, 3.5vw, 2.8rem)" : "2rem", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em" } }), create("h2", { text: title, style: { margin: "0", color: theme.plum, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.25rem" : "1.75rem", fontWeight: "500", lineHeight: "1.12" } })),
        copy(description, { color: theme.muted, fontSize: "0.94rem", lineHeight: "1.65", maxWidth: "560px" }),
    ],
});
const programsLearningPathSection = () => section("#f4f6f4", currentBreakpoint === "desktop" ? "58px 0 62px" : "42px 0 48px", container(stack(24, programsSectionIntro("How it works", "A pathway from learning to possibility.", "Every learner moves through a supportive rhythm: build the foundations, practice together, show what you know, and celebrate the progress.", "#f4f6f4"), create("div", {
    style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: currentBreakpoint === "desktop" ? "0" : "18px", margin: "6px 0 8px", padding: currentBreakpoint === "desktop" ? "0 12px" : "0" },
    children: [["Learning", "Build the foundation"], ["Hackathons", "Create together"], ["Exams", "Show what you know"], ["Graduation", "Celebrate progress"]].map(([title, text], index) => create("div", { style: { position: "relative", display: "grid", justifyItems: "center", gap: "8px", padding: currentBreakpoint === "desktop" ? "0 10px" : "12px 4px", textAlign: "center" }, children: [index < 3 && currentBreakpoint === "desktop" ? create("div", { attrs: { "aria-hidden": "true" }, style: { position: "absolute", top: "19px", left: "50%", width: "100%", height: "2px", background: "#d8cde0", zIndex: "0" } }) : null, create("span", { text: String(index + 1).padStart(2, "0"), style: { position: "relative", zIndex: "1", display: "grid", placeItems: "center", width: "40px", height: "40px", borderRadius: "50%", background: theme.purple, color: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.72rem", fontWeight: "500" } }), create("strong", { text: title, style: { color: theme.plum, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.9rem", fontWeight: "500" } }), create("span", { text, style: { color: theme.muted, fontSize: "0.72rem", lineHeight: "1.35" } })] })),
}))));
const programsPathwaySection = () => section("#ffffff", currentBreakpoint === "desktop" ? "76px 0 92px" : "52px 0 64px", container(stack(24, programsSectionIntro("Our Programs", "Four pathways for young builders.", "From first code to practical digital projects, each program gives learners a clear place to start, practice, and grow."), create("div", {
    attrs: { id: "program-pathways" },
    style: { display: "grid", gridTemplateColumns: columns(1, 2, 4), gap: currentBreakpoint === "desktop" ? "22px" : "18px" },
    children: curriculumPrograms.map((program, index) => programCard(program, index)),
}))));
const programCard = (program, index) => create("article", {
    attrs: { id: programSlug(program.title) },
    style: {
        position: "relative",
        display: "grid",
        gridTemplateRows: currentBreakpoint === "desktop" ? "220px 1fr" : "200px 1fr",
        minHeight: currentBreakpoint === "desktop" ? "470px" : "auto",
        overflow: "hidden",
        background: theme.purple,
        border: `1px solid ${theme.purple}`,
        boxShadow: "0 10px 28px rgba(44,0,62,0.14)",
    },
    children: [
        create("div", {
            style: { position: "relative", overflow: "hidden", background: theme.plum },
            children: [
                image(["images/programs/scratch.jpg", "images/programs/web-development.jpg", "images/programs/app-programming.jpg", "images/programs/hackathons.jpg"][index] || program.image, program.alt, {
                    objectPosition: index === 2 ? "center 36%" : index === 3 ? "center 35%" : "center",
                    filter: "saturate(1.04) contrast(1.04)",
                }),
            ],
        }),
        create("div", {
            style: {
                padding: currentBreakpoint === "desktop" ? "22px" : "18px",
                color: theme.white,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            },
            children: [
                create("span", { text: program.number, style: { display: "block", color: theme.orange, fontSize: "0.72rem", fontWeight: "500", letterSpacing: "0.1em" } }),
                create("h3", { text: program.title, style: { margin: "0", color: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "1.25rem" : "1.12rem", fontWeight: "500", lineHeight: "1.08" } }),
                create("p", { text: program.label, style: { margin: "0", color: theme.orange, fontSize: "0.78rem", fontWeight: "500", lineHeight: "1.3" } }),
                create("p", { text: program.text, style: { margin: "2px 0 0", color: "rgba(255,255,255,0.82)", fontSize: "0.82rem", lineHeight: "1.55" } }),
            ],
        }),
    ],
});
const programsFlowSection = () => {
    const steps = [
        ["Start With Access", "We meet learners where they are, set up the tools, and begin with approachable activities."],
        ["Build In Sessions", "Learners practice by making small projects, improving them, and asking better questions."],
        ["Share The Work", "Each pathway ends with demos, feedback, and next steps learners can keep building from."],
    ];
    return section("#ffffff", currentBreakpoint === "desktop" ? "96px 0 108px" : "62px 0 76px", container(create("div", {
        style: {
            display: "grid",
            gridTemplateColumns: currentBreakpoint === "desktop" ? "0.95fr 1.05fr" : "1fr",
            gap: currentBreakpoint === "desktop" ? "44px" : "28px",
            alignItems: "stretch",
        },
        children: [
            programImagePanel("images/programs-web.jpg", "LEA learners coding together during a practical session", "Practical sessions", "brightness(0.48) contrast(1.12) saturate(1.04)"),
            stack(22, stack(12, eyebrow("How It Works", { color: theme.orange }), heading("A rhythm learners can follow.", 2, {
                fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem",
                fontWeight: "500",
            }), copy("The curriculum works best when learners get a little guidance, a real build task, and space to explain their thinking.")), create("div", {
                style: { display: "grid", gap: "14px" },
                children: steps.map(([title, text], index) => programFlowCard(title, text, index)),
            })),
        ],
    }))); 
};
const programImagePanel = (src, alt, label, filter = "none", sharpEdges = false) => create("figure", {
    style: {
        position: "relative",
        minHeight: currentBreakpoint === "desktop" ? "420px" : "280px",
        margin: "0",
        overflow: "hidden",
        background: theme.plum,
        borderRadius: sharpEdges ? "0" : "0 0 0 72px",
        boxShadow: "0 18px 42px rgba(44,0,62,0.12)",
    },
    children: [
        image(src, alt, { objectPosition: "center 42%", filter }),
        create("figcaption", {
            text: label,
            style: { position: "absolute", left: "20px", bottom: "18px", padding: "11px 15px", background: "rgba(44,0,62,0.9)", color: theme.white, fontSize: "0.78rem", fontWeight: "500", letterSpacing: "0.04em" },
        }),
    ],
});
const programFlowCard = (title, text, index) => create("article", {
    style: {
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        gap: "16px",
        alignItems: "start",
        padding: currentBreakpoint === "desktop" ? "22px 20px 24px" : "18px 16px 20px",
        background: "#f4f6f4",
        border: `1px solid ${theme.line}`,
    },
    children: [
        create("span", {
            text: String(index + 1).padStart(2, "0"),
            style: {
                width: "46px",
                height: "46px",
                display: "inline-grid",
                placeItems: "center",
                background: theme.purple,
                color: theme.white,
                fontWeight: "700",
            },
        }),
        stack(6, heading(title, 3, { color: theme.purple, fontSize: "1.22rem" }), copy(text, { fontSize: "0.98rem", lineHeight: "1.52" })),
    ],
});
const programsCtaSection = () => section(theme.white, currentBreakpoint === "desktop" ? "48px 0 62px" : "38px 0 48px", container(create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "1fr auto" : "1fr",
        gap: currentBreakpoint === "desktop" ? "34px" : "22px",
        alignItems: "center",
        padding: currentBreakpoint === "desktop" ? "54px 58px" : "34px 24px",
        background: "#211326",
        borderRadius: "14px",
    },
    children: [
        stack(14, eyebrow("Bring LEA To Your Learners", { color: theme.orange }), heading("Let us shape the right program day with you.", 2, {
            color: theme.white,
            fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem",
            fontWeight: "500",
        }), copy("Tell us the learners' ages, available time, and access to devices. We will help choose the best starting point.", {
            color: "#d8d0dc",
            maxWidth: "720px",
        })),
        create("div", {
            style: { display: "flex", flexWrap: "wrap", gap: "12px" },
            children: [actionButton("/contact", "Contact LEA"), actionButton("/volunteer", "Volunteer With Programs", "outline")],
        }),
    ],
})));
const programSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const projectProfile = (project) => {
    const profiles = {
        "Mogra Children's Rescue Centre": {
            focus: "Scratch Programming",
            learners: "Younger learners",
            image: "images/M1.jpeg",
            summary: "Mogra is home to younger children with big imaginations. Scratch fits that energy well because learners can make a cat move, tell a story, build a simple game, and immediately see that their choices matter.",
            need: "Children at Mogra need a gentle, playful first meeting with computers, especially activities that feel safe, visual, and encouraging.",
            response: "LEA introduces Scratch through stories, simple games, movement blocks, drawing, and small challenges that make coding feel like creation instead of pressure.",
            outcome: "Learners begin to understand sequencing, choices, and confidence: they can point to something on screen and say, I made this work.",
            status: "Active Scratch sessions",
        },
        "Mukuru Slums Development Project": {
            focus: "Web Development",
            learners: "Community learners",
            image: "images/LEA pics/coding3.jpg",
            summary: "MSDP learners came with commitment, and the web pathway gave that commitment a clear direction. HTML, CSS, JavaScript, structure, and presentation became real skills, not just words, and two cohorts have already reached graduation.",
            need: "MSDP learners need a structured pathway they can complete, with enough practice to turn interest in technology into visible skills.",
            response: "LEA runs web development sessions around HTML, CSS, JavaScript, page structure, styling, presentation, and learner projects.",
            outcome: "The work has already grown into two graduation moments, showing that consistent sessions can move learners from exposure to achievement.",
            status: "Two web graduations",
        },
        "Highway Senior School": {
            focus: "Web Development",
            learners: "Secondary school learners",
            image: "images/LEA - HIGHWAY-1.jpg",
            summary: "Highway students are at a stage where practical skills can shape how they see the future. Web development gives them a useful starting point: pages they can build, improve, present, and connect to school or career goals.",
            need: "Highway students need practical digital skills that connect with school, future study, portfolios, and career imagination.",
            response: "LEA brings web development into a school setting, helping students build pages, improve layouts, understand code, and present what they create.",
            outcome: "Students leave with a useful foundation and a clearer sense that technology is not distant; it is something they can learn and build with.",
            status: "School web program",
        },
    };
    return profiles[project.title];
};
const orderedInstitutionProjects = () => {
    const order = ["Mogra Children's Rescue Centre", "Mukuru Slums Development Project", "Highway Senior School"];
    return order.map((title) => institutionProjects.find((project) => project.title === title)).filter((project) => Boolean(project));
};
const projectsPage = () => create("main", {
    attrs: { "aria-label": "LEA projects content" },
    style: { background: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", width: "100%", maxWidth: "100%", minWidth: "0", overflowX: "hidden" },
    children: [projectsHero(), projectsInstitutionsSection(), landingFooter()],
});
const projectDetailHero = (project, profile) => create("section", {
    style: {
        position: "relative",
        minHeight: currentBreakpoint === "desktop" ? "600px" : "560px",
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
        background: theme.plum,
        fontFamily: "Outfit, Arial, Helvetica, sans-serif",
    },
    children: [
        image(profile.image.startsWith("/") ? profile.image : `/${profile.image}`, project.alt, {
            position: "absolute",
            inset: "0",
            zIndex: "0",
            objectPosition: "center center",
            filter: "brightness(0.78) saturate(1.04) contrast(1.03)",
        }),
        create("div", {
            attrs: { "aria-hidden": "true" },
            style: {
                position: "absolute",
                inset: "0",
                zIndex: "1",
                background: currentBreakpoint === "desktop"
                    ? "linear-gradient(90deg, rgba(31,9,42,0.9) 0%, rgba(31,9,42,0.72) 38%, rgba(31,9,42,0.18) 75%, rgba(31,9,42,0.34) 100%)"
                    : "linear-gradient(180deg, rgba(31,9,42,0.18) 0%, rgba(31,9,42,0.42) 42%, rgba(31,9,42,0.92) 100%)",
            },
        }),
        container(create("div", {
            style: {
                position: "relative",
                zIndex: "2",
                width: "100%",
                minHeight: currentBreakpoint === "desktop" ? "600px" : "560px",
                display: "grid",
                alignItems: "center",
                padding: currentBreakpoint === "desktop" ? "104px 0 76px" : "140px 0 54px",
                boxSizing: "border-box",
            },
            children: [stack(18,
                eyebrow(`Project / ${profile.focus}`, { color: theme.orange, fontSize: "0.68rem" }),
                create("h1", { text: project.title, style: { margin: "0", color: theme.white, maxWidth: "700px", fontSize: currentBreakpoint === "desktop" ? "clamp(2.8rem, 5.3vw, 5rem)" : "2.35rem", fontWeight: "400", lineHeight: "1.02", letterSpacing: "-0.045em", textShadow: "0 3px 22px rgba(0,0,0,0.3)" } }),
                copy(profile.summary, { color: "rgba(255,255,255,0.92)", maxWidth: "610px", fontSize: currentBreakpoint === "desktop" ? "1.02rem" : "0.94rem", lineHeight: "1.7", textShadow: "0 2px 12px rgba(0,0,0,0.32)" }),
                create("div", { style: { display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }, children: [create("span", { text: profile.status, style: { padding: "9px 13px", background: theme.orange, color: theme.plum, fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" } }), create("span", { text: profile.learners, style: { padding: "9px 13px", border: "1px solid rgba(255,255,255,0.7)", color: theme.white, fontSize: "0.76rem", fontWeight: "400" } })] }),
                create("a", { attrs: { href: "/projects" }, text: "Back to projects", style: { display: "inline-flex", width: "fit-content", marginTop: "4px", color: theme.white, fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderBottom: `1px solid ${theme.orange}`, paddingBottom: "6px" } }),
            )],
        })),
    ],
});

const projectDetailPage = (slug) => {
    const project = orderedInstitutionProjects().find((item) => programSlug(item.title) === slug) || orderedInstitutionProjects()[0];
    const profile = projectProfile(project);
    const detailFacts = create("div", {
        style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(3, 1fr)" : "1fr", gap: currentBreakpoint === "desktop" ? "0" : "20px", padding: currentBreakpoint === "desktop" ? "28px 0" : "24px 0", borderTop: `1px solid ${theme.line}`, borderBottom: `1px solid ${theme.line}` },
        children: [["Learning focus", profile.focus], ["Who we serve", profile.learners], ["Current status", profile.status]].map(([label, value], index) => create("div", {
            style: { padding: currentBreakpoint === "desktop" ? "0 24px" : "0", borderLeft: currentBreakpoint === "desktop" && index > 0 ? `1px solid ${theme.line}` : "0" },
            children: [eyebrow(label, { color: theme.orange, fontSize: "0.62rem" }), create("strong", { text: value, style: { display: "block", marginTop: "8px", color: theme.purple, fontSize: currentBreakpoint === "desktop" ? "1.2rem" : "1rem", fontWeight: "400", lineHeight: "1.2" } })],
        })),
    });
    const blocks = create("div", {
        style: { display: "grid", gridTemplateColumns: "1fr", gap: "0", marginTop: currentBreakpoint === "desktop" ? "14px" : "8px" },
        children: [projectDetailBlock("The need", profile.need), projectDetailBlock("LEA's response", profile.response), projectDetailBlock("What changes", profile.outcome)],
    });
    const storySection = section(theme.white, currentBreakpoint === "desktop" ? "44px 0 70px" : "34px 0 52px", container(stack(34,
        detailFacts,
        create("div", {
            style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "0.8fr 1.2fr" : "1fr", gap: currentBreakpoint === "desktop" ? "80px" : "24px", alignItems: "start" },
            children: [
                stack(12, eyebrow("The story behind the work", { color: theme.orange }), create("h2", { text: "A practical pathway built around real learners.", style: { margin: "0", color: theme.purple, fontSize: currentBreakpoint === "desktop" ? "2.65rem" : "1.9rem", fontWeight: "400", lineHeight: "1.06", letterSpacing: "-0.035em" } })),
                copy("Every LEA project begins with the context of the people we serve. The setting is different, but the promise is the same: meet learners with patience, practical tools, and a pathway they can feel themselves completing.", { color: theme.muted, fontSize: "0.98rem", lineHeight: "1.72" }),
            ],
        }),
        blocks,
        create("a", { attrs: { href: "/projects" }, text: "Back to all projects", style: { color: theme.purple, fontWeight: "700", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.76rem" } }),
    )));
    return create("main", { attrs: { "aria-label": `${project.title} project details` }, style: { background: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif" }, children: [projectDetailHero(project, profile), storySection, landingFooter()] });
};

const projectsHero = () => create("section", {
    style: { background: "#f5f0e8", borderBottom: "1px solid #e6ded3", fontFamily: "Outfit, Arial, Helvetica, sans-serif" },
    children: [container(create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "1.15fr 0.85fr" : "1fr", gap: currentBreakpoint === "desktop" ? "70px" : "24px", alignItems: "center", minHeight: currentBreakpoint === "desktop" ? "370px" : "310px", padding: currentBreakpoint === "desktop" ? "64px 0" : "46px 0" }, children: [stack(14, create("h1", { text: "Service Areas.", style: { margin: "0", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "clamp(2.15rem, 3.6vw, 3.5rem)" : "1.9rem", fontWeight: "500", lineHeight: "1.02", letterSpacing: "-0.04em" } }), copy("Our projects are the places where learners, teachers, guardians, and volunteers meet around one simple idea: technology should feel possible.", { color: theme.muted, maxWidth: "560px", fontSize: currentBreakpoint === "desktop" ? "1rem" : "0.86rem", lineHeight: "1.6" }), create("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [actionButton("#projects-grid", "View Institutions", "orange"), actionButton("/programs", "See Curriculum", "orange")] })), create("div", { style: { display: "grid", gap: "10px", padding: currentBreakpoint === "desktop" ? "30px" : "22px", background: theme.white, border: "0" }, children: [create("div", { style: { height: currentBreakpoint === "desktop" ? "150px" : "130px", overflow: "hidden", background: theme.plum }, children: [image("images/lea-about-story-a.jpg", "LEA learners and mentors working together", { objectPosition: "center", filter: "saturate(1.04) contrast(1.03)" })] }), eyebrow("Institutions we partner with", { color: theme.purple, fontSize: "0.58rem" }), create("strong", { text: "Three institutions, three different learning needs.", style: { color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "1.55rem" : "1.2rem", fontWeight: "500", lineHeight: "1.15" } }), copy("Mogra needs playful first steps for younger children, MSDP needs a structured web pathway learners can finish, and Highway needs school-based web skills that connect to future opportunities.", { color: theme.muted, fontSize: "0.9rem", lineHeight: "1.6" })] })] }))],
});
		const projectFocusCard = (title, text, accent = theme.purple, size = "220px") => create("article", { style: { width: currentBreakpoint === "desktop" ? size : "min(180px, 72vw)", height: currentBreakpoint === "desktop" ? size : "min(180px, 72vw)", maxWidth: currentBreakpoint === "desktop" ? "28vw" : "min(180px, 72vw)", maxHeight: currentBreakpoint === "desktop" ? "28vw" : "min(180px, 72vw)", flex: currentBreakpoint === "desktop" ? "0 1 auto" : "0 0 min(180px, 72vw)", scrollSnapAlign: currentBreakpoint === "desktop" ? "none" : "center", display: "grid", placeItems: "center", alignContent: "center", gap: "8px", padding: currentBreakpoint === "desktop" ? "28px" : "18px", marginInline: currentBreakpoint === "desktop" ? "auto" : "0", textAlign: "center", borderRadius: "50%", background: theme.purple, color: theme.white, border: `1px solid ${theme.purple}`, boxShadow: "0 18px 34px rgba(44,0,62,0.16)", transition: "transform 0.35s ease, box-shadow 0.35s ease" }, children: [create("span", { style: { width: currentBreakpoint === "desktop" ? "42px" : "34px", height: currentBreakpoint === "desktop" ? "42px" : "34px", display: "grid", placeItems: "center", border: `1px solid ${theme.orange}`, borderRadius: "50%", color: theme.orange, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.78rem", fontWeight: "500" }, text: title.slice(0, 1) }), create("strong", { text: title, style: { color: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "1.08rem" : "0.9rem", fontWeight: "500", lineHeight: "1.1" } }), copy(text, { color: "#eadbed", fontSize: currentBreakpoint === "desktop" ? "0.72rem" : "0.64rem", lineHeight: "1.35", textAlign: "center" })] });
		const projectsFocusAreasSection = () => section(theme.white, currentBreakpoint === "desktop" ? "34px 0 48px" : "26px 0 38px", container(stack(20, create("div", { style: { textAlign: "center", minWidth: "0", maxWidth: "100%" }, children: [eyebrow("Our Approach", { color: theme.purple, fontSize: currentBreakpoint === "desktop" ? "2rem" : "1.55rem", fontWeight: "400", lineHeight: "1.08", letterSpacing: "-0.01em", textTransform: "none" }), create("h2", { text: "Focus", style: { margin: "6px 0 0", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.2rem" : "1.7rem", fontWeight: "400", lineHeight: "1.1" } }), copy("We meet learners where they are, then build practical pathways that turn curiosity into confidence and useful skills.", { color: theme.muted, fontSize: currentBreakpoint === "desktop" ? "0.9rem" : "0.8rem", lineHeight: "1.55", maxWidth: "620px", marginInline: "auto" })] }), create("div", { style: { display: currentBreakpoint === "desktop" ? "grid" : "flex", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(3, 1fr)" : undefined, alignItems: "center", justifyContent: currentBreakpoint === "desktop" ? "normal" : "flex-start", gap: currentBreakpoint === "desktop" ? "20px" : "18px", width: "100%", maxWidth: "100%", minWidth: "0", marginInline: "auto", padding: "10px 0 22px", overflowX: currentBreakpoint === "desktop" ? "visible" : "auto", overscrollBehaviorX: "contain", scrollSnapType: currentBreakpoint === "desktop" ? "none" : "x mandatory", WebkitOverflowScrolling: "touch" }, children: [projectFocusCard("Rescue Centre", "Scratch Programming for younger learners.", theme.purple, currentBreakpoint === "desktop" ? "220px" : "220px"), projectFocusCard("Community Project", "Web Development for community learners.", theme.orange, currentBreakpoint === "desktop" ? "220px" : "240px"), projectFocusCard("School Program", "Web Development for secondary school learners.", theme.purple, currentBreakpoint === "desktop" ? "220px" : "260px")] }))));
		const projectsImpactSection = () => section(theme.white, currentBreakpoint === "desktop" ? "70px 0 78px" : "46px 0 56px", container(create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "minmax(0, 0.95fr) minmax(0, 1.05fr)" : "1fr", gap: currentBreakpoint === "desktop" ? "58px" : "28px", alignItems: currentBreakpoint === "desktop" ? "start" : "center" }, children: [create("div", { style: { minHeight: currentBreakpoint === "desktop" ? "390px" : "260px", overflow: "hidden", background: theme.white, display: "flex", alignItems: "stretch" }, children: [image("/images/lea-about-hero.jpg", "LEA learners and mentors learning together", { objectPosition: "center center", filter: "saturate(1.04) contrast(1.03)" })] }), stack(14, create("span", { text: "THE LEA EXPERIENCE", style: { color: theme.orange, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "1.35rem" : "0.9rem", fontWeight: "500", letterSpacing: "0.12em", lineHeight: "1.1" } }), create("h2", { text: "Three years of experience. A future built together.", style: { margin: "0", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "3rem" : "2rem", fontWeight: "400", lineHeight: "1.04", letterSpacing: "-0.035em" } }), copy("For three years, LEA has created calm, practical spaces where young people can meet technology, learn at their own pace, and see what they can make.", { color: theme.muted, fontSize: "0.96rem", lineHeight: "1.7" }), copy("From rescue centres to schools and community projects, our work grows through patient mentorship, practical coding, and the belief that every learner deserves a meaningful place in the digital future.", { color: theme.muted, fontSize: "0.96rem", lineHeight: "1.7" }))] })));
const projectDarkValue = (title, text) => create("article", { style: { minHeight: currentBreakpoint === "desktop" ? "178px" : "auto", padding: currentBreakpoint === "desktop" ? "20px 14px" : "18px 12px", background: theme.purple, textAlign: "center" }, children: [create("div", { style: { display: "grid", placeItems: "center", width: "42px", height: "42px", margin: "0 auto 14px", border: `1px solid ${theme.orange}`, borderRadius: "50%", color: theme.orange, fontSize: "1.05rem", fontWeight: "600" }, text: aboutValueIcon(title) }), create("h3", { text: title, style: { margin: "0 0 8px", color: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.92rem", fontWeight: "500", lineHeight: "1.15" } }), copy(text, { color: "rgba(255,255,255,0.7)", fontSize: "0.76rem", lineHeight: "1.45" })] });
const projectsSupportSection = () => section(theme.purple, currentBreakpoint === "desktop" ? "76px 0 84px" : "54px 0 64px", container(create("div", { style: { display: "grid", gap: "26px" }, children: [stack(8, create("span", { text: "What guides us", style: { color: theme.orange, fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none", textAlign: "center" } }), create("h2", { text: "Our Core Values", style: { margin: "0 auto", color: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.1rem" : "1.7rem", fontWeight: "500", lineHeight: "1.12", textAlign: "center" } })), create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(6, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))", gap: "1px", background: "rgba(255,255,255,0.22)" }, children: [projectDarkValue("Learner-centred", "We begin with each learner’s questions, pace, context, and potential."), projectDarkValue("Patient by design", "We make room for mistakes, repetition, and the time it takes to understand."), projectDarkValue("Dignity-driven", "Every learner deserves respect, encouragement, and a real chance to contribute."), projectDarkValue("Community-led", "We grow through mentors, families, schools, and partners who share the work."), projectDarkValue("Practical optimism", "We turn hope into small projects, useful skills, and visible progress."), projectDarkValue("Open access", "We keep looking for ways to reach learners who are often left behind.")] })] })));
		const projectsStoriesSection = () => { const projects = orderedInstitutionProjects(); return section(theme.white, currentBreakpoint === "desktop" ? "38px 0 58px" : "26px 0 42px", wideCardsContainer(stack(34, create("div", { style: { textAlign: "center", minWidth: "0", maxWidth: "100%" }, children: [eyebrow("Our institutions", { color: theme.orange, fontSize: currentBreakpoint === "desktop" ? "2rem" : "1.55rem", fontWeight: "400", lineHeight: "1.08", letterSpacing: "-0.01em", textTransform: "none" }), create("h2", { text: "Three institutions, three different learning needs.", style: { margin: "6px 0 0", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.2rem" : "1.7rem", fontWeight: "400", lineHeight: "1.12" } }), copy("LEA does not treat every project the same. Mogra needs playful first steps for younger children, MSDP needs a structured web pathway learners can finish, and Highway needs school-based web skills that connect to future opportunities.", { color: theme.muted, fontSize: currentBreakpoint === "desktop" ? "0.88rem" : "0.78rem", lineHeight: "1.65", maxWidth: "760px", marginInline: "auto" })] }), create("div", { attrs: { id: "projects-grid" }, style: { display: currentBreakpoint === "desktop" ? "grid" : "flex", gridTemplateColumns: currentBreakpoint === "desktop" ? columns(1, 3, 3) : undefined, gap: currentBreakpoint === "desktop" ? "28px" : "18px", width: "100%", maxWidth: "100%", minWidth: "0", overflowX: currentBreakpoint === "desktop" ? "visible" : "auto", overscrollBehaviorX: "contain", scrollSnapType: currentBreakpoint === "desktop" ? "none" : "x mandatory", WebkitOverflowScrolling: "touch", paddingBottom: currentBreakpoint === "desktop" ? "0" : "8px" }, children: projects.map((project, index) => projectCard(project, index)) })))); };
const projectsInstitutionsSection = () => create("div", { children: [projectsFocusAreasSection(), projectsStoriesSection(), projectsImpactSection()] });
const projectCard = (project, index) => {
    const profile = projectProfile(project);
    const institutionDescription = project.title === "Mogra Children's Rescue Centre" ? "Scratch Programming for younger learners. Mogra gives children a gentle, playful first meeting with computers." : project.title === "Mukuru Slums Development Project" ? "Web Development for community learners. MSDP offers a structured pathway learners can complete and celebrate." : "Web Development for secondary school learners. Highway connects practical web skills with future study and career goals.";
		    return create("a", { attrs: { href: `/projects/${programSlug(project.title)}` }, style: { display: "grid", gridTemplateRows: currentBreakpoint === "desktop" ? "300px 1fr" : "250px auto", flex: currentBreakpoint === "desktop" ? "0 1 auto" : "0 0 min(86vw, 340px)", scrollSnapAlign: currentBreakpoint === "desktop" ? "none" : "start", overflow: "hidden", background: "#f7e8d5", border: "1px solid #efd5b6", borderRadius: "6px", boxShadow: "0 12px 28px rgba(44,0,62,0.08)", color: theme.ink, textDecoration: "none", transition: "transform .2s ease, box-shadow .2s ease" }, children: [create("div", { style: { position: "relative", overflow: "hidden", background: "#f7e8d5" }, children: [create("div", { style: { width: "100%", height: "100%", padding: currentBreakpoint === "desktop" ? "14px" : "10px", boxSizing: "border-box" }, children: [image(profile.image, project.alt, { objectPosition: "center", filter: "saturate(1.06) contrast(1.03)", borderRadius: "4px" })] })] }), create("div", { style: { display: "grid", gap: "10px", alignContent: "start", padding: currentBreakpoint === "desktop" ? "22px" : "18px" }, children: [eyebrow(project.label, { color: theme.orange, fontSize: "0.6rem" }), create("h3", { text: project.title, style: { margin: "0", color: theme.purple, fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "1.3rem", fontWeight: "500", lineHeight: "1.08" } }), copy(institutionDescription, { color: theme.muted, fontSize: "0.88rem", lineHeight: "1.6" }), create("span", { text: "Read more →", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", justifySelf: "start", minHeight: "40px", marginTop: "4px", padding: "0 16px", borderRadius: "3px", background: theme.purple, color: theme.white, fontSize: "0.78rem", fontWeight: "500" } })] })] });
};

const projectOverviewStrip = (project, index) => {
    const profile = projectProfile(project);
    return create("article", {
        style: {
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr)",
            gap: "14px",
            alignItems: "start",
            padding: currentBreakpoint === "desktop" ? "22px" : "20px",
            background: index === 1 ? theme.purple : theme.paper,
            border: `1px solid ${index === 1 ? theme.purple : theme.line}`,
            borderTop: `5px solid ${theme.orange}`,
        },
        children: [
            create("span", {
                text: String(index + 1).padStart(2, "0"),
                style: {
                    width: "44px",
                    height: "44px",
                    display: "inline-grid",
                    placeItems: "center",
                    background: index === 1 ? theme.white : theme.purple,
                    color: index === 1 ? theme.purple : theme.white,
                    fontWeight: "700",
                },
            }),
            stack(8, eyebrow(project.label, { color: theme.orange }), heading(project.title, 3, { color: index === 1 ? theme.white : theme.purple, fontSize: "1.25rem", lineHeight: "1.12" }), copy(`${profile.focus} for ${profile.learners.toLowerCase()}.`, { color: index === 1 ? "#eadbed" : theme.muted, fontSize: "0.96rem", lineHeight: "1.45" })),
        ],
    });
};
const projectInstitutionPanel = (project, index) => {
    const profile = projectProfile(project);
    const imageFirst = currentBreakpoint !== "desktop" || index % 2 === 0;
    const visual = create("figure", {
        style: {
            position: "relative",
            width: currentBreakpoint === "desktop" ? (isWideScreen() ? "500px" : "430px") : isTabletScreen() ? "360px" : "min(100%, 300px)",
            height: currentBreakpoint === "desktop" ? (isWideScreen() ? "500px" : "430px") : isTabletScreen() ? "360px" : "min(80vw, 300px)",
            margin: currentBreakpoint === "desktop" ? "auto" : "28px auto 0",
            overflow: "hidden",
            borderRadius: "999px",
            background: theme.plum,
            border: `8px solid ${theme.white}`,
            boxShadow: "0 22px 48px rgba(44, 0, 62, 0.18)",
        },
        children: [
            image(profile.image, project.alt, {
                position: "absolute",
                inset: "0",
                objectPosition: project.title.includes("Highway") ? "center 42%" : "center",
                filter: "saturate(1.04) contrast(1.04)",
            }),
            create("div", {
                attrs: { "aria-hidden": "true" },
                style: {
                    position: "absolute",
                    inset: "0",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.48))",
                },
            }),
        ],
    });
    const details = create("div", {
        style: {
            display: "grid",
            alignContent: "center",
            gap: currentBreakpoint === "desktop" ? "22px" : "18px",
            padding: currentBreakpoint === "desktop" ? "42px" : "26px 22px",
            background: index === 1 ? theme.purple : theme.paper,
            color: index === 1 ? theme.white : theme.ink,
        },
        children: [
            stack(12, eyebrow(project.label, { color: theme.orange }), heading(project.title, 2, {
                color: index === 1 ? theme.white : theme.purple,
                fontSize: currentBreakpoint === "desktop" ? "2.25rem" : "1.75rem",
                lineHeight: "1.08",
            }), create("div", {
                style: { display: "flex", flexWrap: "wrap", gap: "8px" },
                children: [projectTag(profile.status), projectTag(profile.focus)],
            }), copy(profile.summary, {
                color: index === 1 ? "#f4e8f7" : theme.ink,
                fontSize: currentBreakpoint === "desktop" ? "1.04rem" : "1rem",
                lineHeight: "1.62",
                fontWeight: "700",
            })),
            create("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: columns(1, 3, 3),
                    gap: "12px",
                },
                children: [
                    projectDetailBlock("Need", profile.need, index === 1),
                    projectDetailBlock("LEA Response", profile.response, index === 1),
                    projectDetailBlock("Outcome", profile.outcome, index === 1),
                ],
            }),
        ],
    });
    return create("article", {
        style: {
            display: "grid",
            gridTemplateColumns: currentBreakpoint === "desktop" ? "minmax(360px, 0.75fr) minmax(0, 1.25fr)" : "1fr",
            alignItems: "center",
            gap: currentBreakpoint === "desktop" ? "10px" : "0",
            padding: currentBreakpoint === "desktop" ? "28px" : "0",
            overflow: "hidden",
            border: `1px solid ${index === 1 ? theme.purple : theme.line}`,
            boxShadow: "0 18px 44px rgba(44, 0, 62, 0.1)",
            background: index === 1 ? theme.purple : theme.white,
        },
        children: imageFirst ? [visual, details] : [details, visual],
    });
};
const projectDetailBlock = (title, text, dark = false) => create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "minmax(150px, 0.28fr) minmax(0, 1fr)" : "1fr",
        alignItems: "start",
        gap: currentBreakpoint === "desktop" ? "28px" : "8px",
        padding: currentBreakpoint === "desktop" ? "20px 0" : "18px 0",
        minHeight: "auto",
        background: "transparent",
        borderTop: `1px solid ${theme.line}`,
        boxShadow: "none",
    },
    children: [
        eyebrow(title, { color: theme.orange }),
        copy(text, { color: dark ? "#eadbed" : theme.muted, fontSize: "0.94rem", lineHeight: "1.5" }),
    ],
});
const projectTag = (text) => create("span", {
    text,
    style: {
        display: "inline-flex",
        alignItems: "center",
        minHeight: "30px",
        padding: "7px 10px",
        background: theme.white,
        color: theme.purple,
        fontSize: "0.82rem",
        fontWeight: "700",
    },
});
const projectsGraduationSection = () => section(theme.purple, currentBreakpoint === "desktop" ? "86px 0 96px" : "62px 0 70px", container(create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.82fr 1.18fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "44px" : "28px",
        alignItems: "start",
    },
    children: [
        stack(14, eyebrow("MSDP Milestones", { color: theme.orange }), heading("Two web development graduations at MSDP.", 2, {
            color: theme.white,
            fontSize: currentBreakpoint === "desktop" ? "2.65rem" : "2rem",
        }), copy("Mukuru Slums Development Project is one of LEA's clearest examples of pathway learning: learners move through web development sessions, then celebrate progress through graduation moments.", {
            color: "#eadbed",
            maxWidth: "620px",
        })),
        create("div", {
            style: {
                display: "grid",
                gridTemplateColumns: columns(1, 2, 2),
                gap: "18px",
            },
            children: [
                graduationCard("1st Web Development Graduation", "MSDP learners celebrated completing a practical web development pathway and presenting their progress.", "images/grad.jpeg", "MSDP web development graduation moment", "Web Development"),
                graduationCard("2nd Cohort MSDP Graduation", "A second cohort graduation marked learner commitment, stronger confidence, and continued growth in web skills.", "images/november.png", "Second cohort MSDP graduation moment", "Web Development"),
            ],
        }),
    ],
})));
const graduationCard = (title, text, src, alt, label) => create("article", {
    style: {
        display: "grid",
        gridTemplateRows: `${mediaHeight(210, 230, 230, 260)} minmax(0, 1fr)`,
        overflow: "hidden",
        background: theme.white,
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 18px 42px rgba(0,0,0,0.16)",
    },
    children: [
        create("div", {
            style: { overflow: "hidden", background: theme.plum },
            children: [image(src, alt, { objectPosition: "center", filter: "saturate(1.04) contrast(1.04)" })],
        }),
        create("div", {
            style: { display: "grid", alignContent: "start", gap: "10px", padding: "24px" },
            children: [
                eyebrow(label, { color: theme.orange }),
                heading(title, 3, { color: theme.purple, fontSize: "1.34rem" }),
                copy(text, { color: theme.muted, fontSize: "0.98rem", lineHeight: "1.55" }),
            ],
        }),
    ],
});
const projectsPartnersSection = () => section(theme.white, currentBreakpoint === "desktop" ? "84px 0 92px" : "58px 0 66px", container(stack(30, create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "minmax(0, 1fr) auto" : "1fr",
        gap: "22px",
        alignItems: "end",
    },
    children: [
        stack(12, eyebrow("Our Partners", { color: theme.orange }), heading("The partners helping LEA reach learners.", 2, {
            fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem",
        }), copy("We work with institutions, community organizations, schools, and technology partners to keep programs practical and accessible.", {
            maxWidth: "760px",
        })),
        actionButton("/contact", "Partner With Us", "purple"),
    ],
}), create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: columns(1, 2, 4),
        gap: "16px",
    },
    children: [
        partnerLogoCard("Mukuru Slums Development Project", "Community project", "images/msdp_logo.png"),
        partnerLogoCard("TUK", "Academic partner", "images/tuk-logo.jpg"),
        partnerLogoCard("Mogra", "Rescue centre", "images/mogra.png"),
        partnerLogoCard("Volo Technologies Limited", "Technology partner", "images/v1.png"),
    ],
}))));
const partnerLogoCard = (name, label, logoSrc) => create("article", {
    style: {
        display: "grid",
        minHeight: "180px",
        alignContent: "center",
        justifyItems: "center",
        gap: "12px",
        padding: "24px",
        background: theme.white,
        border: `1px solid ${theme.line}`,
        borderTop: `5px solid ${theme.orange}`,
        textAlign: "center",
        boxShadow: "0 14px 32px rgba(44, 0, 62, 0.07)",
    },
    children: [
        logoSrc
            ? create("img", {
                attrs: { src: logoSrc, alt: `${name} logo` },
                style: { width: "min(170px, 100%)", height: "74px", objectFit: "contain" },
            })
            : create("div", {
                text: name === "Volo Technologies Limited" ? "VOLO" : name,
                style: {
                    display: "grid",
                    placeItems: "center",
                    minWidth: "132px",
                    minHeight: "74px",
                    padding: "8px 14px",
                    background: theme.purple,
                    color: theme.white,
                    fontSize: name === "Volo Technologies Limited" ? "1.4rem" : "1.7rem",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                },
            }),
        stack(4, heading(name, 3, { color: theme.purple, fontSize: "1.18rem" }), copy(label, { color: theme.muted, fontSize: "0.94rem", lineHeight: "1.35" })),
    ],
});
const eventsPage = () => create("main", {
    attrs: { "aria-label": "LEA events content" },
    style: { background: theme.white, fontFamily: "Outfit, Arial, Helvetica, sans-serif" },
    children: [eventsHero(), pastEventsSection(), landingFooter()],
});
const eventsHero = () => create("section", {
	style: {
		position: "relative",
		minHeight: currentBreakpoint === "desktop" ? "290px" : "360px",
		display: "grid",
        alignItems: "center",
        overflow: "hidden",
        background: theme.plum,
        fontFamily: "Outfit, Arial, Helvetica, sans-serif",
    },
    children: [
		image("images/lea-events-hero-a.jpg", "LEA learners and mentors at a community coding event", {
            position: "absolute",
            inset: "0",
            zIndex: "0",
            objectPosition: "center",
            filter: "brightness(0.44) contrast(1.1) saturate(1.03)",
        }),
        create("div", {
            attrs: { "aria-hidden": "true" },
            style: {
                position: "absolute",
                inset: "0",
                zIndex: "1",
                background: "linear-gradient(90deg, rgba(21,0,31,0.84) 0%, rgba(21,0,31,0.58) 50%, rgba(0,0,0,0.28) 100%)",
            },
	        }),
        container(create("div", {
            style: { position: "relative", zIndex: "2", maxWidth: currentBreakpoint === "desktop" ? "790px" : "100%" },
	            children: [
	                stack(16, eyebrow("Stay Updated", { color: theme.orange }), create("h1", {
                    style: {
                        margin: "0",
                        color: theme.white,
                        maxWidth: "760px",
                        fontFamily: "Outfit, Arial, Helvetica, sans-serif",
                        fontSize: currentBreakpoint === "desktop" ? "clamp(2.45rem, 4.7vw, 4rem)" : "2.05rem",
                        fontWeight: "400",
                        lineHeight: "1.02",
                        letterSpacing: "-0.045em",
                        textShadow: "0 3px 20px rgba(0,0,0,0.32)",
                    },
                    children: ["Events and ", create("span", { text: "Highlights", style: { color: theme.orange } })],
                }), copy("Get updates on our latest events and enjoy a recap of the past ones.", {
                    color: theme.white,
                    maxWidth: "700px",
                    fontSize: "0.98rem",
                    fontWeight: "400",
                    lineHeight: "1.65",
                    textShadow: "0 2px 12px rgba(0,0,0,0.32)",
                }), create("div", {
                    style: { display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" },
                    children: [actionButton("#past-events", "View Past Events", "orange")],
                })),
            ],
        })),
    ],
});
const upcomingEventsSection = () => section(theme.white, currentBreakpoint === "desktop" ? "86px 0 94px" : "62px 0 70px", container(stack(30, stack(10, eyebrow("Upcoming Events", { color: theme.orange }), heading("LEA Organization 2nd Anniversary Gala", 2, {
    fontSize: currentBreakpoint === "desktop" ? "2.7rem" : "2rem",
}), copy("May 23rd 2026, Nairobi", { color: theme.purple, fontWeight: "700", maxWidth: "760px" })), create("article", {
    attrs: { id: "upcoming-events" },
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "1.08fr 0.92fr" : "1fr",
        overflow: "hidden",
        background: theme.purple,
        boxShadow: "0 22px 52px rgba(44,0,62,0.16)",
    },
    children: [
        create("div", {
            style: {
                minHeight: mediaHeight(260, 320, 430, 480),
                overflow: "hidden",
                background: theme.plum,
            },
            children: [
                image("images/Dinner.jpeg", "LEA Organization anniversary gala dinner table", {
                    objectPosition: "center",
                    filter: "brightness(0.78) contrast(1.06) saturate(1.04)",
                }),
            ],
        }),
        create("div", {
            style: {
                display: "grid",
                alignContent: "center",
                gap: "16px",
                padding: currentBreakpoint === "desktop" ? "44px" : "28px 24px",
            },
            children: [
                eyebrow("May 23rd 2026 / Nairobi", { color: theme.orange }),
                heading("Celebrate another year of impact and growth.", 3, {
                    color: theme.white,
                    fontSize: currentBreakpoint === "desktop" ? "2rem" : "1.55rem",
                    lineHeight: "1.12",
                }),
                copy("Join us for an evening filled with great food, inspiring stories, and exciting moments as we mark LEA Organization's second anniversary.", {
                    color: "#eadbed",
                    fontSize: "1.02rem",
                }),
                create("div", {
                    style: { display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "6px" },
                    children: [actionButton("/contact", "Contact Us"), actionButton("#past-events", "View Past Events", "outline")],
                }),
            ],
        }),
    ],
}))));
const pastEventsSection = () => {
    const pastEvents = [{ title: "LEA Organization 2nd Anniversary Gala", date: "May 23rd 2026 / Nairobi", text: "An evening filled with great food, inspiring stories, and exciting moments as we mark LEA Organization's anniversary.", image: "images/Dinner.jpeg", visuals: "images/Dinner.jpeg" }, ...eventItems];
    return section(theme.white, currentBreakpoint === "desktop" ? "96px 0 108px" : "68px 0 78px", container(stack(38, stack(10, eyebrow("Past Events Highlights", { color: theme.orange }), heading("Moments that shaped the movement.", 2, { color: theme.purple, fontSize: currentBreakpoint === "desktop" ? "2.3rem" : "1.8rem", fontWeight: "400" }), copy("Browse meetups, graduations, outreach days, celebrations, and learning moments from the LEA community.", { color: theme.muted, maxWidth: "820px" })), create("div", { attrs: { id: "past-events" }, style: { display: "grid", gridTemplateColumns: columns(1, 2, 3, 4), gap: currentBreakpoint === "desktop" ? "24px" : "18px" }, children: pastEvents.map((event, index) => eventHighlightCard(event, index)) }))));
};

const eventHighlightCard = (event, index = 0) => create("article", {
    style: {
        display: "grid",
        gridTemplateRows: `${mediaHeight(260, 300, 340, 360)} minmax(0, 1fr)`,
        overflow: "hidden",
        background: "#f6f1f8",
        border: "1px solid #e3d5e9",
        borderTop: `4px solid ${index % 2 === 0 ? theme.orange : theme.purple}`,
        boxShadow: "0 12px 26px rgba(44,0,62,0.06)",
    },
    children: [
        create("div", {
            style: { position: "relative", overflow: "hidden", background: theme.plum },
            children: [
                image(event.image, event.title, {
                    objectPosition: "center",
                    filter: "saturate(1.03) contrast(1.04)",
                }),
            ],
        }),
        create("div", {
            style: {
                display: "grid",
                gridTemplateRows: "auto auto minmax(0, 1fr) auto",
                gap: "10px",
                padding: "22px",
            },
            children: [
                heading(event.title, 3, { color: theme.purple, fontSize: "1.12rem", fontWeight: "400" }),
                eyebrow(event.date, { color: theme.orange }),
                copy(event.text, { color: theme.muted, fontSize: "0.9rem", lineHeight: "1.6" }),
                create("a", {
                    attrs: { href: event.visuals ?? event.image, target: "_blank", rel: "noreferrer" },
                    text: "Visuals",
                    style: {
                        display: "inline-flex",
                        width: "fit-content",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "40px",
                        padding: "10px 16px",
                        marginTop: "6px",
                            background: theme.purple,
                            border: `1px solid ${theme.purple}`,
                            color: theme.white,
                        fontWeight: "500",
                        lineHeight: "1",
                        textDecoration: "none",
                    },
                }),
            ],
        }),
    ],
});
const eventsQuoteSection = () => section(theme.white, currentBreakpoint === "desktop" ? "76px 0 82px" : "58px 0 64px", container(stack(18, heading("\"Empowerment through knowledge and collaboration!\"", 2, {
    color: theme.purple,
    maxWidth: "900px",
    fontSize: currentBreakpoint === "desktop" ? "2.35rem" : "1.8rem",
    fontWeight: "400",
}), copy("LEA Organization", { color: theme.orange, fontWeight: "500", fontSize: "0.92rem" }))));
const fieldLabelStyle = () => ({
    display: "grid",
    gap: "7px",
    color: theme.white,
    fontSize: "0.9rem",
    fontWeight: "700",
});
const fieldControlStyle = () => ({
    width: "100%",
    minHeight: "46px",
    padding: "12px 13px",
    border: "1px solid rgba(255,255,255,0.24)",
    borderRadius: "0",
    background: "rgba(255,255,255,0.08)",
    color: theme.white,
    font: "inherit",
});
const formInput = (label, name, placeholder, type = "text", required = true) => create("label", {
    style: fieldLabelStyle(),
    children: [
        label,
        create("input", {
            attrs: { name, type, placeholder, required },
            style: fieldControlStyle(),
        }),
    ],
});
const formSelect = (label, name, options) => create("label", {
    style: fieldLabelStyle(),
    children: [
        label,
        create("select", {
            attrs: { name, required: true },
            style: { ...fieldControlStyle(), color: theme.ink, background: theme.white },
            children: [
                create("option", { attrs: { value: "" }, text: "Select one" }),
                ...options.map((option) => create("option", { attrs: { value: option }, text: option })),
            ],
        }),
    ],
});
const formTextArea = (label, name, placeholder, required = true) => create("label", {
    style: fieldLabelStyle(),
    children: [
        label,
        create("textarea", {
            attrs: { name, placeholder, required, rows: 5 },
            style: { ...fieldControlStyle(), minHeight: "132px", resize: "vertical" },
        }),
    ],
});
const formSubmit = (text) => create("button", {
    attrs: { type: "submit" },
    text,
    style: {
        minHeight: "46px",
        width: "fit-content",
        padding: "12px 20px",
        border: `1px solid ${theme.orange}`,
        background: theme.orange,
        color: theme.plum,
        fontWeight: "700",
        font: "inherit",
        cursor: "pointer",
    },
});
const interestForm = (formType, title, text, submitText, fields) => {
    const submitButton = formSubmit(submitText);
    const status = create("p", {
        attrs: { "aria-live": "polite" },
        style: {
            minHeight: "22px",
            margin: "0",
            color: "#eadbed",
            fontSize: "0.92rem",
            lineHeight: "1.35",
        },
    });
    const form = create("form", {
        attrs: { action: scriptAction, method: "post", autocomplete: "off" },
        style: {
            display: "grid",
            alignContent: "start",
            gap: "16px",
            padding: currentBreakpoint === "desktop" ? "28px" : "24px",
            background: theme.purple,
            border: `1px solid ${theme.purple}`,
            borderTop: `5px solid ${theme.orange}`,
            boxShadow: "0 18px 40px rgba(44, 0, 62, 0.14)",
        },
        children: [
            create("input", { attrs: { type: "hidden", name: "formType", value: formType } }),
            stack(8, heading(title, 3, { color: theme.orange, fontSize: "1.45rem" }), copy(text, { color: "#eadbed", fontSize: "0.98rem", lineHeight: "1.5" })),
            ...fields,
            submitButton,
            status,
        ],
    });
    if (formType === "Volunteer") {
        form.style.background = theme.white;
        form.style.border = `1px solid ${theme.line}`;
        form.style.borderTop = `5px solid ${theme.orange}`;
        form.querySelectorAll("label").forEach((label) => { label.style.color = theme.ink; });
        form.querySelectorAll("input:not([type='hidden']), select, textarea").forEach((control) => {
            control.style.background = theme.white;
            control.style.border = `1px solid ${theme.line}`;
            control.style.color = theme.ink;
        });
        form.querySelectorAll("p").forEach((paragraph) => { paragraph.style.color = theme.muted; });
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const originalText = submitButton.textContent ?? submitText;
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        applyStyle(submitButton, {
            opacity: "0.72",
            cursor: "wait",
            transform: "translateY(1px)",
        });
        status.textContent = "Sending your details...";
        fetch(scriptAction, {
            method: "POST",
            body: new FormData(form),
            mode: "no-cors",
        })
            .then(() => {
            form.reset();
            status.textContent = "Thank you. Your details have been submitted.";
        })
            .catch(() => {
            status.textContent = "Something went wrong. Please try again or email leaorganization@gmail.com.";
        })
            .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            applyStyle(submitButton, {
                opacity: "1",
                cursor: "pointer",
                transform: "translateY(0)",
            });
        });
    });
    return form;
};
const volunteerPage = () => create("main", {
    attrs: { "aria-label": "Volunteer with LEA" },
    style: { background: "#ffffff", fontFamily: "Outfit, Arial, Helvetica, sans-serif" },
    children: [volunteerHero(), volunteerQuietIntro(), volunteerRolesSection(), volunteerPeopleSection(), volunteerSignupSection(), landingFooter()],
});
const volunteerHero = () => create("section", {
    style: {
        position: "relative",
        minHeight: currentBreakpoint === "desktop" ? "595px" : "540px",
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
        background: "#211326",
    },
    children: [
        image("images/volunteer-hero-outreach-wide-fixed.png?v=20260910", "St. Paul's Children's Home Outreach in Rongai, Nairobi", {
            position: "absolute",
            inset: "0",
            zIndex: "0",
            objectPosition: "center center",
            filter: "brightness(0.86) saturate(1.02) contrast(1.02)",
        }),
        create("div", {
            attrs: { "aria-hidden": "true" },
            style: {
                position: "absolute",
                inset: "0",
                zIndex: "1",
                background: currentBreakpoint === "desktop"
                    ? "linear-gradient(90deg, rgba(20,20,14,0.84) 0%, rgba(20,20,14,0.64) 37%, rgba(20,20,14,0.08) 72%, rgba(20,20,14,0.12) 100%)"
                    : "linear-gradient(180deg, rgba(20,20,14,0.08) 0%, rgba(20,20,14,0.2) 38%, rgba(20,20,14,0.82) 100%)",
            },
        }),
        container(create("div", {
            style: {
                position: "relative",
                zIndex: "2",
                width: "100%",
                maxWidth: currentBreakpoint === "desktop" ? "520px" : "100%",
                padding: currentBreakpoint === "desktop" ? "112px 0 94px" : "150px 0 52px",
            },
            children: [
                stack(12,
                    create("h1", {
                        text: "Volunteer with LEA",
                        style: {
                            margin: "0",
                            color: theme.white,
                            maxWidth: "860px",
                            fontFamily: "Outfit, Arial, Helvetica, sans-serif",
                            fontSize: currentBreakpoint === "desktop" ? "clamp(2.15rem, 3.45vw, 3.2rem)" : "1.78rem",
                            fontWeight: "500",
                            lineHeight: "1.04",
                            letterSpacing: "-0.025em",
                            whiteSpace: currentBreakpoint === "desktop" ? "nowrap" : "normal",
                        },
                    }),
                    copy("Bring your time, skill, and care to calm, practical spaces where young people can learn, build, and see what they can make. Help create welcoming sessions where patience turns questions into confidence and small projects into possibility.", {
                        color: "#f4e8f7",
                        maxWidth: "740px",
                        fontSize: currentBreakpoint === "desktop" ? "0.92rem" : "0.8rem",
                        fontWeight: "400",
                        lineHeight: "1.55",
                    }),
                    create("div", {
                        style: { display: "flex", flexWrap: "nowrap", gap: currentBreakpoint === "desktop" ? "10px" : "5px", marginTop: "2px", whiteSpace: "nowrap" },
                        children: [actionButton("#sign-up", "Sign up to volunteer", "hero"), actionButton("/contact", "Ask us a question", "hero-purple")],
                    }),
                ),
            ],
        })),
    ],
});
const volunteerQuietIntro = () => section("#ffffff", currentBreakpoint === "desktop" ? "82px 0 94px" : "54px 0 64px", container(create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.95fr 1.05fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "72px" : "32px",
        alignItems: "center",
    },
    children: [
        create("div", { style: { minHeight: currentBreakpoint === "desktop" ? "360px" : "270px", overflow: "hidden", background: "#211326", order: "1" }, children: [image("images/Happy.jpeg", "LEA learners smiling during a learning day", { objectPosition: "center", filter: "brightness(0.9) saturate(1.03)" })] }),
        create("div", {
            style: { display: "grid", alignContent: "center", gap: "18px", maxWidth: "560px", order: "2" },
            children: [
                create("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [create("span", { text: "Make a difference", style: { color: "#f89d35", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "700", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none" } })] }),
                create("h2", { text: "A volunteer community built around patience, presence, and possibility.", style: { margin: "0", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "1.9rem", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.025em" } }),
                copy("Volunteering with LEA is not about having every answer. It is about making room for questions, encouraging a learner through the tricky part, and helping a session feel welcoming from the moment they arrive.", { color: "#666", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.94rem", fontWeight: "400", lineHeight: "1.65" }),
                copy("Whether you teach, organize, document, or simply show up with care, your contribution helps young people see technology as something they can create with.", { color: "#666", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.94rem", fontWeight: "400", lineHeight: "1.65" }),
                create("a", { attrs: { href: "#sign-up" }, text: "Volunteer with us", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "142px", minHeight: "40px", marginTop: "6px", background: "#f89d35", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.78rem", fontWeight: "600", textDecoration: "none" } }),
            ],
        }),
    ],
})));
const volunteerRolesSection = () => {
    const roles = [
        ["Mentor And Teach", "Sit with learners, explain slowly, and help them make sense of Scratch, web pages, app ideas, and projects.", "images/LEA pics/LEA-3.jpg"],
        ["Support Program Days", "Help with setup, attendance, learner questions, and the small things that keep a session calm.", "images/community.PNG"],
        ["Document The Work", "Take photos, short videos, and honest stories so families, partners, and volunteers can see what is happening.", "images/LEA - HIGHWAY-28.jpg"],
        ["Events And Logistics", "Help during graduations, meetups, hackathons, outreach days, and partner activities.", "images/LEA pics/LEA-24.jpg"],
    ];
    return section("#ffffff", currentBreakpoint === "desktop" ? "78px 0 86px" : "54px 0 64px", container(stack(26, stack(8, create("span", { text: "Ways to help", style: { color: "#2c003e", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none", textAlign: "center" } }), heading("There is room for different kinds of help.", 2, { fontSize: currentBreakpoint === "desktop" ? "2.4rem" : "1.85rem", textAlign: "center", maxWidth: "760px", marginInline: "auto", fontWeight: "500" }), copy("Some volunteers teach. Some help learners settle in. Some take photos, organize rooms, call parents, or simply notice when a child needs encouragement.", {
        maxWidth: "680px",
        marginInline: "auto",
        textAlign: "center",
        color: "#666",
        fontSize: "0.95rem",
    })), create("div", {
        style: {
            display: "grid",
            gridTemplateColumns: columns(1, 2, 4),
            gap: "16px",
        },
        children: roles.map(([title, text, src], index) => volunteerRoleCard(title, text, index, src)),
    }))));
};
const volunteerRoleCard = (title, text, index, src) => create("article", {
    style: {
        minHeight: currentBreakpoint === "desktop" ? "286px" : "auto",
        display: "grid",
        alignContent: "start",
        gap: "16px",
        padding: currentBreakpoint === "desktop" ? "26px 24px 28px" : "22px 20px 24px",
        background: "#ffffff",
        border: "1px solid #e5e5e5",
        borderRadius: "2px",
        color: "#211326",
        boxShadow: "0 12px 28px rgba(33,19,38,0.06)",
    },
    children: [
        create("div", {
            style: {
                width: "58px",
                height: "58px",
                display: "block",
                objectFit: "contain",
            },
            children: [image([
                "images/icon-volunteer-mentor.png",
                "images/icon-program-support.png",
                "images/icon-document-work.png",
                "images/icon-events-logistics.png",
            ][index] ?? "images/icon-volunteer-mentor.png", `${title} icon`, { objectFit: "contain" })],
        }),
        heading(title, 3, { color: "#211326", fontSize: "1.18rem", fontWeight: "700", lineHeight: "1.15" }),
        copy(text, { color: "#707070", fontSize: "0.88rem", lineHeight: "1.6" }),
    ],
});
const volunteerPeopleSection = () => {
    const track = create("div", {
        style: {
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: currentBreakpoint === "desktop"
                ? isWideScreen()
                    ? "calc((100% - 108px) / 7)"
                    : "calc((100% - 72px) / 5)"
                : isTabletScreen()
                    ? "calc((100% - 32px) / 3)"
                    : "100%",
            gap: currentBreakpoint === "desktop" ? "18px" : "16px",
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
            overflowY: "hidden",
            padding: "2px 0 18px",
            scrollSnapType: "x proximity",
            scrollBehavior: "smooth",
            overscrollBehaviorX: "contain",
            WebkitOverflowScrolling: "touch",
        },
        children: volunteers.map((person) => volunteerPersonCard(person)),
    });
    const scrollVolunteers = (direction) => {
        const distance = Math.max(track.clientWidth, 320);
        track.scrollBy({ left: direction * distance, behavior: "smooth" });
    };
    return section("#f4f6f4", currentBreakpoint === "desktop" ? "76px 0 84px" : "54px 0 64px", wideCardsContainer(stack(26, stack(8, create("span", { text: "Volunteer community", style: { color: "#2c003e", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none" } }), heading("People who have shown up for LEA.", 2, {
        color: "#211326",
        fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem",
    }), copy("These are some of the people who have given time, skill, and care to sessions, events, and learner support.", {
        color: "#666",
        maxWidth: "760px",
        fontSize: "0.95rem",
    })), create("div", {
        style: {
            position: "relative",
            maxWidth: "100%",
            overflow: "hidden",
        },
        children: [
            volunteerScrollButton("‹", "left", () => scrollVolunteers(-1)),
            create("div", {
                style: {
                    marginInline: currentBreakpoint === "desktop" ? "62px" : "48px",
                    overflow: "hidden",
                },
                children: [track],
            }),
            volunteerScrollButton("›", "right", () => scrollVolunteers(1)),
        ],
    }))));
};
const volunteerScrollButton = (label, side, onClick) => create("button", {
    attrs: { type: "button", "aria-label": side === "left" ? "Scroll volunteers left" : "Scroll volunteers right" },
    text: label,
    onClick,
    style: {
        position: "absolute",
        top: currentBreakpoint === "desktop" ? "48px" : "54px",
        [side]: currentBreakpoint === "desktop" ? "8px" : "0",
        zIndex: "3",
        display: "grid",
        placeItems: "center",
        width: currentBreakpoint === "desktop" ? "50px" : "42px",
        height: currentBreakpoint === "desktop" ? "50px" : "42px",
        border: `2px solid ${theme.white}`,
        borderRadius: "999px",
        background: theme.orange,
        color: theme.plum,
        fontSize: currentBreakpoint === "desktop" ? "2.1rem" : "1.8rem",
        fontWeight: "700",
        lineHeight: "0.8",
        cursor: "pointer",
        boxShadow: "0 14px 30px rgba(0,0,0,0.3)",
    },
});
const volunteerPersonCard = (person) => create("article", {
    style: {
        display: "grid",
        justifyItems: "center",
        alignContent: "start",
        gap: "10px",
        minWidth: "0",
        width: "100%",
        scrollSnapAlign: "start",
        textAlign: "center",
        color: "#211326",
    },
    children: [
        create("div", {
            style: {
                width: currentBreakpoint === "desktop" ? "116px" : "132px",
                height: currentBreakpoint === "desktop" ? "116px" : "132px",
                overflow: "hidden",
                borderRadius: "999px",
                background: "transparent",
                border: "0",
                boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
            },
            children: [
                image(person.image, person.name, {
                    objectFit: "cover",
                    objectPosition: "center top",
                    padding: "0",
                    background: "transparent",
                }),
            ],
        }),
        heading(person.name, 3, { color: "#211326", fontSize: "1rem", lineHeight: "1.15" }),
        copy(person.role, { color: "#707070", fontSize: "0.86rem", lineHeight: "1.35" }),
    ],
});
const volunteerSignupSection = () => section(theme.white, currentBreakpoint === "desktop" ? "86px 0 94px" : "62px 0 70px", container(create("div", {
    attrs: { id: "sign-up" },
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.9fr 1.1fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "44px" : "28px",
        alignItems: "start",
    },
    children: [
        stack(14, eyebrow("Sign Up", { color: theme.orange }), heading("Tell us where you can help.", 2, { fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem" }), copy("Share what you are comfortable doing and when you are usually available. We will follow up with a role that fits a real program need."), programImagePanel("images/volunteer-hero-outreach-wide-fixed.png?v=20260910", "St. Paul's Children's Home Outreach in Rongai, Nairobi", "Volunteer together", "brightness(0.72) contrast(1.08) saturate(1.04)", true)),
        volunteerInterestForm(),
    ],
})));
const volunteerInterestForm = () => interestForm("Volunteer", "Volunteer form", "For mentors, facilitators, event helpers, media support, and anyone ready to show up.", "Send Volunteer Details", [
    formInput("Full name", "fullName", "Your name"),
    formInput("Email address", "email", "you@example.com", "email"),
    formInput("Phone number", "phone", "+254 ...", "tel"),
    formSelect("How would you like to help?", "volunteerArea", ["Teaching / Mentorship", "Program support", "Events and logistics", "Photography / media", "General volunteering"]),
    formSelect("Availability", "availability", ["Weekends", "Weekdays", "Online support", "Flexible"]),
    formTextArea("Additional info", "message", "Optional: tell us about your skills, experience, or why you want to volunteer.", false),
]);
const donatePage = () => create("main", {
    attrs: { "aria-label": "Donate to LEA Organization" },
    style: { background: theme.paper },
    children: [donateHero(), donateFormSection(), landingFooter()],
});
const donateHero = () => create("section", {
    style: {
        position: "relative",
        minHeight: currentBreakpoint === "desktop" ? "520px" : "500px",
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
        background: theme.plum,
    },
    children: [
        image("images/LEA pics/LEA-29.jpg", "LEA learners and volunteers during a community moment", {
            position: "absolute",
            inset: "0",
            zIndex: "0",
            objectPosition: "center",
            filter: "brightness(0.38) contrast(1.1) saturate(1.04)",
        }),
        create("div", {
            attrs: { "aria-hidden": "true" },
            style: {
                position: "absolute",
                inset: "0",
                zIndex: "1",
                background: "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(44,0,62,0.82) 52%, rgba(0,0,0,0.34) 100%)",
            },
        }),
        container(create("div", {
            style: { position: "relative", zIndex: "2", maxWidth: currentBreakpoint === "desktop" ? "780px" : "100%" },
            children: [
                stack(18, eyebrow("Donate", { color: theme.orange }), create("h1", {
                    style: {
                        margin: "0",
                        color: theme.white,
                        maxWidth: "760px",
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize: heroTitleSize(),
                        fontWeight: "700",
                        lineHeight: "1.05",
                        letterSpacing: "0",
                        textShadow: "0 4px 22px rgba(0,0,0,0.52)",
                    },
                    children: ["Help a learner ", create("span", { text: "keep going", style: { color: theme.orange } }), "."],
                }), copy("A donation can mean printed guides, internet for a session, transport for volunteers, a meal on a long learning day, or a device a learner finally gets to use.", {
                    color: theme.white,
                    maxWidth: "720px",
                    fontWeight: "700",
                    textShadow: "0 2px 12px rgba(0,0,0,0.48)",
                }), actionButton("#donate-form", "Start Donation", "orange")),
            ],
        })),
    ],
});
const donateFormSection = () => section(theme.white, currentBreakpoint === "desktop" ? "86px 0 96px" : "62px 0 70px", container(create("div", {
    attrs: { id: "donate-form" },
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.85fr 1.15fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "42px" : "28px",
        alignItems: "start",
    },
    children: [
        stack(18, eyebrow("Donation Support", { color: theme.orange }), heading("Tell us how you would like to help.", 2, { fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem" }), copy("We keep donations close to the work: class materials, devices, transport, meals, events, and the quiet costs that make sessions possible."), create("div", {
            style: { display: "grid", gap: "12px", marginTop: "8px" },
            children: [
                donationFocusCard("Learning materials", "Guides, project sheets, and the small tools learners use during sessions."),
                donationFocusCard("Devices and internet", "Laptops, accessories, bundles, and classroom tools when a centre needs support."),
                donationFocusCard("Meals, transport, and events", "The day-to-day support that helps learners and volunteers show up and stay present."),
            ],
        })),
        donateInterestForm(),
    ],
})));
const donationFocusCard = (title, text) => create("article", {
    style: {
        padding: "18px",
        background: theme.paper,
        borderLeft: `5px solid ${theme.orange}`,
        boxShadow: "0 14px 30px rgba(44, 0, 62, 0.08)",
    },
    children: [
        stack(6, heading(title, 3, { color: theme.purple, fontSize: "1.18rem" }), copy(text, { fontSize: "0.96rem", lineHeight: "1.45" })),
    ],
});
const contactPage = () => create("main", {
    attrs: { "aria-label": "Contact LEA Organization" },
    style: { background: theme.paper },
    children: [contactHero(), contactMapSection(), landingFooter()],
});
const contactHero = () => create("section", {
    style: {
        background: theme.plum,
        padding: "0",
    },
    children: [create("div", {
        style: {
            position: "relative",
            minHeight: currentBreakpoint === "desktop" ? "345px" : "420px",
            display: "grid",
            alignItems: "end",
            overflow: "hidden",
        },
        children: [
            image("images/lea-about-story-a.jpg", "LEA learner learning with a mentor", { position: "absolute", inset: "0", objectPosition: "center", filter: "brightness(0.66) saturate(1.02)" }),
            create("div", { style: { position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(10,10,10,0.74) 0%, rgba(10,10,10,0.36) 58%, rgba(10,10,10,0.08) 100%), linear-gradient(0deg, rgba(10,10,10,0.64) 0%, rgba(10,10,10,0.04) 72%)" } }),
            create("div", { style: { position: "relative", zIndex: "2", alignSelf: "end", padding: currentBreakpoint === "desktop" ? "0 max(calc((100vw - 1240px) / 2), 32px) 44px" : "0 24px 44px", maxWidth: "1100px" }, children: [stack(12, create("h1", {
                style: {
                    margin: "0",
                    color: theme.white,
                    maxWidth: "860px",
                    fontFamily: "Outfit, Arial, Helvetica, sans-serif",
                    fontSize: currentBreakpoint === "desktop" ? "clamp(2.15rem, 3.45vw, 3.2rem)" : "1.78rem",
                    fontWeight: "500",
                    lineHeight: "1.04",
                    letterSpacing: "-0.025em",
                    whiteSpace: currentBreakpoint === "desktop" ? "nowrap" : "normal",
                },
                text: "Connect with LEA.",
            }), copy("Send us a message, ask about partnerships, or reach the team directly. We would love to hear what you are building and how LEA can help.", {
                color: "#f4e8f7",
                maxWidth: "740px",
                fontWeight: "400",
                fontSize: currentBreakpoint === "desktop" ? "0.92rem" : "0.8rem",
            }), create("div", {
                style: { display: "flex", flexWrap: "nowrap", gap: currentBreakpoint === "desktop" ? "10px" : "5px", marginTop: "2px", whiteSpace: "nowrap" },
                children: [actionButton("#contact-form", "Send us a message", "hero"), actionButton("/volunteer", "Volunteer with LEA", "hero-purple")],
            }))] }),
        ],
    })],
});
const contactMapSection = () => section(theme.white, currentBreakpoint === "desktop" ? "86px 0 96px" : "62px 0 70px", container(create("div", {
    attrs: { id: "contact-form" },
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "1fr 1fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "32px" : "24px",
        alignItems: "stretch",
    },
    children: [
        stack(18, heading("Let’s talk about what comes next.", 2, { fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "2rem", fontWeight: "400" }), copy("Tell us what you are working on, ask a question, or start a conversation about bringing practical coding closer to more learners.", { fontSize: "0.98rem", lineHeight: "1.6" }), contactInterestForm()),
        contactMapCard(),
    ],
})));
const contactInterestForm = () => {
    const form = interestForm("Contact", "Send your message", "We will read your note and get back to you soon.", "Send Message", [
        formInput("Full name", "fullName", "Your name"),
        formInput("Email address", "email", "you@example.com", "email"),
        formInput("Phone number", "phone", "+254 ...", "tel", false),
        formSelect("Reason for contact", "contactReason", ["General inquiry", "School / institution inquiry", "Partnership", "Media / events", "Other"]),
        formTextArea("Message", "message", "Write your message here."),
    ]);
    applyStyle(form, { background: theme.white, border: `1px solid ${theme.line}`, borderTop: `3px solid ${theme.orange}`, boxShadow: "0 8px 22px rgba(44,0,62,0.06)", padding: currentBreakpoint === "desktop" ? "24px" : "20px" });
    form.querySelectorAll("label").forEach((label) => applyStyle(label, { color: theme.purple }));
    form.querySelectorAll("input, select, textarea").forEach((field) => applyStyle(field, { background: theme.white, border: `1px solid ${theme.line}`, color: theme.ink }));
    form.querySelectorAll("h3").forEach((title) => applyStyle(title, { color: theme.purple }));
    form.querySelectorAll("p").forEach((text) => applyStyle(text, { color: theme.muted }));
    return form;
};
const contactMapCard = () => create("article", {
    style: {
        display: "grid",
        gridTemplateRows: currentBreakpoint === "desktop" ? "minmax(360px, 1fr) auto" : "320px auto",
        overflow: "hidden",
        background: theme.white,
        border: `1px solid ${theme.line}`,
        boxShadow: "0 8px 24px rgba(44, 0, 62, 0.06)",
    },
    children: [
        create("iframe", {
            attrs: {
                title: "Map showing Nairobi, Kenya",
                src: "https://www.google.com/maps?q=Applewood%20Adams%20Ngong%20Road%2C%20Nairobi%2C%20Kenya&output=embed",
                loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade",
            },
            style: {
                width: "100%",
                height: "100%",
                minHeight: currentBreakpoint === "desktop" ? "360px" : "320px",
                border: "0",
                display: "block",
            },
        }),
        create("div", {
            style: {
                display: "grid",
                gap: "10px",
                padding: "22px",
                background: theme.purple,
            },
            children: [
                eyebrow("Applewood Adams, Ngong Road", { color: theme.orange }),
                heading("LEA Organization", 3, { color: theme.orange, fontSize: "1.35rem", fontWeight: "500" }),
                copy("Visit or reach out from Applewood Adams on Ngong Road. We work with schools, community projects, partners, volunteers, and learners across Nairobi and beyond.", {
                    color: theme.white,
                    fontSize: "0.98rem",
                }),
            ],
        }),
    ],
});
const partnerInterestForm = () => interestForm("Partner", "Partner form", "For schools, community projects, companies, and organizations that want to host or support LEA programs.", "Submit Partner Interest", [
    formInput("Organization name", "organization", "School, project, company, or group"),
    formInput("Contact person", "fullName", "Your name"),
    formInput("Email address", "email", "you@example.com", "email"),
    formInput("Phone number", "phone", "+254 ...", "tel"),
    formSelect("Partnership interest", "partnerArea", ["Host a program", "Sponsor devices/resources", "Corporate volunteering", "Training collaboration", "Other partnership"]),
    formTextArea("Additional info", "message", "Optional: share the learners, location, timeline, or support you have in mind.", false),
]);
const donateInterestForm = () => interestForm("Donate", "Donation form", "For people who want to support sessions, devices, transport, learning materials, or events.", "Submit Donation Interest", [
    formInput("Full name", "fullName", "Your name"),
    formInput("Email address", "email", "you@example.com", "email"),
    formInput("Phone number", "phone", "+254 ...", "tel"),
    formSelect("Donation focus", "donationFocus", ["Learning materials", "Devices / equipment", "Program meals and transport", "Events and graduations", "General support"]),
    formInput("Estimated amount or support", "amount", "Amount, items, or services", "text", false),
    formTextArea("Additional info", "message", "Optional: tell us how you would like to support.", false),
]);
const contactInfoSection = () => section(theme.white, currentBreakpoint === "desktop" ? "64px 0 72px" : "48px 0 56px", container(create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "1fr 1fr" : "1fr",
        gap: "22px",
        alignItems: "center",
    },
    children: [
        stack(12, eyebrow("Direct Contact", { color: theme.orange }), heading("Prefer to talk first?", 2, { color: theme.purple, fontSize: currentBreakpoint === "desktop" ? "2.45rem" : "2rem" }), copy("Reach out directly and we will guide you to the right next step.", { color: theme.muted, maxWidth: "620px" })),
        create("div", {
            style: { display: "grid", gap: "12px" },
            children: [
                contactInfoCard("Phone", "+254 746 821567"),
                contactInfoCard("Email", "leaorganization@gmail.com"),
                contactInfoCard("Location", "Applewood Adams, Ngong Road"),
            ],
        }),
    ],
})));
const contactInfoCard = (label, value) => create("article", {
    style: {
        padding: "20px",
        background: theme.white,
        borderLeft: `5px solid ${theme.orange}`,
    },
    children: [
        stack(4, eyebrow(label, { color: theme.orange }), heading(value, 3, { color: theme.purple, fontSize: "1.22rem" })),
    ],
});
const landingActionsSection = () => {
    const actions = [
        {
            title: "What We Do",
            label: "Coding sessions",
            text: "We run beginner-friendly coding sessions for learners aged 9 to 18, with room to ask questions, make mistakes, and build.",
            image: "images/LEA pics/LEA-3.jpg",
            alt: "LEA learners during a technology session",
            href: "/programs",
            button: "View Programs",
        },
        {
            title: "Give Donation",
            label: "Keep sessions moving",
            text: "Your support helps with materials, devices, internet, meals, transport, and the ordinary costs behind every learning day.",
            image: "images/LEA pics/LEA-29.jpg",
            alt: "Volunteer mentoring LEA learners",
            href: "/donate",
            button: "Donate Now",
        },
        {
            title: "Become a Volunteer",
            label: "Mentor and teach",
            text: "Show up with your skill, patience, and encouragement. Sometimes one calm mentor changes how a learner sees themselves.",
            image: "images/community.PNG",
            alt: "LEA volunteers and community members",
            href: "/volunteer",
            button: "Volunteer",
        },
        {
            title: "Become a Partner",
            label: "Open a door",
            text: "Work with us through a school, centre, company, or community space so more learners can meet technology early.",
            image: "images/LEA pics/LEA-24.jpg",
            alt: "LEA learners working together",
            href: "/contact",
            button: "Partner With Us",
        },
    ];
    return section(theme.white, currentBreakpoint === "desktop" ? "88px 0 96px" : "62px 0 70px", wideCardsContainer(create("div", {
        style: {
            display: "grid",
            gap: currentBreakpoint === "desktop" ? "38px" : "28px",
        },
        children: [
            stack(16, create("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                },
                children: [
                    create("span", {
                        attrs: { "aria-hidden": "true" },
                        style: { width: "24px", height: "1px", background: theme.orange },
                    }),
                    eyebrow("LEA Organization: Get Involved", { color: theme.orange }),
                ],
            }), heading("There is more than one way to help.", 2, {
                maxWidth: currentBreakpoint === "desktop" ? "760px" : "100%",
                fontSize: currentBreakpoint === "desktop" ? "3.15rem" : "2.25rem",
                lineHeight: "1.04",
                color: "#111018",
            }), copy("You can bring learners, donate resources, volunteer your time, or partner with us on a program that fits your community.", {
                maxWidth: "760px",
                color: "#17111b",
                fontSize: currentBreakpoint === "desktop" ? "1rem" : "0.98rem",
            })),
            create("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: columns(1, 2, 4),
                    gap: currentBreakpoint === "desktop" ? "18px" : "20px",
                },
                children: actions.map((action, index) => landingActionCard(action, index)),
            }),
        ],
    })));
};
const landingActionCard = (action, index) => section("transparent", "0", interactive(create("article", {
    style: {
        display: "grid",
        gridTemplateRows: `${mediaHeight(218, 230, 232, 250)} minmax(0, 1fr)`,
        minHeight: currentBreakpoint === "desktop" ? "486px" : "auto",
        overflow: "hidden",
        background: theme.purple,
        border: `1px solid ${theme.purple}`,
        borderRadius: "0",
        boxShadow: "0 18px 34px rgba(0, 0, 0, 0.18)",
    },
    children: [
        create("div", {
            style: {
                minHeight: mediaHeight(218, 230, 232, 250),
            },
            children: [
                image(action.image, action.alt, {
                    height: mediaHeight(218, 230, 232, 250),
                    borderRadius: "0",
                    objectPosition: index === 2 ? "center 42%" : "center",
                    filter: "saturate(1.02) contrast(1.03)",
                }),
            ],
        }),
        create("div", {
            style: {
                display: "grid",
                gridTemplateRows: "auto auto minmax(0, 1fr) auto",
                alignContent: "stretch",
                gap: "12px",
                padding: currentBreakpoint === "desktop" ? "24px 24px 26px" : "22px",
            },
            children: [
                heading(action.title, 3, {
                    color: theme.orange,
                    fontSize: currentBreakpoint === "desktop" ? "1.42rem" : "1.45rem",
                    lineHeight: "1.08",
                }),
                eyebrow(action.label, { color: theme.orange }),
                copy(action.text, { color: "#f4e8f7", fontSize: "0.94rem", lineHeight: "1.58" }),
                create("a", {
                    attrs: { href: action.href },
                    text: action.button,
                    style: {
                        display: "inline-flex",
                        width: "fit-content",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "42px",
                        padding: "11px 18px",
                        marginTop: "8px",
                        borderRadius: "0",
                        background: theme.orange,
                        border: `1px solid ${theme.orange}`,
                        color: theme.plum,
                        fontWeight: "700",
                        lineHeight: "1",
                        textDecoration: "none",
                    },
                }),
            ],
        }),
    ],
}), {
    transform: "translateY(0)",
    borderColor: theme.purple,
    boxShadow: "0 18px 34px rgba(44, 0, 62, 0.16)",
}, {
    transform: "translateY(-4px)",
    borderColor: "rgba(248, 157, 53, 0.5)",
    boxShadow: "0 24px 46px rgba(44, 0, 62, 0.13)",
}));
const supportCollageSection = () => section(theme.purple, currentBreakpoint === "desktop" ? "88px 0 96px" : "62px 0 70px", container(stack(28, stack(10, eyebrow("Gallery", { color: theme.orange }), heading("Moments From LEA Organization", 2, {
    color: theme.white,
    fontSize: currentBreakpoint === "desktop" ? "2.35rem" : "1.9rem",
})), create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.9fr 1.2fr 0.95fr" : isTabletScreen() ? "repeat(2, minmax(0, 1fr))" : "1fr",
        gridTemplateRows: currentBreakpoint === "desktop" ? `repeat(3, ${isWideScreen() ? 208 : 178}px)` : "auto",
        gap: currentBreakpoint === "desktop" ? "0" : "16px",
        alignItems: "stretch",
        border: currentBreakpoint === "desktop" ? "1px solid rgba(255,255,255,0.14)" : "0",
        background: theme.white,
    },
    children: [
        supportImageTile("images/M1.jpeg", "LEA learners during a Mogra program session", {
            gridColumn: currentBreakpoint === "desktop" ? "1" : "auto",
            gridRow: currentBreakpoint === "desktop" ? "1" : "auto",
            minHeight: mediaHeight(210, 220, 178, 208),
        }),
        supportImageTile("images/M2.jpeg", "LEA mentor supporting learners during a program activity", {
            gridColumn: currentBreakpoint === "desktop" ? "1" : "auto",
            gridRow: currentBreakpoint === "desktop" ? "2" : "auto",
            minHeight: mediaHeight(210, 220, 178, 208),
        }),
        supportImageTile("images/M3.jpeg", "LEA learners and mentors in a community session", {
            gridColumn: currentBreakpoint === "desktop" ? "1" : isTabletScreen() ? "1 / span 2" : "auto",
            gridRow: currentBreakpoint === "desktop" ? "3" : "auto",
            minHeight: mediaHeight(210, 220, 178, 208),
        }),
        supportImageTile("images/Happy.jpeg", "LEA learners smiling during a learning day", {
            gridColumn: currentBreakpoint === "desktop" ? "2" : isTabletScreen() ? "1 / span 2" : "auto",
            gridRow: currentBreakpoint === "desktop" ? "1 / span 3" : "auto",
            minHeight: mediaHeight(300, 360, 534, 624),
        }),
        create("article", {
            style: {
                gridColumn: currentBreakpoint === "desktop" ? "3" : isTabletScreen() ? "1 / span 2" : "auto",
                gridRow: currentBreakpoint === "desktop" ? "1 / span 2" : "auto",
                display: "grid",
                alignContent: "center",
                gap: "18px",
                padding: currentBreakpoint === "desktop" ? "44px 36px" : "30px 24px",
                background: "#050505",
                borderLeft: currentBreakpoint === "desktop" ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.14)",
                borderRight: currentBreakpoint === "desktop" ? "0" : "1px solid rgba(255,255,255,0.14)",
                borderTop: currentBreakpoint === "desktop" ? "0" : "1px solid rgba(255,255,255,0.14)",
            },
            children: [
                create("div", {
                    style: { display: "flex", alignItems: "center", gap: "10px" },
                    children: [
                        create("span", { attrs: { "aria-hidden": "true" }, style: { width: "24px", height: "1px", background: theme.orange } }),
                        eyebrow("Support", { color: theme.orange }),
                    ],
                }),
                heading("We need your support", 2, {
                    color: theme.white,
                    maxWidth: "360px",
                    fontSize: currentBreakpoint === "desktop" ? "2.65rem" : "2.1rem",
                    lineHeight: "1.05",
                }),
                copy("Your partnership helps us grow programs that center learners, schools, and communities. Every donation strengthens the movement.", {
                    maxWidth: "420px",
                    color: "#d8d0dc",
                    fontSize: "1rem",
                }),
                create("div", {
                    style: { display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "6px" },
                    children: [supportButton("/donate", "Donate", true), supportButton("/contact", "Partner", false)],
                }),
            ],
        }),
        supportImageTile("images/M7.jpeg", "LEA community program moment", {
            gridColumn: currentBreakpoint === "desktop" ? "3" : isTabletScreen() ? "1 / span 2" : "auto",
            gridRow: currentBreakpoint === "desktop" ? "3" : "auto",
            minHeight: mediaHeight(210, 220, 178, 208),
        }),
    ],
}))));
const supportImageTile = (src, alt, extra = {}) => create("figure", {
    style: {
        position: "relative",
        overflow: "hidden",
        margin: "0",
        background: theme.plum,
        ...extra,
    },
    children: [image(src, alt, { objectPosition: "center", filter: "saturate(1.02) contrast(1.03)" })],
});
const supportButton = (href, text, filled) => create("a", {
    attrs: { href },
    text,
    style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "46px",
        padding: "13px 22px",
        background: filled ? theme.orange : "transparent",
        border: filled ? `1px solid ${theme.orange}` : "1px solid rgba(255,255,255,0.46)",
        color: filled ? theme.plum : theme.white,
        fontSize: "0.78rem",
        fontWeight: "700",
        letterSpacing: "0.08em",
        lineHeight: "1",
        textDecoration: "none",
    },
});
const landingFooter = () => create("footer", {
    attrs: { class: "site-floating-footer" },
    style: {
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "1000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "18px",
        minHeight: currentBreakpoint === "desktop" ? "62px" : "72px",
        padding: currentBreakpoint === "desktop" ? "12px 32px" : "12px 18px",
        background: theme.purple,
        color: theme.white,
        borderTop: "0",
        boxShadow: "0 -8px 24px rgba(44,0,62,.16)",
        fontFamily: "Arial, Helvetica, sans-serif",
    },
    children: [
        create("span", { text: '"Every young person deserves the chance to build what comes next."', style: { color: "rgba(255,255,255,.82)", fontSize: currentBreakpoint === "desktop" ? "0.76rem" : "0.68rem", fontStyle: "italic", lineHeight: "1.3" } }),
        create("span", { text: "© 2026 LEA Organization. All rights reserved.", style: { color: "#fff", fontSize: currentBreakpoint === "desktop" ? "0.72rem" : "0.62rem", whiteSpace: "nowrap" } }),
    ],
});
const footerBrandColumn = () => stack(20, stack(8, heading("LEA Organization", 3, { color: theme.white, fontSize: "1.65rem", textTransform: "uppercase" }), copy("Helping young learners meet coding early, build confidence, and see technology as something they can create with.", {
    color: "#eadbed",
    maxWidth: "420px",
    fontSize: "1rem",
})), create("div", {
    style: {
        display: "grid",
        gap: "10px",
        maxWidth: "430px",
    },
    children: [
        footerContactCard("Phone", "+254 746 821567", "tel:+254746821567"),
        footerContactCard("Email", "leaorganization@gmail.com", "mailto:leaorganization@gmail.com"),
        footerContactCard("Location", "Applewood Adams, Ngong Road", "/contact"),
    ],
}), create("div", {
    style: { display: "flex", gap: "10px", marginTop: "2px", flexWrap: "wrap" },
    children: [
        footerSocial("instagram", "https://www.instagram.com/lea_orgke/profilecard/?igsh=NTQwanp2ZW5zOGow", "Instagram"),
        footerSocial("x", "https://x.com/lea_org?t=jmf5UOhffrmsP_P7hHjw7g&s=09", "X"),
        footerSocial("tiktok", "https://www.tiktok.com/@leaorganizationke?_t=8qodYvCewNh&_r=1", "TikTok"),
        footerSocial("linkedin", "https://www.linkedin.com/in/lea-organization-ke/", "LinkedIn"),
    ],
}));
const footerContactCard = (label, value, href) => create("a", {
    attrs: { href },
    style: {
        display: "grid",
        gap: "3px",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${theme.orange}`,
        color: theme.white,
        textDecoration: "none",
    },
    children: [
        eyebrow(label, { color: theme.orange, fontSize: "0.7rem" }),
        create("span", { text: value, style: { color: theme.white, fontSize: "0.98rem", fontWeight: "700", lineHeight: "1.25" } }),
    ],
});
const footerSocial = (icon, href, label) => {
    const socialColors = {
        instagram: "#e4405f",
        x: "#ffffff",
        tiktok: "#25f4ee",
        linkedin: "#0a66c2",
    };
    return create("a", {
        attrs: { href, "aria-label": label, target: "_blank", rel: "noreferrer" },
        style: {
            width: "44px",
            height: "44px",
            display: "inline-grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.06)",
            color: socialColors[icon],
            textDecoration: "none",
        },
        children: [footerSocialIcon(icon)],
    });
};
const footerSocialIcon = (icon) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const pathSets = {
        instagram: [
            "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5",
            "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37",
            "M17.5 6.5h.01",
        ],
        x: ["M4 4l16 16", "M20 4L4 20"],
        tiktok: ["M14 3v10.2a4.2 4.2 0 1 1-4.2-4.2", "M14 3c1 3 3 5 6 5"],
        linkedin: ["M4 9v11", "M4 4.5v.01", "M10 20v-7a4 4 0 0 1 8 0v7", "M10 9v11"],
    };
    pathSets[icon].forEach((d) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        svg.appendChild(path);
    });
    return svg;
};
const footerLinksColumn = () => {
    const links = [
        ["Home", "/"],
        ["About", "/about"],
        ["Programs", "/programs"],
        ["Projects", "/projects"],
        ["Events", "/events"],
        ["Volunteer", "/volunteer"],
        ["Donate", "/donate"],
        ["Contact", "/contact"],
    ];
    return stack(18, heading("Quick Links", 3, { color: theme.white, fontSize: "1.35rem" }), create("nav", {
        attrs: { "aria-label": "Footer quick links" },
        style: {
            display: "grid",
            gap: "11px",
        },
        children: links.map(([label, href]) => create("a", {
            attrs: { href },
            text: label,
            style: {
                display: "flex",
                alignItems: "center",
                minHeight: "34px",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                color: "#eadbed",
                fontSize: "1rem",
                textDecoration: "none",
            },
        })),
    }));
};
const footerGalleryColumn = () => {
    const thumbnails = [
        ["images/LEA pics/LEA-24.jpg", "LEA learners collaborating"],
        ["images/LEA pics/LEA-3.jpg", "LEA classroom session"],
        ["images/LEA pics/LEA-29.jpg", "Mentorship moment"],
        ["images/community.PNG", "LEA community group"],
        ["images/LEA - HIGHWAY-28.jpg", "Learner presentation"],
        ["images/LEA pics/coding16.jpg", "Coding class"],
    ];
    return stack(18, stack(8, heading("Gallery", 3, { color: theme.white, fontSize: "1.35rem" }), copy("A few moments from classrooms, community spaces, and program days.", {
        color: "#eadbed",
        fontSize: "0.96rem",
        lineHeight: "1.45",
    })), create("div", {
        style: {
            display: "grid",
            gridTemplateColumns: columns(2, 3, 3),
            gap: "8px",
        },
        children: thumbnails.map(([src, alt], index) => create("figure", {
            style: {
                margin: "0",
                height: index === 0 ? "150px" : "76px",
                gridColumn: index === 0 ? "span 2" : "auto",
                gridRow: index === 0 ? "span 2" : "auto",
                overflow: "hidden",
                background: theme.plum,
                border: "1px solid rgba(255,255,255,0.12)",
            },
            children: [image(src, alt, { objectPosition: "center", filter: "saturate(1.03) contrast(1.04)" })],
        })),
    }));
};
const aboutIcon = (icon, color = theme.purple) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "28");
    svg.setAttribute("height", "28");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", color);
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const paths = {
        target: ["M12 2v4", "M12 18v4", "M2 12h4", "M18 12h4", "M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12", "M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4"],
        eye: ["M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6"],
        focus: ["M4 8V5a1 1 0 0 1 1-1h3", "M16 4h3a1 1 0 0 1 1 1v3", "M20 16v3a1 1 0 0 1-1 1h-3", "M8 20H5a1 1 0 0 1-1-1v-3", "M9 12h6", "M12 9v6"],
        route: ["M4 19c4 0 4-4 8-4s4 4 8 4", "M4 5c4 0 4 4 8 4s4-4 8-4", "M4 5v14", "M20 5v14"],
    };
    paths[icon].forEach((d) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        svg.appendChild(path);
    });
    return svg;
};
const aboutPage = () => create("main", {
    attrs: { "aria-label": "About Us" },
    style: { background: "#ffffff" },
    children: [aboutHero(), aboutQuietIntro(), aboutMissionVision(), aboutSimpleSections(), landingFooter()],
});
const aboutHero = () => create("section", {
    style: {
        position: "relative",
        minHeight: currentBreakpoint === "desktop" ? "595px" : "540px",
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
        background: "#211326",
    },
    children: [
        image("images/lea-about-hero.jpg", "A young learner smiling in a warm community setting", {
            position: "absolute",
            inset: "0",
            zIndex: "0",
            objectPosition: "center center",
            filter: "brightness(0.86) saturate(1.02) contrast(1.02)",
        }),
        create("div", {
            attrs: { "aria-hidden": "true" },
            style: {
                position: "absolute",
                inset: "0",
                zIndex: "1",
                background: currentBreakpoint === "desktop"
                    ? "linear-gradient(90deg, rgba(20,20,14,0.84) 0%, rgba(20,20,14,0.64) 37%, rgba(20,20,14,0.08) 72%, rgba(20,20,14,0.12) 100%)"
                    : "linear-gradient(180deg, rgba(20,20,14,0.08) 0%, rgba(20,20,14,0.2) 38%, rgba(20,20,14,0.82) 100%)",
            },
        }),
        container(create("div", {
            style: {
                position: "relative",
                zIndex: "2",
                width: "100%",
                maxWidth: currentBreakpoint === "desktop" ? "520px" : "100%",
                padding: currentBreakpoint === "desktop" ? "112px 0 94px" : "150px 0 52px",
            },
            children: [
                stack(12,
                    create("h1", {
                        text: "About Us",
                        style: {
                            margin: "0",
                            color: theme.white,
                            maxWidth: "860px",
                            fontFamily: "Outfit, Arial, Helvetica, sans-serif",
                            fontSize: currentBreakpoint === "desktop" ? "clamp(2.15rem, 3.45vw, 3.2rem)" : "1.78rem",
                            fontWeight: "500",
                            lineHeight: "1.04",
                            letterSpacing: "-0.025em",
                            whiteSpace: currentBreakpoint === "desktop" ? "nowrap" : "normal",
                        },
                    }),
                    copy("We create calm, practical spaces where young people can meet technology, learn at their own pace, and see what they can make. Through coding, mentorship, and community partnerships, we help learners move from first questions to confident creation.", {
                        color: "#f4e8f7",
                        maxWidth: "740px",
                        fontSize: currentBreakpoint === "desktop" ? "0.92rem" : "0.8rem",
                        fontWeight: "400",
                        lineHeight: "1.55",
                    }),
                    create("div", {
                        style: { display: "flex", flexWrap: "nowrap", gap: currentBreakpoint === "desktop" ? "10px" : "5px", marginTop: "2px", whiteSpace: "nowrap" },
                        children: [actionButton("/programs", "Explore programs", "hero"), actionButton("/contact", "Bring LEA to your school", "hero-purple")],
                    }),
                ),
            ],
        })),
    ],
});
const aboutQuietIntro = () => section("#ffffff", currentBreakpoint === "desktop" ? "82px 0 94px" : "54px 0 64px", container(create("div", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "0.95fr 1.05fr" : "1fr",
        gap: currentBreakpoint === "desktop" ? "72px" : "32px",
        alignItems: "center",
    },
    children: [
        create("div", {
            style: { display: "grid", alignContent: "center", gap: "18px", maxWidth: "560px", order: "2" },
            children: [
                create("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [create("span", { text: "Know about us", style: { color: "#f89d35", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "700", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none" } })] }),
                create("h2", { text: "A learning community built around access, patience, and confidence.", style: { margin: "0", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.55rem" : "1.9rem", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.025em" } }),
                copy("In many communities, access to technology still decides who gets to imagine a future in it. LEA exists so that background does not decide whether a child gets to learn, build, and belong in the digital world.", { color: "#666", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.94rem", fontWeight: "400", lineHeight: "1.65" }),
                copy("Our sessions are practical and human. Learners build small things first, gain confidence, ask better questions, and slowly begin to see themselves as creators.", { color: "#666", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.94rem", fontWeight: "400", lineHeight: "1.65" }),
                create("a", { attrs: { href: "/programs" }, text: "Learn more", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "112px", minHeight: "40px", marginTop: "6px", background: "#f89d35", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.78rem", fontWeight: "600", textDecoration: "none" } }),
            ],
        }),
        aboutVideoPanel(),
    ],
}))); 
const aboutVideoPanel = () => {
    const panel = create("div", { style: { position: "relative", minHeight: currentBreakpoint === "desktop" ? "360px" : "270px", overflow: "hidden", background: "#211326", order: "1" } });
    const poster = image("images/lea-about-story-a.jpg", "LEA learner learning with a mentor", { position: "absolute", inset: "0", objectPosition: "center", filter: "brightness(0.9) saturate(1.03)" });
    const scrim = create("div", { attrs: { "aria-hidden": "true" }, style: { position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(33,19,38,0.16), rgba(33,19,38,0.02))" } });
    const play = create("button", { attrs: { type: "button", "aria-label": "Play the LEA learning video" }, style: { position: "absolute", inset: "0", margin: "auto", display: "grid", placeItems: "center", width: "58px", height: "58px", border: "0", borderRadius: "50%", background: "rgba(255,255,255,0.94)", color: "#211326", fontSize: "1.1rem", paddingLeft: "3px", boxShadow: "0 8px 20px rgba(0,0,0,0.18)", cursor: "pointer" }, text: "▶", onClick: () => {
        const video = document.createElement("video");
        video.src = "/images/Intro (1).mp4";
        video.poster = "/images/lea-about-story-a.jpg";
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("aria-label", "LEA learners learning and building together");
        applyStyle(video, { position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" });
        panel.replaceChildren(video);
    } });
    appendChild(panel, [poster, scrim, play]);
    return panel;
};
const aboutMissionVision = () => create("div", {
    style: { background: "#ffffff", fontFamily: "Outfit, Arial, Helvetica, sans-serif" },
    children: [
        section("#ffffff", currentBreakpoint === "desktop" ? "78px 0 84px" : "54px 0 62px", container(create("div", {
            style: { display: "grid", gap: "28px" },
            children: [
                stack(8,
                    create("span", { text: "Together for change", style: { color: "#2c003e", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none", textAlign: "center" } }),
                    create("h2", { text: "Opening the door to coding, one learner at a time.", style: { margin: "0 auto", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.4rem" : "1.85rem", fontWeight: "500", lineHeight: "1.12", textAlign: "center", maxWidth: "760px" } }),
                    copy("Practical learning, patient mentorship, and welcoming spaces that help young people build a future they can shape.", { color: "#666", fontSize: "0.95rem", fontWeight: "400", lineHeight: "1.6", textAlign: "center", maxWidth: "640px", marginInline: "auto" }),
                ),
                create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(3, 1fr)" : "1fr", gap: "18px" }, children: [
                    aboutProgramCard("01", "Access to learning", "We bring coding, devices, and a supportive first step closer to young people who are often left behind.", "images/lea-about-access.jpg"),
                    aboutProgramCard("02", "Skills for tomorrow", "Learners build real projects, practice problem-solving, and gain skills they can keep using beyond the classroom.", "images/lea-about-skills.jpg"),
                    aboutProgramCard("03", "Community that stays", "Mentors, peers, families, and partners create the encouragement that keeps learning moving forward.", "images/lea-about-community.jpg"),
                ]}),
            ],
        }))),
        section("#f4f6f4", currentBreakpoint === "desktop" ? "70px 0" : "52px 0", container(create("div", {
            style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "1fr 220px" : "1fr", gap: "44px", alignItems: "center" },
            children: [
                stack(10,
                    create("span", { text: "Where your support goes", style: { color: "#2c003e", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none" } }),
                    create("h2", { text: "Small support. Visible progress.", style: { margin: "0", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2rem" : "1.7rem", fontWeight: "500", lineHeight: "1.12" } }),
                    copy("Your support helps turn a learner’s first question into a project, a skill, and a new sense of possibility.", { color: "#666", fontSize: "0.92rem", fontWeight: "400", lineHeight: "1.65", maxWidth: "610px" }),
                    create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(2, 1fr)" : "1fr", gap: "8px 18px", color: "#666", fontSize: "0.82rem" }, children: [
                        create("span", { text: "●  Learning access", style: { color: "#f89d35" } }),
                        create("span", { text: "●  Mentorship", style: { color: "#7aa66c" } }),
                        create("span", { text: "●  Devices and materials", style: { color: "#8a6ea8" } }),
                        create("span", { text: "●  Community sessions", style: { color: "#4e8ca4" } }),
                    ]}),
                ),
                create("div", { style: { width: "190px", height: "190px", borderRadius: "50%", background: "conic-gradient(#f89d35 0 31%, #7aa66c 31% 57%, #8a6ea8 57% 78%, #4e8ca4 78% 100%)", display: "grid", placeItems: "center", marginInline: "auto" }, children: [create("div", { style: { width: "112px", height: "112px", borderRadius: "50%", background: "#f4f6f4", display: "grid", placeItems: "center", textAlign: "center", color: "#211326", fontSize: "0.76rem", fontWeight: "600", lineHeight: "1.2", padding: "12px" }, text: "LEA\nIMPACT" })] }),
            ],
        }))),
        section("#ffffff", currentBreakpoint === "desktop" ? "76px 0 84px" : "56px 0 64px", container(create("div", {
            style: { display: "grid", gap: "26px" },
            children: [
                stack(8,
                    create("span", { text: "Our Mission and Vision", style: { color: "#2c003e", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none", textAlign: "center" } }),
                    create("h2", { text: "The purpose that steadies the work, and the future we design toward.", style: { margin: "0 auto", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.1rem" : "1.7rem", fontWeight: "500", lineHeight: "1.12", textAlign: "center", maxWidth: "720px" } }),
                ),
                create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(2, 1fr)" : "1fr", gap: "18px" }, children: [
                    aboutStatement("Mission", "To create welcoming, practical learning experiences that help young people discover coding, build confidence, and take part in the digital future."),
                    aboutStatement("Vision", "A future where every young person, regardless of background, has the opportunity and confidence to learn, create, and thrive with technology."),
                ]}),
            ],
        }))),
        section("#211326", currentBreakpoint === "desktop" ? "76px 0 84px" : "54px 0 64px", container(create("div", {
            style: { display: "grid", gap: "26px" },
            children: [
                stack(8,
                    create("span", { text: "What guides us", style: { color: "#f89d35", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none", textAlign: "center" } }),
                    create("h2", { text: "Our Core Values", style: { margin: "0 auto", color: "#ffffff", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.1rem" : "1.7rem", fontWeight: "500", lineHeight: "1.12", textAlign: "center" } }),
                ),
                create("div", { style: { display: "grid", gridTemplateColumns: currentBreakpoint === "desktop" ? "repeat(6, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))", gap: "1px", background: "rgba(255,255,255,0.22)" }, children: [
                    aboutDarkValue("Learner-centred", "We begin with each learner’s questions, pace, context, and potential."),
                    aboutDarkValue("Patient by design", "We make room for mistakes, repetition, and the time it takes to understand."),
                    aboutDarkValue("Dignity-driven", "Every learner deserves respect, encouragement, and a real chance to contribute."),
                    aboutDarkValue("Community-led", "We grow through mentors, families, schools, and partners who share the work."),
                    aboutDarkValue("Practical optimism", "We turn hope into small projects, useful skills, and visible progress."),
                    aboutDarkValue("Open access", "We keep looking for ways to reach learners who are often left behind."),
                ]}),
            ],
        }))),
    ],
});
const aboutProgramCard = (number, title, text, src) => create("article", { style: { minHeight: currentBreakpoint === "desktop" ? "430px" : "auto", background: "#ffffff", border: "1px solid #e5e5e5", overflow: "hidden", boxShadow: "0 10px 28px rgba(33,19,38,0.06)" }, children: [image(src, title, { height: currentBreakpoint === "desktop" ? "225px" : "190px", objectFit: "cover" }), create("div", { style: { padding: "22px" }, children: [create("h3", { text: title, style: { margin: "0 0 8px", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "1.12rem", fontWeight: "700" } }), copy(text, { color: "#707070", fontSize: "0.84rem", fontWeight: "400", lineHeight: "1.55" }), create("a", { attrs: { href: "/programs" }, text: "Explore LEA →", style: { display: "inline-block", marginTop: "16px", color: "#211326", fontSize: "0.78rem", fontWeight: "600", textDecoration: "none" } })] })] });
const aboutStoryCard = (title, text, src) => create("article", { style: { overflow: "hidden", background: "#211326" }, children: [image(src, title, { height: "150px", objectFit: "cover" }), create("div", { style: { padding: "19px" }, children: [create("h3", { text: title, style: { margin: "0 0 8px", color: "#ffffff", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "1.05rem", fontWeight: "700" } }), copy(text, { color: "rgba(255,255,255,0.75)", fontSize: "0.84rem", lineHeight: "1.55" }), create("a", { attrs: { href: "/events" }, text: "Read more →", style: { display: "inline-block", marginTop: "15px", color: "#f89d35", fontSize: "0.76rem", fontWeight: "600", textDecoration: "none" } })] })] });
const aboutDarkValue = (title, text) => create("article", { style: { minHeight: currentBreakpoint === "desktop" ? "178px" : "auto", padding: currentBreakpoint === "desktop" ? "20px 14px" : "18px 12px", background: "#211326", textAlign: "center" }, children: [create("div", { style: { display: "grid", placeItems: "center", width: "42px", height: "42px", margin: "0 auto 14px", border: "1px solid #f89d35", borderRadius: "50%", color: "#f89d35", fontSize: "1.05rem", fontWeight: "600" }, text: aboutValueIcon(title) }), create("h3", { text: title, style: { margin: "0 0 8px", color: "#ffffff", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.92rem", fontWeight: "700", lineHeight: "1.15" } }), copy(text, { color: "rgba(255,255,255,0.7)", fontSize: "0.76rem", lineHeight: "1.45" })] });
const aboutValueIcon = (title) => ({ "Learner-centred": "◉", "Patient by design": "↻", "Dignity-driven": "◇", "Community-led": "⌁", "Practical optimism": "↗", "Open access": "◎" }[title] || "•");
const aboutTestimonials = () => {
    const quotes = [
        ["Learning starts with access", "A first laptop, a first question, and a room where it is safe to try.", "Learner, LEA coding session"],
        ["Confidence grows through practice", "Small projects help learners see that they can make something real.", "Mentor, LEA community"],
        ["Community keeps the door open", "Mentors and peers turn individual progress into shared possibility.", "LEA volunteer"],
    ];
    const quote = create("div", { style: { display: "grid", gap: "12px", minHeight: currentBreakpoint === "desktop" ? "190px" : "220px", alignContent: "center", padding: currentBreakpoint === "desktop" ? "30px 46px" : "26px 22px", borderLeft: "4px solid #f89d35", background: "#f7f5f1" } });
    const renderQuote = (index) => { quote.replaceChildren(create("span", { text: "“", style: { color: "#f89d35", fontSize: "2.4rem", lineHeight: "0.6", fontWeight: "700" } }), create("h3", { text: quotes[index][0], style: { margin: "0", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "1.5rem" : "1.2rem", fontWeight: "700" } }), copy(quotes[index][1], { color: "#666", fontSize: "0.95rem", lineHeight: "1.6" }), create("span", { text: quotes[index][2], style: { color: "#f89d35", fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" } })); };
    renderQuote(0);
    let index = 0;
    window.setInterval(() => { index = (index + 1) % quotes.length; renderQuote(index); }, 5000);
    return section("#ffffff", currentBreakpoint === "desktop" ? "76px 0 82px" : "54px 0 62px", container(create("div", { style: { display: "grid", gap: "26px" }, children: [stack(8, create("span", { text: "FROM THE LEARNING COMMUNITY", style: { color: "#f89d35", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "700", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none", textAlign: "center" } }), create("h2", { text: "Stories of learning in motion.", style: { margin: "0 auto", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2.1rem" : "1.7rem", fontWeight: "700", lineHeight: "1.12", textAlign: "center" } })), quote] })));
};
const aboutChangeStep = (number, title, text) => create("article", { style: { minHeight: currentBreakpoint === "desktop" ? "170px" : "145px", padding: currentBreakpoint === "desktop" ? "22px" : "18px", background: "#ffffff" }, children: [create("h3", { text: title, style: { margin: "0 0 8px", color: "#211326", fontFamily: 'Outfit, Arial, Helvetica, sans-serif', fontSize: "1.05rem", fontWeight: "400" } }), copy(text, { color: "#707070", fontSize: "0.84rem", fontWeight: "400", lineHeight: "1.55" })] });
const aboutCoreValue = (title, text) => create("article", { style: { minHeight: currentBreakpoint === "desktop" ? "140px" : "auto", padding: currentBreakpoint === "desktop" ? "22px" : "18px", background: "#f7f5f1" }, children: [create("h3", { text: title, style: { margin: "0 0 9px", color: "#211326", fontFamily: 'Outfit, Arial, Helvetica, sans-serif', fontSize: "1rem", fontWeight: "400" } }), copy(text, { color: "#707070", fontSize: "0.84rem", fontWeight: "400", lineHeight: "1.55" })] });
const aboutStatement = (title, text) => create("article", {
    style: {
        position: "relative",
        minHeight: currentBreakpoint === "desktop" ? "360px" : "280px",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "#211326",
        border: "0",
    },
    children: [
        image(title === "Mission" ? "images/M2.jpeg" : "images/Happy.jpeg", `${title} — LEA Organization`, {
            position: "absolute",
            inset: "0",
            zIndex: "0",
            objectPosition: "center",
            filter: "brightness(0.72) saturate(1.02)",
        }),
        create("div", { attrs: { "aria-hidden": "true" }, style: { position: "absolute", inset: "0", zIndex: "1", background: "linear-gradient(180deg, rgba(33,19,38,0.04) 24%, rgba(33,19,38,0.92) 100%)" } }),
            create("div", {
                style: { position: "relative", zIndex: "2", display: "grid", gap: "10px", width: "100%", padding: currentBreakpoint === "desktop" ? "28px" : "22px" },
                children: [
                    create("h3", { text: title, style: { margin: "0", color: "#f89d35", fontFamily: 'Outfit, Arial, Helvetica, sans-serif', fontSize: "1.55rem", fontWeight: "400", lineHeight: "1.2" } }),
                copy(text, { color: "rgba(255,255,255,0.86)", fontSize: "0.92rem", fontWeight: "400", lineHeight: "1.65" }),
            ],
        }),
    ],
});
/* Legacy statement styles retained for compatibility with older route data. */
const aboutStatementLegacy = (title, text) => create("article", {
    style: {
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "desktop" ? "90px 1fr" : "1fr",
        alignContent: "start",
        gap: currentBreakpoint === "desktop" ? "26px" : "12px",
        minHeight: currentBreakpoint === "desktop" ? "220px" : "auto",
        padding: currentBreakpoint === "desktop" ? "30px 34px" : "22px",
        background: "#211326",
        border: "1px solid #211326",
    },
    children: [create("h3", { text: title }), copy(text)],
});
const aboutSimpleSections = () => section("#ffffff", currentBreakpoint === "desktop" ? "72px 0 84px" : "50px 0 62px", container(create("div", {
    style: { display: "grid", gap: "24px", textAlign: "center" },
    children: [
        create("span", { text: "Our partners", style: { color: "#2c003e", fontSize: currentBreakpoint === "desktop" ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(2rem, 10vw, 2.65rem)", fontWeight: "500", lineHeight: "1.08", letterSpacing: "-0.03em", textTransform: "none" } }),
        create("h2", { text: "Building stronger learning communities together.", style: { margin: "0 auto", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: currentBreakpoint === "desktop" ? "2rem" : "1.65rem", fontWeight: "500", lineHeight: "1.12", maxWidth: "650px" } }),
        copy("Schools, community centres, mentors, families, and supporters all help make access possible.", { color: "#666", fontSize: "0.94rem", lineHeight: "1.6", maxWidth: "600px", marginInline: "auto" }),
        create("div", { style: { display: "grid", gridTemplateColumns: columns(1, 2, 4), gap: "16px" }, children: [
            partnerLogoCard("Mukuru Slums Development Project", "Community project", "images/msdp_logo.png"),
            partnerLogoCard("TUK", "Academic partner", "images/tuk-logo.jpg"),
            partnerLogoCard("Mogra", "Rescue centre", "images/mogra.png"),
            partnerLogoCard("Volo Technologies Limited", "Technology partner", "images/v1.png"),
        ]}),
    ],
})));
const aboutPartner = (title, text) => create("article", { style: { padding: currentBreakpoint === "desktop" ? "20px" : "16px", background: "#ffffff", textAlign: "left" }, children: [create("h3", { text: title, style: { margin: "0 0 7px", color: "#211326", fontFamily: "Outfit, Arial, Helvetica, sans-serif", fontSize: "0.98rem", fontWeight: "700" } }), copy(text, { color: "#707070", fontSize: "0.8rem", lineHeight: "1.5" })] });
const aboutLightBlock = (title, text) => create("article", {
    style: { minHeight: currentBreakpoint === "desktop" ? "190px" : "auto", padding: currentBreakpoint === "desktop" ? "26px" : "22px", background: "#ffffff" },
    children: [
        create("h3", { text: title, style: { margin: "0 0 12px", color: "#333", fontFamily: 'Outfit, Arial, Helvetica, sans-serif', fontSize: "1.08rem", fontWeight: "400" } }),
        copy(text, { color: "#777", fontSize: "0.9rem", fontWeight: "400", lineHeight: "1.65" }),
    ],
});
const aboutTextLink = (href, text) => create("a", {
    attrs: { href },
    text,
    style: { display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "0 16px", border: "1px solid #999", color: "#444", background: "transparent", fontSize: "0.82rem", fontWeight: "400", textDecoration: "none" },
});
const landingPage = () => {
    const page = modernLandingPage();
    page.appendChild(landingFooter());
    return page;
};
const applyDocumentBase = () => {
    document.title = "LEA Organization";
    document.documentElement.style.setProperty("scroll-behavior", "smooth");
    document.body.style.setProperty("margin", "0");
    document.body.style.setProperty("min-width", "320px");
    document.body.style.setProperty("background", theme.paper);
    document.body.style.setProperty("color", theme.ink);
    document.body.style.setProperty("font-family", "Arial, Helvetica, sans-serif");
    document.body.style.setProperty("font-size", "18px");
    document.body.style.setProperty("line-height", "1.6");
    document.body.style.setProperty("padding-bottom", "78px");
};
function render() {
    currentBreakpoint = breakpoint();
    const app = document.querySelector("#app");
    if (!app)
        return;
    applyDocumentBase();
    const currentPage = pageFromPath();
    const content = currentPage === "home"
        ? landingPage()
        : currentPage === "about"
            ? aboutPage()
            : currentPage === "programs"
                ? programsPage()
        : currentPage === "projects"
            ? projectsPage()
            : currentPage === "project-detail"
                ? projectDetailPage(normalizedRoutePath(window.location.pathname).split("/")[2])
            : currentPage === "events"
                        ? eventsPage()
                        : currentPage === "volunteer"
                            ? volunteerPage()
                            : currentPage === "donate"
                                ? donatePage()
                                : currentPage === "contact"
                                    ? contactPage()
                                    : emptyPage();
    app.replaceChildren(header(currentPage), content);
    if (window.location.hash) {
        window.requestAnimationFrame(() => {
            document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
        });
    }
}
const navigateTo = (url) => {
    if (!isSiteRoute(url.pathname))
        return;
    const path = normalizedRoutePath(url.pathname);
    const nextLocation = `${path}${url.hash}`;
    const currentLocation = `${normalizedRoutePath(window.location.pathname)}${window.location.hash}`;
    menuOpen = false;
    if (nextLocation !== currentLocation) {
        window.history.pushState({}, "", nextLocation);
    }
    render();
};
const handleInternalNavigation = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
    const target = event.target instanceof Element ? event.target.closest("a") : null;
    if (!(target instanceof HTMLAnchorElement))
        return;
    if (target.target || target.hasAttribute("download"))
        return;
    const href = target.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:"))
        return;
    const url = new URL(target.href, window.location.href);
    if (url.origin !== window.location.origin || !isSiteRoute(url.pathname))
        return;
    event.preventDefault();
    navigateTo(url);
};
window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
        const next = breakpoint();
        if (next !== currentBreakpoint)
            menuOpen = false;
        render();
    }, 120);
});
document.addEventListener("DOMContentLoaded", render);
document.addEventListener("click", handleInternalNavigation);
window.addEventListener("popstate", render);
window.addEventListener("hashchange", render);
