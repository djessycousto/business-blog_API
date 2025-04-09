//###################### delete

const baseURL =
  window.location.hostname === "localhost"
    ? `${window.location.origin}/api-blog/v1`
    : window.location.origin;
//////////////================ Handle delete
const deletePost = async (postId) => {
  try {
    const response = await fetch(`/api-blog/v1/article/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }

    console.log(`Post ${postId} deleted successfully`);
    start(); // Reload the data
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

// Add event listener for delete buttons
const addDeleteListeners = () => {
  tableBodyDOM.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const postId = e.target.dataset.id;
      deletePost(postId);
    }
  });
};

// script to the front
