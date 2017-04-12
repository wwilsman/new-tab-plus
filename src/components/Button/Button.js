import React, { PropTypes } from 'react';
import './Button.css';

const Button = ({ unimportant, ...props }) => (
  <button
      className={[
        'Button',
        !!unimportant && 'Button--unimportant'
      ].filter(Boolean).join(' ')}
      {...props}
  />
);

Button.propTypes = {
  unimportant: PropTypes.bool
};

export default Button;
