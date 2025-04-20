//　Post変換（エンティティ　↔　DTO)
package restapi.prac.dto;

import restapi.prac.dto.request.PostRequestDto;
import restapi.prac.dto.response.PostResponseDto;
import restapi.prac.model.Post;
import restapi.prac.model.User;

public class PostMapper {
    public static PostResponseDto toDto(Post post) {
//      Post →　PostResponseDto
        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorName(post.getUser().getName())
                .userId(post.getUser().getId())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

//  PostRequestDto　＋　User　→　Postエンティティ（作成用）
    public static Post toEntity(PostRequestDto dto, User user) {
        return Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(user)
                .build();
    }
}
