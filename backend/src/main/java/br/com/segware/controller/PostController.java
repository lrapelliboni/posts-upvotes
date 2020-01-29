package br.com.segware.controller;

import br.com.segware.domain.Post;
import br.com.segware.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping({"/posts"})
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> findAll(){
        return postRepository.findAll();
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Post> findById(@PathVariable long id){
        return postRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Post post, UriComponentsBuilder uriComponentsBuilder){
        postRepository.save(post);
        URI uri = uriComponentsBuilder.path("/posts/{id}").buildAndExpand(post.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<Post> update(@PathVariable("id") long id,
                                          @RequestBody Post contact){
        return postRepository.findById(id)
                .map(record -> {
                    record.setTitle(contact.getTitle());
                    record.setDescription(contact.getDescription());
                    record.setVotes(contact.getVotes());
                    Post updated = postRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path ={"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        return postRepository.findById(id)
                .map(record -> {
                    postRepository.deleteById(id);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
