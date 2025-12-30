package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.dto.PromptBody;
import com.project.cryptotradingplatformbackend.response.ApiResponse;
import com.project.cryptotradingplatformbackend.service.ChatBotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai/chat")
public class ChatBotController {

    private final ChatBotService chatBotService;

    public ChatBotController(ChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> getCoinDetails(@RequestBody PromptBody prompt) throws Exception {

        chatBotService.getCoinDetails(prompt.getPrompt());

        ApiResponse response = new ApiResponse();
        response.setMessage(prompt.getPrompt());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
