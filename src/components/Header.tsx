import styled from 'styled-components';
import Logo from "./Logo.tsx";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo />
    </HeaderContainer>
  );
}

export default Header;