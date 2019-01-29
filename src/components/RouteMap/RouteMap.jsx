import './RouteMap.css';

import {
    Map,
    Placemark,
    Polyline,
    YMaps,
} from 'react-yandex-maps';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RouteMap extends Component {
    constructor(props) {
        super(props);

        this.initialMapState = {
            center: [55.754734, 37.583314],
            zoom: 10,
        };

        this.currentMapCenter = [55.754734, 37.583314];
    }

    render() {
        const {
            changePointCoords,
            className,
            points,
            updateCenterCoords,
        } = this.props;

        const lineCoords = [];
        points.forEach((point) => {
            lineCoords.push([point.coordX, point.coordY]);
        });

        return (
            <YMaps query={{ lang: 'ru_RU' }}>
                <Map
                    className={className}
                    defaultState={this.initialMapState}
                    onBoundsChange={(evt) => {
                        this.currentMapCenter = evt.get('newCenter');
                        updateCenterCoords(evt.get('newCenter'));
                    }}
                >
                    {points.map((point, index) => {
                        return (
                            <Placemark
                                key={index}
                                geometry={[point.coordX, point.coordY]}
                                properties={{
                                    balloonContent: point.name,
                                    iconContent: index + 1,
                                }}
                                options={{
                                    draggable: true,
                                }}
                                modules={[
                                    'geoObject.addon.balloon',
                                ]}
                                onDragEnd={(evt) => changePointCoords(evt, point.id)}
                            />
                        );
                    })}
                    <Polyline
                        geometry={lineCoords}
                        options={{
                            strokeColor: '#0000ff',
                            strokeWidth: 4,
                            strokeOpacity: 0.6,
                        }}
                    />
                </Map>
            </YMaps>
        );
    }
}

RouteMap.propTypes = {
    changePointCoords: PropTypes.func.isRequired,
    className: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateCenterCoords: PropTypes.func.isRequired,
};
