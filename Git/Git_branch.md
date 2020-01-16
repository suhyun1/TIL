# Git Branch
### 브랜치 기본
- 새 브랜치 만들기
~~~
git branch [브랜치명]
~~~
브랜치도 원격 저장소로 push해야 사람들이 접근할 수 있다!
~~~
git push origin [브랜치명]
~~~

- 브랜치 이동
~~~
git checkout [브랜치명]
git checkout master //master 브랜치로 돌아오기
~~~
- 브랜치 삭제
~~~
git branch -d [브랜치명]
~~~

### 브랜치 합치기
브랜치를 만들고, 새로운 기능or이슈를 개발한 다음 합칠 수 있다. Git에서 한 브랜치에서 다른 브랜치로 합치는 방법은 merge와 rebase가 있다.
1. Merge
~~~
git branch bugfix
git checkout bugfix //bugfix 브랜치로 이동함
git commit
git checkout master //master 브랜치로
git commit
//각 브랜치에서 작업한 내역 나뉘어져 있는 상태
git merge bugfix  //bugfix브랜치를 master 브랜치에 합침
~~~


2. Rebase
: 커밋들을 모아서 복사한 뒤, 다른 곳에 둔다.
커밋들의 흐름이 보기 좋게 한줄로 된다는 장점이 있다.
~~~
git branch bugfix
git checkout bugfix
git commit
git checkout master
git commit
//각 브랜치에서 작업한 내역 나뉘어져 있는 상태
git checkout bugfix
git rebase master //bugfix의 작업 내역(복사본)이 master로 이동
git rebase bugfix //master을 bugfix로 이동(master보다 앞선 bugfix의 커밋 가리키도록 하는 것)
~~~



https://learngitbranching.js.org/ 참고
