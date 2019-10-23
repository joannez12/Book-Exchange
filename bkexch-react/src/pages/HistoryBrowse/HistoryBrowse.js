import React from 'react';
import './HistoryBrowse.css';

import posts from "../../post";

function tableHepler(post){
    return(
        <tr>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.seller}</td>
            <td>{post.price}</td>
            <td>
                <button type="button">Delete</button>
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
                        <th>Seller</th>
                        <th>Price</th>
                        <th>Option</th>
                    </tr>
                    {
                        this.props.posts.map( post => tableHepler(post))
                    }

                </table>
            </div>
        )
    }
}

class HistoryBrowse extends React.Component {
    state = {
        posts: posts,
    }

    render() {
        const {posts: posts} = this.state;

        return(
            <div>
                <h4>My Posts</h4>
                <MyPostTable posts={posts}/>
                <h4>History</h4>
                <MyPostTable posts={posts}/>
            </div>
        )
    }
}

export default HistoryBrowse;


