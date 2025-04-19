package restapi.prac.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import restapi.prac.dto.request.CommentRequestDto;
import restapi.prac.dto.response.CommentResponseDto;
import restapi.prac.service.CommentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponseDto> create(@PathVariable Long postId, @RequestBody CommentRequestDto dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(commentService.createComment(postId, dto, username));
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getAll(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> update(@PathVariable Long postId, @PathVariable Long commentId, @RequestBody CommentRequestDto dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<CommentResponseDto> updated = commentService.updateComment(commentId, dto, username);
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> delete(@PathVariable Long postId, @PathVariable Long commentId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean deleted = commentService.deleteComment(commentId, username);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
