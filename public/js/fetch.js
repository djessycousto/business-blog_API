async function fetchAllArticle() {
  try {
    const response = await fetch("/api-blog/v1/article");
    const data = await response.json();

    const { article } = data;
    // const Articles = localData.data;
    return article;
  } catch (error) {
    throw Error("Server error");
  }
}

export { fetchAllArticle };
