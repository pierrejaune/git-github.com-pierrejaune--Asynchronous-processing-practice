const url = 'https://jsonplaceholder.typicode.com/photos'; // 正しいもの
// const url = 'https://jsonplaceholder.typicode.com/photos*'; //正しくないもの
let postList = '';
const postListElement = document.querySelector('ul.post-list');

// データ取得の関数
const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // レスポンスがエラーの場合はエラーをスロー
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      console.log(`成功、${response.ok}`);
    }
    return await response.json(); // JSONを解析して返す
  } catch (error) {
    console.log('fetch中にエラーが発生しました:', error.message); // コンソールにエラー出力
    throw error; // エラーを呼び出し元にスロー
  }
};

// メインの関数
const getData = async () => {
  try {
    const postData = await fetchData(); // データを取得
    const posts = postData.slice(0, 9); // 必要な部分だけ取り出す

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
      // console.log(postList);
    });

    postListElement.innerHTML = postList; // DOMに反映
    postList = ''; // リセット
  } catch (error) {
    // console.error('エラーが発生しました:', error.message); // エラーメッセージをコンソールに表示
    console.log('エラーが発生しました:', error.message); // エラーメッセージをコンソールに表示
  }
};

// 関数の実行
getData();
