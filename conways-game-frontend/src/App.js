import React, {Component} from 'react';
import './App.css';

function LiveSquare(props) {
    return (
        <button className="whiteSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function DeadSquare(props) {
    return (
        <button className="blackSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class BoardDimensions extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCol = this.handleChangeCol.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onRowChange(parseInt(event.target.value ? parseInt(event.target.value) : ''));
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleChangeCol(event) {
        this.props.onColChange(event.target.value ? parseInt(event.target.value) : '');
    }

    render() {
        return (<div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        enter row length:
                        <input type="text" onChange={this.handleChange}/>
                    </label>
                </form>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        enter col length:
                        <input type="text" onChange={this.handleChangeCol}/>
                    </label>
                </form>
            </div>
        );
    }
}

class Board extends React.Component {

    renderSquare(sq, index, index2) {
        return (sq === 1) ? <LiveSquare value={1} onClick={() => this.props.onClick(0, index, index2)}/> :
            <DeadSquare value={0} onClick={() => this.props.onClick(1, index, index2)}/>;
    }

    render() {


        return (
            <div>
                <div>
                    {this.props.squares.map((square, index) => square.map((sq, index2) => this.renderSquare(sq, index, index2)))}
                </div>
            </div>
        );
    }


}

class App extends Component {
    constructor(props) {
        super(props);
        const squares = [];
        this.state = {
            rowLength: 1,
            columnLength: 1,
            squares: squares,
            count: 0,
            start: false,
        };
        this.onColUpdate = this.onColUpdate.bind(this);
        this.onRowUpdate = this.onRowUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }


    conwaysGame(squares) {
        (async () => {
                const rawBoard = await
                    fetch("http://localhost:8080/Boards", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            board: squares,
                        })
                    });
                const nextSquares = await rawBoard.json();
                console.log("This is the move " + (nextSquares));
                this.setState({
                    squares: nextSquares.board,
                    count: this.state.count + 1,
                    // start: !this.state.start,
                });
                //return nextSquares.board;
            }
        )();
    }

    componentDidUpdate() {
        if (this.state.count > 0 && !this.state.start) {
        }
    }


    // sleep(milliseconds) {
    //     var start = new Date().getTime();
    //     for (var i = 0; i < 1e7; i++) {
    //         if ((new Date().getTime() - start) > milliseconds) {
    //             break;
    //         }
    //     }
    // }

    onRowUpdate(rowPosition) {
        const squares = [];
        for (let i = 0; i < rowPosition; i++) {
            if (i % 2 === 0) {
                squares.push(Array(this.state.columnLength).fill(0));
            }
            else {
                squares.push(Array(this.state.columnLength).fill(0));
            }
        }
        this.setState({
            rowLength: rowPosition,
            squares: squares,
        });

    }

    onColUpdate(colPosition) {
        const squares = [];
        for (let i = 0; i < this.state.rowLength; i++) {
            if (i % 2 === 0) {
                squares.push(Array(colPosition).fill(0));
            }
            else {
                squares.push(Array(colPosition).fill(0));
            }
        }
        this.setState({
            columnLength: colPosition,
            squares: squares,
        });
    }

    handleClick(i, index, index2) {
        const squares = this.state.squares;
        squares[index][index2] = i;
        this.setState({
            squares: squares,
            start: false
        })
    }

    handleStart() {
        this.setState({
            start: true,
        });
    }

    render() {
        if (this.state.start) {
            this.conwaysGame(this.state.squares);
            //this.sleep(500);
        }
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <div>
                    <BoardDimensions
                        onRowChange={this.onRowUpdate}
                        onColChange={this.onColUpdate}/>
                    <button onClick={() => this.handleStart()}>
                        {"start"}
                    </button>
                    <button onClick={() => this.captureState()}>
                        {"capture"}
                    </button>
                    <button onClick={() => this.getPreset()}>
                        {"preset 1"}
                    </button>
                    <div className="board"
                         style={{width: this.state.rowLength * 25 + "px", height: this.state.columnLength * 25 + "px"}}>
                        <Board
                            squares={this.state.squares}
                            onClick={(i, index, index2) => this.handleClick(i, index, index2)}/>
                    </div>
                </div>
            </div>

        );
    }

    async captureState() {
        const options = {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                board: this.state.squares,
            })
        };
        const request = new Request("http://localhost:8080/Capture", options);
        const response = await fetch(request);
        const status = await response.status;
    }

    getPreset() {
        return fetch("http://localhost:8080/PresetOne")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    rowLength: 40,
                    columnLength: 40,
                    squares: responseJson.board,
                    start:true,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export default App;
