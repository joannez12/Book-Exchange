const textbooks = [
    {
        id: 1,
        title: 'Physics 200',
        author: 'Santo Mckinney',
        seller: 'user1',
        description: 'Decent condition, contains highlighting',
        imgUrl: 'https://kbimages1-a.akamaihd.net/23a0de3d-afbd-41f6-bad5-39e1d38257e1/1200/1200/False/kaplan-sadock-s-concise-textbook-of-clinical-psychiatry.jpg',
        price: 2300
    },
    {
        id: 2,
        title: 'Psych 1240',
        author: 'Marie Fitzgerald',
        seller: 'user2',
        description: 'Perfect condition',
        imgUrl: 'https://kbimages1-a.akamaihd.net/23a0de3d-afbd-41f6-bad5-39e1d38257e1/1200/1200/False/kaplan-sadock-s-concise-textbook-of-clinical-psychiatry.jpg',
        price: 264
    },
    {
        id: 3,
        title: 'Modern OS',
        author: 'Jeffrey Costa',
        seller: 'shrekIsthebest',
        imgUrl: 'https://kbimages1-a.akamaihd.net/23a0de3d-afbd-41f6-bad5-39e1d38257e1/1200/1200/False/kaplan-sadock-s-concise-textbook-of-clinical-psychiatry.jpg',
        description: '',
        price: 67
    },
    {
        id: 4,
        title: 'Basket Weaving',
        author: 'Violet Ritter',
        seller: 'kachow420',
        description: 'Willing to negotiate price',
        imgUrl: 'https://kbimages1-a.akamaihd.net/23a0de3d-afbd-41f6-bad5-39e1d38257e1/1200/1200/False/kaplan-sadock-s-concise-textbook-of-clinical-psychiatry.jpg',
        price: 89
    },
    {
        id: 5,
        title: 'Ai For Dummies',
        author: 'Brenda Hanson',
        seller: 'm00cow',
        description: 'Brand new',
        imgUrl: 'https://kbimages1-a.akamaihd.net/23a0de3d-afbd-41f6-bad5-39e1d38257e1/1200/1200/False/kaplan-sadock-s-concise-textbook-of-clinical-psychiatry.jpg',
        price: 21
    }
]
export const getTextbookById = (id) =>{
    return textbooks.find((textbook) => textbook.id === id);
}
export default textbooks;