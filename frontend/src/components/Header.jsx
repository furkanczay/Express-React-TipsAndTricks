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
            <div className="logSign">
                <Link to='#' className='logIn'>Giriş Yap</Link>
                <Link to='#' className='signUp'>Üye Ol</Link>
            </div>

        </header>
    )
}