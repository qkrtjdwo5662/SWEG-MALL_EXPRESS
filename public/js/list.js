let product = {
  refrigerator: [
    {
      id: 1,
      name: "FAB28",
      model: "FAB28RCR5",
      color: "크림",
      price: 3350000,
      img: "/img/list/FAB28-크림.png",
    },
    {
      id: 2,
      name: "FAB10",
      model: "FAB28RCR5",
      color: "레드",
      price: 2100000,
      img: "/img/list/FAB10-레드.png",
    },
    {
      id: 3,
      name: "FAB10",
      model: "FAB28RCR5",
      color: "블랙",
      price: 2100000,
      img: "/img/list/FAB10-블랙.png",
    },
    {
      id: 4,
      name: "FAB10",
      model: "FAB28RCR5",
      color: "크림",
      price: 2100000,
      img: "/img/list/FAB10-크림.png",
    },
    {
      id: 5,
      name: "FAB28",
      model: "FAB28RCR5",
      color: "블랙",
      price: 3350000,
      img: "/img/list/FAB28-블랙.png",
    },
    {
      id: 6,
      name: "FAB28",
      model: "FAB28RCR5",
      color: "옐로우",
      price: 3350000,
      img: "/img/list/FAB28-옐로우.png",
    },
    {
      id: 7,
      name: "FAB28",
      model: "FAB28RCR5",
      color: "유니언잭",
      price: 3350000,
      img: "/img/list/FAB28-유니언잭.png",
    },
    {
      id: 8,
      name: "FAB28",
      model: "FAB28RCR5",
      color: "파스텔그린",
      price: 3350000,
      img: "/img/list/FAB28-파스텔그린.png",
    },
    {
      id: 9,
      name: "FAB5",
      model: "FAB28RCR5",
      color: "레드",
      price: 3350000,
      img: "/img/list/FAB5-레드.png",
    },
    {
      id: 10,
      name: "FAB5",
      model: "FAB28RCR5",
      color: "블랙",
      price: 3350000,
      img: "/img/list/FAB5-블랙.png",
    },
    {
      id: 11,
      name: "FAB5",
      model: "FAB28RCR5",
      color: "크림",
      price: 3350000,
      img: "/img/list/FAB5-크림.png",
    },
  ],
  toast: [
    {
      size: 10,
      color: "white",
    },
    {
      size: 50,
      color: "red",
    },
  ],
  heater: [
    {
      size: 10,
      color: "white",
    },
    {
      size: 50,
      color: "red",
    },
  ],
};
// console.log(product);

const comparisonBtn = document.querySelector(".compare_area");
const bottomBox = document.querySelector(".compare_item_area");
const productList = document.querySelector(".product_item_list");

function comparison() {
  if (comparisonBtn) {
    // 비교하기를 클릭했을 때 토글버튼
    bottomBox.classList.toggle("active");
    //클래스에 이름을 추가하고 삭제하는 방법의 toggle로 작업
  }
}
comparisonBtn.addEventListener("click", comparison);

function productView(products) {
  let productViewItem = products.map(function (product) {
    return `<div class="item product_item" data-color="${product.color}" data-name="${product.name}">
    <div class="image_area">
      
      <a href="#">
        <img src=${product.img} alt="" />
      </a>
      <div class="icon_compare">
        <div class="icon_text" style="width: 50px">비교하기</div>
      </div>
    </div>
    <div class="info_area">
      <a href="#">
        <div class="pro_name">${product.name} ${product.color}</div>

        <div class="model_name">${product.model}</div>
      </a>
      <div class="price_area">
        <div class="price_set">
          <div class="price_base">${product.price}</div>
          <div class="price_sale">2,680,000</div>
        </div>
      </div>
    </div>
  </div>`;
  });
  productViewItem = productViewItem.join("");
  productList.innerHTML = productViewItem;
}

productView(product.refrigerator);

//비교하기 버튼 기능
let comparisonWrap = [];

const comparisonSubBtn = document.querySelectorAll(".icon_compare");
const comparisonItemBox = document.querySelectorAll(
  ".compare_item_area .item_box"
);
const itemCount = document.querySelector(".compare_count");

comparisonSubBtn.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    const selectedProduct = product.refrigerator[index];
    //내가 선택한 제품의 객체정보

    const itemBoxHTML = `<div class="width-box">
                            <div class="item_img">
                              <img src=${selectedProduct.img} alt="" />
                            </div>
                            <div class="item_info">
                              <div class="item_name">${selectedProduct.name}</div>
                              <div class="item_model">${selectedProduct.model}</div>
                              <div class="close_compare_box">
                                <img src="/img/list/icon_compare_box_close.svg" alt="close">
                              </div>
                            </div>
                          </div>`;
    //html 안에 selectedProduct에 해당하는 키값 넣어주고 itemBoxHTML변수로 담아줌

    //중복제거
    const isDuplicate = comparisonWrap.includes(itemBoxHTML);
    // comparisonWrap 배열에 itemBoxHTML이 있는지 체크
    if (!isDuplicate) {
      //isDuplicate 변수가 중복되지 않은 경우
      comparisonWrap.push(itemBoxHTML);
      //comparisonWrap배열에 itemBoxHTMl추가
      if (comparisonWrap.length < 4) {
        itemCount.textContent++;
        // itemCount 값을 1 증가시킴
      }
    }

    //item_box안에 하나씩 itemBoxHTML를 추가하는 작업
    comparisonItemBox.forEach(function (itemBox, index) {
      //comparisonItemBox의 div와 index 값을 받아온다.
      // console.log(itemBox); //".compare_item_area .item_box"를 뜻함
      // console.log(index);//itemBox의 요소 0,1,2
      if (index < comparisonWrap.length) {
        //comparisonWrap 배열의 길이가 comparisonItemBox 요소의 개수보다 크다면 즉 일치한다면
        itemBox.innerHTML = comparisonWrap[index];
        //itemBox 안에 html을 comparisonWrap 요소를 담아줌
      } else {
        itemBox.innerText = "선택된 상품이 없습니다.";
      }
    });

    // 삭제기능
    const comparisonClose = document.querySelectorAll(".close_compare_box");

    comparisonClose.forEach(function (closeBtn, index) {
      //comparisonClose 반복되고 있는 요소의 인덱스를 매게변수로 받아옴
      closeBtn.addEventListener("click", function (e) {
        comparisonWrap.splice(index, 1);
        //comparisonWrap와 comparisonClose가 동일한 인덱스를 가지면 삭제
        comparisonItemBox[index].innerHTML = "선택된 상품이 없습니다.";
        // comparisonItemBox의 배열의 Index와 comparisonClose 같은경우 내용 변경
        if (itemCount.textContent > 1) {
          // 1보다 큰 경우에는 1을 감소
          itemCount.textContent--;
          //클릭 될 때 마다 itemCount 숫자 감소
        } else {
          itemCount.textContent = "0";
          // 1 이하인 경우에는 0으로, 항상 0으로 유지
        }
      });
    });

    // comparisonWrap안에 3개만 담기
    if (comparisonWrap.length > 3) {
      comparisonWrap.shift(); // 가장 처음에 추가한 상품 삭제
    }
  });
});

const colorBtns = document.querySelectorAll(".color_chip_icon");
const productItems = document.querySelectorAll(".product_item");

// 컬러 필터 기능
colorBtns.forEach(function (colorBtn) {
  colorBtn.addEventListener("click", function (e) {
    const clickedColor = e.target.dataset.colorname;
    console.log(clickedColor)
    //colorBtns의 dataset.colorname속성을 clickedColor 변수에 저장
    productItems.forEach(function (item) {
      const itemColor = item.dataset.color;
      console.log(itemColor)
      if (itemColor === clickedColor) {
        //컬러버튼을 클릭했을때 컬러랑 item컬러랑 일치할경우
        item.style.display = "inline-block";
      } else {
        item.style.display = "none";
      }
    });
  });
});


//사이즈 필터기능
const imgBtns = document.querySelectorAll(".graph_link");
const imgs = document.querySelectorAll(".graph_img");

imgBtns.forEach(function (imgBtn) {
  imgBtn.addEventListener("click", function (e) {
    const clickedLink = e.target.parentNode.parentNode.dataset.name;
    console.log(clickedLink);

    productItems.forEach(function (item) {
      const itemImg = item.dataset.name;
      if (clickedLink === itemImg) {
        item.style.display = "inline-block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
