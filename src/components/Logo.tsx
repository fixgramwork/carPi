import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #007AFF;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
  }
`;

function Logo() {
    const Navigate = useNavigate();

    return (
        <LogoText onClick={() => Navigate('/')}>
            Carpi
        </LogoText>
    );
}

export default Logo;