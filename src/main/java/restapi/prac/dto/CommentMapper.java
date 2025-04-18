package restapi.prac.dto;

import restapi.prac.dto.response.CommentResponseDto;
import restapi.prac.model.Comment;

public class CommentMapper {

    public static CommentResponseDto toDto(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getContent(),
                comment.getUser().getUsername(),
                comment.getUser().getName(),
                comment.getUser().getId(),
                comment.getCreatedAt()
        );
    }
}
