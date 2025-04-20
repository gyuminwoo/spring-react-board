// 投稿作成・更新用のリクエストDTO
package restapi.prac.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequestDto {
    private String title;
    private String content;
}
