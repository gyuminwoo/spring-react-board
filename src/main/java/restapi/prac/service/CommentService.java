package restapi.prac.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import restapi.prac.dto.CommentMapper;
import restapi.prac.dto.request.CommentRequestDto;
import restapi.prac.dto.response.CommentResponseDto;
import restapi.prac.model.Comment;
import restapi.prac.model.Post;
import restapi.prac.model.User;
import restapi.prac.repository.CommentRepository;
import restapi.prac.repository.PostRepository;
import restapi.prac.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentResponseDto createComment(Long postId, CommentRequestDto dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setUser(user);
        comment.setPost(post);

        return CommentMapper.toDto(commentRepository.save(comment));
    }

    public List<CommentResponseDto> getCommentsByPost(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId)
                .stream()
                .map(CommentMapper::toDto)
                .toList();
    }

    public Optional<CommentResponseDto> updateComment(Long commentId, CommentRequestDto dto, String username) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isEmpty()) return Optional.empty();

        Comment comment = commentOpt.get();
        if (!comment.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("작성자만 수정할 수 있습니다.");
        }

        comment.setContent(dto.getContent());
        return Optional.of(CommentMapper.toDto(commentRepository.save(comment)));
    }

    public boolean deleteComment(Long commentId, String username) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isEmpty()) return false;

        Comment comment = commentOpt.get();
        if (!comment.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("작성자만 삭제할 수 있습니다.");
        }

        commentRepository.delete(comment);
        return true;
    }
}
