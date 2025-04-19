package restapi.prac.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import restapi.prac.dto.UserMapper;
import restapi.prac.dto.request.UserRegisterRequestDto;
import restapi.prac.dto.response.UserResponseDto;
import restapi.prac.model.User;
import restapi.prac.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//  会員登録
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequestDto requestDto) {
        try {
            User user = userService.registerUser(requestDto);
            UserResponseDto responseDto = UserMapper.toDto(user);
            return ResponseEntity.ok(responseDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
