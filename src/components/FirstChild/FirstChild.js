import { Children } from 'react';

const FirstChild = ({ children }) => (
  Children.toArray(children)[0] || null
);

export default FirstChild;
