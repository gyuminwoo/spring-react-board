package restapi.prac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import restapi.prac.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
// JpaRepository<操作するエンティティ, そのエンティティの主キーの型>
//  usernameでユーザーIDを探して情報を取得
    Optional<User> findByUsername(String username);
}
