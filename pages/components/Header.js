const Header = () => {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="#"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            HOME
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/abouts" className="nav-link x-2 text-white">
                About
              </a>
            </li>
            <li>
              <a href="/insurances" className="nav-link px-2 text-white">
                Insurances
              </a>
            </li>
            <li>
              <a href="/organizations" className="nav-link px-2 text-white">
                Organazitions
              </a>
            </li>
            <li>
              <a href="/invoices" className="nav-link px-2 text-white">
                Invoices
              </a>
            </li>

            <li>
              <a href="/expenses" className="nav-link px-2 text-white">
                Expenses
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Calendar
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Login
            </button>
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
