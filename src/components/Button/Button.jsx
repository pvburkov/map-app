import '../Button/Button.css';

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Stateless configurable 'Button' component
 */
const Button = ({
    className,
    onClick
}) => (
    <button 
        className={className}
        onClick={onClick}
    >
    </button>
);

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default Button;
