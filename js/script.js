const url = 'https://jsonplaceholder.typicode.com/photos'; // 正しいもの
// const url = 'https://jsonplaceholder.typicode.com/photos*'; // 正しくないもの
const postListElement = document.querySelector('ul.post-list');

// データ取得とDOM更新を行う関数
const getData = async (fetchUrl) => {
  try {
    // データを取得
    const response = await axios.get(fetchUrl);
    console.log(`成功、ステータスコード: ${response.status}`);
    const postData = response.data;

    // 最初の9件を取得
    const posts = postData.slice(0, 9);

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
  } catch (error) {
    // エラーハンドリング
    if (error.response) {
      console.log(`エラー! ステータスコード: ${error.response.status}`);
    } else if (error.request) {
      console.log(
        'リクエストが送信されましたがレスポンスがありません:',
        error.request
      );
    } else {
      console.log('エラーが発生しました:', error.message);
    }
  }
};

// 関数の実行
getData(url);
