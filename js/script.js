const url = 'https://jsonplaceholder.typicode.com/photos'; // 正しいもの
// const url = 'https://jsonplaceholder.typicode.com/photos*'; // 正しくないもの
let postList = '';
const postListElement = document.querySelector('ul.post-list');

// Axiosを使用したデータ取得の関数
const fetchData = async (fetchUrl) => {
  try {
    const response = await axios.get(fetchUrl);
    console.log(`成功、ステータスコード: ${response.status}`);
    return response.data; // JSONデータを返す
  } catch (error) {
    // console.log('エラーオブジェクト', error);
    if (error.response) {
      // サーバーからのエラーレスポンスがある場合
      console.log(`エラー! ステータスコード: ${error.response.status}`);
    } else if (error.request) {
      // リクエストが送信されたがレスポンスが受け取れなかった場合
      console.log(
        'リクエストが送信されましたがレスポンスがありません:',
        error.request
      );
    } else {
      // リクエストを設定する際のエラー
      console.log('エラーが発生しました:', error.message);
    }
    throw error; // 呼び出し元にエラーをスロー
  }
};

// メインの関数
const getData = async (getUrl) => {
  try {
    const postData = await fetchData(getUrl); // データを取得
    const posts = postData.slice(0, 9); // 最初の9件を取得

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
  } catch (error) {
    console.log('データ取得中にエラーが発生しました:', error.message); // エラーメッセージをコンソールに表示
  }
};

// 関数の実行
getData(url);
