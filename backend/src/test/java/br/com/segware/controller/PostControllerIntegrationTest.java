package br.com.segware.controller;

import br.com.segware.PostsChalengeApplication;
import br.com.segware.domain.Post;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = PostsChalengeApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostControllerIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    private String getRootUrl() {
        return "http://localhost:" + port;
    }

    @Test
    public void contextLoads() {

    }

    @Test
    public void testGetAllPosts() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);
        ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/posts",
                HttpMethod.GET, entity, String.class);
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetPostById() {
        Post post = restTemplate.getForObject(getRootUrl() + "/posts/1", Post.class);
        System.out.println(post.getTitle());
        assertEquals("Java 8 Programming", post.getTitle());
        assertEquals("This post is awesome", post.getDescription());
        assertEquals(new Integer(10), post.getVotes());
        assertNotNull(post);
    }

    @Test
    public void testCreatePost() {
        Post post = new Post();
        post.setTitle("React Native to Mobile Development");
        post.setDescription("Post about React Native");
        post.setVotes(10);
        ResponseEntity<Post> postResponse = restTemplate.postForEntity(getRootUrl() + "/posts", post, Post.class);
        assertNotNull(postResponse);
        assertEquals(HttpStatus.CREATED, postResponse.getStatusCode());
    }

    @Test
    public void testUpdatePost() {
        int id = 1;
        Post post = restTemplate.getForObject(getRootUrl() + "/posts/" + id, Post.class);
        post.setTitle("Post is updated!");
        post.setDescription("Post description updated");
        post.setVotes(1);
        restTemplate.put(getRootUrl() + "/posts/" + id, post);
        Post updatedPost = restTemplate.getForObject(getRootUrl() + "/posts/" + id, Post.class);
        assertNotNull(updatedPost);
    }

    @Test
    public void testDeletePost() {
        int id = 2;
        Post post = restTemplate.getForObject(getRootUrl() + "/posts/" + id, Post.class);
        assertNotNull(post);
        restTemplate.delete(getRootUrl() + "/posts/" + id);
        try {
            post = restTemplate.getForObject(getRootUrl() + "/posts/" + id, Post.class);
        } catch (final HttpClientErrorException e) {
            assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
        }
    }
}
