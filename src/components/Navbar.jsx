import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
    const [serachVal, setSerachVal] = useState("")
    return (
        <nav className="nav d-flex justify-content-center my-5">
            <input type="search" className="form-control w-25" placeholder="stock name" onChange={(e) => { setSerachVal(e.target.value) }} />
            <Link to={`/search-${serachVal}`} className="btn btn-outline-primary">search</Link>
        </nav>
    )
}
export default Navbar

