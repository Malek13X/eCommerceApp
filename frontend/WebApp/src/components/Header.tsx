import { Link } from "react-router-dom"
import { ButtonUnstyled } from "@mui/base"

function Header() {
  return (
    <header className="header">
        <div className="title"> 
            <Link to='/'>eCommerce App</Link>
        <ButtonUnstyled id="btn-1" slots={{root: 'button'}}>Click Me!</ButtonUnstyled>
        </div>
    </header>
  )
}

export default Header