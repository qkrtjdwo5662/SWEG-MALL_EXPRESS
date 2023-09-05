let obj = {
  name : "qkrtjdwo5662",
  coupon : {
    "join-complete" : {
      category : "minus",
      content : 1000
    },
    "test" : {
      category : "percent",
      content : 20,
    }
  }
}

// console.log(obj);
// console.log(Object.values(Object.keys(obj)[0]));
// // console.log(obj[Object.keys(obj)[1]]);
// console.log(obj.coupon["join-complete"].category);
// console.log(obj.coupon["join-complete"].content);

const selectedCoupon = "test";

console.log(obj.coupon);
console.log(obj.coupon[selectedCoupon]);



