# express - 쿠키 사용하기
### Cookie란?
> 서버 측에서 클라이언트에 보내는 key-value 형식의 데이터이다. 클라이언트가 가지고 있다가(local머신에 저장됨) 서버에 접속 요청시 request header에 넣어 보낸다.<br/>
주로 로그인 유지, 장바구니 기능에 사용된다.


### cookie-parser

cookie-parser는 header의 cookie를 파싱하여 req.cookies의 형태로 리턴함
~~~
npm install cookie-parser
~~~


### Counter 예제
- express 서버 구현 및 쿠키 만들기

~~~js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

app.get('/', function(req,res){
  let count = 0;
  res.cookie('count', count); //(key, value)형태
  res.send('count: '+count);
});

app.listen(/*port번호*/, function () {
    console.log('connected /*port번호*/ port');
})
~~~
위 코드의 경우, 브라우저가 서버에 매번 'count': 0 이라는 쿠키를 보내므로 매번 'count: 0' 이라는 같은 결과가 나올 것.

- 요청 시 count 1씩 증가하도록 수정하기

~~~js
app.get('/', function(req,res){
    let count = 0;
    if(req.cookies.count) {
        count = parseInt(req.cookies.count);    
    }
    count++;
    res.cookie('count', count);
    res.send('count: '+req.cookies.count);
});
~~~
req 객체에 존재하는 cookies 객체에 쿠키들이 저장되어있어 `req.cookies.count`으로 가져올 수 있다. cookie가 전달한 값은 기본적으로 문자열이기 때문에 parseInt함수를 사용하여 정수형으로 변환하였다.

### Cookie 서명하기 (counter 예제)
header의 내용을 들여다보면 cookie 데이터가 확인 가능하다. 이는 보안상 매우 위험하므로 쿠키 데이터를 해쉬화할 것이다.

- 해시화 key 설정

~~~js
let express = require('express');
let cookieParser = require('cookie-parser');  
let app = express();   
app.use(cookieParser('2D@z83%&Z9L!&()#'));  //해시에 사용할 key값을 입력!
~~~

- 서버가 쿠키 받거나 브라우저에 보낼 때 설정 변경

res에 쿠키 해시화 설정: res.cookie('count', count, `{signed:true}` );<br/>
req의 쿠키 헤더 파싱: cookies -> signedCookies

~~~js
app.get('/count', function(req,res){
    let count =0 ;
    if(req.signedCookies.count) {
        count = parseInt(req.signedCookies.count);    
    }
    count++;
    res.cookie('count', count, { signed: true });
    res.send('count: ' + count);
});
~~~


### 간단한 도서 장바구니 예제(cookie 서명)
- 기능
> 1. /products - 도서 리스트 보여줌. 도서를 장바구니에 담을 수 있음.
> 2. /cart:id  - id를 받아 해당 도서 장바구니에 추가하고 /cart 페이지로 redirect
> 3. /cart - 장바구니에 담은 도서 목록과 수량 보여줌.

~~~js
const express = require('express');
const cookieParser = require('cookie-parser');  
const app = express();
app.use(cookieParser('3K49A2Q89LZ3$@#^(!dfz')); //쿠키 암호화

let products = {
    //상품id: {상품 data담긴 객체}
    1: { title: 'Cloud Computing' },
    2: { title: 'Computer Network: top-down Approach' },
    3: { title: 'Hands-On Machine Learning'}
};
app.get('/products', function (req, res) {
    let output = '';
    for (var name in products) {
        output += `
        <li>
            ${products[name].title} <a href="/cart/${name}">담기</a>
        </li>`;
    }
    res.send(`
    <h1>Products List</h1>
    <ul>${output}</ul>
    <a href="/cart">Cart</a>
    `);

});

app.get('/cart/:id',function(req,res){
    const id = req.params.id;
    let cart = {};
    if (req.signedCookies.cart ){
        cart = req.signedCookies.cart;
    }
    if(!cart[id]){  //카트에 존재 않는 상품
        cart[id] = 0;
    }

    cart[id] = parseInt(cart[id]) + 1;  //cookie가 전달한 값은 기본적으로 문자열
    res.cookie('cart', cart, {signed:true});
    res.redirect('/cart');  
});

app.get('/cart', function(req,res){
    const cart = req.signedCookies.cart;
    let output = "";
    if(!cart){
        res.send('empty!');
    }else{       
        for(var id in cart){
            output += `<li>${products[id].title} 의 수량: ${cart[id]}</li>`;
        }
    }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Product Lists</a>
    `);
});

app.listen(3003, function () {
    console.log('connected 3003 port');
})
~~~


*장바구니 예제 -  생활코딩 server side js 강의 참고*
