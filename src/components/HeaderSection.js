import React from 'react';
import './css/HeaderSection.css';

function HeaderSection({ title, color = 'white' }) {
  return (
    <div className={`sixteen wide column ${color}  `}>
      <h1 align="center">{title}</h1>
    </div>
  );
}
export default HeaderSection;
