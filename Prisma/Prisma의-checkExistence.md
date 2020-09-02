# Prisma - Check Existence (JavaScript)

*다른 ORM과 달리 Prisma에서는 매우 간단하게 구현할 수 있는 기능이다!*

### $exists
> `$exists` 속성을 사용하면 특정 레코드가 database에 존재하는지 확인할 수 있다.
매칭되는 레코드가 하나 이상이면 true를, 그렇지 않으면 false를 리턴한다.

- user model의 id를 통해 존재하는 user인지 확인하기
~~~js
const userExists = prisma.$exists.user({
  id: 'cjli6tko8005t0a23fid7kke7'
})
~~~

### AND와 OR 필터
필터 옵션에 `AND`와 `OR`을 다중으로 사용할 수 있다.

- userId와 postId가 모두 일치하는(AND조건) like(좋아요👍 기능) 존재하는지 확인하기
~~~js
const userId = "ck6xoe8b7eybk0b006pttkxux";
const postId = "ck6z6pq7516lu0b09qoccsfhk";
const filterOptions = {
  AND: [
    {
      user: {
        id: userId
      }
    },
    {
      post: {
        id: postId
      }
    }
  ]
};       
const existingLike = await prisma.$exists.like(filterOptions);   
~~~
