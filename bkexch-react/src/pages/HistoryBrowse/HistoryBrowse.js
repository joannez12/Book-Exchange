import React from 'react';
import './HistoryBrowse.css';

import posts from "../../post";
import exchanges from "./exchange";

import MyPostTable from "../../components/HistoryBrowse/MyPostTable";
import HistoryTable from "../../components/HistoryBrowse/HistoryTable";



class HistoryBrowse extends React.Component {
    state = {
        account:this.props.user,
        exchanges: exchanges,
        posts: posts,
    }

    getMyPosts(account, posts){
        return posts.filter(post => post.seller === account.name);
    }

    getMyExchange(account, exchanges){
        return exchanges.filter(exchange => exchange.seller === account.name);
    }

    deletePost(post){
        for(let i = 0; i<posts.length; i++){
            if(posts[i] === post){
                posts.splice(i,1);
            }
        }
        this.setState({posts: posts});
    }

    deleteHistory(exchange){
        for(let i = 0; i<exchanges.length; i++){
            if(exchanges[i] === exchange){
                exchanges.splice(i,1);
            }
        }
        this.setState({exchanges: exchanges});
    }

    render() {
        return(
            <div>
                <h4>User Name: {this.state.account.name}</h4>
                <h4>My Posts</h4>

                <MyPostTable
                    posts={this.getMyPosts(this.state.account, this.state.posts)}
                    deletePost={this.deletePost.bind(this)}
                />
                <h4>History</h4>
                <HistoryTable
                    exchanges={this.getMyExchange(this.state.account, this.state.exchanges)}
                    deleteHistory={this.deleteHistory.bind(this)}
                />
            </div>
        )
    }
}

export default HistoryBrowse;


