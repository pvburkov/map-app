import './PointList.css';

import { Droppable } from 'react-beautiful-dnd';
import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import PointItem from '../PointItem/PointItem';

const PointList =  ({
    className,
    deletePoint,
    points,
}) => (
    <Droppable droppableId={uniqid()}>
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
