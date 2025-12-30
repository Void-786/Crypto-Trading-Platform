package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.response.ApiResponse;

public interface ChatBotService {

    ApiResponse getCoinDetails(String prompt) throws Exception;

    String simpleChat(String prompt);
}
