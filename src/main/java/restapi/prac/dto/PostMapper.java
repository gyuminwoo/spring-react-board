package restapi.prac.dto;

import restapi.prac.dto.response.PostResponseDto;
import restapi.prac.model.Post;

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
}
