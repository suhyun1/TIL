# GraphQL VS. REST

### REST API
HTTP를 통해 CRUD를 실행하는 API를 의미한다. 웹상의 **resource** 를 **HTTP URI** 로 표현(식별)하고, 그 resource에 대한 행위를 **HTTP Method** 로 정의한다.<br/>
데이터가 요청되는 시점에 resource의 상태를 전달한다. 일반적으로 JSON 또는 XML의 형태로 데이터를 전달한다. CURD에 해당하는 4가지 HTTP Method(post, get, put, delete)를 통해 operation을 적용한다.

- 예시 (게시물 API)

~~~
GET /posts/[post_id]{
  "title" : "hello",
  "writer": {
    "username" : "suhyun",
    "level" : "newbie"
  },
  "content" : "..."
}
~~~


- 장점: HTTP 프로토콜을 사용하므로 따로 인프라 구축할 필요가 없음. 또한 HTTP 표준 프로토콜을 사용하는 모든 플랫폼에서 호환됨. 서버와 클라이언트의 역할이 명확하게 분리됨

- 단점: method 4가지로 정해져 있음

<br/>


### GraphQL이란
> GraphQL은 Server API를 통해 정보를 주고 받기 위해 사용되는 쿼리 언어이다.

Graph Query Language의 줄임말로, sql과 같은 쿼리 언어이다. sql은 DB에 저장된 데이터를 효율적으로 가져오는 것이 목적이라면, gql은 client가 서버로부터 데이터를 효율적으로 가져오는 것이 목적이다. 또한 sql문은 주로 백엔드에서 작성 및 호출하지만, gql문은 주로 클라이언트 측에서 작성 및 호출한다.

- gql 스키마 예시

~~~
type User{
  id: ID!
  username: String!
  firstName: String
  lastName: String
  following: [User!]!
  followers: [User!]!
}
~~~


- gql 쿼리 예시

~~~
{
    seeProfile(id: "123456") {
      username
      email
      following{
        username
      }
    }
}
~~~

- 장점: 쿼리 조합을 통해 사용자가 원하는 대로 정보 요청 가능함(위의 예시에서 return 필드를 마음대로 추가할 수 있음). 한 번의 네트워크 호출로 처리 가능

- 단점: 파일 업로드 및 다운로드를 처기하기 복잡함. 고정된 요청과 응답만 필요할 경우 쿼리 때문에 HTTP 요청 크기가 rest API보다 커짐

<br/>

### GraphQL API와 RESTful API 비교
- HTTP 요청 횟수

RESTful API는 URL, HTTP Method 등을 조합하여 사용하기 때문에 Endpoint가 다양하다. 각 Endpoint마다 sql 쿼리가 달라지므로 resource 종류별로 요청을 해야 한다.(게시물과 그에 달린 댓글을 fetch하려면 다수의 Endpoint를  호출해야 한다) 반면, GraphQL API는 Endpoint를 주로 하나만 사용한다. 원하는 정보를 하나의 쿼리에 모두 담아 요청할 수 있다.

![multiple REST roundtrips vs. one GraphQL request](https://www.apollographql.com/blog/static/1_qpyJSVVPkd5c6ItMmivnYg-8efafc9157a25a40baf71107578247cd.png)

- 응답의 구조

RESTful API는 하나의 Endpoint에서 돌려줄 수 있는 응답의 구조가 정해져있다. 따라서 필요한 부분만 부분적으로 요청하는 것은 어렵다. 반면, GraphQL API는 쿼리 조합을 통해 불러올 데이터의 종류(응답의 구조)를 결정한다. 따라서 gql API를 사용하면 응답의 구조를 사용자가 원하는대로 바꿀 수 있다.

- 무엇을 써야할까

GraphQL | REST
-|-
- 구조가 다양한 요청들에 대해 응답해야 되는 경우<br/>- 대부분의 요청이 CRUD에 해당하는 경우  | - 요청의 구조가 정해져 있는 경우<br/>- File 전송이 필요한 경우<br/>- HTTP(s)에 의한 캐싱을 사용하고 싶을 경우

=> API의 용도에 따라 유리한 방법을 선택하면 된다!


<br/>

#### 참고한 출처

- [GraphQL과 RESTful API - 안녕 프로그래밍](https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/)
- [GraphQL vs. REST - APOLLO BLOG](https://www.apollographql.com/blog/graphql-vs-rest-5d425123e34b)
