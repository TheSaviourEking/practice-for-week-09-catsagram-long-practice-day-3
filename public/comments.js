// Function to create the comment section
export const createCommentSection = () => {
    const container = document.querySelector(".container");

    // Create comment form and comments list
    const commentForm = createCommentForm();
    const commentsList = createCommentsList();

    // Append comment form and comments list to the container
    container.appendChild(commentForm);
    container.appendChild(commentsList);

    // Check if there are comments stored in localStorage
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    if (storedComments) {
        // Display stored comments
        storedComments.forEach(commentText => createComment(commentText));
    }
};

// Function to create the comments list
const createCommentsList = () => {
    // Create comments section
    const comments = document.createElement("div");
    comments.className = "comments";
    comments.style.border = "solid grey 1px";
    comments.style.height = "400px";
    comments.style.width = "80%";
    comments.style.margin = "10px";
    comments.style.padding = "5px";
    comments.style.overflow = "scroll";

    return comments;
};

// Function to create the comment form
const createCommentForm = () => {
    // Create form
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    commentForm.style.margin = "20px";
    commentForm.style.display = "flex";
    commentForm.style.width = "100%";
    commentForm.style.justifyContent = "center";
    commentForm.style.alignItems = "center";

    // Add comment input and submit button to the form
    commentForm.appendChild(createCommentInput());
    commentForm.appendChild(createCommentSubmitBtn());

    return commentForm;
};

// Function to create the comment input
const createCommentInput = () => {
    // Create comment input
    const userCommentContainer = document.createElement("div");
    userCommentContainer.className = "user-comment-container";
    userCommentContainer.style.marginRight = "10px";

    const label = document.createElement("label");
    label.setAttribute("for", "user-comment");
    label.innerText = "Comment: ";

    const commentInput = document.createElement("input");
    commentInput.id = "user-comment";
    commentInput.name = "user-comment";
    commentInput.placeholder = "Add a comment... ";
    commentInput.required = true;

    userCommentContainer.appendChild(label);
    userCommentContainer.appendChild(commentInput);

    return userCommentContainer;
};

// Function to create the comment submit button
const createCommentSubmitBtn = () => {
    // Create submit button
    const submitBtn = document.createElement("input");
    submitBtn.id = "submit-comment"
    submitBtn.type = "submit";
    submitBtn.value = "Submit";

    submitBtn.addEventListener('click', submitComment);

    return submitBtn;
};

// Function to handle comment submission
const submitComment = e => {
    e.preventDefault();
    const commentInput = document.querySelector('#user-comment');
    const commentText = commentInput.value;
    
    // Save comment to localStorage
    saveCommentToLocalStorage(commentText);

    // Create and display the comment
    createComment(commentText);
    commentInput.value = "";
}

// Function to create and display a comment
const createComment = (commentText) => {
    const newCommentContainer = document.createElement('div');
    newCommentContainer.style.display = "flex";
    newCommentContainer.style.margin = "10px";

    const newComment = document.createElement("p");
    newComment.innerText = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.style.marginLeft = "15px";
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', e => {
        // Remove comment from HTML DOM
        newCommentContainer.remove();
    });

    newCommentContainer.appendChild(newComment);
    newCommentContainer.appendChild(deleteButton);
    const comments = document.querySelector(".comments");
    comments.appendChild(newCommentContainer);
};

// Function to save comment to localStorage
const saveCommentToLocalStorage = (commentText) => {
    // Get existing comments from localStorage
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];

    // Add the new comment to the array
    storedComments.push(commentText);

    // Save the updated array back to localStorage
    localStorage.setItem('comments', JSON.stringify(storedComments));
};

// Function to reset comments and localStorage
export const resetComments = () => {
    const comments = document.querySelector(".comments");
    Array.from(comments.children).forEach(child => child.remove());
    localStorage.removeItem('comments');
};
