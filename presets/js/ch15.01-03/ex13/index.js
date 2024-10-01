const navs = document.querySelectorAll("nav>a");

// 1. nav 要素内のリンク
for (const n of navs) {
  console.log(n.href);
}

// 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
const product1 = document.querySelector(".product-list h3");
console.log(product1.textContent);

// 3. カートアイコンの画像 (`<img>`)
const cart = document.querySelector(".cart img");
console.log(cart.src);

// 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const productPrices = document.querySelectorAll(".product-item .price");
console.log(productPrices);

// 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (`<img>`)
const productImages = document.querySelectorAll(".product-item img");
for (const img of productImages) {
  console.log(img.src);
}

// 6. 検索バー (.search-bar) 内の検索ボタン (`<button>`)
const searchButton = document.querySelector(".search-bar button");
console.log(searchButton);

// 7. フッター (footer) 内のパラグラフ (`<p>`) 要素
const footer = document.querySelector("footer p");
console.log(footer);

// 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const products = document.querySelectorAll(".product-list h3");
for (let i = 0; i < products.length; i++) {
  if (i % 2 !== 0) {
    console.log(products[i]);
  }
}

// 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (`<img>`)
const headerImg = document.querySelector(".account img");
console.log(headerImg.src);

// 10. ナビゲーションリンクのうち、"会社情報" のリンク
const companyInfo = document.querySelector('nav a[href="#about"]');
console.log(companyInfo.href);
