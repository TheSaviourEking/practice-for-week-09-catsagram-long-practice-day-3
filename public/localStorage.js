export const getFromLocalStorage = (key) => {
    if (localStorage.getItem(key)) {
        if (key === 'image') {
            return localStorage.getItem('image');
        }
        if (key === 'score') {
            return localStorage.getItem('score');
        }
        if (key === 'comments') {
            return JSON.parse(localStorage.getItem('comments'));
        }
    }
}
