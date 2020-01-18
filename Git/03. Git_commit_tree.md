# Git 커밋트리에서 이동하기

### HEAD 분리하기
- HEAD: 현재 체크아웃된 커밋(현재 작업중인 커밋)<br/>
HEAD는 항상 작업트리의 가장 최큰 커밋을 가리킨다. <br/>일반적으로 HEAD는 브랜치의 이름 가리킨다. 따라서 커밋을 하면 브랜치의 상태가 바뀌고, 이러한 변경 사항을 HEAD를 통해 확인이 가능하다.<br/>

- HEAD를 분리한다는 것 => HEAD를 브랜치가 아닌 커밋에 붙이는 것<br/>
~~~
//HEAD를 bugfix(브랜치)에서 분리하고 그 커밋(c1)에 붙이기
git checkout c1
// 이제 HEAD는 커밋 c1을 가리킴
~~~


### 상대참조
- 상대참조로 기억할만한 지점에서 출발하여 다른 지점에 도달하여 작업할 수 있다.
상대 커밋에는 2가지 방법이 있다.
1. ^ (캐럿): 한번에 한 커밋 위로 움직임
~~~
git checkout master^ //master의 부모에 체크아웃
~~~
~~~
//bugfix(브랜치)의 부모 커밋을 체크아웃 하기
git checkout c4 //HEAD분리
git checkout HEAD^  //한 커밋 위로 이동
~~~

2. ~< num > (틸다): 한번에 여러 커밋(num만큼) 위로 올라감
- 브랜치 강제로 옮기기: `-f` 옵션(브랜치 강제)을 통해 브랜치를 특정 커밋에 직접적으로 재지정할 수 있다.
~~~
git branch -f master HEAD~3
~~~
-예제: HEAD, master, bugfix를 제시되는 골지점으로 옮겨라<br/>아래 그림은 초기상태
![텍스트](ref_example.jpg)
~~~
git checkout c6
git branch -f master HEAD
git branch -f bugfix HEAD~4
git checkout C1
~~~
결과 화면<br/>
![텍스트](ref_example02.jpg)


### git 변경한 내용 되돌리기
두가지 방법
1. reset: 브랜치가 예전의 커밋을 가리키도록 이동하는 방식이다. (애초에 커밋하지 않은 것처럼)
로컬 브랜치에서는 괜찮지만 리모트 브랜치에는 쓸 수 없다.
~~~
git reset HEAD~1
~~~

2. revert: 변경분을 되돌리고, 되돌린 내용을 다른 사람과 공유하기 위해 사용한다.
~~~
git revert HEAD
//또는
git revert [현재 브랜치명]
~~~

- 예제: local 브랜치(로컬)와 pushed 브랜치(리모트)에 있는 최근 커밋을 되돌리기
~~~
git checkout local
git reset HEAD^ //로컬 브랜치에서는 reset 사용하여 하나 위로 이동
git checkout pushed
git revert HEAD //리모트 브랜치에서는 revert
~~~




[Git Branching 게임](https://learngitbranching.js.org/ ) 참고하여 작성
