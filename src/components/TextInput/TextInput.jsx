import './TextInput.css';

import PropTypes from 'prop-types';
import React from 'react';

import CONSTANTS from '../../constants/constants';

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
            maxLength={CONSTANTS.textInput.maxLength}
            placeholder={CONSTANTS.textInput.placeholder}
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
