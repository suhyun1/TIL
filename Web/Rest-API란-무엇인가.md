# Rest API란 무엇인가

> (진짜) Rest API를 어떻게 설명할 수 있을까?<br>['그런 REST API로 괜찮은가'라는 D2 발표영상](https://www.youtube.com/watch?v=RP_f5dMoHFc)을 보고 많은 배움을 얻어 정리하게 되었다.

### REST란?

2000년에 로이 필딩의 박사 학위 논문(Architectural Styles and the Design of Network-based Software Architectures)을 통해 REST라는 개념이 처음 등장하였다. REST는 Representational State Transfer라는 용어의 약자이다. 필딩은 HTTP의 주요 저자 중 한 사람이다. 그는 이 논문에서 웹 아키텍처의 요구사항과 해결해야할 문제를 설명했고, 이를 해결하기 위한 아키텍처 스타일인 REST를 소개하였다. REST는 기본적으로 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기 때문에, 웹의 장점을 최대한 활용할 수 있다.

- [로이 필딩의 논문 중 REST 부분](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

### REST 구성

3가지 구성요소

- 자원(Resource) : 자원은 Data, Meta Data, HATEOAS로 나뉨
- 행위(Verb) : HTTP Method로 표현됨
- 표현(Representation)

### REST 특징

> 오늘날 REST API라고 부르는 것 중 대부분이 클라이언트-서버 구조, stateless, cacheable, layered system을 따르지만(대부분이 HTTP의 특징이므로), uniform interface는 잘 만족하지 못한다.

- client-server 구조

클라이언트-서버 구조는 각각의 역할이 확실히 구분되기 때문에 서로 의존성이 줄어든다.<br>
따라서 클라이언트의 이식성과 서버의 규모확장성을 개선할 수 있다.

- stateless

클라이언트와 서버의 통신에는 상태가 없다. 다시 말해 상태정보를 따로 저장하고 관리하지 않는다.(쿠키나 세션같은)<br>
모든 요청에는 필요한 모든 정보를 담고 있기에 단순히 요청만 처리하면 된다. 따라서 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로써 구현이 단순해진다.

- cacheable

캐시가 가능해야 한다. 모든 서버 응답은 캐시가 가능한지 아닌지 알 수 있어야 한다.<br/>
효율, 규모 확장성, 사용자 입장에서의 성능이 개선된다. <br/>
REST는 HTTP를 그대로 활용하기 때문에, HTTP가 가진 캐싱 기능을 적용할 수 있다.

- uniform interface

구성 요소(클라이언트, 서버 등) 사이의 인터페이스는 uniform해야 한다.<br>
인터페이스를 일반화함으로써, 전체 시스템 아키텍처가 단순해지고 상호 작용의 가시성이 개선되며, 구현과 서비스가 분리되므로 독립적인 진화가 가능해질 것이다.<br>
uniform interface는 4가지 제약 조건에 의해 정의되는데, 아래에 서술하였다.

- layered system(계층형 구조)

REST 서버는 다중 계층으로 구성될 수 있다. 로드밸런싱 계층을 추가해 시스템 확장성을 향상시킬 수도 있다.

#### Uniform Interface의 제약 조건 4가지

- identification of resource: resource가 URI로 식별되어야 한다.
- manipulation of resource through representations: http 메시지에 representation을 담아 resource를 조작하도록 한다.
- **self-descriptive message**

REST API 메시지만 보고도 온전히 해석이 가능해야 한다.

- **HATEOAS(Hypermedia As The Engine Of Application state)**

애플리케이션의 상태가 하이퍼링크를 통해 전이되어야 한다는 것이다.<br>
예를 들어, 게시판 기능이 있는 웹사이트를 가정해보자. 게시글 목록에서 글의 제목을 누르면 해당 글을 상세히 보여주는 화면으로 이동한다. 또 글쓰기 버튼을 누른다면, 글을 작성하는 화면으로 이동한다. 이렇게 웹에서는 하이퍼링크를 통해 관계된 URL로 이동할 수 있다.
<br>

> 그렇다면 왜 uniform interface를 만족해야 하는가?
>
> 서버와 클라이언트의 **독립적인 진화를 위해** uniform interface 만족해야 한다. 즉 **서버의 기능이 변경되어도 클라이언트를 업데이트 할 필요가 없게** 하기 위함이다.<br>REST의 목적은 독립적인 진화이기도 하다. 따라서 독립적인 진화를 달성하기 위해서는 uniform interface가 반드시 만족되어야 한다는 것!

> self-descriptive와 HATEOAS가 독립적 진화에 도움을 주나?
>
> - 서버와 클라이언트가 변경되더라도 오고가는 메시지는 self-descriptive하므로 언제나 해석이 가능해진다 <br>
> - HATEOAS로 애플리케이션 상태 전이의 late binding이 가능해진다(링크를 동적으로 바꿀 수 있다)

<br>

### REST API

REST API는 앞서 설명한 REST 아키텍쳐 스타일을 따라야 한다. 4가지 제약조건도 모두 만족시켜야 REST API라고 말할 수 있다.<br>
로이 필딩이 '하이퍼텍스트를 포함한 self-descriptive한 메시지의 uniform interface를 통해 리소스에 접근하는 API'라고 명시하였기 때문이다.<br>
또한 그는 '시스템 전체를 통제할 수 있다고 생각하거나, 진화 가능성(evolvability)에 관심이 없다면, REST에 대해 논쟁하는 데 시간을 낭비하지 말라'고도 하였다.<br>
오랜 시간에 걸쳐 진화하는 시스템을 설계하고 싶다면 REST를 쓰고, 그럴 필요가 없다면 굳이 지키지 않아도 된다는 것이다.<br>
대신 REST를 만족하지 않는 REST API일 경우... Web API라고 부르자

#### 그럼 왜 웹은 REST가 잘 되는데 API는 잘 안되지?

웹은 사람-기계 간 커뮤니케이션으로 Media type이 HTML<br>
API는 기계-기계 간 커뮤니케이션으로 Media type이 JSON<br>

HTML은 hyperlink 가능, self-descriptive 가능(HTML 명세 존재함)<br>
그러나 JSON에 hyperlink는 정의되어 있지 않으며 self-descriptive는 불완전하다. (의미 해석이 불가능하므로 별도의 API문서를 만들어 사용하고 있음)<br>

- JSON 예시

```
GET /visitor HTTP/1.1
Host: example.org

HTTP/1.1 200 OK
Content-Type: application/json

[
    {"id": 1, "title": "안녕하세요"},
    {"id": 2, "title": "처음 인사드립니다"}
]
```

HTTP 명세에 media type은 IANA에 등록되어있다고 하니, IANA에서 application/json을 찾음 -> IANA에 따라 application/json의 명세를 찾아감 -> 명세를 통해 json을 문서를 파싱할 수 있다. 그러나 id와 title이 무엇인지 알 수가 없다. 온전한 해석 불가능 => self-descriptive 실패<br>
또한 다음 상태로 전이할 링크가 없기 때문에 HATEOAS도 실패

- REST API로 고치기

  - self-descriptive
    - 방법1) IANA에 media type 등록하기(메시지를 보는 사람이 명세를 찾아갈 수 있게 됨)
    - 방법2) id와 title이 무엇인지 정의한 명세를 Link 헤더에 profile relation으로 링크하기
  - HATEOAS
    - 방법1) data에 하이퍼링크 표현하기 (링크 표현하는 방법 정의해야 함)
    - 방법2) Link, Location 등 HTTP 헤더로 링크 표현

- 예시

```
GET /visitor HTTP/1.1
Host: example.org

HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://exmaple.org/docs/todos>; rel="profile"

[
    {
        "link": "https://example.org/visitor/1",
        "title": "안녕하세요"
    },
    {
        "link": "https://example.org/visitor/2",
        "title": "처음 인사드립니다"
    },
]

```

<br> <br>

### 참고

- ['그런 REST API로 괜찮은가'라는 D2 발표영상](https://www.youtube.com/watch?v=RP_f5dMoHFc)의 내용을 정리하듯 작성하였다.
- 로이 필드의 논문 [5장](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)과 6장에 REST 관한 내용이 설명되어 있다.
