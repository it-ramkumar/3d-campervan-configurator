import { Link } from "react-router-dom";

export const FooterListItem = ({
  to,
  children,
  onClick,
  className = "",
  bullets =""
}) => (
  <li className={` list-outside font-serif ${bullets}`}>
    <Link
      to={to}
      onClick={onClick}
      className={` transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  </li>
);
