import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Phone, MapPin, Menu, X, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { business } from '@/lib/asmer';

export function Brand() {
  return <a className="brand" href="/" aria-label="Asmer Coiffeur – Startseite">
    <svg className="brand-symbol" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M8 9h14v31H8zM6 6h18M6 43h18M8 20l14-8M8 30l14-8M8 40l14-8M12 3h6M12 47h6" /></svg>
    <span><span className="brand-name">ASMER</span><span className="brand-sub">C O I F F E U R</span></span>
  </a>;
}

export function CallButton({ children = 'Jetzt anrufen', className = '' }: { children?: React.ReactNode; className?: string }) {
  return <Button variant="gold" asChild className={className}><a href={business.phoneHref}><Phone aria-hidden="true" />{children}</a></Button>;
}
export function RouteButton({ children = 'Route planen' }: { children?: React.ReactNode }) {
  return <Button variant="quiet" asChild><a href={business.directions} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" />{children}</a></Button>;
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const nav = [['Leistungen', 'leistungen'], ['Über uns', 'handwerk'], ['Galerie', 'galerie'], ['Bewertungen', 'bewertungen'], ['Kontakt', 'kontakt']];
  return <>
    <a href="#hauptinhalt" className="skip-link">Zum Inhalt</a>
    <header className="site-header"><div className="container-asmer header-inner"><Brand />
      <nav className="desktop-nav" aria-label="Hauptnavigation">{nav.map(([name,id]) => <Button variant="nav" asChild key={id}><a href={`/#${id}`}>{name}</a></Button>)}<CallButton className="header-cta">Termin anrufen</CallButton></nav>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menu ? 'Menü schliessen' : 'Menü öffnen'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
    </div>{menu && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile Navigation">{nav.map(([name,id]) => <Button variant="nav" asChild key={id}><a href={`/#${id}`} onClick={() => setMenu(false)}>{name}</a></Button>)}<CallButton>Termin anrufen</CallButton></nav>}</header>
    <div className="mobile-bottom" aria-label="Schnellkontakt"><CallButton>Anrufen</CallButton><RouteButton>Route</RouteButton></div>
  </>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container-asmer">
    <div className="footer-top"><div><Brand /><p className="footer-text mt-4">Präzision. Ruhe. Dein Style.</p></div>
      <div><p className="footer-title">Hier findest du uns</p><p className="footer-text">Pizolstrasse 4<br />7320 Sargans</p></div>
      <div><p className="footer-title">Öffnungszeiten</p><p className="footer-text">Mo–Do 09:00–19:00<br />Fr 09:00–20:00 · Sa 09:00–17:00<br />Sonntag geschlossen</p></div>
      <div><p className="footer-title">Bleib in Verbindung</p><p className="footer-text"><a href={business.phoneHref}>{business.phone}</a></p><Button variant="nav" asChild><a href={business.instagram} target="_blank" rel="noopener noreferrer"><Instagram aria-hidden="true" />Instagram</a></Button></div>
    </div><div className="footer-bottom"><span>© Asmer Coiffeur · Sargans</span><div className="footer-legal"><Link to="/impressum">Impressum</Link><Link to="/datenschutz">Datenschutz</Link><a href="/#kontakt">Kontakt</a></div></div>
  </div></footer>;
}