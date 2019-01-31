import 'jest-dom/extend-expect';
import React from 'react';
import {
    cleanup,
    fireEvent,
    render,
} from 'react-testing-library';

import App from './App';

let app = null;
let container = null;
let input = null;
let pointList = null;

beforeAll(() => {
    app = render(<App />);
    container = app.container;
    input = container.querySelector('.text-input');
    pointList = container.querySelector('.point-list');
});

afterAll(cleanup);

describe('`App` component', () => {
    test('`TextInput` and `PointList` correctly rendered inside `App`', () => {
        expect(input).toBeInTheDocument();
        expect(pointList).toBeInTheDocument();
    });

    test('`TextInput` - input text check', () => {
        fireEvent.change(input, {
            target: {
                value: 'ABC',
            }
        });
        expect(input.value).toEqual('ABC');
    });

    test('`TextInput` - check Enter-key down when textarea is empty', () => {
        fireEvent.change(input, {
            target: {
                value: '',
            }
        });
        expect(input.value).toEqual('');

        fireEvent.keyPress(input, {
            char: 13,
            charCode: 13,
            key: 'Enter',
        });
        expect(input.value).toEqual('');
        expect(pointList.children.length).toEqual(0);
    });

    test('`TextInput` - check Enter-key down when text is in textarea', () => {
        fireEvent.change(input, {
            target: {
                value: 'ABC',
            }
        });
        expect(input.value).toEqual('ABC');

        fireEvent.keyPress(input, {
            char: 13,
            charCode: 13,
            key: 'Enter',
        });
        expect(input.value).toEqual('');
        expect(pointList.children.length).toEqual(1);
        expect(app.getByText('ABC')).toBeInTheDocument();
    });

    test('`PointList` - add one point in list and delete another from it', () => {
        fireEvent.change(input, {
            target: {
                value: 'DEF',
            }
        });
        expect(input.value).toEqual('DEF');

        fireEvent.keyPress(input, {
            char: 13,
            charCode: 13,
            key: 'Enter',
        });
        expect(input.value).toEqual('');
        expect(pointList.children.length).toEqual(2);
        expect(app.getByText('DEF')).toBeInTheDocument();

        fireEvent.click(app.getByText('ABC').children[0], {
            button: 0,
        });
        expect(pointList.children.length).toEqual(1);
        expect(app.getByText('DEF')).toBeInTheDocument();
    });
});
