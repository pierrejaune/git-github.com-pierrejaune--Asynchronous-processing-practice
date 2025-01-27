# Fetch API でデーターを取得しながら Promise と asyc/await を学んだまとめ

[参考リンク](https://qiita.com/Abbiscuit/items/66ee955509284e941803)

### 2 つの関数を 1 つの関数にまとめ、その中で posts を下記の様に定数にまとめて DOM 操作を実行する記述に変更

```javascript
// HTML要素を生成
const postList = posts
  .map(
    (post) => `
        <li class="post-el" data-id=${post.id}>
          <a
            href="${post.url}"
            class="post-link"
            aria-label="Postタイトル: ${post.title}"
          >
            <img
              src="${post.thumbnailUrl}"
              alt="${post.title}の画像"
              loading="lazy"
              class="post-image"
            />
            <p class="post-title">${post.title}</p>
          </a>
        </li>`
  )
  .join('');

// DOMに反映
postListElement.innerHTML = postList;
```
