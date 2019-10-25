import React from 'react';
import '../../pages/HistoryBrowse/HistoryBrowse.css';


function MyPostTableHepler(post,deletePost){
    return(
        <tr key={post.id} >
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.price}</td>
            <td>
                <button
                    type="button"
                    onClick= { () => {
                        deletePost(post);
                    }
                    }
                >Delete</button>
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
                    <thead>
                        <tr key={0}>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Option</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.posts.map( post => MyPostTableHepler(
                                post, this.props.deletePost
                            ))
                        }
                    </tbody>


                </table>
            </div>
        )
    }
}

export default MyPostTable;
