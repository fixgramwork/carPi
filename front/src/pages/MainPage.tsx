import './MainPage.css';
import arrowIcon from '../assests/arrow.svg';
import mouseBack from '../assests/mouse.jpeg';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="main-page">
                <div id='shadow'>
                    <div id="slogan">
                        All in <span id="carpi" onClick={() => navigate('/Result')}> CarPi </span>
                    </div>
                    <div className="description">Life Better, Nice Wrist.</div>
                    <div id='btn-container'>
                        <button id="btn" onClick={() => navigate('/Camera')}> 기능 메뉴로 가기
                            <img src={arrowIcon} alt="화살표" />
                        </button>
                    </div>
                </div>
                <img src={mouseBack} alt="Mouse Background" id="mouse" />
            </div>
        </>
    );
}

export default MainPage;
