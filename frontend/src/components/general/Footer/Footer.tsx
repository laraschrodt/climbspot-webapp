/**
 * Fußzeilen-Komponente der Webanwendung.
 *
 * Kontext:
 * Wird am unteren Rand jeder Seite angezeigt.
 *
 * Funktion:
 * - Zeigt ein statisches Dankeschön und die Namen der Entwickler:innen an.
 * - Nutzt Tailwind-Klassen zur responsiven Darstellung und Gestaltung.
 */

const Footer: React.FC = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-green-900 p-4 text-base-100">
      <aside>
        <p className="mt-4">
          Diese tolle Website wurde erstellt von Nelly, Alex, Kimia und Lara ♥
        </p>
      </aside>
    </footer>
  );
};
export default Footer;
