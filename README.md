# BLOG_RPROGECT

~~프로젝트링크 : http://ec2-13-125-76-186.ap-northeast-2.compute.amazonaws.com:5000/~~
- 프리티어 가 만료되어서 현재 서버와 모든 기능을 닫아둔 상태입니다. 
나중에 리액트와 타입스크립트를 재사용해서 구축할 예정입니다.


![image](https://github.com/seong-94/blog_aws/assets/68951572/f20775ed-d436-4738-93f2-4297281b7fea)

# 목차

- <h3>설치 및 버전</h3>
- <h3>블로그 기능</h3>
-
-
-
-

# 설치 및 버전

<h3>Front-End</h3>

- React (18.2.0)

- Javascript

  - Emotion.js (11.11.0)

  - Axios (1.1.3)

  - Moment (2.29.4)

  - React-router-dom (6.4.2)

- TypeScript (5.0.4)

  - types/react (18.2.7)

  - types/node (20.2.5)

<h3> Back-End</h3>

- Nodejs(18.16.0)

  - JWT (8.5.1)

  - bcrypt (5.1.0)

  - Express (4.18.2)

  - Mysql (2.18.1)

  - nodemon (2.0.20)

  - cookie-parser (1.4.6)

<h3> DateBase</h3>

- Mysql

<h3> CI/CD  </h3>

- Jenkins

<h3> Server</h3>

- Amazon Web Services (AWS)

- Relational Database Service(RDS)

## 블로그 기능

<h3> 로그인 회원가입</h3>
회원 가입 기능은 백엔드에서  Bcrypt 를  이용하여 비밀번호를 암화화 하여서 DB 에 입력 하였습니다.

![](https://velog.velcdn.com/images%2F_woogie%2Fpost%2F93589866-64f5-420b-bb98-efa033d29049%2FJWT_tokens_EN.png)

로그인

1.  브라우저 에서 Login 요청합니다.
2.  서버에서 JWT를 발급합니다.
3.  발급한 JWT를 브라우저로 보냅니다.
4.  이후 요청시 발급받은 JWT를 함께 보냅니다.
5.  서버에서 JWT에 포함된 Signature를 확인 후 user정보를 request에 담아준다.
6.  서버에서 브라우저의 요청을 처리.

3번에서 JWT 토큰을 <strong>reponse </strong> 또는 <strong> cookie</strong> 으로 보내야하는데 cookie-parser 를 이용하여 cookie로 브라우저로 데이터를 보내주었습니다..

보내진 User 데이터는 <strong> Context API </strong>를 이용하여 여러 기능에 활용

<h3> (글 , 댓글) 작성,삭제 ,수정</h3>

위에서 받은 User Cookie 를 이용하여서 Post 데이터 와 User 정보를 비교하여서 수정 , 삭제 등의 기능을 완성하였습니다

<h3> 글 추천 기능</h3>

추전 기능은 Post 데이터와 User 정보에서 유니크 아이디만 받아 댓글 DB 에 저장하여 구현하였습니다.

<h3> 페이징 처리</h3>

현재 페이지네이션은 2가지 방법으로 구현중입니다.

1. 프론트엔드
   프론트엔드에서 react-js-pagination 라이브러리를 이용하여서 데이터를 전체적으로 받아와서 원하는 수만큼 리스트를 짤라서 화면에 노출하는 방식 입니다.
2. 백엔드
   두번째로는 axios 를 이용하여 데이터를 받아올때 Mysql query 문 `LIMIT` 을 이용하여서 정해진 데이터만 로드 하는 방식입니다.

현재 같이 적은 데이터를 가진 페이지 같은 경우 전자 후자가 큰차이가 없을수 있으나, 데이터가 방대한 경우에는 후자 같은 방식을 이용하여 데이터 로드 시간을 많이 절약 할수있다.

## DB

![image](https://github.com/seong-94/blog_aws/assets/68951572/074f3e05-5069-4f90-98de-abb9497bc0f8)

## 구현중이거나 추가 할것

현재 JS 로 제작을 시작하여 TS 로 변환하는중에 있습니다.
