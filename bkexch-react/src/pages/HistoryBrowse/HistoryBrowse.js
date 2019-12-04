import React from 'react';
import './HistoryBrowse.css';

import exchanges from "./exchange";

import MyPostTable from "../../components/HistoryBrowse/MyPostTable";
import HistoryTable from "../../components/HistoryBrowse/HistoryTable";
import {getTextbooks, deleteTextbook} from "../../actions/textbook";
import {getExchanges, deleteExchange,postExchange} from "../../actions/exchange";
class HistoryBrowse extends React.Component {
    state = {
        account:this.props.user,   
        exchanges: exchanges,  
        posts: [],
        deletedPost: null,
        deletedExchange: null,
    }

    getMyPosts(account, posts){
        // gets textbooks from server, requires server call
        return posts.filter(post => post.seller === this.props.user.username);
    }

    getMyExchange(account, exchanges){
        // get exchanges from server, requires server call
        return exchanges.filter(exchange => exchange.from === this.props.user.username);
    }

    deletePost(post){
        // gets textbooks from server, requires server call
        console.log("deleting textbook/post :", post)
        deleteTextbook(post._id).then(res=>{
            if(res.status === 200){
                console.log("deletion done!")
                this.setState({deletedPost: res.data})
                
            }else{
                console.log("fail to delete post")
            }
        }
        )
        const newtextbooks = this.state.posts.filter(p => p._id !== post._id)
        this.setState({posts: newtextbooks})
    }

    addExchange(newExchange){
        postExchange(newExchange).then(res=>{
            if(res.status === 200){
                console.log("posting exchange done")
            }else{
                console.log("fail to post exchange")
            }
        })
    }

    deleteHistory(exchange){
        // gets exchanges from server, requires server call
        // for(let i = 0; i<exchanges.length; i++){
        //     if(exchanges[i] === exchange){
        //         exchanges.splice(i,1);
        //     }
        // }
        // this.setState({exchanges: exchanges});
        deleteExchange(exchange).then(
            res=>{
                if(res.status === 200){
                    this.setState({deletedExchange: res.data})
                }
                else{
                    console.log("error found!")
                }
            }
        )
        const exchanges = this.state.exchanges.filter(e => e._id !== exchange._id)
        this.setState({exchanges: exchanges})

    }

    componentDidMount(){

        getTextbooks().then(res => {
            if(res.status === 200){
                this.setState({posts:res.data})
            }
            else{
                console.log("error found!")
                this.setState({posts: []})
            }
        })
        getExchanges().then(res => {
            if(res.status === 200){
                this.setState({exchanges:res.data})
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
                { this.state.account ? <> <h4>User Name: {this.state.account.username}</h4>
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


