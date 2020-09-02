# Git의 Stash 사용하기

> 현재 local에서 작업중인데 브랜치를 변경할 일이 생겼다. 이 때 작업중이던 내용을 **커밋하지 않고** 나중에 작업을 다시 하고 싶을 때 `git stash` 를 사용하면 된다.

### stash란?
git stash 명령을 사용하면 working directory에서 수정한 파일들만 저장한다.<br/>
Stash는 1)Modified이면서 Tracked 상태인 파일과<br/>
2) Staging Area에 있는 파일들을 보관해두는 곳이다.


### 사용 방법

- Stash 생성

스택에 새로운 stash가 만들어진다.

~~~
$ git stash
~~~

혹은

~~~
$ git stash save
~~~

이렇게 하면 working directory가 깔끔해진다.


- 저장한 stash 확인
~~~
$ git stash list
~~~

- stash 다시 적용하기(가져오기)
~~~
$ git stash apply
~~~

~~~
$ git stash apply stash@{1}
~~~

이름을 입력해 stash를 골라 적용할 수 있다.<br/>

Git은 Stash를 적용할 때 Staged 상태였던 파일을 자동으로 다시 Staged 상태로 만들어 주지 않는다. 따라서 stash apply 명령을 실행할 때 `--index` 옵션을 주어 Staged 상태까지 적용할 수 있다.

~~~
$ git stash apply --index
~~~

- stash 제거하기
stash apply 명령은 stash를 스택에서 제거하는 일까지 해주지 않는다. stash drop명령으로 해당 stash를 제거해야 한다.
~~~
$ git stash drop stash@{1}
~~~

<br/>

#### +) working directory 청소하기
stash(임시 저장)하지 않고 불필요한 파일들을 단순히 치우고 싶을 때는 `git clean` 명령을 사용한다. 보통은 Merge나 외부 도구가 만들어낸 파일을 지우거나 빌드 작업으로 생성된 파일들을 지우는 데 사용된다.<br/>
이 명령은 `Untracked` 상태의 파일을 모두 지우므로 신중하게 사용해야 한다. (.gitignore에 명시된 파일은 지우지 않음)
