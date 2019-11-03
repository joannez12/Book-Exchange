import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import users from '../../users';
import posts from '../../textbooks';

class DeleteAccountPopup extends React.Component {
    state = {
        user: this.props.user
   }

    deletePosts(){
        for(let i = 0; i < posts.length; i++){
            if(posts[i].seller === this.state.user.name){
                posts.splice(i,1);
            }
        }
    }

    handleDeleteAccount = () => {
        this.deletePosts();
        users.splice(this.state.user.id - 1, 1)

        this.props.hideProfile();
        this.props.deleted();

    }

    render() {
        const {deleted, hideProfile, ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="danger" onClick={this.handleDeleteAccount}>Confirm Delete Account</Button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteAccountPopup;
