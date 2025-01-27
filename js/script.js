const url = 'https://jsonplaceholder.typicode.com/photos'; // 正しいもの
// const url = 'https://jsonplaceholder.typicode.com/photos';//正しくないもの
let postList = '';
const postListElement = document.querySelector('ul.post-list');

// データ取得のPromiseを作成する関数
const fetchData = () => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          // レスポンスがエラーの場合はエラーを作成してreject
          const error = new Error(`HTTP error! status: ${response.status}`);
          console.log('エラー発生:', error.message); // コンソールにエラー出力
          reject(error);
        }
        return response.json(); // JSONを解析
      })
      .then((data) => resolve(data)) // 成功時にデータをresolve
      .catch((error) => {
        console.log('fetch中にエラーが発生しました:', error.message); // コンソールにエラー出力
        reject(error); // Promiseをエラーとしてreject
      });
  });
};

// メインの関数
const getData = () => {
  fetchData()
    .then((postData) => postData.slice(0, 9)) // 必要な部分だけ取り出す
    .then((posts) => {
      posts.forEach((post) => {
        const data = `<li class="post-el" data-id=${post.id}>
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
          </li>`;
        postList += data; // HTMLデータを追加
      });
      postListElement.innerHTML = postList; // DOMに反映
      postList = ''; // リセット
    })
    .catch((error) => {
      console.error('エラーが発生しました:', error.message);
    });
};

// 関数の実行
getData();
