import styled from 'styled-components'
import HRnet from '../assets/HRnet.png'

const LogoContainer = styled.div`
display: flex;
justify-content: center;
padding: 0;
margin: 0;
`
const Logo = styled.img`
  width: 200px;`

export function Navbar() {
  return (
          <>
    <LogoContainer>
    <Logo src={HRnet} alt="HRnet" />
    </LogoContainer>
    </>
  )
}

