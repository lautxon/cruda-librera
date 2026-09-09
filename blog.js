const blogPosts = document.getElementById("blog-posts");
if (blogPosts) {
  blogPosts.innerHTML = BLOG_POSTS.map(post => `
    <article class="blog-post">
      <p class="blog-post-date">${post.date}</p>
      <h3>${post.title}</h3>
      <p class="blog-post-excerpt">${post.excerpt}</p>
      <p class="blog-post-author">${post.author}</p>
    </article>
  `).join("");
}
