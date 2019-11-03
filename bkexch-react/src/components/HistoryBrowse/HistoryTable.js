import React from 'react';
import '../../pages/HistoryBrowse/HistoryBrowse.css';
import {Table, Button} from "react-bootstrap";

function HistoryTableHepler(exchange, deleteHistory){
    return(
        <tr key={exchange.id}>
            <td>{exchange.title}</td>
            <td>{exchange.author}</td>
            <td>{exchange.buyer}</td>
            <td>{exchange.price}</td>
            <td>
                <Button
                        onClick={() => {deleteHistory(exchange)}}
                >Delete</Button>
            </td>
        </tr>
    )
}

class HistoryTable extends React.Component {
    render(){
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr key={0}>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Buyer</th>
                            <th>Price</th>
                            <th>Option</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.exchanges.map(
                                exchange =>
                                    HistoryTableHepler(exchange, this.props.deleteHistory)
                            )
                        }
                    </tbody>



                </Table>
            </div>
        )
    }
}

export default HistoryTable;
