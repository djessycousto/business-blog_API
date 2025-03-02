async function fetchAllArticle() {
  try {
    const response = await fetch("http://localhost:8080/api-blog/v1/article");
    const data = await response.json();
    const { localData } = data;
    const Articles = localData.data;
    return Articles;
  } catch (error) {
    console.log(error);
  }
}

export { fetchAllArticle };
