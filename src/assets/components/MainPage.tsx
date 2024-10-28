import './MainPage.css';
import Header from './Header';
import arrowIcon from './arrow.svg';
import mouseBack from './mouse.jpeg';
import { useState } from 'react';

function MainPage() {
    const [carPiColor, setCarPiColor] = useState('#FFF'); // 기본 색상: 화이트
    const [btnColor, setBtnColor] = useState('#5B74FF'); // 버튼 기본 색상

    const handleMouseEnter = () => {
        setCarPiColor('#5B74FF'); // CarPi 색상 변경
    };

    const handleMouseLeave = () => {
        setCarPiColor('#FFF'); // CarPi 색상 원래대로
    };

    const handleBtnMouseEnter = () => {
        setBtnColor('#3B58FF'); // 버튼 색상 변경
    };

    const handleBtnMouseLeave = () => {
        setBtnColor('#5B74FF'); // 버튼 색상 원래대로
    };

    return (
        <>
            <div className="main-page">
                <Header />
                <div id='shadow'>
                    <div id="slogan">Life Better, Nice Wrist.</div>
                    <div id="slogan">
                        All in <span
                        id="carpi"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ color: carPiColor, transition: 'color 0.3s' }} // CarPi 색상 트랜지션
                    >
                            CarPi
                        </span>
                    </div>
                    <div id='btn-container'>
                        <button
                            id="btn"
                            style={{ background: btnColor, transition: 'background 0.3s', color: '#FFF' }} // 버튼 색상 트랜지션
                            onMouseEnter={handleBtnMouseEnter}
                            onMouseLeave={handleBtnMouseLeave}
                        >
                            기능 메뉴로 가기 <img src={arrowIcon} alt="화살표" />
                        </button>
                    </div>
                </div>
                <img src={mouseBack} alt="Mouse Background" id="mouse" />
            </div>
        </>
    );
}

export default MainPage;
