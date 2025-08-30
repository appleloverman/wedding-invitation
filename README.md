# 모바일 청첩장 (React 기반)

React + React Router를 사용한 모바일 청첩장 프로젝트입니다.

## 구성

- Home: 메인 화면
- 모바일 청첩장 디자인 (page1)
- 고객후기 (page2)
- 고객후기 (page3)
- 자주묻는 질문 (page4)
- 로그인 (page5)
- 모바일 청첩장List (page6)
- 현재미정 (아직 미정입니다.)

종민이형 안녕하세요

## 실행

```bash
npm install
npm start
```

## 회의록

```
8월 29일 학원에서 민석, 찬우, 종민 Data 합본 완료
해당일 기준으로 Basic ver.2 업로드

■ 8월 29일 23시 종민
- Home.js => (네비게이션지도 삭제)
- Petals.js 파일 추가 => (애니메이션)
- CustomerFAQ.js 수정 => (이미지+버튼 기능구현)
- CustomerFAQ.css 수정 => (애니메이션)
```

```
■ 8월 30일 15시 종민
- Header 목록추가 (식권,편지봉투,액자) / 라인정리
- Letter.js , Frame.js , Ticket.js 추가
- FloatingBanner.js 추가 (우측 하단 배너)
```

```
■ 8월 31일 00시 민석
- InvitationModify.js 추가 
-> 기존에 있던 InvitationDesign.js의 코드를 InvitationModify.js에 복사 
-> InvitationDesign.js 코드 변경(누르면 청첩장 샘플 볼 수 있는 이미지 4개 + 청첩장 제작하기 버튼 누르면 편집하는 페이지로 이동)
- App.js 수정(Route 태그 추가)
```