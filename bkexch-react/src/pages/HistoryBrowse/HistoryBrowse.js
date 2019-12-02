import React from 'react';
import './HistoryBrowse.css';

import posts from "../../textbooks";
import exchanges from "./exchange";

import MyPostTable from "../../components/HistoryBrowse/MyPostTable";
import HistoryTable from "../../components/HistoryBrowse/HistoryTable";
import axios from 'axios';
import {getTextbooks, deleteTextbook} from "../../actions/textbook";

class HistoryBrowse extends React.Component {
    state = {
        account:this.props.user,   
        exchanges: exchanges,  
        posts: [],
        deletedPost: null
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
        deleteTextbook(post).then(res=>{
            if(res.status === 200){
                console.log("deletion done!")
                this.setState({deletedPost: res.data})
            }else{
                console.log("fail to delete post")
            }
        }
        )
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
        getTextbooks().then(res => {
            if(res.status === 200){
                console.log(res)
                this.setState({posts:res.data})
            }
            else{
                console.log("error found!")
                this.setState({posts: []})
            }
        })
        console.log("here", this.state.posts)
        // axios.get('http://localhost:3001/textbooks/')
        // .then(response => {
        //   if (response.data.length > 0) {
        //       this.setState({posts: response.data})
        //   }
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
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


