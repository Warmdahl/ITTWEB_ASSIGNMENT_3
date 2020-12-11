import * as React from 'react'

export default class Flash extends React.Component {
    static position = [Number, Number];
    static sound = Number;

    constructor(props) {
        super(props);
        this.state = {position: [Number, Number], sound: Number};
    }
}