package com.project.cryptotradingplatformbackend.service;

import com.jayway.jsonpath.JsonPath;
import com.project.cryptotradingplatformbackend.dto.CoinDto;
import com.project.cryptotradingplatformbackend.response.ApiResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ChatBotServiceImpl implements ChatBotService {

    @Value("${openRouter.api.key}")
    private String apiKey;

    private static final String OPENROUTER_URL =
            "https://openrouter.ai/api/v1/chat/completions";

    private final RestTemplate restTemplate = new RestTemplate();

    /* ===================== PUBLIC API ===================== */

    @Override
    public ApiResponse getCoinDetails(String prompt) {

        // Step 1: Ask LLM which coin user is talking about
        String coinId = extractCoinId(prompt);

        // If LLM couldn't infer coin → normal chat
        if (coinId == null) {
            ApiResponse res = new ApiResponse();
            res.setMessage(simpleChat(prompt));
            return res;
        }

        // Step 2: Fetch real data from CoinGecko
        CoinDto coin;
        try {
            coin = fetchCoinFromCoinGecko(coinId);
        } catch (Exception e) {
            ApiResponse res = new ApiResponse();
            res.setMessage(simpleChat(prompt));
            return res;
        }

        // Step 3: Explain using real data
        String explanation = explainWithLLM(prompt, coin);

        ApiResponse res = new ApiResponse();
        res.setMessage(explanation);
        return res;
    }

    @Override
    public String simpleChat(String prompt) {
        return callLLM(prompt);
    }

    /* ===================== STEP 1: COIN EXTRACTION ===================== */
    // NO tools, NO function calling – pure prompt-based extraction

    private String extractCoinId(String prompt) {

        String instruction = """
                Extract the CoinGecko coin id from the user query.
                Return ONLY the coin id.
                Examples:
                Bitcoin -> bitcoin
                Ethereum -> ethereum
                Polygon -> matic-network
                Solana -> solana

                User query:
                %s
                """.formatted(prompt);

        String response = callLLM(instruction);

        if (response == null) return null;

        return response
                .trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9\\-]", "");
    }

    /* ===================== STEP 2: COINGECKO ===================== */

    private CoinDto fetchCoinFromCoinGecko(String coinId) {

        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;

        ResponseEntity<Map> response =
                restTemplate.getForEntity(url, Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null) throw new RuntimeException("Coin not found");

        Map<String, Object> market =
                (Map<String, Object>) body.get("market_data");

        CoinDto dto = new CoinDto();
        dto.setId((String) body.get("id"));
        dto.setName((String) body.get("name"));
        dto.setSymbol((String) body.get("symbol"));
        dto.setMarketCapRank((Integer) body.get("market_cap_rank"));

        dto.setCurrentPrice(
                ((Number)((Map<?, ?>)market.get("current_price"))
                        .get("usd")).doubleValue()
        );

        dto.setMarketCap(
                ((Number)((Map<?, ?>)market.get("market_cap"))
                        .get("usd")).doubleValue()
        );

        dto.setPriceChangePercentage24h(
                ((Number)market.get("price_change_percentage_24h"))
                        .doubleValue()
        );

        return dto;
    }

    /* ===================== STEP 3: EXPLANATION ===================== */

    private String explainWithLLM(String prompt, CoinDto coin) {

        String context = """
                User asked: %s

                Real market data (from CoinGecko):
                Name: %s
                Symbol: %s
                Price (USD): %.2f
                Market Cap: %.2f
                Rank: %d
                24h Change: %.2f%%

                Explain clearly and concisely using ONLY this data.
                """.formatted(
                prompt,
                coin.getName(),
                coin.getSymbol(),
                coin.getCurrentPrice(),
                coin.getMarketCap(),
                coin.getMarketCapRank(),
                coin.getPriceChangePercentage24h()
        );

        return callLLM(context);
    }

    /* ===================== LLM CALL ===================== */

    private String callLLM(String content) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.add("HTTP-Referer", "http://localhost:5454");
        headers.add("X-Title", "Crypto Trading Platform");

        JSONObject body = new JSONObject()
                .put("model", "meta-llama/llama-3.1-405b-instruct:free")
                .put("messages", new JSONArray()
                        .put(new JSONObject()
                                .put("role", "user")
                                .put("content", content)))
                .put("max_tokens", 150);

        ResponseEntity<String> response = restTemplate.postForEntity(
                OPENROUTER_URL,
                new HttpEntity<>(body.toString(), headers),
                String.class
        );

        return JsonPath.read(response.getBody(),
                "$.choices[0].message.content");
    }
}
