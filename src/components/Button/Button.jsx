import '../Button/Button.css';

import React from 'react';
import PropTypes from 'prop-types';

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
