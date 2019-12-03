import React from 'react';
import './HistoryBrowse.css';

import exchanges from "./exchange";

import MyPostTable from "../../components/HistoryBrowse/MyPostTable";
import HistoryTable from "../../components/HistoryBrowse/HistoryTable";
import {getTextbooks, deleteTextbook} from "../../actions/textbook";
import {getExchanges, deleteExchange} from "../../actions/exchange";
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
        // for(let i = 0; i<exchanges.length; i++){
        //     if(exchanges[i] === exchange){
        //         exchanges.splice(i,1);
        //     }
        // }
        // this.setState({exchanges: exchanges});
        deleteExchange(exchange).then(
            res=>{
                if(res.status === 200){
                    console.log(res)
                    this.setState({deletedExchange: res.data})
                }
                else{
                    console.log("error found!")
                }
            }
        )

    }

    componentDidMount(){
        console.log("history browse")
        console.log("props hey", this.props)

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
        getExchanges().then(res => {
            if(res.status === 200){
                console.log(res.data)
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


