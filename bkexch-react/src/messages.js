const messages = [
]

export const deleteMessage = (message) => {
    const index = messages.indexOf(message);
    if (index > -1) {
        messages.splice(index, 1);
    }
}
export default messages;
