import './Logo.css'

function Logo() {

    const LogoHandleClick = () => {
        window.location.reload();
    }

    return(
        <>
            <div id='Logo' onClick={LogoHandleClick}>CarPi</div>
        </>
    )
}
export default Logo