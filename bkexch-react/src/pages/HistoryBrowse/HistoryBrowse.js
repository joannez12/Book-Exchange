import React from 'react';
import './HistoryBrowse.css';

import posts from "../../textbooks";
import exchanges from "./exchange";

import MyPostTable from "../../components/HistoryBrowse/MyPostTable";
import HistoryTable from "../../components/HistoryBrowse/HistoryTable";
import axios from 'axios';


class HistoryBrowse extends React.Component {
    state = {
        account:this.props.user,   
        exchanges: exchanges,  
        posts: [],          
    }

    getMyPosts(account, posts){
        // gets textbooks from server, requires server call
        return posts.filter(post => post.seller === this.props.user.username);
    }

    getMyExchange(account, exchanges){
        // get exchanges from server, requires server call
        return exchanges.filter(exchange => exchange.seller === this.props.user.name);
    }

    deletePost(post){
        // gets textbooks from server, requires server call
        for(let i = 0; i<posts.length; i++){
            if(posts[i] === post){
                posts.splice(i,1);
            }
        }
        this.setState({posts: posts});
    }

    deleteHistory(exchange){
        // gets exchanges from server, requires server call
        for(let i = 0; i<exchanges.length; i++){
            if(exchanges[i] === exchange){
                exchanges.splice(i,1);
            }
        }
        this.setState({exchanges: exchanges});
    }

    componentDidMount(){
        console.log("history browse")
        axios.get('http://localhost:3001/textbooks/')
        .then(response => {
          if (response.data.length > 0) {
              console.log(response.data)
              this.setState({posts: response.data})
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }


    render() {
        return(
            <div className="page">
                { this.state.account ? <> <h4>User Name: {this.state.account.name}</h4>
                <h4>My Posts</h4>

                <MyPostTable
                    user={this.props.user}
                    posts={this.getMyPosts(this.state.account, this.state.posts)}
                    deletePost={this.deletePost.bind(this)}
                />
                <h4>History</h4>

                <HistoryTable
                    exchanges={this.getMyExchange(this.state.account, this.state.exchanges)}
                    deleteHistory={this.deleteHistory.bind(this)}
                /> </> : <div className="page">
                			<h2 className="error">Sign up / Log in to view history</h2>
            			</div> }
            </div>
        )
    }
}

export default HistoryBrowse;


