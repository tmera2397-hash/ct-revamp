import { useEffect, useRef, useState } from "react";
import stock1 from "./assets/stock1.jpg";
import stock2 from "./assets/stock2.jpg";
import stock3 from "./assets/stock3.jpg";
import stock4 from "./assets/stock4.jpg";
import stock5 from "./assets/stock5.jpg";
import elSoltanoFriday from "./assets/elSoltanoFriday.webp";
import fridayNightFlier from "./assets/fridayNightFlier.webp";
import fridaySaturdaySalsaYBachata from "./assets/fridaySaturdaySalsaYBachata.webp";
import happyHourSpecials from "./assets/happyHourSpecials.webp";
import wedNightSpecial from "./assets/wedNightSpecial.webp";

/* ─── Google Fonts ─── */
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";

/* ─── Intersection-observer reveal hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Design tokens ─── */
const T = {
  gold: "#e8c84a",
  goldAlpha: "rgba(232,200,74,0.15)",
  white: "#fff",
  dim: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.22)",
  border: "rgba(255,255,255,0.07)",
  bg: "#070707",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

/* ─── Reusable eyebrow label ─── */
function Eyebrow({ children, center = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: center ? "center" : "flex-start", marginBottom: 20 }}>
      <div style={{ width: 28, height: 1, background: T.gold, flexShrink: 0 }} />
      <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.33em", textTransform: "uppercase", color: T.gold }}>{children}</span>
      {center && <div style={{ width: 28, height: 1, background: T.gold, flexShrink: 0 }} />}
    </div>
  );
}

/* ─── Nav ─── */
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["About", "#about"], ["Menu", "#menu"], ["Events", "#events"], ["Gallery", "#gallery"], ["Private Events", "#private"]];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px",
        background: scrolled || menuOpen ? "rgba(7,7,7,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "background 0.5s, border-color 0.5s",
      }}>
        {/* Logo */}
        <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, letterSpacing: "0.28em", color: T.white }}>
          CAFÉ <span style={{ color: T.gold }}>CITRON</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center", "@media(max-width:768px)": { display: "none" } }}
          className="desktop-nav">
          {links.map(([label, href]) => (
            <NavLink key={label} href={href}>{label}</NavLink>
          ))}
          <a href="#contact" style={{
            fontFamily: T.sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#000", background: T.gold, padding: "9px 22px", borderRadius: 2,
            textDecoration: "none", fontWeight: 500, transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Reserve</a>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger-btn"
          aria-label="Toggle menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, display: "none", flexDirection: "column",
            gap: 5, alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Three bars that animate into X */}
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 1.5, background: T.white, borderRadius: 2,
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen
                ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, bottom: 0, zIndex: 199,
        background: "rgba(7,7,7,0.98)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 8,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.35s ease",
      }}
        className="mobile-menu"
      >
        {links.map(([label, href], i) => (
          <a key={label} href={href} onClick={closeMenu} style={{
            fontFamily: T.serif, fontSize: 36, fontWeight: 300, color: T.white,
            textDecoration: "none", letterSpacing: "0.05em",
            padding: "12px 0",
            borderBottom: `1px solid ${T.border}`, width: "70%", textAlign: "center",
            transition: `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
          }}
            onMouseEnter={e => e.currentTarget.style.color = T.gold}
            onMouseLeave={e => e.currentTarget.style.color = T.white}
          >{label}</a>
        ))}
        <a href="#contact" onClick={closeMenu} style={{
          fontFamily: T.sans, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "#000", background: T.gold, padding: "15px 40px", borderRadius: 2,
          textDecoration: "none", fontWeight: 500, marginTop: 24,
          transition: `opacity 0.3s ease ${links.length * 60}ms, transform 0.3s ease ${links.length * 60}ms`,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(16px)",
        }}>Reserve a Table</a>
      </div>

      {/* Inject responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      fontFamily: T.sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
      color: hov ? T.gold : T.dim, textDecoration: "none",
      borderBottom: `1px solid ${hov ? T.gold : "transparent"}`,
      paddingBottom: 2, transition: "color 0.2s, border-color 0.2s",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >{children}</a>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ event, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.2s ease",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* close button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 24, right: 28,
          background: "none", border: "none", color: "rgba(255,255,255,0.5)",
          fontSize: 28, cursor: "pointer", lineHeight: 1,
          fontFamily: T.sans, transition: "color 0.2s", zIndex: 1001,
        }}
        onMouseEnter={e => e.currentTarget.style.color = T.gold}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
        aria-label="Close"
      >✕</button>

      {/* card — stop propagation so clicking the card doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          maxWidth: 480, width: "100%",
          animation: "heroFadeUp 0.25s ease",
        }}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            borderRadius: 4,
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            display: "block",
          }}
        />
        {/* meta strip */}
        <div style={{
          marginTop: 20, display: "flex", gap: 24, alignItems: "center",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${T.border}`,
          borderRadius: 3, padding: "12px 24px",
          width: "100%", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: T.sans, fontSize: 9, letterSpacing: "0.28em",
            textTransform: "uppercase", color: T.gold,
            background: "rgba(0,0,0,0.5)", border: `1px solid rgba(232,200,74,0.3)`,
            padding: "4px 10px", borderRadius: 2,
          }}>{event.tag}</span>
          <span style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.white }}>{event.title}</span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.gold }}>{event.day}</span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{event.time}</span>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 14, letterSpacing: "0.1em" }}>
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
}

/* ─── Event card ─── */
function EventCard({ title, day, time, tag, image, delay, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onOpen}
        style={{
          position: "relative", borderRadius: 3,
          background: "#0e0e0e", border: `1px solid ${hov ? "rgba(232,200,74,0.35)" : T.border}`,
          cursor: "pointer", overflow: "hidden",
          transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.6)" : "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {/* Full flyer — natural aspect ratio, fully visible */}
        <div style={{ width: "100%", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
              transform: hov ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>

        {/* Tag badge */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: T.sans, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold,
          background: "rgba(0,0,0,0.72)", border: `1px solid rgba(232,200,74,0.3)`,
          padding: "4px 10px", borderRadius: 2,
        }}>{tag}</div>

        {/* Click-to-expand hint on hover */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          fontFamily: T.sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.65)",
          padding: "4px 10px", borderRadius: 2,
          opacity: hov ? 1 : 0, transition: "opacity 0.25s",
        }}>Click to expand</div>

        {/* Bottom meta */}
        <div style={{
          padding: "14px 18px 18px",
          borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <p style={{
            fontFamily: T.serif, fontSize: 18, fontWeight: 400, color: T.white, margin: 0, lineHeight: 1.2,
          }}>{title}</p>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.gold, letterSpacing: "0.1em", margin: 0 }}>{day}</p>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{time}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Stat({ num, label }) {
  return (
    <div>
      <p style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 300, color: T.gold, lineHeight: 1, margin: 0 }}>{num}</p>
      <p style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T.faint, marginTop: 6 }}>{label}</p>
    </div>
  );
}

function HourRow({ day, hours, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${T.border}`, color: highlight ? T.gold : T.dim }}>
      <span style={{ fontFamily: T.sans, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>{day}</span>
      <span style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 300 }}>{hours}</span>
    </div>
  );
}

/* ════════════════ MAIN APP ════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [lightboxEvent, setLightboxEvent] = useState(null);

  useEffect(() => {
    if (!document.getElementById("cc-fonts")) {
      const l = document.createElement("link");
      l.id = "cc-fonts"; l.rel = "stylesheet"; l.href = FONTS_URL;
      document.head.appendChild(l);
    }
    setTimeout(() => setHeroReady(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const eventCategories = [
    {
      category: "Happy Hour",
      label: "Food & drinks under $10",
      events: [
        { title: "Happy Hour Specials", day: "Wed – Sat", time: "7 PM – 9 PM · Kitchen til 11 PM", tag: "Happy Hour", image: happyHourSpecials },
        { title: "Wednesday Night Special", day: "Wednesday", time: "Late Night Happy Hour 9 PM – 12 AM", tag: "Mid-Week", image: wedNightSpecial },
      ],
    },
    {
      category: "Weekly Nights",
      label: "Our signature recurring events",
      events: [
        { title: "El Sótano Fridays", day: "Friday", time: "Salsa Class 9 PM w/ Orlando Machuca", tag: "Latin Friday", image: elSoltanoFriday },
        { title: "Friday Night", day: "Friday", time: "Happy Hour 7–11 PM · Salsa & Bachata Class 9 PM", tag: "DJ Set", image: fridayNightFlier },
        { title: "Salsa y Bachata", day: "Fri & Sat", time: "Dance Class 9 PM · Kitchen 7–11:30 PM", tag: "Salsa · Bachata", image: fridaySaturdaySalsaYBachata },
      ],
    },
  ];

  const gallery = [
    { img: stock1, style: { gridRow: "1 / 3" } },
    { img: stock2, style: {} },
    { img: stock3, style: {} },
    { img: stock4, style: {} },
    { img: stock5, style: { gridColumn: "2 / 3" } },
    { img: stock1, style: { gridRow: "1 / 3", gridColumn: "3 / 4" } },
  ];

  return (
    <div style={{ background: T.bg, color: T.white, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: ${T.bg}; }
        #root { width: 100%; max-width: 100%; border: none; text-align: left; }
        ::selection { background: rgba(232,200,74,0.25); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; }
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:translateY(0)} 50%{opacity:0.8;transform:translateY(-6px)} }
      `}</style>

      {lightboxEvent && <Lightbox event={lightboxEvent} onClose={() => setLightboxEvent(null)} />}

      <Nav scrolled={scrolled} />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src={stock1} alt="Café Citron" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
          animation: heroReady ? "fadeIn 1.6s ease forwards" : "none", opacity: heroReady ? 1 : 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(0,0,0,0.87) 38%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "32%", background: `linear-gradient(to top, ${T.bg}, transparent)` }} />
        <div style={{
          position: "absolute", left: 56, top: "50%", transform: "translateY(-50%)",
          width: 1, background: `linear-gradient(to bottom, transparent, ${T.gold}60, transparent)`,
          height: heroReady ? 140 : 0, transition: "height 1.2s ease 0.9s",
        }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 90px", maxWidth: 860 }}>
          <div style={{ animation: heroReady ? "heroFadeUp 0.7s ease 0.3s both" : "none", display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 30, height: 1, background: T.gold }} />
            <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.36em", textTransform: "uppercase", color: T.gold }}>Dupont Circle · Washington, DC</span>
          </div>
          <h1 style={{
            animation: heroReady ? "heroFadeUp 0.9s ease 0.5s both" : "none",
            fontFamily: T.serif, fontWeight: 300, lineHeight: 1.01,
            fontSize: "clamp(56px, 9vw, 100px)", letterSpacing: "-0.01em", marginBottom: 28,
          }}>
            Latin food,<br /><em style={{ fontStyle: "italic", color: T.gold }}>live music,</em><br />late nights.
          </h1>
          <p style={{
            animation: heroReady ? "heroFadeUp 0.9s ease 0.7s both" : "none",
            fontFamily: T.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.8,
            color: T.dim, maxWidth: 440, marginBottom: 44,
          }}>
            DC's most beloved Latin kitchen and lounge — authentic food, signature
            cocktails, dancing, and an atmosphere worth remembering.
          </p>
          <div style={{ animation: heroReady ? "heroFadeUp 0.9s ease 0.9s both" : "none", display: "flex", gap: 14 }}>
            {[["Explore Events", "#events", true], ["Reserve a Table", "#contact", false]].map(([label, href, filled]) => (
              <a key={label} href={href} style={{
                fontFamily: T.sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
                color: filled ? "#000" : T.white,
                background: filled ? T.gold : "transparent",
                border: filled ? "none" : "1px solid rgba(255,255,255,0.32)",
                padding: "15px 34px", borderRadius: 2, textDecoration: "none", fontWeight: filled ? 500 : 300,
                transition: "transform 0.25s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >{label}</a>
            ))}
          </div>
        </div>

        <div style={{
          animation: heroReady ? "fadeIn 1s ease 1.5s both" : "none",
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: T.faint }}>Scroll</span>
          <div style={{ width: 1, height: 38, background: `linear-gradient(to bottom, ${T.faint}, transparent)`, animation: "pulse 2.2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ maxWidth: 1240, margin: "0 auto", padding: "110px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <Reveal><Eyebrow>About</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 300, lineHeight: 1.08, marginBottom: 28 }}>
                Authentic Latin<br /><em>since 2002.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: T.dim, marginBottom: 18 }}>
                Nestled in the heart of Dupont Circle, Café Citron has been DC's go-to destination for Latin food, dancing, and late-night energy for over two decades.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.38)" }}>
                Every dish is made fresh — authentic Latin recipes, homemade cocktails, and happy hour deals that keep the neighborhood coming back.
              </p>
            </Reveal>
            <Reveal delay={300} style={{ marginTop: 48 }}>
              <div style={{ display: "flex", gap: 48 }}>
                <Stat num="20+" label="Years Open" />
                <Stat num="4" label="Nights a Week" />
                <Stat num="150" label="Guests Capacity" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: -14, right: -14, width: "100%", height: "100%", border: `1px solid rgba(232,200,74,0.18)`, borderRadius: 4 }} />
              <img src={stock5} alt="Interior" style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 4, display: "block", position: "relative", zIndex: 1 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MENU ══ */}
      <section id="menu" style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "88px 56px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <Eyebrow center>Food & Drinks</Eyebrow>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, lineHeight: 1.1 }}>Made from scratch.<br /><em>Every night.</em></h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: T.border }}>
            {[
              { n: "01", title: "Latin Kitchen", body: "Authentic recipes inspired by grandma's kitchen — fresh homemade dishes served until 11 PM, Wednesday through Saturday." },
              { n: "02", title: "Cocktails & Happy Hour", body: "Signature mojitos, margaritas, and craft cocktails. Happy Hour runs 7–9 Fri & Sat, 8–10 Wed & Thu — food & drinks under $10." },
              { n: "03", title: "Bottle Service", body: "Elevate your night with premium table packages. Reserve the top floor for groups up to 80, or the main floor for exclusive buyouts." },
            ].map(({ n, title, body }, i) => (
              <Reveal key={n} delay={i * 100}>
                <div style={{ background: T.bg, padding: "44px 36px" }}>
                  <p style={{ fontFamily: T.serif, fontSize: 11, color: T.gold, letterSpacing: "0.22em", marginBottom: 18 }}>{n}</p>
                  <h3 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, marginBottom: 14, lineHeight: 1.2, color: T.white }}>{title}</h3>
                  <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.82, color: "rgba(255,255,255,0.48)" }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EVENTS ══ */}
      <section id="events" style={{ maxWidth: 1240, margin: "0 auto", padding: "110px 56px" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <div>
              <Eyebrow>Weekly Events</Eyebrow>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300 }}>Nights worth<br /><em>staying for.</em></h2>
            </div>
            <a href="#contact" style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold, textDecoration: "none", borderBottom: `1px solid rgba(232,200,74,0.35)`, paddingBottom: 3 }}>Reserve a Table →</a>
          </div>
        </Reveal>

        {/* Category tabs */}
        {eventCategories.map((cat, catIdx) => (
          <div key={cat.category} style={{ marginBottom: catIdx < eventCategories.length - 1 ? 64 : 0 }}>
            {/* Category header */}
            <Reveal delay={catIdx * 60}>
              <div style={{
                display: "flex", alignItems: "center", gap: 20, marginBottom: 28,
                paddingBottom: 18, borderBottom: `1px solid ${T.border}`,
              }}>
                <div style={{ width: 3, height: 36, background: T.gold, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.white, lineHeight: 1 }}>{cat.category}</p>
                  <p style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.16em", color: T.faint, marginTop: 5, textTransform: "uppercase" }}>{cat.label}</p>
                </div>
              </div>
            </Reveal>

            {/* Cards — 2-up for Happy Hour, 3-up for Weekly Nights */}
            <div style={{
              display: "grid",
              gridTemplateColumns: cat.events.length === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: 18,
            }}>
              {cat.events.map((ev, i) => (
                <EventCard key={ev.title} {...ev} delay={catIdx * 60 + i * 110} onOpen={() => setLightboxEvent(ev)} />
              ))}
            </div>
          </div>
        ))}

        {/* Happy hour callout bar */}
        <Reveal delay={200}>
          <div style={{
            marginTop: 40, padding: "26px 32px", border: `1px solid ${T.border}`, borderRadius: 3,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "rgba(232,200,74,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 1, height: 36, background: T.gold, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>Happy Hour Deal</p>
                <p style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 300, color: T.white }}>Food & drinks under $10 · Wed & Thu 9 PM–12 AM · Fri & Sat 7–9 PM · $10 house drinks, $7 beers, $8 shots</p>
              </div>
            </div>
            <a href="#contact" style={{
              fontFamily: T.sans, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#000", background: T.gold, padding: "11px 24px", borderRadius: 2, textDecoration: "none", fontWeight: 500, flexShrink: 0,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Book Now</a>
          </div>
        </Reveal>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="gallery" style={{ background: "rgba(255,255,255,0.015)", borderTop: `1px solid ${T.border}`, padding: "88px 56px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44 }}>
              <div>
                <Eyebrow>Gallery</Eyebrow>
                <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300 }}>Feel the atmosphere.</h2>
              </div>
              <a href="https://instagram.com/cafecitron" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: T.faint, textDecoration: "none", borderBottom: `1px solid rgba(255,255,255,0.12)`, paddingBottom: 3, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.gold}
                onMouseLeave={e => e.currentTarget.style.color = T.faint}
              >@cafecitron →</a>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "245px 245px", gap: 10 }}>
            {gallery.map(({ img, style }, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{ overflow: "hidden", borderRadius: 3, background: "#111", height: "100%", ...style }}>
                  <img src={img} alt={`Gallery ${i + 1}`} style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRIVATE EVENTS ══ */}
      <section id="private" style={{ maxWidth: 1240, margin: "0 auto", padding: "110px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <img src={stock3} alt="Private events" style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 3, display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", borderRadius: 3 }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", gap: 24 }}>
                {[["Up to", "150", "Guests"], ["No", "Room", "Fee"], ["Sun–Sat", "Available", ""]].map(([pre, num, suf], i) => (
                  <div key={i} style={{ textAlign: "center", flex: 1 }}>
                    <p style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>{pre}</p>
                    <p style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 300, color: T.white, lineHeight: 1 }}>{num}</p>
                    <p style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.faint, marginTop: 4 }}>{suf}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal><Eyebrow>Private Events</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px, 3.5vw, 50px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>
                Your group.<br /><em>Our space.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: T.dim, marginBottom: 18 }}>
                Host your next event at Café Citron — no room fee, just a per-person minimum spend. Reserve the top floor for up to 80 guests, or take over the entire main floor for exclusive buyouts.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.38)", marginBottom: 40 }}>
                Available for birthday parties, corporate events, and special occasions Sunday through Saturday — day or night.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <a href="mailto:info@cafecitrondc.com" style={{
                fontFamily: T.sans, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
                color: "#000", background: T.gold, padding: "14px 30px", borderRadius: 2,
                textDecoration: "none", fontWeight: 500, display: "inline-block",
                transition: "transform 0.25s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >Inquire About Private Events</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ HOURS + CONTACT ══ */}
      <section id="contact" style={{ borderTop: `1px solid ${T.border}`, background: "rgba(255,255,255,0.013)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "88px 56px" }}>

          {/* Top row — Hours + Location */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 72 }}>

            {/* Hours */}
            <Reveal>
              <div>
                <Eyebrow>Hours</Eyebrow>
                <h2 style={{ fontFamily: T.serif, fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 300, marginBottom: 32 }}>When we're open.</h2>
                {[
                  ["Monday", "Closed", false],
                  ["Tuesday", "Closed", false],
                  ["Wednesday", "8 PM – 2 AM", true],
                  ["Thursday", "8 PM – 2 AM", true],
                  ["Friday", "7 PM – 3 AM", true],
                  ["Saturday", "7 PM – 3 AM", true],
                  ["Sunday", "Closed", false],
                ].map(([day, hours, hl]) => <HourRow key={day} day={day} hours={hours} highlight={hl} />)}
                {/* Holiday note */}
                <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(232,200,74,0.05)", border: `1px solid rgba(232,200,74,0.15)`, borderRadius: 3 }}>
                  <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                    Closed Thanksgiving Thursday · Closed Christmas Eve Wednesday · Closed New Year's Day Thursday
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Location */}
            <Reveal delay={120}>
              <div>
                <Eyebrow>Find Us</Eyebrow>
                <h2 style={{ fontFamily: T.serif, fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 300, marginBottom: 32 }}>Visit us tonight.</h2>
                <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 300, color: T.dim, lineHeight: 1.8, marginBottom: 6 }}>
                  Heart of Dupont Circle<br />
                  1343 Connecticut Ave NW<br />
                  Washington, DC 20036
                </p>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
                  Across from Dupont Circle Metro · South side exit
                </p>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>
                  For more info and reservations text
                </p>

                {/* Phone numbers */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
                  <a href="tel:+12025308844" style={{ fontFamily: T.serif, fontSize: 24, color: T.gold, textDecoration: "none" }}>(202) 530-8844</a>
                  <a href="tel:+12024223005" style={{ fontFamily: T.serif, fontSize: 18, color: "rgba(232,200,74,0.65)", textDecoration: "none" }}>(202) 422-3005 · Reservations</a>
                </div>

                {/* Social icons */}
                <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                  {[
                    { label: "Facebook", href: "https://facebook.com/CafeCitron", icon: "f" },
                    { label: "Yelp", href: "#", icon: "✦" },
                    { label: "Instagram", href: "https://instagram.com/cafecitron", icon: "◎" },
                  ].map(({ label, href, icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      title={label}
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: `1px solid ${T.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: T.faint, textDecoration: "none", fontSize: 14,
                        fontFamily: T.sans, transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.faint; }}
                    >{icon}</a>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
                  <a href="https://maps.google.com/?q=1343+Connecticut+Ave+NW+Washington+DC" target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: T.sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "#000", background: T.gold, padding: "14px 28px", borderRadius: 2,
                    textDecoration: "none", fontWeight: 500, textAlign: "center", transition: "opacity 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >Get Directions</a>
                  <a href="sms:+12024223005" style={{
                    fontFamily: T.sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: T.white, background: "transparent", border: `1px solid ${T.border}`, padding: "14px 28px", borderRadius: 2,
                    textDecoration: "none", fontWeight: 300, textAlign: "center", transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
                  >Text to Reserve · (202) 422-3005</a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom row — Private Events info cards */}
          <Reveal delay={80}>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 56 }}>
              <div style={{ marginBottom: 32 }}>
                <Eyebrow>Private Events & Rentals</Eyebrow>
                <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300 }}>Book the space for your group.</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: T.border }}>
                {[
                  {
                    title: "Sun, Mon & Tue",
                    tag: "Full Venue Buyout",
                    lines: [
                      "Main floor available for private events",
                      "Minimum spend $3,000",
                      "Text (202) 422-3005 to reserve",
                    ],
                  },
                  {
                    title: "Wed & Thu",
                    tag: "Private Happy Hour",
                    lines: [
                      "Private happy hour packages",
                      "Minimum $800 for 2 hours",
                      "Groups of 10 or more welcome",
                    ],
                  },
                  {
                    title: "Any Day",
                    tag: "Rooms & Groups",
                    lines: [
                      "Rooms available for large groups (10+)",
                      "No room fee — spend minimum only",
                      "Salsa lessons available Fri & Sat 9–10 PM",
                    ],
                  },
                ].map(({ title, tag, lines }) => (
                  <div key={title} style={{ background: T.bg, padding: "36px 32px" }}>
                    <p style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, marginBottom: 10 }}>{tag}</p>
                    <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.white, marginBottom: 20, lineHeight: 1.2 }}>{title}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {lines.map((line, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.gold, flexShrink: 0, marginTop: 7 }} />
                          <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{line}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Salsa + kitchen info strip */}
              <div style={{
                marginTop: 1, background: "rgba(232,200,74,0.04)",
                border: `1px solid rgba(232,200,74,0.12)`, borderRadius: "0 0 3px 3px",
                padding: "20px 32px", display: "flex", gap: 40, flexWrap: "wrap",
              }}>
                {[
                  "🎵  Salsa lessons Fri & Sat · 9 PM – 10 PM",
                  "💃  Salsa social dance · 10 PM – 11 PM",
                  "🍽️  Dinner served 7 PM – 11 PM · Transforms to nightclub at 10 PM",
                ].map((item, i) => (
                  <p key={i} style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: "32px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: T.serif, fontSize: 17, letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)" }}>
          CAFÉ <span style={{ color: T.gold }}>CITRON</span>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.18)" }}>
          © 2026 Café Citron · 1343 Connecticut Ave NW, Washington DC
        </p>
        <div style={{ display: "flex", gap: 22 }}>
          {[
            { label: "Instagram", href: "https://instagram.com/cafecitron" },
            { label: "Facebook", href: "https://facebook.com/CafeCitron" },
            { label: "Yelp", href: "https://yelp.com/biz/café-citron-washington-4" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = T.gold}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
            >{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}