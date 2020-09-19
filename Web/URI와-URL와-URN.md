# URI, URL, URN의 차이

![URI, URL, URN](https://i.pinimg.com/originals/1f/06/ab/1f06abe57cb7033f1e39c929f4092ac8.jpg)

<br/>

### URI(Uniform Resource Identifier, 통합 자원 식별자)

- 웹 상의 자원을 나타내는 유일한 주소
- location, name, 혹은 둘 다를 사용하여 자원을 식별한다.

- 예시로, http://exmaple.com:123/test/hello.html?name=suhyun 에서는 name=suhyun 과 같은 쿼리스트링의 값에 따라 보여주는 결과가 다르다. 따라서 식별자의 역할을 한다.
- 예시로, http://insta.com/photo/2392817 (id가 2392817인 사진을 요청하는 REST 서비스) 와 같은 URI를 사용한다.
- URN과 URL은 URI에 포함된다.

<br/>

### URL(Uniform Resource Location)

- 서버에 있는 파일의 위치를 나타낸다.
- URL은 웹 사이트 주소뿐만 아니라 컴퓨터 네트워크 상의 자원을 모두 나타낼 수 있다.
-
- 예시로, http://exmaple.com:123/test/hello.html은 example.com 서버에서 test 폴더 안에 hello.html 파일이 요청하는 것이다. <br/>
  따라서 http://exmaple.com:123/test/hello.html 은 URI이고, URL이기도 하다. <br/>그러나 http://exmaple.com:123/test/hello.html?name=suhyun 은 URI이지만, URL은 아니다.
- http://www.naver.com은 URL이다.
- 모든 URL은 URI이다.

<br/>

### URN(Uniform Resource Name)

- 자원의 위치 정보가 아닌 실제 자원의 이름을 사용하는 방식이다.
- 자원의 위치가 바뀌면 찾지 못하는 URL의 한계 때문에 사용된다.
- 형식

```
urn:namespace:the:id:for:file
```

- 모든 URN은 URI이다.

<br/>

### 정리

URI과 URL은 반드시 같지는 않다<br/>
모든 URL은 URI이지만,
모든 URI가 URL은 아니다!

<br/>

#### 참고

- [URL vs URI: Most important Differences You Must Know](https://www.guru99.com/url-vs-uri-difference.html)
