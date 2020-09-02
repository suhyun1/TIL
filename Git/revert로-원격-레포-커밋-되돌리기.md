# revert로 원격 저장소 커밋 되돌리기
> revert 커밋은 일반 커밋처럼 커밋 히스토리에 남는다. 따라서 원격 저장소를 통해 다른 사람들과 작업을 공유하는 경우,  `git push -f`처럼 강제로 히스토리를 덮어씌우는 것보다 좋은 방법이다.

- 사용 방법

~~~
$git revert  [되돌릴 커밋의 hash]
~~~

- 예시

아래는 git log이다. 세 개의 커밋이 원격 저장소에 반영되어 있다. 가장 최근에 한 커밋부터 차례대로 revert를 수행해야 한다.

~~~
commit 8260c6c699ae2aaedd68605c12f490687456b884 (HEAD -> master, origin/master, origin/HEAD)
Date:   Fri Jul 3 00:09:09 2020 +0900

    3rd commit (for testing revert)

commit 61f15f0893306de03632aacf6bf24d933362979a
Date:   Fri Jul 3 00:08:51 2020 +0900

    2nd commit (for testing revert)

commit 4143498f5007fe7c62111a3537a77d1384cadda6
Date:   Fri Jul 3 00:08:18 2020 +0900

    1st commit (for testing revert)
~~~

~~~
$git revert 8260c6c699ae2aaedd68605c12f490687456b884
~~~

아래는 가장 최근 커밋 하나를 revert한 결과

~~~
commit d103e8cfb36dfb8216df4f85706881be3b0e394d (HEAD -> master)
Date:   Fri Jul 3 00:15:08 2020 +0900

    Revert "3rd commit (for testing revert)"

    This reverts commit 8260c6c699ae2aaedd68605c12f490687456b884.

commit 8260c6c699ae2aaedd68605c12f490687456b884 (origin/master, origin/HEAD)
Date:   Fri Jul 3 00:09:09 2020 +0900

    3rd commit (for testing revert)

commit 61f15f0893306de03632aacf6bf24d933362979a
Date:   Fri Jul 3 00:08:51 2020 +0900

    2nd commit (for testing revert)

commit 4143498f5007fe7c62111a3537a77d1384cadda6
Date:   Fri Jul 3 00:08:18 2020 +0900

    1st commit (for testing revert)

~~~

revert 커밋이 자동으로 생성된 것을 확인할 수 있다.<br/>
3개의 커밋을 이런 방법으로 되돌리면, 3개의 revert 커밋이 생겨나게 된다. <br/>
여러 개의 커밋을 되돌리고도 하나의 revert 커밋을 만들고 싶다면 아래의 옵션을 사용하자

- `--no-commit` 옵션

이 옵션을 사용하면 revert 커밋이 생성되지 않고 working tree와 staging area에만 반영된다. <br/>
아직 위에서 되돌리지 못한 두개의 커밋(2nd commit, 1st commit)을 되돌리자

~~~
$git revert --no-commit HEAD~3
~~~
따로 커밋을 해주고 원격 저장소에 push 하면 된다.
~~~
$git commit -m 'Revert "3rd, 2nd, 1st commit"'
~~~
