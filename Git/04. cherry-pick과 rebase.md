# 작업 여기저기로 옮기기
### Git Cherry-pick
~~~
$ git cherry-pick [커밋1] [커밋2] [...]
~~~
현재 위치(HEAD) 아래의 커밋들에 대해 복사본을 만들겠다는 의미이다.

예시로, master로 복사하고 싶은 작업이 있는 브랜치가 있다.
~~~
$ git cherry-pick C2 C4
~~~
master 브랜치에 C2, C4의 복사본인 C2', C4' 가 만들어짐. 이후 HEAD는 C4를 가리키게 될것이다.(rebase로도 할 수 있지만, 원하는 커밋이 무엇인지 할때 더욱 유용함)

### Git Interactive Rebase
rebase에 `-i`옵션 사용한다는 것
~~~
$ git rebase -i [상대참조]
$ git rebase -i HEAD~4
~~~
- 원하는 커밋이 무엇인지 알 때 => Cherry-pick
- 원하는 커밋이 무엇인지 모를 때 => Interactive Rebase

리베이스할 일련의 커밋들을 검토할 수 있는 좋은 방법이다.

인터랙티스 리베이스 대화창에서는 아래의 3가지 가능하다.
1. 적용할 커밋들 순서 바꾸기
2. 원하지 않는 커밋 빼기
3. 커밋 스쿼시하기 (커밋을 합칠 수 있음)
