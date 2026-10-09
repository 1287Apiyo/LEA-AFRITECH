/* ─────────────────────────────────────────────────────────────
   LEA Organization — Landing Page
   Structural clone of vitalvoices.org adapted for LEA
   ───────────────────────────────────────────────────────────── */

const css = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
/* ── Global reset ─────────────────────────────────── */
.vv{all:initial;display:block;font-family:Outfit,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1a1a1a;background:#fff}
.vv *,.vv *::before,.vv *::after{box-sizing:border-box;margin:0;padding:0}
.vv img{display:block;max-width:100%;height:auto}
.vv a{color:inherit;text-decoration:none}
.vv button{cursor:pointer;font-family:inherit;border:none;background:none}

/* ── Layout helpers ───────────────────────────────── */
.vv-container{width:min(1160px,calc(100% - 48px));margin-inline:auto}
.vv-container-wide{width:min(1400px,calc(100% - 48px));margin-inline:auto}

/* ── HERO — full-bleed image slider (supamamas style) ─ */
.vv-hero{position:relative;width:100%;height:calc(100svh - 82px);min-height:690px;max-height:940px;overflow:hidden;background:#2c003e;border-radius:0;padding:34px clamp(18px,5vw,72px)}.vv-hero:before{content:"";position:absolute;inset:0 auto 0 0;width:28%;height:100%;background:#f89d35;border-radius:0;transform:none;opacity:.96}.vv-hero:after{content:"";position:absolute;right:0;bottom:0;width:38%;height:18%;background:rgba(248,157,53,.18);border-radius:0;transform:none}
/* Each slide: absolute, full cover */
.vv-slide{position:absolute;top:34px;right:clamp(18px,5vw,72px);bottom:34px;left:clamp(18px,5vw,72px);opacity:0;transition:opacity 1s ease;pointer-events:none;background:#fff;border-radius:0;overflow:hidden;box-shadow:0 28px 70px rgba(0,0,0,.2)}
.vv-slide.is-active{opacity:1;pointer-events:auto;z-index:1}
/* Photo layer */
.vv-slide-photo{position:absolute;top:0;right:0;bottom:0;left:48%;z-index:0;overflow:hidden;border-radius:0;box-shadow:none}
.vv-slide-photo img{width:100%;height:100%;object-fit:cover;object-position:center 42%}
/* Dark gradient scrim — heavier at bottom, lighter at top */
.vv-slide-scrim{position:absolute;top:0;right:0;bottom:0;left:48%;z-index:1;border-radius:0 24px 24px 0;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(44,0,62,.18))}
/* Content — vertically centred, left-aligned */
.vv-slide-content{position:absolute;top:0;right:52%;bottom:0;left:0;z-index:2;display:flex;align-items:center;padding:0 clamp(28px,5vw,84px);background:#fff}
.vv-slide-inner{max-width:720px;width:100%}
/* Category pill */
.vv-slide-tag{display:inline-block;margin-bottom:20px;padding:0;background:transparent;color:#f89d35;font-family:Arial,Helvetica,sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
/* Heading */
.vv-slide h1{position:relative;font-size:clamp(2rem,4vw,4rem);line-height:1.04;font-weight:500;color:#2c003e;margin:0 0 20px;max-width:680px;text-shadow:none}
.vv-slide h1:after{display:none}
.vv-slide-map .vv-slide-tag,.vv-slide-reverse .vv-slide-tag{color:#111}
.vv-slide-overlay .vv-slide-tag{color:#f89d35}
.vv-programs-heading-orange{color:#f89d35!important}
/* Sub text */
.vv-slide-body{color:#55475b;font-size:clamp(.9rem,1.2vw,1rem);line-height:1.64;max-width:580px;font-family:Arial,Helvetica,sans-serif;margin-bottom:32px;text-shadow:none}
/* CTA row */
.vv-slide-ctas{display:flex;flex-wrap:wrap;gap:18px}.vv-slide-ctas .vv-btn,.vv-slide-ctas .vv-btn-gold,.vv-slide-ctas .vv-btn-outline-white{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 24px;border-radius:999px;background:#f89d35!important;border:1px solid #f89d35!important;color:#2c003e!important;line-height:1.2;white-space:nowrap}.vv-slide-ctas .vv-btn:hover{background:#2c003e!important;border-color:#2c003e!important;color:#fff!important}
/* Prev / Next arrows — large, semi-transparent */
.vv-hero-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:46px;height:46px;display:grid;place-items:center;background:rgba(255,255,255,.14);border:2px solid rgba(255,255,255,.4);border-radius:50%;color:#fff;font-size:1.5rem;line-height:1;cursor:pointer;transition:background .2s,border-color .2s,transform .2s}
.vv-hero-arrow:hover{background:rgba(248,157,53,.92);border-color:#f89d35;transform:translateY(-50%) scale(1.08)}
.vv-hero-arrow-prev{left:clamp(12px,3vw,32px)}
.vv-hero-arrow-next{right:clamp(12px,3vw,32px)}
/* Dots — bottom centre */
.vv-dots{position:absolute;bottom:clamp(100px,14vw,130px);left:50%;transform:translateX(-50%);z-index:10;display:flex;gap:10px;align-items:center}
.vv-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.38);border:2px solid rgba(255,255,255,.5);cursor:pointer;padding:0;transition:background .22s,transform .22s,border-color .22s}
.vv-dot.is-active{background:#f89d35;border-color:#f89d35;transform:scale(1.35)}
/* Slide counter — bottom right of hero */
.vv-slide-counter{position:absolute;bottom:clamp(104px,14vw,134px);right:clamp(22px,4vw,52px);z-index:10;font-family:Arial,Helvetica,sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.5)}
.vv-slide-counter{bottom:54px}.vv-dots{bottom:54px}
.vv-slide-map .vv-slide-photo{left:42%;background:transparent;box-shadow:none}.vv-slide-map .vv-slide-photo img{width:100%;height:100%;object-fit:contain;object-position:center center}.vv-slide-map .vv-slide-scrim{left:42%;background:transparent}.vv-slide-map .vv-slide-content{right:54%}.vv-slide-map .vv-slide h1{max-width:500px}
.vv-slide-programs .vv-slide-photo{left:53%;right:0;top:4%;bottom:2%;background:#f89d35;box-shadow:none;overflow:hidden;clip-path:none;mask-image:url("/images/kenya-mask.svg");mask-size:contain;mask-position:center right;mask-repeat:no-repeat;-webkit-mask-image:url("/images/kenya-mask.svg");-webkit-mask-size:contain;-webkit-mask-position:center right;-webkit-mask-repeat:no-repeat}
.vv-slide-programs .vv-slide-photo:before{display:none}
.vv-slide-programs .vv-slide-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;clip-path:none}
.vv-slide-programs .vv-slide-scrim{display:none}
.vv-slide-programs .vv-slide-content{right:52%;background:#fff}
 .vv-slide-programs .vv-slide-tag,.vv-slide-programs .vv-slide h1,.vv-slide-programs .vv-programs-heading-orange,.vv-slide-programs .vv-slide-body{color:#2c003e!important}

.vv-slide-overlay .vv-slide-photo{top:0;right:0;bottom:0;left:0;border-radius:0;box-shadow:none}.vv-slide-overlay .vv-slide-scrim{top:0;right:0;bottom:0;left:0;border-radius:24px;background:linear-gradient(90deg,rgba(44,0,62,.95) 0%,rgba(44,0,62,.7) 42%,rgba(44,0,62,.08) 78%)}.vv-slide-overlay .vv-slide-content{top:0;right:42%;bottom:0;left:0;background:transparent}.vv-slide-overlay .vv-slide h1,.vv-slide-overlay .vv-slide-body{color:#fff}.vv-slide-overlay .vv-slide h1:after{background:#f89d35}.vv-slide-reverse .vv-slide-photo{left:0;right:48%;border-radius:0;box-shadow:none}.vv-slide-reverse .vv-slide-scrim{left:0;right:48%;border-radius:24px 0 0 24px;background:linear-gradient(90deg,rgba(44,0,62,.28),rgba(44,0,62,.42))}.vv-slide-reverse .vv-slide-content{left:48%;right:0;background:#fff;padding-left:clamp(28px,5vw,84px)}.vv-slide-reverse .vv-slide-inner{max-width:520px}.vv-slide-reverse .vv-slide h1{font-size:clamp(1.8rem,3.4vw,3.3rem)}
.vv-slide,.vv-slide-photo,.vv-slide-scrim{border-radius:0!important}
/* ── IMPACT STRIP — immediately below hero ── */
 .vv-impact-strip{display:grid;grid-template-columns:repeat(4,1fr);width:calc(100% - clamp(36px,10vw,144px));margin:0 auto;padding:30px clamp(18px,5vw,72px) 28px;border-bottom:1px solid rgba(44,0,62,.12);background:#fff}
.vv-impact-item{display:grid;grid-template-columns:42px 1fr;gap:14px;align-items:start;padding:0 26px;border-right:1px solid rgba(44,0,62,.12)}
.vv-impact-item:first-child{padding-left:0}.vv-impact-item:last-child{padding-right:0;border-right:0}
.vv-impact-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:#f89d35;color:#2c003e}.vv-impact-icon svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.vv-impact-item h3{font-size:.92rem;line-height:1.15;font-weight:700;color:#2c003e;margin-bottom:6px}.vv-impact-item p{font-family:Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.45;color:#665b6b}
/* ── STAT STRIP — overlaps bottom of hero ── */
.vv-stat-strip{display:none;position:absolute;bottom:0;left:0;right:0;z-index:10;display:grid;grid-template-columns:repeat(4,1fr);background:rgba(10,6,18,.82);backdrop-filter:blur(10px);border-top:3px solid #f89d35}
.vv-stat-strip-item{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(14px,2.5vw,22px) clamp(10px,2vw,24px);border-right:1px solid rgba(255,255,255,.1);text-align:center}
.vv-stat-strip-item:last-child{border-right:0}
.vv-stat-strip-num{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:#f89d35;line-height:1;letter-spacing:-.03em}
.vv-stat-strip-label{margin-top:5px;font-family:Arial,Helvetica,sans-serif;font-size:clamp(.68rem,.9vw,.8rem);font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.62)}
/* ── POST-HERO FEATURE SECTION ─────────────────────── */
 .vv-post-hero{width:calc(100% - clamp(36px,10vw,144px));margin:0 auto;background:#fff;color:#2c003e}.vv-post-hero-story{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;background:#fff}.vv-post-hero-image{position:relative;min-height:330px;overflow:hidden;background:#f3eee7}.vv-post-hero-image video{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;object-position:center center;display:block}.vv-video-play{position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);width:76px;height:76px;border:0;border-radius:50%;background:#fff;color:#2c003e;font-size:1.8rem;line-height:1;cursor:pointer;pointer-events:auto;box-shadow:0 8px 24px rgba(44,0,62,.28);transition:transform .18s ease,opacity .18s ease}.vv-video-play:hover{transform:translate(-50%,-50%) scale(1.08)}.vv-video-play.is-hidden{opacity:0;pointer-events:none}.vv-post-hero-copy{padding:clamp(34px,5vw,68px) clamp(28px,6vw,84px);display:flex;flex-direction:column;justify-content:center}.vv-post-hero-kicker{font-family:Outfit,Arial,sans-serif;font-size:clamp(2.25rem,4vw,3.25rem);font-weight:700;letter-spacing:-.03em;line-height:1.08;text-transform:none;color:#2c003e;margin-bottom:18px}.vv-post-hero-copy h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2.2vw,2rem);font-weight:400;line-height:1.16;color:#2c003e;margin-bottom:15px}.vv-post-hero-copy p{font-family:Arial,Helvetica,sans-serif;font-size:.86rem;line-height:1.65;color:#5e5362;max-width:530px;margin-bottom:18px}.vv-post-hero-link{align-self:flex-start;padding:12px 18px;background:#f89d35;color:#211326;font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase}.vv-post-hero-link:hover{background:#2c003e;color:#fff}.vv-post-hero-stats{display:grid;grid-template-columns:repeat(4,1fr);width:100%;margin:0;padding:34px clamp(24px,6vw,96px) 38px;background:#fff;border-top:1px solid #e8e1d7;border-bottom:1px solid #e8e1d7}.vv-post-hero-stat{padding:0 clamp(18px,2.5vw,34px);border-right:1px solid #e8e1d7}.vv-post-hero-stat:first-child{padding-left:0}.vv-post-hero-stat:last-child{padding-right:0;border-right:0}.vv-post-hero-stat strong{display:block;font-size:1.9rem;font-weight:500;line-height:1;color:#2c003e}.vv-post-hero-stat span{display:block;margin-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:#5e5362}.vv-post-hero-stat p{margin-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:.72rem;line-height:1.4;color:#766c76}.vv-post-hero-programs{padding:42px 0 46px;background:#fff}.vv-post-hero-programs h2{text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:clamp(1.65rem,3vw,2.35rem);font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:10px;color:#2c003e}.vv-post-hero-programs-intro{max-width:640px;margin:0 auto 28px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:.94rem;line-height:1.55;color:#665b6b}.vv-post-hero-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;width:100%;margin:0}.vv-post-hero-card{position:relative;min-height:360px;overflow:hidden;background:#2c003e;color:#fff}.vv-post-hero-card img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;opacity:.7}.vv-post-hero-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 18%,rgba(44,0,62,.94))}.vv-post-hero-card-copy{position:absolute;z-index:1;left:18px;right:18px;bottom:16px}.vv-post-hero-card-copy span{font-family:Arial,Helvetica,sans-serif;font-size:.62rem;color:#f89d35;letter-spacing:.08em}.vv-post-hero-card h3{font-size:1.02rem;font-weight:500;line-height:1.15;margin-top:4px}.vv-post-hero-card p{font-family:Arial,Helvetica,sans-serif;font-size:.76rem;line-height:1.48;color:rgba(255,255,255,.9);margin-top:7px}
/* ── GET INVOLVED ───────────────────────────────────── */
 .vv-involve{position:relative;width:calc(100% - clamp(36px,10vw,144px));margin:0 auto;padding:58px 0 64px;background:#fff;color:#2c003e;text-align:center;overflow:hidden}.vv-involve h2{font-family:Outfit,Arial,sans-serif;font-size:clamp(2.25rem,4vw,3.25rem);font-weight:700;line-height:1.08;letter-spacing:-.03em;text-transform:none;color:#2c003e;margin-bottom:12px}.vv-involve-intro{font-family:Arial,Helvetica,sans-serif;font-size:.94rem;line-height:1.55;color:#665b6b;max-width:620px;margin:0 auto 34px}.vv-involve-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;text-align:left}.vv-involve-card{position:relative;display:flex;flex-direction:column;min-height:430px;padding:0 18px 22px;background:#fff;border:1px solid #e5ded4;color:#2c003e;box-shadow:0 8px 20px rgba(44,0,62,.07);overflow:hidden}.vv-involve-card:before{display:none}.vv-involve-card-image{position:relative;z-index:0;width:calc(100% + 36px);height:190px;margin-left:-18px;object-fit:cover;display:block;filter:none;transform:none}.vv-involve-card > *:not(.vv-involve-card-image){position:relative;z-index:2}.vv-involve-number{display:block;margin-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.12em;color:#2c003e}.vv-involve-card h3{font-size:1.14rem;font-weight:700;margin:8px 0 7px}.vv-involve-card p{font-family:Arial,Helvetica,sans-serif;font-size:.78rem;line-height:1.5;color:#665b6b;margin:0 0 18px}.vv-involve-button{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;margin-top:auto;min-height:40px;padding:0 15px;background:#f89d35;color:#2c003e;font-family:Arial,Helvetica,sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border:1px solid #f89d35}

.vv-post-hero-programs{margin-top:clamp(30px,4vw,48px);margin-bottom:clamp(42px,5vw,68px);padding:48px 0 54px;background:#fff}.vv-post-hero-programs h2{text-align:center;font-family:Outfit,Arial,sans-serif;font-size:clamp(2.25rem,4vw,3.25rem);font-weight:700;line-height:1.08;letter-spacing:-.03em;text-transform:none;margin-bottom:10px;color:#2c003e}.vv-post-hero-programs h2 .vv-heading-purple{color:#2c003e}.vv-post-hero-programs h2 .vv-heading-orange{color:#f89d35}.vv-post-hero-programs-intro{max-width:650px;margin:0 auto 28px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:.94rem;line-height:1.65;color:#665b6b}.vv-post-hero-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;width:100%;max-width:1180px;margin:0 auto}.vv-post-hero-card{position:relative;min-height:190px;overflow:visible;background:transparent;color:#2c003e;border-top:1px solid #d9d0c7;padding-top:24px}.vv-post-hero-card img{display:none}.vv-post-hero-card:after{display:none}.vv-post-hero-card-copy{position:relative;z-index:1;left:auto;right:auto;bottom:auto}.vv-post-hero-card-copy span{position:absolute;top:-1.6em;left:0;z-index:2;padding:0 10px 0 0;background:#fff;font-family:Outfit,Arial,sans-serif;font-size:clamp(2rem,3vw,2.8rem);line-height:1;color:#2c003e;letter-spacing:-.04em}.vv-post-hero-card h3{font-size:1rem;font-weight:700;line-height:1.2;margin-top:20px;color:#2c003e}.vv-post-hero-card p{font-family:Arial,Helvetica,sans-serif;font-size:.76rem;line-height:1.55;color:#665b6b;margin-top:10px}.vv-post-hero-story{margin-top:clamp(48px,6vw,76px);margin-bottom:clamp(42px,5vw,68px)}
.vv-slide h1,.vv-impact-item h3,.vv-post-hero-programs h2,.vv-post-hero-card h3,.vv-involve h2,.vv-involve-card h3,.vv-learning-collage h2{font-weight:500}
.vv-post-hero-stats{margin-bottom:clamp(48px,6vw,76px)}
.vv-learning-collage{display:grid;grid-template-columns:1fr 1fr;gap:clamp(42px,7vw,104px);align-items:center;padding:96px clamp(22px,7vw,104px);background:#fff;color:#2c003e}.vv-learning-collage-copy{max-width:510px}.vv-learning-collage-kicker{display:block;font-family:Outfit,Arial,sans-serif;font-size:.68rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#f89d35;margin-bottom:16px}.vv-learning-collage h2{font-family:Outfit,Arial,sans-serif;font-size:clamp(2rem,3.5vw,3.3rem);line-height:1.05;letter-spacing:-.03em;color:#2c003e;margin-bottom:22px}.vv-learning-collage p{font-family:Arial,Helvetica,sans-serif;font-size:.9rem;line-height:1.7;color:#665b6b;max-width:470px}.vv-learning-collage-note{display:flex;gap:12px;align-items:flex-start;margin-top:28px;padding-top:18px;border-top:1px solid #ded5ca;font-family:Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5;color:#665b6b}.vv-learning-collage-note strong{color:#2c003e}.vv-testimonial-stage{position:relative;min-height:430px;background:#f8f5ef;overflow:hidden}.vv-testimonial-image{width:100%;height:270px;object-fit:cover;display:block;transition:opacity .18s}.vv-testimonial-card{position:absolute;left:26px;right:26px;bottom:24px;padding:24px 26px;background:#2c003e;color:#fff;box-shadow:0 14px 28px rgba(44,0,62,.16)}.vv-testimonial-card blockquote{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.05rem,1.7vw,1.35rem);line-height:1.35;color:#fff;margin:0 0 14px}.vv-testimonial-card cite{font-family:Outfit,Arial,sans-serif;font-style:normal;font-size:.66rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:#f89d35}.vv-testimonial-dots{display:flex;gap:6px;margin-top:18px}.vv-testimonial-dot{width:22px;height:3px;background:rgba(255,255,255,.35);border:0;padding:0}.vv-testimonial-dot.is-active{background:#f89d35}
.vv-footer.site-floating-footer{background:#2c003e!important;color:#fff!important;border-top:0!important;box-shadow:0 -8px 24px rgba(44,0,62,.16)!important}.vv-footer.site-floating-footer .vv-footer-quote{color:rgba(255,255,255,.84)!important}.vv-footer.site-floating-footer .vv-footer-copy{color:#fff!important}
/* ── SUPPORT VALUES — CORE VALUES / SOCIAL PROOF STYLE ── */
.vv-learning-collage{display:grid;grid-template-columns:1fr;gap:28px;align-items:stretch;padding:clamp(62px,7vw,82px) clamp(22px,7vw,104px);background:#211326;color:#fff;overflow:hidden}
.vv-learning-values-head{display:grid;gap:16px;max-width:780px;margin:0 auto;text-align:center}
.vv-learning-collage-kicker{display:flex;align-items:center;justify-content:center;gap:10px;margin:0;color:#f89d35;font-family:Outfit,Arial,sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.vv-learning-collage-kicker:before,.vv-learning-collage-kicker:after{content:"";width:34px;height:1px;background:#f89d35}
.vv-learning-collage h2{margin:0;color:#fff;font-family:Outfit,Arial,sans-serif;font-size:clamp(2.25rem,4vw,3.25rem);font-weight:500;line-height:1.08;letter-spacing:-.03em}
.vv-learning-collage h2 em{font-style:normal;color:#f89d35}
.vv-learning-values-head p{max-width:620px;margin:0 auto;color:rgba(255,255,255,.75);font-family:Outfit,Arial,sans-serif;font-size:.94rem;font-weight:400;line-height:1.65}
.vv-learning-values-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;max-width:1180px;width:100%;margin:12px auto 0;background:rgba(255,255,255,.2)}
.vv-learning-value{min-height:190px;padding:26px 24px;background:#211326;border:1px solid rgba(255,255,255,.2)}
.vv-learning-value-number{display:block;margin-bottom:22px;color:#f89d35;font-family:Outfit,Arial,sans-serif;font-size:.92rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.vv-learning-value h3{margin:0 0 10px;color:#fff;font-family:Outfit,Arial,sans-serif;font-size:1.08rem;font-weight:700;line-height:1.2}
.vv-learning-value p{margin:0;color:rgba(255,255,255,.7);font-family:Outfit,Arial,sans-serif;font-size:.84rem;font-weight:400;line-height:1.58}
.vv-learning-value-role{display:block;margin-top:18px;color:#f89d35;font-family:Outfit,Arial,sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.vv-learning-belief{display:flex;justify-content:center;align-items:flex-start;gap:14px;max-width:680px;margin:12px auto 0;padding-top:18px;border-top:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.72);font-family:Outfit,Arial,sans-serif;font-size:.82rem;line-height:1.55;text-align:left}
.vv-learning-belief strong{flex-shrink:0;color:#f89d35;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase}
@media(max-width:800px){.vv-learning-collage{gap:24px;padding:56px 22px 68px}.vv-learning-values-grid{grid-template-columns:1fr;gap:1px}.vv-learning-value{min-height:0;padding:22px}.vv-learning-belief{display:grid;gap:8px}}
/* ── RESPONSIVE ── */
@media(max-width:800px){.vv-learning-collage{grid-template-columns:1fr;padding:68px 22px 92px}.vv-testimonial-stage{min-height:390px;margin-top:14px}.vv-testimonial-image{height:250px}.vv-testimonial-card{left:16px;right:16px;bottom:-28px;padding:20px}.vv-testimonial-card blockquote{font-size:1rem}}
@media(max-width:800px){.vv-learning-collage{grid-template-columns:1fr;padding:68px 22px}.vv-testimonial-stage{min-height:390px;margin-top:10px}.vv-testimonial-image{height:230px}.vv-testimonial-card{left:16px;right:16px;bottom:16px;padding:20px}.vv-testimonial-card blockquote{font-size:1rem}.vv-post-hero-grid{grid-template-columns:repeat(2,1fr);gap:14px}}
@media(max-width:800px){.vv-learning-collage{display:grid;grid-template-columns:1fr 1fr;gap:clamp(42px,7vw,104px);align-items:center;padding:96px clamp(22px,7vw,104px);background:#fff;color:#2c003e}.vv-learning-collage-copy{max-width:510px}.vv-learning-collage-kicker{display:block;font-family:Outfit,Arial,sans-serif;font-size:.68rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#f89d35;margin-bottom:16px}.vv-learning-collage h2{font-family:Outfit,Arial,sans-serif;font-size:clamp(2rem,3.5vw,3.3rem);line-height:1.05;letter-spacing:-.03em;color:#2c003e;margin-bottom:22px}.vv-learning-collage p{font-family:Arial,Helvetica,sans-serif;font-size:.9rem;line-height:1.7;color:#665b6b;max-width:470px}.vv-learning-collage-note{display:flex;gap:12px;align-items:flex-start;margin-top:28px;padding-top:18px;border-top:1px solid #ded5ca;font-family:Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5;color:#665b6b}.vv-learning-collage-note strong{color:#2c003e}.vv-testimonial-stage{position:relative;min-height:430px;background:#f8f5ef;overflow:hidden}.vv-testimonial-image{width:100%;height:270px;object-fit:cover;display:block}.vv-testimonial-card{position:absolute;left:26px;right:26px;bottom:24px;padding:24px 26px;background:#2c003e;color:#fff;box-shadow:0 14px 28px rgba(44,0,62,.16)}.vv-testimonial-card blockquote{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.05rem,1.7vw,1.35rem);line-height:1.35;color:#fff;margin:0 0 14px}.vv-testimonial-card cite{font-family:Outfit,Arial,sans-serif;font-style:normal;font-size:.66rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:#f89d35}.vv-testimonial-dots{display:flex;gap:6px;margin-top:18px}.vv-testimonial-dot{width:22px;height:3px;background:rgba(255,255,255,.35);border:0;padding:0}.vv-testimonial-dot.is-active{background:#f89d35}
@keyframes vvRiseIn{to{opacity:1;transform:translateY(0)}}
.vv-footer{width:calc(100% - clamp(36px,10vw,144px));margin:0 auto;padding:34px clamp(22px,6vw,84px) 18px;background:#2c003e;color:#fff}.vv-footer-inner{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:28px;padding-bottom:28px}.vv-footer-brand h3{font-family:Georgia,"Times New Roman",serif;font-size:1.1rem;font-weight:500;color:#fff;margin-bottom:8px}.vv-footer-brand p,.vv-footer-col a{font-family:Arial,Helvetica,sans-serif;font-size:.72rem;line-height:1.5;color:rgba(255,255,255,.68)}.vv-footer-brand p{max-width:260px}.vv-footer-col h4{font-family:Arial,Helvetica,sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#f89d35;margin-bottom:10px}.vv-footer-col{display:flex;flex-direction:column;gap:6px}.vv-footer-col a{transition:color .18s,transform .18s}.vv-footer-col a:hover{color:#f89d35;transform:translateX(3px)}.vv-footer-bottom{display:flex;justify-content:space-between;gap:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.14);font-family:Arial,Helvetica,sans-serif;font-size:.66rem;color:rgba(255,255,255,.5)}.vv-footer-bottom a{color:#f89d35}
/* ── IMPACT STATS ──────────────────────────────────── */
.vv-stats{padding:20px 0 76px;background:#fff;border-bottom:1px solid #e8e8e8}
.vv-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:3px solid #f89d35}
.vv-stat{padding:36px 28px 32px;border-right:1px solid #e8e8e8}
.vv-stat:last-child{border-right:0}
.vv-stat-number{font-size:clamp(2rem,3.4vw,3.3rem);font-weight:700;color:#2c003e;line-height:1;letter-spacing:-.03em;margin-bottom:12px}
.vv-stat-number sup{font-size:50%;vertical-align:top;margin-top:.3em}
.vv-stat-label{font-family:Outfit,Arial,sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#555;margin-bottom:10px}
.vv-stat-desc{font-family:Arial,Helvetica,sans-serif;font-size:.88rem;line-height:1.55;color:#666}

/* ── DONATE / SUPPORT ──────────────────────────────── */
.vv-donate-section{padding:72px 0;background:#2c003e;color:#fff}
.vv-donate-inner{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.vv-donate-text h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;line-height:1.14;color:#fff;margin-bottom:20px}
.vv-donate-text p{font-family:Arial,Helvetica,sans-serif;font-size:1rem;line-height:1.68;color:rgba(255,255,255,.75);margin-bottom:28px}
/* Photo strip — 5 equal-width images in a row */
.vv-donate-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;height:clamp(160px,16vw,210px)}
.vv-donate-strip figure{overflow:hidden;margin:0;background:#1a1225}
.vv-donate-strip figure img{width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(.88) saturate(1.06);transition:filter .3s}
.vv-donate-strip figure:hover img{filter:brightness(1) saturate(1.1)}

/* ── NEWS / ANNOUNCEMENTS ──────────────────────────── */
.vv-news{padding:80px 0;background:#fff}
/* Filter tabs */
.vv-news-filters{display:flex;flex-wrap:wrap;gap:0;margin-bottom:48px;border-bottom:2px solid #e8e8e8}
.vv-filter-btn{height:42px;padding:0 20px;font-family:Arial,Helvetica,sans-serif;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#777;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;cursor:pointer;transition:color .18s,border-color .18s}
.vv-filter-btn.is-active,.vv-filter-btn:hover{color:#1a1a1a;border-bottom-color:#f89d35}
/* News grid — first card hero-wide */
.vv-news-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
.vv-news-card{display:flex;flex-direction:column;background:#fff;overflow:hidden;transition:box-shadow .22s}
.vv-news-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.12)}
.vv-news-card-img{overflow:hidden;background:#0a0612;flex-shrink:0}
.vv-news-card-img img{width:100%;object-fit:cover;transition:transform .4s ease}
.vv-news-card:hover .vv-news-card-img img{transform:scale(1.05)}
.vv-news-card-body{display:flex;flex-direction:column;flex:1;padding:22px 20px 26px}
.vv-news-tag{display:inline-block;margin-bottom:12px;padding:4px 10px;background:#fff0db;color:#7b4300;font-family:Arial,Helvetica,sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;width:fit-content}
.vv-news-card h3{font-size:1.08rem;font-weight:700;line-height:1.3;color:#1a1a1a;margin-bottom:12px}
.vv-news-card p{font-family:Arial,Helvetica,sans-serif;font-size:.88rem;line-height:1.58;color:#555;flex:1}
.vv-news-read-more{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#f89d35;border-bottom:1px solid currentColor;padding-bottom:2px;width:fit-content}
.vv-news-date{font-family:Arial,Helvetica,sans-serif;font-size:.76rem;color:#999;margin-top:12px;padding-top:12px;border-top:1px solid #eee}
/* hero card spans 2 cols */
.vv-news-card-hero{grid-column:1/3}
.vv-news-card-hero .vv-news-card-img{height:clamp(240px,24vw,320px)}
.vv-news-card-hero h3{font-size:1.35rem}
.vv-news-card-sm .vv-news-card-img{height:clamp(180px,18vw,230px)}
/* see more */
.vv-news-more{margin-top:40px;text-align:center}

/* ── SIGNATURE PROGRAMS ────────────────────────────── */
.vv-programs{padding:80px 0;background:#f5f0e8;border-top:1px solid #e2d8c8}
.vv-programs-top{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-bottom:48px}
.vv-programs h2{font-size:clamp(1.8rem,2.8vw,2.5rem);font-weight:700;line-height:1.15;color:#1a1a1a}
.vv-programs-desc p{font-family:Arial,Helvetica,sans-serif;font-size:1rem;line-height:1.68;color:#444;margin-bottom:20px}
/* Program tab list */
.vv-prog-tabs{display:flex;flex-direction:column;gap:0;margin-bottom:36px}
.vv-prog-tab{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid #d8cdb8;font-family:Arial,Helvetica,sans-serif;font-size:.96rem;font-weight:700;color:#555;background:none;border-left:none;border-right:none;border-top:none;text-align:left;transition:color .18s}
.vv-prog-tab.is-active,.vv-prog-tab:hover{color:#f89d35}
.vv-prog-tab-dot{width:10px;height:10px;border-radius:50%;background:#f89d35;flex-shrink:0;opacity:0;transition:opacity .18s}
.vv-prog-tab.is-active .vv-prog-tab-dot,.vv-prog-tab:hover .vv-prog-tab-dot{opacity:1}
/* Wide program image */
.vv-prog-image{height:clamp(300px,32vw,440px);overflow:hidden;background:#2c003e}
.vv-prog-image img{width:100%;height:100%;object-fit:cover;object-position:center 40%;transition:transform .4s ease}
.vv-prog-image:hover img{transform:scale(1.04)}

/* ── OUR VOICES / PEOPLE CAROUSEL ─────────────────── */
.vv-voices{padding:80px 0;background:#fff;border-top:1px solid #e8e8e8}
.vv-voices-head{margin-bottom:40px}
.vv-voices-head h2{font-size:clamp(1.8rem,2.8vw,2.5rem);font-weight:500;color:#1a1a1a;margin-bottom:8px}
.vv-voices-head p{font-family:Arial,Helvetica,sans-serif;font-size:1rem;color:#555}
/* Scrollable row */
.vv-voices-track-wrap{position:relative;overflow:hidden}
.vv-voices-track{display:grid;grid-auto-flow:column;grid-auto-columns:clamp(160px,16vw,200px);gap:20px;overflow-x:auto;padding-bottom:12px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.vv-voices-track::-webkit-scrollbar{display:none}
.vv-voice-card{scroll-snap-align:start;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.vv-voice-photo{width:clamp(130px,13vw,160px);height:clamp(130px,13vw,160px);overflow:hidden;border-radius:50%;background:#e8e8e8;border:3px solid #e8e8e8;flex-shrink:0}
.vv-voice-photo img{width:100%;height:100%;object-fit:cover;object-position:center top}
.vv-voice-name{font-size:.96rem;font-weight:500;color:#1a1a1a;line-height:1.2}
.vv-voice-role{font-family:Arial,Helvetica,sans-serif;font-size:.78rem;color:#777;line-height:1.35}
.vv-voice-link{font-family:Arial,Helvetica,sans-serif;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#f89d35;margin-top:4px}
/* Scroll arrows */
.vv-voices-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:4;width:42px;height:42px;display:grid;place-items:center;background:#fff;border:1px solid #ccc;box-shadow:0 2px 10px rgba(0,0,0,.12);color:#1a1a1a;font-size:1.3rem;transition:background .18s,border-color .18s}
.vv-voices-arrow:hover{background:#f89d35;border-color:#f89d35;color:#fff}
.vv-voices-arrow-left{left:0}
.vv-voices-arrow-right{right:0}

/* ── PROGRAMS CARDS ────────────────────────────────── */
.vv-prog-cards{padding:80px 0;background:#f5f0e8}
.vv-prog-cards-head{display:flex;align-items:baseline;justify-content:space-between;gap:24px;margin-bottom:40px}
.vv-prog-cards-head h2{font-size:clamp(1.8rem,2.8vw,2.5rem);font-weight:500;color:#1a1a1a}
.vv-prog-card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
.vv-prog-card{overflow:hidden;background:#fff;display:flex;flex-direction:column;transition:box-shadow .22s}
.vv-prog-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.12)}
.vv-prog-card-img{height:clamp(180px,18vw,240px);overflow:hidden;background:#0a0612;flex-shrink:0}
.vv-prog-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
.vv-prog-card:hover .vv-prog-card-img img{transform:scale(1.05)}
.vv-prog-card-body{padding:26px 22px 28px;display:flex;flex-direction:column;flex:1}
.vv-prog-card-body h3{font-size:1.1rem;font-weight:500;color:#1a1a1a;margin-bottom:10px;line-height:1.28}
.vv-prog-card-body p{font-family:Arial,Helvetica,sans-serif;font-size:.88rem;line-height:1.6;color:#555;flex:1}
.vv-prog-card-body a{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#f89d35;border-bottom:1px solid currentColor;padding-bottom:2px;width:fit-content}

/* ── NEWSLETTER BOTTOM ─────────────────────────────── */
.vv-newsletter-bottom{padding:72px 0;background:#2c003e}
.vv-newsletter-bottom-inner{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.vv-newsletter-bottom h2{font-size:clamp(1.5rem,2.4vw,2.1rem);font-weight:700;color:#fff;line-height:1.2;max-width:400px}

/* ── FOOTER ─────────────────────────────────────────── */
.vv-footer{background:#fff;padding:64px 0 0;border-top:4px solid #f89d35}
.vv-footer-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr 1fr;gap:32px;padding-bottom:52px;border-bottom:1px solid #e8e8e8}
.vv-footer-brand{display:flex;flex-direction:column;gap:16px}
.vv-footer-brand-name{font-size:1.05rem;font-weight:500;color:#1a1a1a;letter-spacing:.04em;text-transform:uppercase}
.vv-footer-brand p{font-family:Arial,Helvetica,sans-serif;font-size:.86rem;line-height:1.65;color:#555;max-width:300px}
.vv-footer-contact{display:flex;flex-direction:column;gap:6px;margin-top:4px}
.vv-footer-contact a,.vv-footer-contact span{font-family:Arial,Helvetica,sans-serif;font-size:.84rem;color:#555;display:block;transition:color .18s}
.vv-footer-contact a:hover{color:#f89d35}
.vv-footer-socials{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
.vv-footer-social{width:36px;height:36px;display:inline-grid;place-items:center;border:1px solid #ddd;color:#555;transition:border-color .18s,color .18s,background .18s}
.vv-footer-social:hover{background:#f89d35;border-color:#f89d35;color:#fff}
.vv-footer-col h4{font-family:Arial,Helvetica,sans-serif;font-size:.76rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#f89d35;margin-bottom:16px}
.vv-footer-links{display:flex;flex-direction:column;gap:9px}
.vv-footer-links a{font-family:Arial,Helvetica,sans-serif;font-size:.86rem;color:#444;transition:color .18s;line-height:1.3}
.vv-footer-links a:hover{color:#f89d35}
.vv-footer-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:22px 0;font-family:Arial,Helvetica,sans-serif;font-size:.78rem;color:#999}
.vv-footer-bottom a{color:#f89d35}

.vv-footer{position:fixed!important;left:0;right:0;bottom:0;z-index:1000;width:100%!important;margin:0!important;display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:62px;padding:12px 32px!important;background:#2c003e!important;color:#fff;border-top:0!important;box-shadow:0 -8px 24px rgba(44,0,62,.16)}.vv-footer-quote{font-family:Arial,Helvetica,sans-serif;font-size:.76rem;font-style:italic;color:rgba(255,255,255,.82)}.vv-footer-copy{font-family:Arial,Helvetica,sans-serif;font-size:.72rem;color:#fff;white-space:nowrap}
.site-floating-footer{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:1000!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;min-height:62px!important;padding:12px 32px!important;background:#2c003e!important;color:#fff!important;border-top:0!important;box-shadow:0 -8px 24px rgba(44,0,62,.16)!important;font-family:Arial,Helvetica,sans-serif!important}.site-floating-footer .vv-footer-quote{color:rgba(255,255,255,.82)!important;font-size:.76rem!important;font-style:italic!important;line-height:1.3!important}.site-floating-footer .vv-footer-copy{color:#fff!important;font-size:.72rem!important;white-space:nowrap!important}@media(max-width:640px){.site-floating-footer{min-height:72px!important;padding:12px 18px!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important}.site-floating-footer .vv-footer-quote{font-size:.68rem!important}.site-floating-footer .vv-footer-copy{font-size:.62rem!important}}
.vv-impact-strip{margin-bottom:56px!important}.vv-post-hero-story{margin-bottom:34px}.vv-post-hero-stats{margin-top:0!important}
.vv-learning-collage{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(44px,8vw,112px);align-items:center;padding:92px clamp(28px,8vw,124px);background:#fff;color:#2c003e;border-top:1px solid #eee8df}.vv-learning-collage-copy{max-width:520px}.vv-learning-collage-kicker{display:block;font-family:Outfit,Arial,sans-serif;font-size:.66rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#f89d35;margin-bottom:18px}.vv-learning-collage h2{font-family:Outfit,Arial,sans-serif;font-size:clamp(2rem,3.3vw,3.1rem);line-height:1.05;letter-spacing:-.035em;color:#2c003e;margin-bottom:22px}.vv-learning-collage p{font-family:Arial,Helvetica,sans-serif;font-size:.9rem;line-height:1.75;color:#665b6b;max-width:500px}.vv-learning-collage-note{display:block;margin-top:30px;padding:18px 0 0;border-top:1px solid #ded5ca;font-family:Arial,Helvetica,sans-serif;font-size:.78rem;line-height:1.55;color:#665b6b}.vv-learning-collage-note strong{display:block;margin-bottom:7px;font-family:Outfit,Arial,sans-serif;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:#f89d35}.vv-testimonial-stage{position:relative;min-height:410px;background:#f5f0e8;overflow:visible}.vv-testimonial-image{width:100%;height:350px;object-fit:cover;display:block;border-radius:2px;transition:opacity .18s}.vv-testimonial-card{position:absolute;left:-32px;right:32px;bottom:-28px;padding:22px 24px;background:#2c003e;color:#fff;box-shadow:0 14px 28px rgba(44,0,62,.14)}.vv-testimonial-card blockquote{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1rem,1.45vw,1.2rem);line-height:1.38;color:#fff;margin:0 0 13px}.vv-testimonial-card cite{font-family:Outfit,Arial,sans-serif;font-style:normal;font-size:.62rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#f89d35}.vv-testimonial-dots{display:flex;gap:6px;margin-top:16px}.vv-testimonial-dot{width:22px;height:3px;background:rgba(255,255,255,.35);border:0;padding:0}.vv-testimonial-dot.is-active{background:#f89d35}
.vv-post-hero-card{border-top:0;padding-top:34px}.vv-post-hero-card:before{content:"";position:absolute;top:28px;left:0;right:0;border-top:1px solid #d9d0c7}.vv-post-hero-card-copy span{position:absolute;top:-34px;left:0;z-index:2;padding-right:10px;background:#fff}
/* ── RESPONSIVE ──────────────────────────────────── */
.vv-mission-copy p{font-family:Outfit,Arial,sans-serif;font-size:1rem;line-height:1.7;color:#55475b}
@media(max-width:1020px){
  .vv-mission-inner{grid-template-columns:1fr;gap:0}
  .vv-mission-globe{min-height:430px}
  .vv-mission-copy{max-width:none}
  .vv-story-bridge{align-items:flex-start;flex-direction:column;gap:18px}

  .vv-donate-inner,.vv-programs-top{grid-template-columns:1fr}
  .vv-newsletter-strip-inner,.vv-newsletter-bottom-inner{grid-template-columns:1fr;gap:28px}
  .vv-stats-grid{grid-template-columns:repeat(2,1fr)}  .vv-what-we-do{padding:42px 0}.vv-what-we-do-grid{grid-template-columns:repeat(2,1fr);gap:8px}.vv-what-card{min-height:150px}.vv-what-card h3{font-size:.8rem}.vv-what-card p{font-size:.62rem}
  .vv-stat{border-right:0;border-bottom:1px solid #e8e8e8}
  .vv-stat:nth-child(2n){border-right:0}
  .vv-news-grid{grid-template-columns:1fr 1fr}
  .vv-news-card-hero{grid-column:1/3}
  .vv-prog-card-grid{grid-template-columns:repeat(2,1fr)}
  .vv-footer-top{grid-template-columns:1fr 1fr}
  .vv-footer-brand{grid-column:1/3}
}
@media(max-width:800px){
  .vv-impact-strip{width:100%}.vv-post-hero{width:100%;margin:0}.vv-post-hero-story{grid-template-columns:1fr}.vv-post-hero-image{min-height:250px}.vv-post-hero-image video{height:250px}.vv-post-hero-copy{padding:34px 24px 40px}.vv-post-hero-programs{padding-bottom:30px}.vv-post-hero-grid{grid-template-columns:repeat(2,1fr);gap:8px}.vv-post-hero-card{min-height:290px}.vv-post-hero-card-copy{left:13px;right:13px;bottom:12px}.vv-post-hero-stats{grid-template-columns:repeat(2,1fr);padding:24px 18px}.vv-post-hero-stat{padding:14px;border-bottom:1px solid #e8e1d7}.vv-post-hero-stat:nth-child(2n){border-right:0}.vv-post-hero-stat:first-child{padding-left:14px}}
@media(max-width:640px){
  .vv-involve{width:100%;padding:40px 18px 44px}.vv-involve-grid{grid-template-columns:1fr}.vv-involve-card{min-height:140px}.vv-footer{width:100%;min-height:72px;padding:12px 18px!important;flex-direction:column;align-items:flex-start;justify-content:center}.vv-footer-inner{grid-template-columns:1fr 1fr;gap:24px}.vv-footer-brand{grid-column:1/-1}.vv-footer-bottom{flex-direction:column;align-items:flex-start}
}
@media(max-width:640px){
  .vv-container,.vv-container-wide{width:min(100% - 36px,1160px)}
  .vv-mission-globe{min-height:300px;padding:22px}.vv-mission-globe img{width:min(78%,300px);height:220px}
  .vv-mission-copy{padding:52px 22px 62px}
  .vv-mission-globe:after{left:16px;bottom:16px;font-size:.6rem}
  .vv-mission-copy:before{margin-bottom:16px}
  .vv-story-bridge{padding:24px 22px 28px}
  .vv-slide-content{padding-bottom:52px}
  .vv-slide h1{position:relative;font-size:2rem}
  .vv-stats-grid{grid-template-columns:1fr}
  .vv-news-grid{grid-template-columns:1fr}
  .vv-news-card-hero{grid-column:auto}
  .vv-donate-strip{grid-template-columns:repeat(3,1fr)}
  .vv-donate-strip figure:nth-child(4),.vv-donate-strip figure:nth-child(5){display:none}
  .vv-prog-card-grid{grid-template-columns:1fr}
  .vv-footer-top{grid-template-columns:1fr}
  .vv-footer-brand{grid-column:auto}
  .vv-footer-bottom{flex-direction:column;align-items:flex-start}
  .vv-nl-form-row{grid-template-columns:1fr}
  .vv-programs-top{grid-template-columns:1fr}
  .vv-voices-track{grid-auto-columns:clamp(140px,42vw,170px)}
}
/* ── PHONE EXPERIENCE — intentionally redesigned, not a squeezed desktop ── */
@media(max-width:600px){
  .vv{font-size:15px}
  .vv-hero{height:auto;min-height:0;padding:12px 12px 24px;background:#f89d35}
  .vv-hero:before{display:none}.vv-hero:after{display:none}
  .vv-slide{position:relative;inset:auto;display:none;min-height:0;overflow:hidden;background:#fff;box-shadow:0 12px 30px rgba(44,0,62,.16)}
  .vv-slide.is-active{display:flex;flex-direction:column}
  .vv-slide-photo,.vv-slide-programs .vv-slide-photo,.vv-slide-reverse .vv-slide-photo{position:relative;inset:auto;order:0;width:100%;height:235px;min-height:0;overflow:hidden;clip-path:none;mask-image:none;-webkit-mask-image:none;background:#f5f0e8}
  .vv-slide-photo img,.vv-slide-programs .vv-slide-photo img{position:relative;width:100%;height:100%;object-fit:cover;object-position:center}
  .vv-slide-scrim,.vv-slide-programs .vv-slide-scrim,.vv-slide-reverse .vv-slide-scrim{display:none}
  .vv-slide-content,.vv-slide-programs .vv-slide-content,.vv-slide-reverse .vv-slide-content,.vv-slide-overlay .vv-slide-content{position:relative;inset:auto;order:1;width:100%;padding:28px 22px 30px;background:#fff}
  .vv-slide-overlay .vv-slide-content{background:#2c003e}
  .vv-slide-inner,.vv-slide-reverse .vv-slide-inner{max-width:none}
  .vv-slide-tag{margin-bottom:12px;font-size:.62rem;letter-spacing:.14em}
  .vv-slide h1,.vv-slide-reverse .vv-slide h1{font-size:clamp(1.8rem,9vw,2.55rem);line-height:1.04;margin-bottom:15px;max-width:none}
  .vv-slide-body{font-size:.87rem;line-height:1.58;margin-bottom:24px;max-width:none}
  .vv-slide-ctas{gap:10px}.vv-slide-ctas .vv-btn,.vv-slide-ctas .vv-btn-gold,.vv-slide-ctas .vv-btn-outline-white{min-height:44px;padding:0 17px;font-size:.65rem}
  .vv-hero-arrow{width:34px;height:34px;font-size:1rem;background:rgba(44,0,62,.7);border:0}.vv-hero-arrow-prev{left:20px}.vv-hero-arrow-next{right:20px}
  .vv-dots{bottom:10px}.vv-slide-counter{bottom:12px;right:20px;font-size:.63rem}
  .vv-impact-strip{width:100%;grid-template-columns:repeat(2,1fr);gap:0;padding:6px 12px 8px;border-bottom:0}
  .vv-impact-item{grid-template-columns:30px 1fr;gap:8px;padding:14px 10px;border-right:1px solid rgba(44,0,62,.12);border-bottom:1px solid rgba(44,0,62,.12)}
  .vv-impact-item:nth-child(2n){border-right:0}.vv-impact-icon{width:28px;height:28px}.vv-impact-icon svg{width:15px;height:15px}.vv-impact-item h3{font-size:.76rem}.vv-impact-item p{font-size:.67rem}
  .vv-post-hero{width:100%;margin:0;background:#fff}.vv-post-hero-story{display:flex;flex-direction:column;margin:34px 16px 34px}.vv-post-hero-image{min-height:210px;order:0}.vv-post-hero-copy{order:1;padding:26px 4px 4px}.vv-post-hero-kicker{font-size:1.35rem;margin-bottom:12px}.vv-post-hero-copy h2{font-size:1.55rem}.vv-post-hero-copy p{font-size:.82rem}.vv-post-hero-stats{grid-template-columns:repeat(2,1fr);margin:0;padding:24px 16px 28px}.vv-post-hero-stat{padding:16px 14px;border-bottom:1px solid #e8e1d7}.vv-post-hero-stat:nth-child(2n){border-right:0}.vv-post-hero-stat strong{font-size:1.55rem}.vv-post-hero-programs{margin-top:24px;margin-bottom:32px;padding:34px 16px 40px}.vv-post-hero-programs-intro{font-size:.84rem;margin-bottom:30px}.vv-post-hero-grid{grid-template-columns:1fr 1fr;gap:12px}.vv-post-hero-card{min-height:215px;padding:18px 14px}.vv-post-hero-card-copy span{font-size:1.8rem}.vv-post-hero-card h3{font-size:.88rem;margin-top:20px}.vv-post-hero-card p{font-size:.68rem}
  .vv-learning-collage{padding:58px 16px 64px;gap:24px}.vv-learning-values-head{max-width:none}.vv-learning-collage h2{font-size:clamp(2rem,10vw,2.65rem)}.vv-learning-values-head p{font-size:.86rem}.vv-learning-values-grid{margin-top:8px}.vv-learning-value{padding:22px 18px;min-height:0}.vv-learning-value h3{font-size:1rem}.vv-learning-value p{font-size:.8rem}.vv-learning-belief{font-size:.78rem;margin-top:8px}
  .vv-involve{width:100%;padding:52px 16px 60px}.vv-involve h2{font-size:1.72rem}.vv-involve-intro{font-size:.84rem;margin-bottom:24px}.vv-involve-grid{grid-template-columns:1fr;gap:14px}.vv-involve-card{min-height:0;padding:0 16px 18px}.vv-involve-card-image{width:calc(100% + 32px);height:180px;margin-left:-16px}.vv-involve-card h3{font-size:1.05rem}.vv-involve-card p{font-size:.76rem}.vv-involve-button{min-height:42px;border-radius:999px;padding:0 17px}
}
/* ── PHONE REFINEMENT — hero hierarchy and one testimonial at a time ── */
@media(max-width:600px){
  .vv-hero{padding:14px 12px 30px;background:linear-gradient(180deg,#f89d35 0%,#f89d35 78%,#f4eee6 100%)}
  .vv-slide{border-radius:20px;box-shadow:0 16px 34px rgba(44,0,62,.2)}
  .vv-slide-map,.vv-slide-programs{display:none!important}.vv-slide-reverse{display:flex!important;flex-direction:column;opacity:1!important;pointer-events:auto!important;transition:none!important}.vv-hero-arrow,.vv-dots,.vv-slide-counter{display:none!important}
  .vv-slide-photo,.vv-slide-programs .vv-slide-photo,.vv-slide-reverse .vv-slide-photo{height:245px}
  .vv-slide-photo img,.vv-slide-programs .vv-slide-photo img{object-position:center 38%}.vv-slide-programs .vv-slide-photo img{border-radius:16px;box-shadow:10px 12px 0 rgba(248,157,53,.16),0 16px 26px rgba(44,0,62,.2)}
  .vv-slide-content,.vv-slide-programs .vv-slide-content,.vv-slide-reverse .vv-slide-content{padding:30px 24px 32px}
  .vv-slide-overlay .vv-slide-content{padding:30px 24px 32px;background:#2c003e}
  .vv-slide-tag{display:inline-flex;align-items:center;gap:8px;margin-bottom:14px;color:#f89d35;font-size:.64rem}
  .vv-slide-tag:before{content:"";width:24px;height:1px;background:#f89d35}
  .vv-slide h1,.vv-slide-reverse .vv-slide h1{font-size:clamp(2rem,9.5vw,2.7rem);line-height:1.02;letter-spacing:-.035em;margin-bottom:17px}
  .vv-slide-body{font-size:.9rem;line-height:1.62;margin-bottom:26px}
  .vv-post-hero-kicker,.vv-post-hero-programs h2,.vv-involve h2{font-family:Outfit,Arial,sans-serif;font-size:clamp(2rem,10vw,2.65rem);line-height:1.08;letter-spacing:-.03em;text-transform:none}
  .vv-slide-ctas{gap:11px}
  .vv-slide-ctas .vv-btn,.vv-slide-ctas .vv-btn-gold,.vv-slide-ctas .vv-btn-outline-white{min-height:46px;padding:0 19px;font-size:.65rem}
  .vv-hero-arrow{top:245px;transform:translateY(-50%);width:36px;height:36px;border:2px solid rgba(255,255,255,.82);background:rgba(44,0,62,.72)}
  .vv-hero-arrow:hover{transform:translateY(-50%)}
  .vv-hero-arrow-prev{left:22px}.vv-hero-arrow-next{right:22px}
  .vv-dots{bottom:10px}.vv-slide-counter{bottom:12px}
  .vv-learning-collage{padding-bottom:32px}.vv-learning-belief{display:none!important}
  .vv-learning-values-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;background:transparent;margin-left:-2px;margin-right:-2px;padding:0 2px 6px}
  .vv-learning-values-grid::-webkit-scrollbar{display:none}
  .vv-learning-value{flex:0 0 100%;scroll-snap-align:start;border:1px solid rgba(255,255,255,.2)}
}


`;

/* ── SVG helpers ─────────────────────────────────── */
const svg = (paths, { w = 18, h = 18, stroke = true } = {}) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  el.setAttribute("viewBox", `0 0 24 24`);
  el.setAttribute("width", w);
  el.setAttribute("height", h);
  el.setAttribute("fill", stroke ? "none" : "currentColor");
  el.setAttribute("aria-hidden", "true");
  if (stroke) {
    el.setAttribute("stroke", "currentColor");
    el.setAttribute("stroke-width", "2");
    el.setAttribute("stroke-linecap", "round");
    el.setAttribute("stroke-linejoin", "round");
  }
  paths.forEach(d => {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    el.appendChild(p);
  });
  return el.outerHTML;
};

const icons = {
  arrow:    svg(["M5 12h14", "M12 5l7 7-7 7"]),
  instagram:svg(["M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5","M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37","M17.5 6.5h.01"]),
  twitter:  svg(["M4 4l16 16","M20 4L4 20"]),
  linkedin: svg(["M4 9v11","M4 4.5v.01","M10 20v-7a4 4 0 0 1 8 0v7","M10 9v11"]),
  tiktok:   svg(["M14 3v10.2a4.2 4.2 0 1 1-4.2-4.2","M14 3c1 3 3 5 6 5"]),
  chevron:  svg(["M9 18l6-6-6-6"]),  impactLaptop: svg(["M4 5h16v10H4z","M2 19h20","M8 19l1.2-2h5.6l1.2 2"]),
  impactMentor: svg(["M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6","M16 10a2.5 2.5 0 1 0 0-5","M3 19a5 5 0 0 1 10 0","M14 19a4 4 0 0 1 7 0"]),
  impactCommunity: svg(["M4 7h16v10H4z","M8 11h.01","M12 11h.01","M16 11h.01","M8 17v3l3-3"]),
  impactProject: svg(["M4 5h16v14H4z","M8 9h8","M8 13h5","M8 16h3"]),

};

/* ──────────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────────── */
export const modernLandingPage = () => {
  const root = document.createElement("main");
  root.className = "vv";
  root.setAttribute("aria-label", "LEA Organization home page");

  root.innerHTML = `<style>${css}</style>

<!-- ══════════════ HERO — FULL-BLEED SLIDER ════════════ -->
<section class="vv-hero" aria-label="LEA Organization featured stories">

  <!-- Slide 1 -->
  <div class="vv-slide vv-slide-map is-active" aria-label="Slide 1 of 3">
    <div class="vv-slide-photo">
      <img src="/images/lea-africa-hero.png" alt="Learners and mentor inside an Africa-shaped LEA visual" onerror="this.onerror=null;this.src='/images/lea-hero-learners.jpg'" fetchpriority="high">
    </div>
    <div class="vv-slide-scrim" aria-hidden="true"></div>
    <div class="vv-slide-content">
      <div class="vv-slide-inner">
        <span class="vv-slide-tag">Community</span>
        <h1>We stand with young learners, especially those left behind.</h1>
        <p class="vv-slide-body">Together we can ensure every child meets technology early, building confidence, skills, and a future they can shape with their own hands.</p>
        <div class="vv-slide-ctas">
          <a class="vv-btn vv-btn-gold" href="/donate">Support LEA</a>
          <a class="vv-btn vv-btn-outline-white" href="/about">Our Story</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 2 -->
  <div class="vv-slide vv-slide-overlay vv-slide-programs" aria-label="Slide 2 of 3">
    <div class="vv-slide-photo">
      <img src="/images/lea-hero-mentor.jpg" alt="LEA learner learning to code with a mentor" loading="lazy">
    </div>
    <div class="vv-slide-scrim" aria-hidden="true"></div>
    <div class="vv-slide-content">
      <div class="vv-slide-inner">
        <span class="vv-slide-tag">Programs</span>
        <h1 class="vv-programs-heading-orange">Practical skills for a changing world.</h1>
        <p class="vv-slide-body">Our programs give learners aged 9 to 18 the tools, time, and patient mentors to build real things, one session at a time.</p>
        <div class="vv-slide-ctas">
          <a class="vv-btn vv-btn-gold" href="/programs">Explore Programs</a>
          <a class="vv-btn vv-btn-outline-white" href="/volunteer">Join the Movement</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 3 -->
  <div class="vv-slide vv-slide-reverse" aria-label="Slide 3 of 3">
    <div class="vv-slide-photo">
      <img src="/images/Happy.jpeg" alt="LEA learners celebrating together" loading="lazy">
    </div>
    <div class="vv-slide-scrim" aria-hidden="true"></div>
    <div class="vv-slide-content">
      <div class="vv-slide-inner">
        <span class="vv-slide-tag">Milestone</span>
        <h1>Two cohorts graduated. Hundreds more are ready.</h1>
        <p class="vv-slide-body">Mukuru Slums Development Project learners completed a full web development pathway — twice. This is what access and commitment look like.</p>
        <div class="vv-slide-ctas">
          <a class="vv-btn vv-btn-gold" href="/events">View Highlights</a>
          <a class="vv-btn vv-btn-outline-white" href="/contact">Bring LEA to Your School</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Prev / Next arrows -->
  <button class="vv-hero-arrow vv-hero-arrow-prev" type="button" aria-label="Previous slide" id="vv-arrow-prev">&#8592;</button>
  <button class="vv-hero-arrow vv-hero-arrow-next" type="button" aria-label="Next slide" id="vv-arrow-next">&#8594;</button>

  <!-- Slide counter -->
  <span class="vv-slide-counter" id="vv-slide-counter" aria-hidden="true">01 / 03</span>

  <!-- Pagination dots -->
  <div class="vv-dots" role="tablist" aria-label="Slideshow navigation">
    <button class="vv-dot is-active" role="tab" aria-selected="true"  aria-label="Go to slide 1" data-idx="0"></button>
    <button class="vv-dot"           role="tab" aria-selected="false" aria-label="Go to slide 2" data-idx="1"></button>
    <button class="vv-dot"           role="tab" aria-selected="false" aria-label="Go to slide 3" data-idx="2"></button>
  </div>
</section>

<!-- ══════════════ LEA IMPACT SNAPSHOT ══════════════ -->
<section class="vv-impact-strip" aria-label="What LEA delivers">
  <article class="vv-impact-item"><span class="vv-impact-icon" aria-hidden="true">${icons.impactLaptop}</span><div><h3>Hands on coding</h3><p>Learners build real digital projects, not just follow tutorials.</p></div></article>
  <article class="vv-impact-item"><span class="vv-impact-icon" aria-hidden="true">${icons.impactMentor}</span><div><h3>Patient mentorship</h3><p>Guidance from people who make difficult ideas feel possible.</p></div></article>
  <article class="vv-impact-item"><span class="vv-impact-icon" aria-hidden="true">${icons.impactCommunity}</span><div><h3>Community learning</h3><p>Supportive sessions where learners grow together and keep showing up.</p></div></article>
  <article class="vv-impact-item"><span class="vv-impact-icon" aria-hidden="true">${icons.impactProject}</span><div><h3>Real world projects</h3><p>Practical skills connected to school, work, and the future ahead.</p></div></article>
</section>

<!-- ══════════════ POST-HERO FEATURE SECTION ══════════════ -->
<section class="vv-post-hero" aria-label="LEA story and impact">
  <div class="vv-post-hero-story">
    <div class="vv-post-hero-image"><video id="vv-story-video" src="/images/LEAINTERVIEWS.mp4" controls poster="/images/lea-about-hero.jpg" playsinline preload="metadata" aria-label="LEA interviews"></video><button class="vv-video-play" id="vv-story-play" type="button" aria-label="Play LEA interviews">▶</button></div>
    <div class="vv-post-hero-copy">
      <span class="vv-post-hero-kicker"><span class="vv-heading-purple">Our</span> <span class="vv-heading-orange">story</span></span>
      <h2>Closing the gap between young people and the opportunities technology can create.</h2>
      <p>Too many children, especially those growing up in underserved communities, meet technology late or not at all. LEA wants to help close that gap by making digital learning welcoming, practical, and accessible to more young people.</p>
      <p>By introducing technology early, we help learners discover their interests sooner, build confidence through practice, and begin imagining what they want to become. Every child deserves the chance to explore, create, and see a future that includes them.</p>
      <a class="vv-post-hero-link" href="/about">Our story</a>
    </div>
  </div>
  <div class="vv-post-hero-stats" aria-label="LEA impact snapshot">
    <div class="vv-post-hero-stat"><strong>200+</strong><span>Young coders trained</span><p>Hands-on sessions since 2024.</p></div>
    <div class="vv-post-hero-stat"><strong>2</strong><span>Years building</span><p>Growing programs across Nairobi.</p></div>
    <div class="vv-post-hero-stat"><strong>47</strong><span>Counties in reach</span><p>A network with room to grow.</p></div>
    <div class="vv-post-hero-stat"><strong>35+</strong><span>Active volunteers</span><p>People giving time and skill.</p></div>
  </div>
  <div class="vv-post-hero-programs">
    <h2><span class="vv-heading-purple">How LEA creates</span> <span class="vv-heading-orange">change</span></h2>
    <p class="vv-post-hero-programs-intro">Our work moves from access to confidence: learners meet technology, practise with patient support, and use what they learn to build something real.</p>
    <div class="vv-post-hero-grid">
      <article class="vv-post-hero-card"><div class="vv-post-hero-card-copy"><span>01</span><h3>Open access</h3><p>We bring devices, coding sessions, and a welcoming first step closer to young people often left out.</p></div></article>
      <article class="vv-post-hero-card"><div class="vv-post-hero-card-copy"><span>02</span><h3>Practice patiently</h3><p>Learners ask questions, make mistakes, and build confidence through hands-on guidance and repetition.</p></div></article>
      <article class="vv-post-hero-card"><div class="vv-post-hero-card-copy"><span>03</span><h3>Build together</h3><p>Projects, peers, mentors, and community partners turn learning into shared progress and belonging.</p></div></article>
      <article class="vv-post-hero-card"><div class="vv-post-hero-card-copy"><span>04</span><h3>Keep growing</h3><p>Young people leave with practical digital skills, stronger problem-solving, and clearer next steps.</p></div></article>
    </div>
  </div>
  <section class="vv-learning-collage" aria-label="Testimonials from the LEA learning community"><div class="vv-learning-values-head"><h2>Small support. <em>Visible progress.</em></h2><p>Every learner and volunteer brings a story of practice, patience, and possibility.</p></div><div class="vv-learning-values-grid"><article class="vv-learning-value"><span class="vv-learning-value-number">MSDP</span><h3>Tom</h3><p>Tom completed LEA’s full web development pathway through the Mukuru Slums Development Project, building practical skills one project at a time.</p><span class="vv-learning-value-role">LEA learner · full web development</span></article><article class="vv-learning-value"><span class="vv-learning-value-number">Mogra</span><h3>Kate</h3><p>Kate learned Scratch programming with LEA at Mogra, discovering how ideas can become playful, creative projects.</p><span class="vv-learning-value-role">LEA learner · Scratch programming</span></article><article class="vv-learning-value"><span class="vv-learning-value-number">LEA</span><h3>LEA volunteer</h3><p>Our volunteers make patient mentorship possible, helping learners ask questions, try again, and keep building together.</p><span class="vv-learning-value-role">LEA community · volunteer</span></article></div><div class="vv-learning-belief"><strong>LEA belief</strong><span>Access opens the door. Practice builds confidence. Confidence changes what feels possible.</span></div></section></section>

<!-- ══════════════ GET INVOLVED ════════════════════════ -->
<section class="vv-involve" aria-labelledby="vv-involve-heading">
  <h2 id="vv-involve-heading"><span class="vv-heading-purple" >Get</span> <span class="vv-heading-purple">involved</span></h2>
  <p class="vv-involve-intro">There is a place for your time, skills, generosity, and partnership in helping more young people meet technology early.</p>
  <div class="vv-involve-grid">
    <article class="vv-involve-card"><img class="vv-involve-card-image" src="/images/M1.jpeg" alt="Laptop, code blocks, and project notebook"><div><h3>View programs</h3><p>Explore the learning pathways, coding sessions, and communities where young people build skills through practice.</p></div><a class="vv-involve-button" href="/programs">View programs</a></article>
    <article class="vv-involve-card"><img class="vv-involve-card-image" src="/images/M2.jpeg" alt="Empty workshop table prepared for volunteering"><div><h3>Volunteer</h3><p>Share your time, technical skills, and encouragement to help learners feel confident while they create.</p></div><a class="vv-involve-button" href="/volunteer">Volunteer with us</a></article>
    <article class="vv-involve-card"><img class="vv-involve-card-image" src="/images/M3.jpeg" alt="Donation box beside a laptop and school supplies"><div><h3>Donate</h3><p>Your support helps provide devices, learning materials, transport, and welcoming spaces for every session.</p></div><a class="vv-involve-button" href="/donate">Donate to LEA</a></article>
    <article class="vv-involve-card"><img class="vv-involve-card-image" src="/images/Happy.jpeg" alt="Interlocking blocks forming a bridge toward technology"><div><h3>Partner with LEA</h3><p>Bring practical coding opportunities to a school, organization, or community ready to invest in young people.</p></div><a class="vv-involve-button" href="/contact">Partner with LEA</a></article>
  </div>
</section>

`;

  /* ── Story video play control ────────────────────── */
  (() => {
    const video = root.querySelector("#vv-story-video");
    const play = root.querySelector("#vv-story-play");
    if (!video || !play) return;
    const syncPlayButton = () => play.classList.toggle("is-hidden", !video.paused);
    play.addEventListener("click", () => {
      video.play().catch(() => { video.controls = true; });
    });
    video.addEventListener("play", syncPlayButton);
    video.addEventListener("pause", syncPlayButton);
    video.addEventListener("ended", syncPlayButton);
    video.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => { video.controls = true; });
    });
  })();

  /* ── Hero slideshow ─────────────────────────────── */
  (() => {
    const slides  = root.querySelectorAll(".vv-slide");
    const dots    = root.querySelectorAll(".vv-dot");
    const counter = root.querySelector("#vv-slide-counter");
    const prev    = root.querySelector("#vv-arrow-prev");
    const next    = root.querySelector("#vv-arrow-next");
    let current   = 0;
    let timer;

    const pad = n => String(n + 1).padStart(2, "0");

    const goTo = (idx) => {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      dots[current].setAttribute("aria-selected", "false");
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
      dots[current].setAttribute("aria-selected", "true");
      if (counter) counter.textContent = `${pad(current)} / ${pad(slides.length)}`;
    };

    const startAuto = () => { timer = setInterval(() => goTo(current + 1), 6000); };
    const stopAuto  = () => clearInterval(timer);
    const resetAuto = () => { stopAuto(); startAuto(); };

    dots.forEach(dot => {
      dot.addEventListener("click", () => { goTo(Number(dot.dataset.idx)); resetAuto(); });
    });
    if (prev) prev.addEventListener("click", () => { goTo(current - 1); resetAuto(); });
    if (next) next.addEventListener("click", () => { goTo(current + 1); resetAuto(); });

    startAuto();
  })();

  /* ── Stat counter animation ─────────────────────── */
  (() => {
    const nums = root.querySelectorAll(".vv-stat-strip-num[data-target]");
    if (!nums.length) return;
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    /* Trigger when hero is visible */
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { nums.forEach(animate); obs.disconnect(); } });
      }, { threshold: 0.3 });
      const strip = root.querySelector(".vv-stat-strip");
      if (strip) obs.observe(strip);
    } else {
      setTimeout(() => nums.forEach(animate), 400);
    }
  })();

  /* ── Program tabs image swap ──────────────────────── */
  (() => {
    const tabs  = root.querySelectorAll(".vv-prog-tab");
    const img   = root.querySelector("#vv-prog-img");
    if (!img) return;

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        img.style.opacity = "0";
        setTimeout(() => {
          img.src = tab.dataset.img;
          img.alt = tab.dataset.alt;
          img.style.opacity = "1";
        }, 200);
        img.style.transition = "opacity .2s";
      });
    });
  })();

  /* ── News filter tabs ─────────────────────────────── */
  (() => {
    const btns  = root.querySelectorAll(".vv-filter-btn");
    const cards = root.querySelectorAll("#vv-news-grid .vv-news-card");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        const f = btn.dataset.filter;
        cards.forEach(card => {
          const show = f === "all" || card.dataset.cat === f;
          card.style.display = show ? "" : "none";
          // Reset hero spanning if filtered
          if (card.classList.contains("vv-news-card-hero")) {
            card.style.gridColumn = show ? "" : "none";
          }
        });
      });
    });
  })();

  /* ── Voices carousel scroll ───────────────────────── */
  (() => {
    const track = root.querySelector("#vv-voices-track");
    const left  = root.querySelector("#vv-voices-left");
    const right = root.querySelector("#vv-voices-right");
    if (!track || !left || !right) return;
    const scroll = (dir) => track.scrollBy({ left: dir * track.clientWidth * 0.7, behavior: "smooth" });
    left.addEventListener("click",  () => scroll(-1));
    right.addEventListener("click", () => scroll(1));
  })();

  /* ── Learning community testimonial rotator ───────── */
  (() => { const q=root.querySelector("#vv-testimonial-quote"), c=root.querySelector("#vv-testimonial-cite"), img=root.querySelector(".vv-testimonial-image"), dots=root.querySelectorAll(".vv-testimonial-dot"); if(!q||!c||!img||!dots.length)return; const stories=[ ["“I started by watching. Then I tried one small thing—and realised I could build it myself.”","LEA learner · digital skills session","/images/LEA pics/LEA-29.jpg"], ["“The questions were never too small. That made it easier to keep trying when the code did not work.”","LEA learner · community workshop","/images/Happy.jpeg"], ["“When learners build together, confidence becomes something the whole room can feel.”","LEA mentor · learning session","/images/M1.jpeg"] ]; let i=0; const show=n=>{i=(n+stories.length)%stories.length; q.textContent=stories[i][0]; c.textContent=stories[i][1]; img.style.opacity=".2"; setTimeout(()=>{img.src=stories[i][2];img.style.opacity="1"},180); dots.forEach((d,j)=>d.classList.toggle("is-active",j===i));}; dots.forEach(d=>d.addEventListener("click",()=>show(Number(d.dataset.testimonial)))); setInterval(()=>show(i+1),6500); })();

  /* ── Newsletter forms ─────────────────────────────── */
  const SCRIPT = "https://script.google.com/macros/s/AKfycbyBqmXzozfm5_H09j4dd3jlPfutxhBhT7t0wD_JhJd397H7LWwyb-49AAg0A41VBIV_/exec";

  [["vv-nl-form-top", "vv-nl1-status"], ["vv-nl-form-bottom", "vv-nl2-status"]].forEach(([formId, statusId]) => {
    const form   = root.querySelector(`#${formId}`);
    const status = root.querySelector(`#${statusId}`);
    const btn    = form?.querySelector("button[type=submit]");
    if (!form || !btn) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";
      if (status) status.textContent = "";
      fetch(SCRIPT, { method: "POST", body: new FormData(form), mode: "no-cors" })
        .then(() => { form.reset(); if (status) status.textContent = "✓ Thank you! You're subscribed."; })
        .catch(() => { if (status) status.textContent = "Something went wrong. Please try again."; })
        .finally(() => { btn.disabled = false; btn.textContent = orig; });
    });
  });

  /* ── Get Involved image-card pop-in ─────────────────── */
  (() => {
    const cards = root.querySelectorAll(".vv-involve-card");
    if (!cards.length) return;
    if (!("IntersectionObserver" in window)) { cards.forEach(card => card.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.18 });
    cards.forEach(card => observer.observe(card));
  })();

  return root;
};
