import './PointItem.css';

import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

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
