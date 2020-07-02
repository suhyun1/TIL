# revert로 리모트 브랜치의 커밋 되돌리기
> revert 커밋도 일반 커밋처럼 커밋 히스토리에 남는다. 따라서 원격 저장소를 통해 다른 사람들과 작업을 공유하는 경우,  `git push -f`처럼 강제로 히스토리를 덮어씌우는 것보다 좋은 방법이다.

- 사용 방법

~~~
$git revert  [되돌릴 커밋의 hash]
~~~

- 예시

아래는 git log이다.
~~~
commit fc03757927a68a7fff6c5bb03f4199b81a92e9bb (HEAD -> master, origin/master, origin/HEAD)
Date:   Thu Jul 2 23:44:15 2020 +0900

    Second commit for git revert test

commit e6b4ea5e92394ae1cff20cf86ef4f37689241875
Date:   Thu Jul 2 23:37:45 2020 +0900

    first commit for git revert test

~~~

위 두개의 커밋을 원래대로 돌리고자 한다. <br/>


- `--no-commit` 옵션
