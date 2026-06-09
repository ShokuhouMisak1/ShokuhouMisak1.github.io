// Shadowed copy of gatsby-theme-academic's Header.
// Changes from the theme original:
//   - "Research" and "Posts" nav links commented out (hidden for now)
//   - Search icon / search bar removed
// Everything else (About, Experience, dark-mode toggle) is unchanged.
//
// Imports use the '@' alias, which gatsby-plugin-alias-imports maps to the
// theme's src directory. That makes them resolve correctly from this shadow
// location (plain relative imports would resolve against this folder instead).
//
// To restore Research/Posts/search later, uncomment the marked blocks below
// (or just delete this whole file to fall back to the theme default).

import 'rsuite/dist/rsuite.min.css';
import '@/styles/global.less';
import '@/styles/github-markdown.less';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
import '@/styles/prismjs.less';
import 'typeface-jetbrains-mono';
import 'katex/dist/katex.min.css';

import { useLocation } from '@gatsbyjs/reach-router';
import { Link, withPrefix } from 'gatsby';
import { startsWith } from 'lodash';
import React, { useState } from 'react';
import {
  IconButton, Tooltip, Container, Header, Whisper,
} from 'rsuite';

import { useWindowSize, useTheme } from '@/utils/hooks';
import Affix from '@/components/Affix';
import Icon from '@/components/Icon';
// Search disabled:
// import LoadableSearch from '@/components/SearchBar/loadable';

import * as style from '@/components/PageLayout/Header/header.module.less';

const ThemeModeSwitch = () => {
  const [themeMode, setThemeMode] = useTheme();
  const nextThemeMode = themeMode === 'light' ? 'dark' : 'light';

  const toggleTheme = () => {
    setThemeMode(nextThemeMode);
  };

  const tooltip = (
    <Tooltip>
      {`Switch to ${nextThemeMode} mode`}
    </Tooltip>
  );

  return (
    <Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
      <IconButton
        size="sm"
        appearance="subtle"
        icon={<Icon size="lg" icon={themeMode === 'light' ? 'sun' : 'moon'} fixedWidth />}
        onClick={toggleTheme}
      />
    </Whisper>
  );
};

const NavButton = (props) => {
  const {
    onClick,
    to,
    children,
    partiallyActive,
  } = props;

  const location = useLocation();
  const prefixedTo = withPrefix(to);
  const encodedHref = encodeURI(prefixedTo);
  const isCurrent = location.pathname === encodedHref;
  const isPartiallyCurrent = startsWith(location.pathname, encodedHref);
  const showPrimary = partiallyActive ? isPartiallyCurrent : isCurrent;
  const appearance = showPrimary ? 'primary' : 'subtle';

  return (
    <li className={style.navItem}>
      <Link
        className={`rs-btn rs-btn-lg rs-btn-${appearance}`}
        to={to}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

export default () => {
  const [menu, setMenu] = useState(false);

  const [width] = useWindowSize();
  const toggleMenu = () => {
    if (width !== 0 && width <= 768) {
      if (menu) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    }
  };

  return (
    <Affix top={0}>
      <Header>
        <div
          className={style.circleMenu}
          role="button"
          tabIndex="0"
          onKeyDown={toggleMenu}
          onClick={toggleMenu}
        >
          <div className={`${style.hamburger} ${menu ? style.menuIcon : null}`}>
            <div className={style.line} />
            <div className={style.line} />
            <div className={style.hamburgerText}>MENU</div>
          </div>
        </div>
        <Container className={`${style.navWrap} ${menu ? null : style.hidden} ${menu ?
          style.openMenu :
          null}`}
        >
          <div className={style.backgroundDiv}>
            <ul className={style.nav}>
              <NavButton to="/" onClick={toggleMenu}>About</NavButton>
              <NavButton to="/experience/" onClick={toggleMenu} partiallyActive>Experience</NavButton>
              {/* Research and Posts hidden for now — uncomment to restore:
              <NavButton to="/research/" onClick={toggleMenu} partiallyActive>Research</NavButton>
              <NavButton to="/posts/" onClick={toggleMenu} partiallyActive>Posts</NavButton>
              */}
              <li className={style.navItem}>
                <ThemeModeSwitch />
              </li>
              {/* Search disabled — uncomment to restore:
              <li className={style.navItem} style={{ marginLeft: '1rem' }}>
                <LoadableSearch
                  isSearchBarExpanded={isSearchBarExpanded}
                  handleSearchBarToggle={collapseSearch}
                />
                {isSearchBarExpanded
                  ? <Icon icon="times" fixedWidth />
                  : <Icon icon="search" fixedWidth onMouseDown={expandSearch} />}
              </li>
              */}
            </ul>
          </div>
        </Container>
      </Header>
    </Affix>
  );
};
