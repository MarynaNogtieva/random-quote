import React from 'react';

const Header = (props) => (
  <div>
    <div className='header'>
      <h1 className='header__title'>{ props.mainTitle }</h1>
      <h2 className='header__subtitle'>{ props.subTitle }</h2>
    </div>
  </div>
)

export default Header;