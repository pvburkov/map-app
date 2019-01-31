import './TextInput.css';

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Stateless 'TextInput' component
 */
const TextInput = ({
    className,
    handleKeyPress,
}) => {
    return (
        <input
            className={className}
            onKeyPress={handleKeyPress}
            maxLength="40"
            type="text"
        >
        </input>
    );
};

TextInput.propTypes = {
    className: PropTypes.string,
    handleKeyPress: PropTypes.func.isRequired,
};

export default TextInput;
