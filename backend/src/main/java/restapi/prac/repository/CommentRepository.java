package restapi.prac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import restapi.prac.model.Comment;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // JpaRepository<操作するエンティティ, そのエンティティの主キーの型>
    List<Comment> findByPostIdOrderByCreatedAtDesc(Long postId);
}
