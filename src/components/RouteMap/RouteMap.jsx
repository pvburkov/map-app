import './RouteMap.css';

import PropTypes from 'prop-types';
import {
    Map,
    Placemark,
    Polyline,
    YMaps,
} from 'react-yandex-maps';
import React from 'react';

import CONSTANTS from '../../constants/constants';

/**
 * Stateless 'RouteMap' component
 * Using Yandex.Maps API and 'react-yandex-maps' library
 * @link https://tech.yandex.com/maps/doc/jsapi/2.1/quick-start/index-docpage/
 * @link https://react-yandex-maps.now.sh
 */
const RouteMap = ({
    className,
    points,
    updateCenterCoords,
    updatePointCoords,
}) => {
    const initialMapState = {
        center: CONSTANTS.map.startCenterCoords,
        zoom: CONSTANTS.map.startZoom,
    };

    const lineCoords = [];
    points.forEach((point) => {
        lineCoords.push([point.coordX, point.coordY]);
    });

    return (
        <YMaps query={CONSTANTS.map.mapQuery}>
            <Map
                className={className}
                defaultState={initialMapState}
                onBoundsChange={(evt) => updateCenterCoords(evt.get('newCenter'))}
            >
                {points.map((point, index) => {
                    return (
                        <Placemark
                            geometry={[point.coordX, point.coordY]}
                            key={index}
                            modules={[
                                'geoObject.addon.balloon',
                            ]}
                            onDragEnd={(evt) => updatePointCoords(evt, point.id)}
                            options={{
                                draggable: true,
                            }}
                            properties={{
                                balloonContent: point.name,
                                iconContent: index + 1,
                            }}
                        />
                    );
                })}
                <Polyline
                    geometry={lineCoords}
                    options={CONSTANTS.map.polylineOptions}
                />
            </Map>
        </YMaps>
    );
};

RouteMap.propTypes = {
    className: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateCenterCoords: PropTypes.func.isRequired,
    updatePointCoords: PropTypes.func.isRequired,
};

export default RouteMap;
