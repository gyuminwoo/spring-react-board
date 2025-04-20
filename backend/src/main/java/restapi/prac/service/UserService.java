package restapi.prac.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import restapi.prac.dto.request.UserRegisterRequestDto;
import restapi.prac.model.User;
import restapi.prac.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

//  会員登録
    @Transactional
    public User registerUser(UserRegisterRequestDto requestDto) {
//      存在するユーザーIDのか確認する
        if (userRepository.findByUsername(requestDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

//      パスワードを暗号化して保存
        User user = new User();
        user.setUsername(requestDto.getUsername());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setName(requestDto.getName());

        return userRepository.save(user);
    }

//  ユーザーの情報照会
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
