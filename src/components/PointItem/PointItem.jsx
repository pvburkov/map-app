import './PointItem.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Button from '../Button/Button';

/**
 * Stateless 'PointItem' component 
 */
const PointItem = ({
    deletePoint,
    id,
    index,
    pointName,
}) => {
    return (
        <Draggable
            draggableId={id}
            index={index}
        >
            {(provided) => (
                <div
                    className="point"
                    draggable="true"
                    id={id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {pointName}
                    <Button
                        className="close-btn"
                        onClick={deletePoint}
                    ></Button>
                </div>
            )}
        </Draggable>
    );
};

PointItem.propTypes = {
    deletePoint: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    pointName: PropTypes.string.isRequired,
};

export default PointItem;
