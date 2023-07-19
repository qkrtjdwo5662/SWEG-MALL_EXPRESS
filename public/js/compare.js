// const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

// 로컬스토리지에서 데이터 가져오기
const selectedItems = localStorage.getItem("selectedItems");
// JSON 형식의 문자열을 JavaScript 객체로 변환
const items = JSON.parse(selectedItems);

console.log(items);

const selectBoxDefault = document.querySelectorAll("#select_product_0");
const sizeContents = document.querySelectorAll(".item:nth-child(1) .contents");
const modelContents = document.querySelectorAll(".item:nth-child(2) .contents");
const colorContents = document.querySelectorAll(".item:nth-child(3) .contents");
const priceContents = document.querySelectorAll(".item:nth-child(4) .contents");
const itemImg = document.querySelectorAll(".itemImg");
const itemName = document.querySelectorAll(".info_wrap .pro_name");
const itemModel = document.querySelectorAll(".info_wrap .pro_model_name");
const itemPrice = document.querySelectorAll(".info_wrap .pro_price");
const itemCount = document.querySelector(".info span")

//총 개수 카운트
if(items){
  itemCount.innerText = items.length;
}

items.forEach(function (item, index) {
  //셀렉트박스 옵션 기본 설정
  const optionEl = document.createElement("option");
  optionEl.setAttribute("selected",true)
  optionEl.innerText = item.name + item.color;
  selectBoxDefault[index].appendChild(optionEl);

  //슬라이드 이미지 교체
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", item.img);
  itemImg[index].appendChild(imgEl);

  //슬라이드 정보 교체
  itemName[index].innerText = item.name + item.color;
  itemModel[index].innerText = item.name;
  itemPrice[index].innerText = item.price;

  //하단리스트 정보 교체
  sizeContents[index].innerText = item.name;
  modelContents[index].innerText = item.model;
  colorContents[index].innerText = item.color;
  priceContents[index].innerText = item.price;
});
