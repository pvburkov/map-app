import './App.css';

import { DragDropContext } from 'react-beautiful-dnd';
import React, { Component } from 'react';
import uniqid from 'uniqid';

import PointList from '../PointList/PointList';
import RouteMap from '../RouteMap/RouteMap';
import TextInput from '../TextInput/TextInput';

class App extends Component {
    constructor() {
        super();

        this.state = {
            points: [],
        };

        this.currentCenterCoords = [55.754734, 37.583314];

        this.changePointCoords = this.changePointCoords.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePointDragEnd = this.handlePointDragEnd.bind(this);
        this.setPointCoords = this.setPointCoords.bind(this);
        this.updateCenterCoords = this.updateCenterCoords.bind(this);
    }

    changePointCoords(evt, pointId) {
        const newCoords = evt.originalEvent.target.geometry.getCoordinates();
        this.setPointCoords(pointId, newCoords);
    }

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

    handleKeyPress(event) {
        if (event.key !== 'Enter' || !event.currentTarget.value) {
            return;
        }

        const points = this.state.points.slice();

        const point = {
            coordX: this.currentCenterCoords[0],
            coordY: this.currentCenterCoords[1],
            id: uniqid(),
            name: event.currentTarget.value,
        };

        points.push(point);

        this.setState({
            points: points,
        });
        event.currentTarget.value = '';
    }

    handlePointDragEnd(result) {
        const {
            destination,
            source,
        } = result;

        if (!destination || destination.index === source.index) {
            return;
        }

        const flushedPoints = this.state.points.slice();
        const tempPoint = { ...flushedPoints[destination.index] };
        flushedPoints[destination.index] = { ...flushedPoints[source.index] };
        flushedPoints[source.index] = { ...tempPoint };

        this.setState({
            points: flushedPoints,
        });
    }

    setPointCoords(pointId, newCoords) {
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

    updateCenterCoords(newCoords) {
        this.currentCenterCoords = newCoords;
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
                    changePointCoords={this.changePointCoords}
                    className="map"
                    points={this.state.points}
                    updateCenterCoords={this.updateCenterCoords}
                />
            </div>
        );
    }
}

export default App;
