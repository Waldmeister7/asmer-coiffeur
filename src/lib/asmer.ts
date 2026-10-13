// Edit business details, proposed services and opening hours here.
export const business = {
  name: 'Asmer Coiffeur', phone: '078 323 00 60', phoneHref: 'tel:+41783230060',
  address: 'Pizolstrasse 4', city: '7320 Sargans',
  instagram: 'https://www.instagram.com/asmer_coiffeur_/',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Pizolstrasse+4%2C+7320+Sargans',
  reviews: 'https://www.google.ch/maps/place/Asmer+Coiffeur+-+Sargans/@47.0453895,9.4417663,19.5z/data=!4m8!3m7!1s0x4784cdade2dc8bb5:0x50ad5321bf1be1b!8m2!3d47.0455584!4d9.4418535!9m1!1b1!16s%2Fg%2F11wxjzszrj',
};

export const hours = [
  { day: 'Montag', open: 9, close: 19 },
  { day: 'Dienstag', open: 9, close: 19 },
  { day: 'Mittwoch', open: 9, close: 19 },
  { day: 'Donnerstag', open: 9, close: 19 },
  { day: 'Freitag', open: 9, close: 20 },
  { day: 'Samstag', open: 9, close: 17 },
  { day: 'Sonntag', open: null, close: null },
];

export function getOpeningStatus(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zurich', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const part = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  const index = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(part('weekday'));
  const today = hours[index];
  const minutes = Number(part('hour')) * 60 + Number(part('minute'));
  return { index, isOpen: today?.open != null && today?.close != null && minutes >= today.open * 60 && minutes < today.close * 60 };
}

export const services = [
  { name: 'Haarschnitt', text: 'Ein klarer Schnitt. Auf dich abgestimmt. Mit einem Finish, das sitzt.', icon: 'scissors', confirmed: true },
  { name: 'Fade', text: 'Saubere Übergänge. Präzise Konturen. Bis ins kleinste Detail.', icon: 'fade', confirmed: true },
  { name: 'Bart & Konturen', text: 'Klare Linien und eine Form, die deinen Look unterstreicht.', icon: 'razor', confirmed: false },
  { name: 'Schnitt & Bart', text: 'Ein stimmiger Look. Vom ersten Übergang bis zur letzten Kontur.', icon: 'combo', confirmed: false },
  { name: 'Styling', text: 'Dein Haar. Dein Ausdruck. Der passende Abschluss für deinen Style.', icon: 'styling', confirmed: false },
  { name: 'Damenschnitt', text: 'Dein Wunsch steht im Mittelpunkt. Herzlich willkommen bei Asmer.', icon: 'women', confirmed: true },
];

export const reviewQuotes = [
  'Sauberer Fade, präzise Konturen und immer top Service. Man merkt sofort, dass hier mit Leidenschaft gearbeitet wird.',
  'Einer der besten Haarschnitte seit langem. Er nimmt sich Zeit, hört wirklich zu und liefert genau das Ergebnis, das man sich vorstellt.',
  'Als Frau zum ersten Mal hier – und begeistert. Man fühlt sich sofort willkommen.',
];

