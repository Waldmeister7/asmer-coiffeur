import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/asmer-shell';
import { business } from '@/lib/asmer';

export const Route = createFileRoute('/datenschutz')({
  head: () => ({ meta: [
    { title: 'Datenschutz – Asmer Coiffeur Sargans' },
    { name: 'description', content: 'Informationen zu Datenschutz, externen Diensten und Kontakt bei Asmer Coiffeur.' },
    { property: 'og:title', content: 'Datenschutz – Asmer Coiffeur Sargans' },
    { property: 'og:description', content: 'Informationen zum Umgang mit Daten auf der Website von Asmer Coiffeur.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: '/datenschutz' },
  ], links: [{ rel: 'canonical', href: '/datenschutz' }] }),
  component: Datenschutz,
});
function Datenschutz() {
  return <><Header /><main id="hauptinhalt" className="legal-page container-asmer"><span className="eyebrow">Asmer Coiffeur</span><h1>Datenschutz</h1><p>Diese Hinweise beschreiben die auf dieser Website verwendeten Dienste. Die vollständigen Angaben zur verantwortlichen Inhaberschaft sowie Hosting-Anbieter und Aufbewahrungsfristen sind vor Veröffentlichung zu ergänzen und rechtlich zu prüfen.</p><h2>Kontakt und deine Rechte</h2><p>Asmer Coiffeur, Pizolstrasse 4, 7320 Sargans. Bei Fragen zur Bearbeitung deiner Daten oder zur Auskunft und Berichtigung erreichst du uns unter <a href={business.phoneHref}>078 323 00 60</a>. Die vollständige rechtliche Bezeichnung der verantwortlichen Person ist noch zu ergänzen.</p><h2>Besuch der Website</h2><p>Beim Aufrufen einer Website können technische Verbindungsdaten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browserinformationen beim Hosting-Anbieter verarbeitet werden, um die Seite auszuliefern und abzusichern. Einzelheiten zum eingesetzten Hosting und zu den Speicherfristen sind noch zu bestätigen. Die Seite enthält kein eigenes Kontaktformular und setzt selbst keine Analyse- oder Werbe-Cookies.</p><h2>Google Fonts</h2><p>Die Schriftarten werden von Google Fonts geladen. Dabei erhält Google technische Verbindungsdaten, insbesondere deine IP-Adresse. Eine Verarbeitung ausserhalb der Schweiz kann stattfinden. Weitere Informationen findest du in der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.</p><h2>Google Maps und externe Links</h2><p>Die eingebettete Karte wird erst geladen, wenn du «Google-Karte laden» auswählst. Dabei werden Verbindungsdaten an Google übertragen. Links zu Google-Bewertungen, zur Routenplanung und zu Instagram öffnen den jeweiligen externen Dienst. Dort gelten die Datenschutzbestimmungen des Anbieters.</p><h2>Telefonische Terminvereinbarung</h2><p>Wenn du anrufst, verwenden wir die von dir mitgeteilten Angaben für deine Anfrage und die Terminvereinbarung. Die geltenden Aufbewahrungsfristen und internen Verfahren sind durch die Inhaberschaft noch zu bestätigen.</p></main><Footer /></>;
}