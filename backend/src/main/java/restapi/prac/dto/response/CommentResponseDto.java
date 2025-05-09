// コメント取得時のレスポンスDTO
package restapi.prac.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private Long id;
    private String content;
    private String username;
    private String authorName; //　作成者の表示用
    private Long userId;
    private LocalDateTime createdAt;
}