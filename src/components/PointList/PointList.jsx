import './PointList.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import PointItem from '../PointItem/PointItem';

/**
 * Stateless 'PointList' component (container for points) 
 */
const PointList =  ({
    className,
    deletePoint,
    points,
}) => (
    <Droppable droppableId="point-list-dropzone">
        {(provided) => (
            <div
                className={className}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {points.map((point, index) => (    
                    <PointItem
                        deletePoint={() => deletePoint(point.id)}
                        id={point.id}
                        index={index}
                        key={index}
                        pointName={point.name}
                    />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

PointList.propTypes = {
    className: PropTypes.string,
    deletePoint: PropTypes.func.isRequired,
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PointList;
