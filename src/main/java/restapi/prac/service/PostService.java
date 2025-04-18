package restapi.prac.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import restapi.prac.dto.PostMapper;
import restapi.prac.dto.request.PostRequestDto;
import restapi.prac.dto.response.PostResponseDto;
import restapi.prac.model.Post;
import restapi.prac.model.User;
import restapi.prac.repository.PostRepository;
import restapi.prac.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Page<Post> getPosts(Pageable pageable) {
        Pageable sortedByCreatedAtDesc = PageRequest.of(
            pageable.getPageNumber(),
            pageable.getPageSize(),
            Sort.by(Sort.Direction.DESC, "createdAt")
        );
        return postRepository.findAll(sortedByCreatedAtDesc);
    }

    public Optional<Post> getPost(Long id) {
        return postRepository.findById(id);
    }

    public PostResponseDto createPost(PostRequestDto dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setUser(user);

        Post saved = postRepository.save(post);
        return PostMapper.toDto(saved);
    }

    public Optional<Post> updatePost(Long id, PostRequestDto dto, String username) {
        Optional<Post> postOpt = postRepository.findById(id);

        if (postOpt.isEmpty()) return Optional.empty();

        Post post = postOpt.get();
        if (!post.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("작성자만 수정할 수 있습니다.");
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());

        return Optional.of(postRepository.save(post));
    }

    public boolean deletePost(Long id, String username) {
        Optional<Post> postOpt = postRepository.findById(id);

        if (postOpt.isEmpty()) return false;

        Post post = postOpt.get();
        if (!post.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("작성자만 삭제할 수 있습니다.");
        }

        postRepository.delete(post);
        return true;
    }
}
