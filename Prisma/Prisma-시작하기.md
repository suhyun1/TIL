# Prisma Intro

>[Prisma 공식문서](https://www.prisma.io/docs) 를 바탕으로 작성하였다.
<br/>

### Prisma란?
Prisma는 데이터베이스 도구 포함 ORM, 마이그레이션 및 관리자 UI를 제공한다.
Prisma는 이전의 ORM(django ORM, TypeORM, Sequelize) 사용시 필요했던 작업들을 줄여준다. Datamodel만 작성하면 DB와 관리 패널을 자동으로 만들어주고, 모든 resolvers가 있는 playground서버도 자동으로 생성해준다. Prisma client가 DBMS(MySQL, PostgreSQL, MongoDB 지원)와 언어(현재 JS, TS, GO지원)에 상관없이 자동으로 생성해준다. Prisma는 GraphQL, REST, gRPC APIs 등을 빌드할 때 사용할 수 있다.
<br/>
Prisma는 APP 또는 API server와 Database 사이에 위치한 Data Access Layer이다. Datamodel, Prisma Client, Prisma Server로 이루어져있다.
- Datamodel: Application에서 model을 정의함.
- Prisma Server: DB위의 독립형 인프라
- Prisma Client: Prisma 서버에 연결하여 DB에서 데이터를 읽고 쓸 수 있도록 해주는 자동 생성 라이브러리. Application에서 데이터에 접근시 사용됨.
<br/>

### Prisma와 GraphQL
prisma는 DB를 GraphQL로 정의할 수 있다(GraphQL API로 바꿔준다). 따라서 GraphQL의 queries와 mutations을 사용하여 DB를 읽고 쓸 수 있다.
이러한 GraphQL CRUD mapping은 Prisma Service에서 제공한다. 그리고 Prisma Service는 Prisma Server에서 돌아간다. Prisma Service는 `prisma.yml`과 `datamodel.prisma` 이 두 가지 파일을 통해 설정된다. (prisma init 시 자동으로 파일 생성됨)<br/>
[Datamodel 간단 정리](Prisma-Datamodel.md)
<br/>

### 사용 방법

1. prisma 설치
~~~
npm install -g prisma
~~~
<br/>

2. https://app.prisma.io 에 접속하여 가입 후 workspace 생성하고
`add a service` 메뉴 선택
<br/>

3. 메뉴 선택시 보이는 cloudSessionKey를 통해 로그인

~~~
prisma login -k //사용자에 따라 값 주어진다
~~~
<br/>

4. 새로운 service 만들기

~~~
prisma init
//또는 아래처럼 폴더 이름 지정 가능
prisma init hello-world
~~~

초기화 시 service 이름, stage, DB, deploy region, client 언어 등을 설정하면 된다.
<br/>

5. 배포
~~~
prisma deploy
~~~
배포를 하면 자신의 prisma 계정에 datamodel의 바뀐 내용이 모두 업데이트 된다.
<br/>

### Service endpoints
prisma deploy 완료 시, 'Your Prisma endpoint is live: '라는 메시지와 함께 playgorund 서버의 주소를 알려준다.(`prisma.yml`에서도 쓰여있다) Prisma Admin은 endpoint에 접근 가능하다.
(CRUD가 모두 가능하므로, 이 링크를 사용자에게 알려주어선 안됨)
