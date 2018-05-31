import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse } from '../../constants/pathnames';

function getGenreLink(genre) {
  return `${browse}/${genre || DEFAULT_GENRE}`;
}

function Logo() {
  return (
    <div>
      <div className="logo">
        <Link to="/">
          <h1>CyDJ</h1>
        </Link>
      </div>
      <div className="github-link">
        <Link to="http://www.cybervisiontech.com/" target="_blank">
          <p>by CyberVision</p>
        </Link>
      </div>
    </div>
  );
}

function MenuItem({ genre, selectedGenre }) {
  const linkClass = classNames('menu-item', {
    'menu-item-selected': genre === selectedGenre,
  });

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
}


function MenuList({ selectedGenre }) {
  if (!selectedGenre) return null;
  return (
    <div>
      {map((genre, key) => {
        const menuItemProps = { genre, selectedGenre, key };
        return <MenuItem {...menuItemProps} />;
      }, GENRES)}
    </div>
  );
}

function Header({ selectedGenre, }) {
  return (
    <div className="header">
      <div className="header-content">
        <Logo />
        <MenuList selectedGenre={selectedGenre} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedGenre: state.browse.selectedGenre
  };
}


export default connect(mapStateToProps)(Header);
