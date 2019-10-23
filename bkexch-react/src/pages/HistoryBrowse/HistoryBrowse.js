import React from 'react';
import './HistoryBrowse.css';

import posts from "../../post";
import exchanges from "./exchange";

function MyPostTableHepler(post){
    return(
        <tr>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.price}</td>
            <td>
                <button type="button">Delete</button>
                <button type="button">Edit</button>
            </td>
        </tr>
    )
}

class MyPostTable extends React.Component {
    render(){
        return(
            <div>
                <table className='table'>
                    <tr>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Option</th>
                    </tr>
                    {
                        this.props.posts.map( post => MyPostTableHepler(post))
                    }

                </table>
            </div>
        )
    }
}

function HistoryTableHepler(exchange){
    return(
        <tr>
            <td>{exchange.title}</td>
            <td>{exchange.author}</td>
            <td>{exchange.buyer}</td>
            <td>{exchange.price}</td>
            <td>
                <button type="button">Delete</button>
            </td>
        </tr>
    )
}

class HistoryTable extends React.Component {
    render(){
        return(
            <div>
                <table className='table'>
                    <tr>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Buyer</th>
                        <th>Price</th>
                        <th>Option</th>
                    </tr>
                    {
                        this.props.exchanges.map( exchange => HistoryTableHepler(exchange))
                    }

                </table>
            </div>
        )
    }
}
class HistoryBrowse extends React.Component {
    state = {
        account:{id:12, name:'Bonnie Cruz'},
        exchanges: exchanges,
        posts: posts,
    }

    render() {
        return(
            <div>
                <h4>User Name: {this.state.account.name}</h4>
                <h4>My Posts</h4>
                <MyPostTable posts={posts}/>
                <h4>History</h4>
                <HistoryTable exchanges={exchanges}/>
            </div>
        )
    }
}

export default HistoryBrowse;


