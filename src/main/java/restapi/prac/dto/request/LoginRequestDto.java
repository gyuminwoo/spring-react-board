package restapi.prac.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    private Long id;
    private String username;
    private String password;
    private String name;
}
