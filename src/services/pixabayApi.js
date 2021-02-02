const API_KEY = "19048518-7cffd49b48c4ae5ad0525e878";

export const fetchImages = (query, page) =>
  fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => response.json());
