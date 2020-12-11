import * as React from 'react';
import '../CSS/Grid.css';


export default class Grid extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            columns: this.props.columns, 
            rows: this.props.rows,
            highlight: this.props.highlight
        };
    }

    render() {
        const rows = [];
        for(let  i = 0; i < this.props.rows; ++i){
            const columns = [];
            
            for(let j = 0; j < this.props.columns; ++ j){

                const classNames = ['square', 'square-100'];
                if (this.props.highlight && this.props.highlight[0] === i && this.props.highlight[1] === j) {
                    classNames.push('one');
                }

                columns.push(
                    <div className={"grid-cell grid-" + Math.floor(100 / this.props.columns)} key={j + 1}>
                        <div className={classNames.join(' ')}>{i * this.props.columns + j + 1}</div>
                    </div>
                );
            }
            rows.push(
                <div className="grid" key={i + 1}>
                    {columns}
                </div>
            );
        }
        return( 
            <div className="grid-container">
            {rows}
            </div>
        );
    }
}
