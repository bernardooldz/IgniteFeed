import './Header.css'
import IgniteLogo from '../assets/ignite-logo.svg'

export function Header() {
    return (
        <header className="header">
            <img src={IgniteLogo} alt="Logotipo do Ignite" />
        </header>
    )
}