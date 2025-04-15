package restapi.prac.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String username;
    private String name;
    private LocalDateTime createdAt;
}
