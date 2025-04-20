//　投稿のレスポンスDTO
package restapi.prac.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PostResponseDto {
    private Long id;
    private String title;
    private String content;
    private String authorName; // 作成者の表示用
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
