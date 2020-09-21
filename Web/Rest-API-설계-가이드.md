# Rest API 설계 가이드

> [진짜 REST API에 대한 구구절절한 설명](Rest-API란-무엇인가.md)을 보고오면 좋다.

URI는 자원을 표현하는 데에 집중하고, 행위는 HTTP METHOD를 통해 정의하는 것이 REST한 API를 설계하는 중심 규칙이다.<br>

### 1) URI는 정보의 자원을 표현해야 한다

- resource는 동사보다는 명사를, 대문자보다는 소문자를 사용한다.

- 예) 회원정보를 가져올 때

```
GET /members/1
```

### 2) 자원에 대한 행위는 HTTP Method로 표현한다(GET, POST, PUT, DELETE)

- URI에 HTTP Method가 들어가면 안된다.
- URI에 행위에 대한 동사 표현이 들어가면 안된다.

- 예) 회원 삭제할 때

```
GET /members/delete/1   bad, resouce는 행위에 대한 표현이 들어가지 않도록 함.
DELETE /members/1       good
```

- 예) 회원 추가할 때

```
GET /members/insert/2   bad
POST /members/2         good
```

### 3) 슬래시 구분자(/)로 계층 관계를 나타낸다

- URI 마지막 문자로 슬래시(/ )를 포함하지 않는다.

```
http://example.com/sports/baseball/     bad
```

### 4) URI의 가독성을 높이기 위해 하이픈(-)을 사용할 수 있다

- 불가피하게 긴 URI를 사용하게 된다면 하이픈(-)을 사용해 가독성을 높일 수 있다.
- 그러나 밑줄(\_)은 사용하지 않는다.

### 5) URI 경로는 소문자로 구성한다

- URI 경로에 대문자 사용은 피한다. RFC 3986(URI 문법 형식)은 URI 스키마와 호스트를 제외하고는 대소문자를 구별하도록 규정하고 있다.

### 6) 파일 확장자는 URI에 포함하지 않는다

```
http://example.com/sports/baseball/photo.jpg   bad
```

- 아래의 예시처럼 Accpet header를 사용하도록 한다.

```
GET /sports/baseball/photo HTTP/1.1
Host: example.com
Accept: image/jpg
```

### 7) 리소스 간 관계를 표현하는 방법

- 리소스 사이에 연관 관계가 있을 때 `/리소스명/리소스 ID/관계가 있는 다른 리소스명`의 형태로 표현할 수 있다.
- 예) 일반적으로 '소유'의 관계를 표현할 때

```
GET : /users/{userid}/pictures
```

<br>

- 만약 관계를 표현하기 어려울 경우 서브 리소스에 명시적으로 표현할 수도 있다.
- 예) 사용자가 '좋아하는' 사진 목록을 표현할 때

```
GET : /users/{userid}/like/pictures
```

### 8) 자원을 표현하는 Collection와 Document

- 컬렉션은 객체의 집합, 도큐먼트는 객체라고 할 수 있다.
- resource의 Collection 이름으로는 복수 명사를 사용해야 한다.
- resource의 Document 이름으로는 단수 명사를 사용해야 한다.
- 예) baseball 팀 ktwiz를 의미하는 경우

```
http://example.com/sports/baseball/teams/ktwiz   sports와 teams 컬렉션으로 복수 명사, baseball과 ktwiz은 도큐먼트로 단수 명사
```

<br>

### HTTP 응답 상태 코드

잘 설계된 REST API는 URI뿐만 아니라 그 리소스에 대한 응답도 잘 표현되야 한다. <br>
정확한 응답의 상태 코드만으로도 많은 정보를 전달할 수가 있기 때문에, 응답 상태코드 값을 명확히 돌려주도록 하자.br>
따로 정리한 부분은 [여기](HTTP-응답-상태코드.md)에 있다.

<br>

#### 참고

- [TOAST MEETUP - REST API 제대로 알고 사용하기](https://meetup.toast.com/posts/92)
