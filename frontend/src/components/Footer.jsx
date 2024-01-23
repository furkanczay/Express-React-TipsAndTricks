import { Link } from 'react-router-dom';

export default function Footer() {
    
    return (
        <>
            <footer className="footerMenu">
                <div className="footerTop">
                    <div className="ttLogo">
                        <Link to='/'><h1>Tips & Tricks</h1></Link>
                    </div>
                    <div className="navBar">
                        <Link to='/' className='navs'>Anasayfa</Link>
                        <Link to='#' className='navs'>Arama</Link>
                        <Link to='#' className='navs'>Hakkımızda</Link>
                        <Link to='#' className='navs'>İletişim</Link>
                    </div>
                </div>
                <div className="footerBottom">
                    <div className="policy">
                        <Link href={'#'} className='policyLink'>Gizlilik Politikası</Link>
                        <Link href={'#'} className='policyLink'>Şartlar ve Koşullar</Link>
                    </div>
                    <form className="subscribe">
                        <input type="email" placeholder='Mail adresi giriniz' />
                        <button>Abone Ol</button>
                    </form>
                </div>
            </footer>
        </>
    )
}