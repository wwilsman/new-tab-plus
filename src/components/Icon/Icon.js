import React from 'react';

const Icon = ({
  name,
  lg,
  x2,
  x3,
  x4,
  x5,
  fixed,
  spin
}) => (
  <span
      className={[
        'fa',
        `fa-${name}`,
        !!lg && 'fa-lg',
        !!x2 && 'fa-2x',
        !!x3 && 'fa-3x',
        !!x4 && 'fa-4x',
        !!x5 && 'fa-5x',
        !!fixed && 'fa-fw',
        !!spin && 'fa-spin'
      ].filter(Boolean).join(' ')}
  />
);

export default Icon
