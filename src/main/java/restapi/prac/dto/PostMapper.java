package restapi.prac.dto;

import restapi.prac.dto.request.PostRequestDto;
import restapi.prac.dto.response.PostResponseDto;
import restapi.prac.model.Post;
import restapi.prac.model.User;

public class PostMapper {
    public static PostResponseDto toDto(Post post) {
        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorName(post.getUser().getName())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    public static Post toEntity(PostRequestDto dto, User user) {
        return Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(user)
                .build();
    }
}
