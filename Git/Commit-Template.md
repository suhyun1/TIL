# 커밋 메시지 컨벤션과 커밋 템플릿 만들기

## Commit message convention

commit message convention은 [Conventional Commits 문서](https://www.conventionalcommits.org/en/v1.0.0/)와 [angular의 Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit) 등등...을 참고할 수 있다. 두 문서의 내용을 매우 간단하게 요약해보겠다<br/>

### 커밋 메시지의 구조

```
<type>[scope(옵션)]: <description>
(빈 행)
[body(옵션)]
(빈 행)
[footer(s)(옵션)]
```

### type의 종류

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 코드를 수정했는데 버그 수정도 아니고 새로운 기능 추가도 아닌 경우에 해당
- `style`: 코드의 의미에 영향을 주지 않는 경우(white-space, 포맷 수정, 세미콜론 빼먹은 경우 등)
- `test`: 테스트 코드 추가, 수정, 삭제
- `docs`: 문서 추가, 수정, 삭제
- `build`: build system이나 외부 의존성 관련 변경(npm, gulp 등)

### 제목 행(description) 작성

- < description > 명령형 사용 (ex. "change"-good, "changed"-bad)
- < description >에 첫 글자 대문자 사용하지 말 것
- 끝에 마침표 사용하지 않기 (ex. 'fix: correct minor typos in code.'-bad)

### body 작성

- 제목 행처럼 명령형을 사용한다.
- 본문에는 바꾼 **이유** 와 바꾸기 이전 내용과의 비교가 들어가도록 작성한다.

### footer 작성

- 큰 변화가 있을 경우 `BREAKING CHANGE`를 작성한다.
- 여러 개의 footer를 작성할 수 있다.

### 예시

```
feat(lang): add korean language
```

```
refactor!: drop support for Node 6
```

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

<br/>

## Commit Message Template 생성하기

- ~/.gitmessage.txt 파일 생성

```
$ touch ~/.gitmessage.txt
```

- 파일 편집

```
$ vi ~/.gitmessage.txt
```

- 사용한 템플릿 예시

```
# <type>(scope): <description>

##### 제목은 최대 50 글자까지만 입력 ############## -> |


######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |

# 꼬릿말은 아래에 작성: ex) #이슈 번호

# --- COMMIT END ---
# <type> 유형
#   feat    : 기능 (새로운 기능)
#   fix     : 버그 (버그 수정)
#   refactor: 리팩토링
#   style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   docs    : 문서 (문서 추가, 수정, 삭제)
#   test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   chore   : 기타 변경사항 (빌드 스크립트 수정 등)
# ------------------
#     description 첫 글자는 소문자
#     description 명령문 사용
#     description 마침표 쓰지 않기
#     제목 행과 본문을 한 줄 분리하기
#     본문에는 무엇을 왜 변경했는지를 포함하여 작성
# ------------------
```

- commit.template에 작성한 .gitmessage.txt 설정하기

```
$ git config --global commit.template ~/.gitmessage.txt
```

끝!
