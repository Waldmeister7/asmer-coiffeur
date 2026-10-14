import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Clock3, Heart, Instagram, MapPin, MessageCircle, Phone, Scissors, ShieldCheck, Sparkles, Star, Wallet, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Header, Footer, CallButton, RouteButton } from '@/components/asmer-shell';
import { business, getOpeningStatus, hours, services, reviewQuotes } from '@/lib/asmer';
import salonAsset from '@/assets/asmer-salon.png.asset.json';
import beardAsset from '@/assets/asmer-beard.png.asset.json';
import cutAsset from '@/assets/asmer-cut.png.asset.json';
import scissorsAsset from '@/assets/asmer-scissors.png.asset.json';
import barberAsset from '@/assets/asmer-barber.png.asset.json';

const title = 'Asmer Coiffeur – Barber in Sargans';
const description = 'Dein Barber in Sargans: saubere Fades, präzise Schnitte und entspannte Atmosphäre. Herren und Damen willkommen. Pizolstrasse 4. Termin: 078 323 00 60.';
export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: '/' }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'keywords', content: 'Barber Sargans, Coiffeur Sargans, Fade Sargans, Herrenschnitt Sargans, Bartpflege Sargans' }],
    links: [{ rel: 'canonical', href: '/' }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'HairSalon', name: business.name, telephone: '+41783230060',
      address: { '@type': 'PostalAddress', streetAddress: business.address, postalCode: '7320', addressLocality: 'Sargans', addressCountry: 'CH' },
      sameAs: [business.instagram], aggregateRating: { '@type': 'AggregateRating', ratingValue: 5, reviewCount: 50, bestRating: 5 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '20:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' },
      ],
    }) }],
  }), component: Index,
});

function Stars() { return <span className="stars" aria-label="5 von 5 Sternen">{Array.from({length:5}, (_,i) => <Star key={i} aria-hidden="true" />)}</span>; }
const gallery = [
  { photo: beardAsset.url, title: 'Klare Bartkonturen', alt: 'Kunde mit präzise geschnittenen Bartkonturen im Salon', width: 279, height: 343 },
  { photo: scissorsAsset.url, title: 'Mit ruhiger Hand', alt: 'Barber schneidet mit der Schere die Haare eines Kunden', width: 513, height: 789 },
  { photo: cutAsset.url, title: 'Dein neuer Schnitt', alt: 'Haarschnitt von hinten mit kurzem Nacken und längerem Deckhaar', width: 516, height: 672 },
  { photo: salonAsset.url, title: 'Willkommen bei Asmer', alt: 'Asmer Salon mit drei Barberstühlen, Spiegeln und geometrischer Deckenbeleuchtung', width: 733, height: 915 },
];

function Index() {
  const hero = useRef<HTMLImageElement>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const opening = now ? getOpeningStatus(now) : null;
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal');
    let observer: IntersectionObserver | undefined;
    if (!reduced) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer?.unobserve(entry.target); }
      }), { threshold: 0.08 });
      elements.forEach(el => { el.classList.add('reveal-ready'); observer?.observe(el); });
    }
    let frame = 0;
    const parallax = () => {
      if (reduced || frame) return;
      frame = window.requestAnimationFrame(() => {
        if (hero.current && window.scrollY < window.innerHeight) hero.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
        frame = 0;
      });
    };
    window.addEventListener('scroll', parallax, { passive: true });
    return () => { window.clearInterval(timer); observer?.disconnect(); window.removeEventListener('scroll', parallax); window.cancelAnimationFrame(frame); };
  }, []);
  const icons = [Scissors, Wind, ShieldCheck, Scissors, Sparkles, Heart];
  const activePhoto = selectedPhoto === null ? null : gallery[selectedPhoto];
  return <><Header /><main id="hauptinhalt">
    <section className="hero" aria-label="Asmer Coiffeur in Sargans">
      <img ref={hero} className="hero-photo" src={salonAsset.url} alt="Der Salon von Asmer Coiffeur in Sargans mit Barberstühlen und beleuchteten Spiegeln" width={733} height={915} fetchPriority="high" />
      <div className="hero-bottom-shade" />
      <div className="container-asmer hero-content">
        <p className="hero-location"><MapPin size={13} aria-hidden="true" />SARGANS · BARBER & COIFFEUR</p>
        <h1>Asmer Coiffeur.<br /><em>Herzlich willkommen.</em></h1>
        <p className="hero-sub">Ein guter Schnitt. Ein entspanntes Gespräch.<br />Wir nehmen uns Zeit für deinen Look. Hier in Sargans.</p>
        <div className="hero-actions"><CallButton /><Button variant="quiet" asChild><a href="#leistungen">Leistungen ansehen<ArrowUpRight aria-hidden="true" /></a></Button></div>
        <a className="hero-rating" href={business.reviews} target="_blank" rel="noopener noreferrer"><Stars /><span><strong>5.0</strong> · 50 Google-Bewertungen</span><ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>
      <a className="hero-scroll" href="#leistungen">UNSEREN SALON ENTDECKEN<ArrowDown aria-hidden="true" /></a>
    </section>
    <div className="trust-strip"><div className="container-asmer trust-inner">{[[Scissors,'Präzise Konturen'],[MessageCircle,'Wir hören zu'],[Clock3,'Pünktlich & professionell'],[Wallet,'Fairer Preis']].map(([Icon,label]) => {
      const TrustIcon = Icon as typeof Scissors;
      return <div className="trust-item" key={String(label)}><TrustIcon aria-hidden="true" /><span>{String(label)}</span></div>;
    })}</div></div>
    <section id="leistungen" className="section"><div className="container-asmer">
      <div className="section-top reveal"><div><span className="eyebrow">UNSERE LEISTUNGEN</span><h2 className="section-heading">Was darf es<br /><em>für dich sein?</em></h2></div><p className="section-copy max-w-80">Kein Schnitt von der Stange.<br />Sondern einer, der zu dir passt.</p></div>
      <div className="service-grid">{services.map((service,index) => { const Icon = icons[index] ?? Scissors; return <article className="service-card reveal" key={service.name}><div className="service-card-top"><Icon aria-hidden="true" /><span className="service-number">0{index+1}</span></div><h3>{service.name}</h3><p>{service.text}</p></article>; })}</div>
      <p className="note">Für Bartpflege, Schnitt & Bart oder Styling ruf uns bitte an und frage nach dem passenden Angebot.</p>
    </div></section>
    <section id="handwerk" className="section craft-section"><div className="container-asmer craft-grid">
      <div className="craft-photo reveal"><img src={barberAsset.url} width={517} height={870} loading="lazy" alt="Ein Barber von Asmer arbeitet mit Kamm am Haarschnitt eines Kunden" /></div>
      <div className="craft-copy reveal"><span className="eyebrow">BEI ASMER</span><h2 className="section-heading">Wir hören zu.<br /><em>Dann schneiden wir.</em></h2><p className="section-copy">Bevor wir zur Schere greifen, hören wir dir zu. Wie trägst du dein Haar? Was soll anders werden? Wir nehmen uns Zeit und schneiden so, wie du es dir wünschst – mit sauberen Übergängen und einem gepflegten Finish. Dabei darfst du einfach abschalten.</p><p className="craft-quote">«Genau so, wie du es dir<br />vorgestellt hast.»</p><p className="welcome"><Heart aria-hidden="true" />Herren und Damen sind bei uns herzlich willkommen.</p><Button variant="nav" asChild className="mt-6"><a href="#kontakt">Lerne uns kennen<ArrowUpRight aria-hidden="true" /></a></Button></div>
    </div></section>
    <section id="galerie" className="section"><div className="container-asmer">
      <div className="section-top reveal"><div><span className="eyebrow">EINBLICKE</span><h2 className="section-heading">Schnitte. Menschen.<br /><em>Unser Salon.</em></h2></div><Button variant="nav" asChild><a href={business.instagram} target="_blank" rel="noopener noreferrer"><Instagram aria-hidden="true" />Mehr auf Instagram<ArrowUpRight aria-hidden="true" /></a></Button></div>
      <div className="gallery-grid reveal">{gallery.map((image,index) => <Button variant="ghost" className="gallery-image" key={image.title} aria-label={`${image.title} – Foto vergrössern`} onClick={() => setSelectedPhoto(index)}><img src={image.photo} alt={image.alt} loading="lazy" width={image.width} height={image.height} /><span className="gallery-title">{image.title}</span><ArrowUpRight className="gallery-arrow" aria-hidden="true" /></Button>)}</div>

    </div></section>
    <section id="bewertungen" className="section reviews-section"><div className="container-asmer">
      <div className="reviews-heading reveal"><span className="eyebrow">EURE STIMMEN</span><h2 className="section-heading">Sagen unsere <em>Kunden.</em></h2><div className="rating-big"><strong>5.0</strong><div className="rating-info"><Stars /><p>50 Google-Bewertungen</p></div></div></div>
      <div className="review-grid">{reviewQuotes.map(quote => <article className="review-card reveal" key={quote}><Stars /><blockquote>«{quote}»</blockquote><p className="review-source"><span className="google-g" aria-hidden="true">G</span>Google-Bewertung · sinngemäss gekürzt</p></article>)}</div>
      <div className="reviews-bottom"><Button variant="quiet" asChild><a href={business.reviews} target="_blank" rel="noopener noreferrer">Alle Bewertungen auf Google<ArrowUpRight aria-hidden="true" /></a></Button></div>
    </div></section>
    <section id="kontakt" className="section"><div className="container-asmer contact-grid">
      <div className="reveal"><span className="eyebrow">KOMM VORBEI</span><h2 className="section-heading">Ein Anruf.<br /><em>Dein neuer Look.</em></h2><a className="contact-number" href={business.phoneHref}><Phone aria-hidden="true" />{business.phone}</a><p className="section-copy">Sag uns, was du dir wünschst.<br />Deinen Termin vereinbaren wir persönlich.</p><div className="contact-address"><MapPin aria-hidden="true" /><p>Asmer Coiffeur<br />Pizolstrasse 4, 7320 Sargans</p></div>
        <div className="hours-heading"><span>Öffnungszeiten</span><span className={`open-status ${opening?.isOpen ? 'is-open' : ''}`} aria-live="polite"><span className="status-dot" />{opening ? opening.isOpen ? 'Jetzt geöffnet' : 'Geschlossen' : 'Zeit wird geprüft'}</span></div>
        <table className="hours-table"><caption className="sr-only">Öffnungszeiten in Schweizer Ortszeit</caption><tbody>{hours.map((row,index) => <tr key={row.day} className={opening?.index === index ? 'today' : ''}><td>{row.day}{opening?.index === index && <span className="today-label">HEUTE</span>}</td><td>{row.open === null ? 'Geschlossen' : `${String(row.open).padStart(2,'0')}:00–${row.close}:00`}</td></tr>)}</tbody></table><p className="note">Reguläre Öffnungszeiten · Schweizer Ortszeit. Feiertagszeiten bitte telefonisch erfragen.</p>
      </div>
      <div className="contact-map reveal">{mapLoaded ? <iframe title="Google Maps: Asmer Coiffeur, Pizolstrasse 4, Sargans" src="https://www.google.com/maps?q=Pizolstrasse%204%2C%207320%20Sargans&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : <div className="map-consent"><MapPin aria-hidden="true" /><h3>Wir sind in Sargans.</h3><p>Pizolstrasse 4, 7320 Sargans<br />Beim Laden der Karte werden Daten an Google übertragen.</p><Button variant="quiet" onClick={() => setMapLoaded(true)}><MapPin aria-hidden="true" />Google-Karte laden</Button></div>}
        <div className="map-actions"><RouteButton /><Button variant="nav" asChild><a href={business.instagram} target="_blank" rel="noopener noreferrer"><Instagram aria-hidden="true" />@asmer_coiffeur_<ArrowUpRight aria-hidden="true" /></a></Button></div>
        <CallButton className="mt-6">Termin anrufen</CallButton>
      </div>
    </div></section>
    <section className="final-cta"><div className="container-asmer reveal"><span className="eyebrow">BIS BALD BEI ASMER</span><h2>Bereit für deinen<br /><em>besten Schnitt?</em></h2><p className="section-copy">Nimm Platz. Wir kümmern uns um den Rest.</p><div className="final-actions"><CallButton /><RouteButton>Route</RouteButton></div><a className="final-proof" href={business.reviews} target="_blank" rel="noopener noreferrer"><Stars />5.0 · 50 Google-Bewertungen</a></div></section>
  </main><Footer />
  <Dialog open={activePhoto !== null} onOpenChange={open => { if (!open) setSelectedPhoto(null); }}><DialogContent className="lightbox"><DialogTitle>{activePhoto?.title}</DialogTitle><DialogDescription>Einblicke in unsere Arbeit und unseren Salon in Sargans.</DialogDescription>{activePhoto && <img src={activePhoto.photo} alt={activePhoto.alt} width={activePhoto.width} height={activePhoto.height} />}</DialogContent></Dialog>
  </>;
}
