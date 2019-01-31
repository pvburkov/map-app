import './App.css';

import { DragDropContext } from 'react-beautiful-dnd';
import React, { Component } from 'react';
import uniqid from 'uniqid';

import PointList from '../PointList/PointList';
import RouteMap from '../RouteMap/RouteMap';
import TextInput from '../TextInput/TextInput';

import CONSTANTS from '../../constants/constants';

/**
 * Stateful (container) base component for the Map-App
 */
class App extends Component {
    constructor() {
        super();

        this.state = {
            points: [],
        };

        this.currentCenterCoords = CONSTANTS.map.startCenterCoords; // center of a map

        this.deletePoint = this.deletePoint.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePointDragEnd = this.handlePointDragEnd.bind(this);
        this.updateCenterCoords = this.updateCenterCoords.bind(this);
        this.updatePointCoords = this.updatePointCoords.bind(this);
    }

    /**
     * Removing a point from the array of points (and then from the map)
     * @param {string} pointId
     */
    deletePoint(pointId) {
        let deleteIndex = null;
        this.state.points.forEach((point, index) => {
            if (point.id === pointId) {
                deleteIndex = index;
            }
        });

        const filteredPoints = this.state.points.slice();
        filteredPoints.splice(deleteIndex, 1);

        this.setState({
            points: filteredPoints,
        });
    }

    /**
     * Handling of a 'keypress' event on TextInput
     * @param {Event} evt
     */
    handleKeyPress(evt) {
        if (evt.key !== 'Enter' || !evt.currentTarget.value) {
            return;
        }

        const points = this.state.points.slice();

        const point = {
            coordX: this.currentCenterCoords[0],
            coordY: this.currentCenterCoords[1],
            id: uniqid(),
            name: evt.currentTarget.value,
        };

        points.push(point);

        this.setState({
            points: points,
        });

        evt.currentTarget.value = '';
    }

    /**
     * Handling of 'dragEnd' event in PointList
     * @param {object} result Special object with information about drag-n-drop operations
     * ('react-beautiful-dnd' library) 
     */
    handlePointDragEnd(result) {
        const {
            destination,
            source,
        } = result;

        if (!destination || destination.index === source.index) {
            return;
        }

        const flushedPoints = this.state.points.slice();
        const tempPoint = { ...flushedPoints[source.index] };
        flushedPoints.splice(source.index, 1);
        flushedPoints.splice(destination.index, 0, tempPoint);

        this.setState({
            points: flushedPoints,
        });
    }

    /**
     * Updating the coordinates of the map's center
     * @param {number[]} newCoords 
     */
    updateCenterCoords(newCoords) {
        this.currentCenterCoords = newCoords;
    }

    /**
     * Updating coordinates of a point with id=pointId
     * @param {Event} evt 
     * @param {string} pointId 
     */
    updatePointCoords(evt, pointId) {
        const newCoords = evt.originalEvent.target.geometry.getCoordinates();
        const changedPoints = this.state.points.slice();
        
        changedPoints.forEach((point, index) => {
            if (point.id === pointId) {
                changedPoints[index].coordX = newCoords[0];
                changedPoints[index].coordY = newCoords[1];
            }
        });

        this.setState({
            points: changedPoints,
        });
    }
    
    render() {
        return (
            <div id="app-container">
                <TextInput
                    className="text-input"
                    handleKeyPress={this.handleKeyPress}
                />
                <DragDropContext
                    onDragEnd={this.handlePointDragEnd}
                >
                    <PointList
                        deletePoint={this.deletePoint}
                        className="point-list"
                        points={this.state.points}
                    />
                </DragDropContext>
                <RouteMap
                    className="route-map"
                    points={this.state.points}
                    updateCenterCoords={this.updateCenterCoords}
                    updatePointCoords={this.updatePointCoords}
                />
            </div>
        );
    }
}

export default App;
