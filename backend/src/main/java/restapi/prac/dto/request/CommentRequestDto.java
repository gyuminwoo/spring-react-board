// コメント投稿・編集のリクエストDTO
package restapi.prac.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    private String content;
}
