import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px 50px;
  overflow-y: auto;
`;

function Layout() {
  return (
    <div>
      <Navbar />
      <LayoutContainer>
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer/>
      </LayoutContainer>
    </div>
  );
}

export { Layout };
