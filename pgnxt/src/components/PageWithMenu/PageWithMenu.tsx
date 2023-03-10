import React from 'react';

import { MainMenu } from '../../containers/MainMenu';
import { Footer } from '../Footer';

interface PageWithMenuProps {
  children?: React.ReactNode;
}

const PageWithMenu: React.FC<PageWithMenuProps> = ({ children }) => (
  <>
    <MainMenu />
    {children}
    <Footer />
  </>
);

PageWithMenu.defaultProps = {
  children: null,
};

export default PageWithMenu;
