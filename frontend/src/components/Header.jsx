import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header className='mainHeader'>
            <Link to='/'><h1>Tips & Tricks</h1></Link>
            <div className="navBar">
                <Link to='/' className='navs'>Anasayfa</Link>
                <Link to='#' className='navs'>Arama</Link>
                <Link to='#' className='navs'>Hakkımızda</Link>
                <Link to='#' className='navs'>İletişim</Link>
            </div>
            <div className="login">
                <Link to='/signInUp' className='logIn'>signIn/Up</Link>
            </div>
        </header>
    )
}