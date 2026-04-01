// --- FooterListItem Fix ---
import Link from "next/link";

export const FooterListItem = ({
  href, // Yahan 'to' ki jagah 'href' karein
  children,
  onClick,
  className = "",
  bullets = ""
}) => (
  <li className={`list-outside font-serif ${bullets}`}>
    <Link
      href={href} // Check lagayein taake undefined na ho
      onClick={onClick}
      className={`transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  </li>
);