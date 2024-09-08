import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <nav className="nav d-flex justify-content-center my-5">
      <input
        type="search"
        className="form-control w-25"
        placeholder="Stock name"
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
        }}
      />
      <Link
        to={`/search-${searchVal}`}
        className={`btn btn-outline-primary ${!searchVal ? "disabled" : ""}`}
      >
        Search
      </Link>
    </nav>
  );
}

export default Navbar;
