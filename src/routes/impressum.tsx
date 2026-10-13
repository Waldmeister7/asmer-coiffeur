import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/asmer-shell';
import { business } from '@/lib/asmer';

export const Route = createFileRoute('/impressum')({
  head: () => ({ meta: [
    { title: 'Impressum – Asmer Coiffeur Sargans' },
    { name: 'description', content: 'Kontakt und Anbieterinformationen von Asmer Coiffeur in Sargans.' },
    { property: 'og:title', content: 'Impressum – Asmer Coiffeur Sargans' },
    { property: 'og:description', content: 'Anbieterinformationen und Kontakt von Asmer Coiffeur.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: '/impressum' },
  ], links: [{ rel: 'canonical', href: '/impressum' }] }),
  component: Impressum,
});
function Impressum() {
  return <><Header /><main id="hauptinhalt" className="legal-page container-asmer"><span className="eyebrow">Asmer Coiffeur</span><h1>Impressum</h1><h2>Kontakt</h2><p>Asmer Coiffeur<br />Pizolstrasse 4<br />7320 Sargans, Schweiz<br /><a href={business.phoneHref}>078 323 00 60</a></p><h2>Anbieterinformationen noch zu ergänzen</h2><p>Der vollständige rechtliche Name der Inhaberschaft, die Rechtsform und gegebenenfalls Handelsregisterangaben wurden noch nicht mitgeteilt. Diese Angaben sind vor Veröffentlichung zu ergänzen. Bei Fragen erreichst du Asmer telefonisch.</p><h2>Bildhinweis</h2><p>Die gekennzeichneten Konzeptbilder sind KI-generierte Platzhalter. Sie zeigen weder den tatsächlichen Salon noch das Team oder echte Arbeiten von Asmer Coiffeur.</p></main><Footer /></>;
}