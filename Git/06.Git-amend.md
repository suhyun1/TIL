# `--amend`로 커밋 수정하기

### 마지막으로 작성한 커밋 수정하기
현재 브랜치의 HEAD를 커밋에 덮어쓴다. <br/>

- 파일을 새로 커밋에 추가한 후 수정하기
~~~
$ git add sample.txt
$ git commit --amend
~~~

- 파일을 새로 커밋에 추가한 후 수정하기(커밋 메시지 수정하지 않음!)
~~~
git add sample.txt
git commit --amend --no-edit
~~~
깜빡하고 파일을 추가하지 않고 커밋한 경우 사용 할 수 있다. `--no-edit` 옵션은 커밋 메시지를 수정하지 않는다는 의미
<br/>

- 커밋 메시지만 수정하기
~~~
$ git commit --amend
~~~
