import "./Header.css";
import Button from "@mui/material/Button";

function Header() {
  return (
    <header class="header sticky-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div class="container">
          <a class="navbar-brand">
            <strong class="h6 mb-0 font-weight-bold text-uppercase">
              Car Damage Assessment
            </strong>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
