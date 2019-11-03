import React from 'react';
import {Table} from "react-bootstrap";

class SentBox extends React.Component {

    render(){
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr key={0}>
                        <th>To</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Option</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr key={1} >
                        <td>Jeffrey Costa</td>
                        <td>mcneil@gmail.com</td>
                        <td>my messag sentsentsent</td>
                        <td>2019-09-23</td>
                        <td>Option</td>
                    </tr>
                    <tr key={2} >
                        <td>Jeannette Mcneil</td>
                        <td>mymymymym@gmail.com</td>
                        <td>my messagasfsfasdfsfsafse</td>
                        <td>2019-09-23</td>
                        <td>Option</td>
                    </tr>
                    <tr key={3} >
                        <td>Jeffrey Costa</td>
                        <td>mcneil@gmail.com</td>
                        <td>my messsafsafsfafsafdage</td>
                        <td>2019-09-23</td>
                        <td>Option</td>
                    </tr>

                    </tbody>


                </Table>
            </div>
        )
    }
}

export default SentBox;
