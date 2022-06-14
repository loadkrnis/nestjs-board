Article은 아래와 같이 생겼어요.
```
Article {
    id: 게시글 고유 번호
    title: 제목
    content: 본문
    createdAt: 생성 시각
    updatedAt: 수정 시각
    deletedAt: 삭제 시각
}
```

`GET /articles` 전체 반환 (pagination 지원, page, size)

`GET /articles/{id}` id번 게시글 반환

`POST /articles` id번 게시글 생성

`DELETE /articles/{id}` id번 게시글 삭제

`GET /articles/count` 게시글 전체 개수 반환
