// project imports
import Logo from '../../Icons/Logo';
import { Link } from 'konsta/react';

export const LogoSection = () => (
  <Link iconOnly linkProps={{ href: '/' }} navbar>
    <Logo withoutText />
  </Link>
);
