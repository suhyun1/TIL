# Datamodel

>[Prisma 공식문서](https://www.prisma.io/docs) 를 바탕으로 작성하였다.

<br/>`.prisma` 파일을 작성해보자

### Fields
String, Int, Float, Boolean, DateTime, enum, Json, ID 등을 사용할 수 있다

- ID

ID는 [cuid](https://github.com/ericelliott/cuid)에 기반하여 생성되는 unique한 25-character string이다. 하나의 model은 하나의 ID필드만을 가질 수 있다. 모델의 데이터가 unique하려면 ID를 추가해야 한다.
~~~
type User {
  id: ID! @id
}
~~~
<br/>

### Type Modifiers

- Required

필수적인 field는 `!`를 통해 표시한다

~~~
type User {
  name: String!
}
~~~
<br/>

- List

리스트 형식은 [] 안에 type을 넣어 사용한다.
~~~
type Article {
  tags: [String!]!
}
~~~
<br/>

### Field constraints

- unique

model의 두 개의 레코드가 같은 값을 가질 수 없다.
~~~
type User {
  id: ID! @id
  email: String! @unique
  name: String!
}
~~~
위의 예시의 경우 모든 User는 각각 유일한 email 주소 값을 가진다.
<br/>

- default

~~~
type User {
  id: ID! @id
  username: String! @default(value:"")
}
~~~
이 예시의 경우 username 필드의 기본값은 ""이다.<br/>


### Relation

- 1:N relations

~~~
type User {
  id: ID! @id
  posts: [Post!]!
}

type Post {
  id: ID! @id
  author: User!
}
~~~
한 User는 여러 Post(게시물)을 생성할 수 있으므로 위와 같이 작성할 수 있다.<br/>


- N:M relations

~~~
type Category {
  id: ID! @id
  posts: [Post!]!
}

type Post {
  id: ID! @id
  categories: [Category!]! @relation(link: TABLE)
}
~~~
한 카테고리(Category)에 여러 개의 게시물(Post)이 들어갈 수 있고, 하나의 게시물(Post)이 여러 카테고리(Category)에 속할 수 있도록 할 경우 위와 같이 작성할 수 있다.<br/>

- self relation

자기 참조가 가능하다.
~~~
type User {
  id: ID! @id
  following: [User!]! @relation(name: "FollowRelation")
  followers: [User!]! @relation(name: "FollowRelation")
}
~~~
SNS에서 각 유저들은 팔로잉, 팔로워를 가진다. 이 팔로잉, 팔로워도 유저들의 리스트이다.
<br/>

~~~
mutation {
 updateUser(
   data:{following:{connect: {id:"ck6xnerskzcuh0b09x1ozxd9k"}}}
   where: {id:"ck6xoe8b7eybk0b006pttkxux"}
 ){
   username
 }
}
~~~
이러한 예시 쿼리를 수행하면, User A와 B가 있을때, A의 following에 B를 연결하면 자동으로 B의 followers에 A가 추가된다.<br/>


### SDL directives

- @id
이 경우 자동으로 unique한 식별자가 할당된다. 25자의 알파벳소문자+숫자 조합이다. [cuid](https://github.com/ericelliott/cuid)에 기반한다. <br/> @id는 `ID`나 `INT` 필드에만 적용될 수 있다.

~~~
type User {
  id: ID! @id
}
~~~
