import textbooks from './textbooks';

export const deletePost = (id) => {
    for(let i = 0; i < textbooks.length; i++){
        if(textbooks[i].id === parseInt(id)){
            textbooks.splice(i,1);
        }
    }
}