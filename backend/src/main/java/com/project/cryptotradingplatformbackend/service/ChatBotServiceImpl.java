package com.project.cryptotradingplatformbackend.service;

import com.jayway.jsonpath.JsonPath;
import com.project.cryptotradingplatformbackend.dto.CoinDto;
import com.project.cryptotradingplatformbackend.response.ApiResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ChatBotServiceImpl implements ChatBotService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String OPENROUTER_URL =
            "https://openrouter.ai/api/v1/chat/completions";

    /* ===================== PUBLIC API ===================== */

    @Override
    public ApiResponse getCoinDetails(String prompt) throws Exception {

        String coin = detectCoin(prompt);

        // Fallback to normal chat
        if (coin == null) {
            ApiResponse response = new ApiResponse();
            response.setMessage(simpleChat(prompt));
            return response;
        }

        CoinDto coinDto = makeApiRequest(coin);
        String explanation = explainWithLLM(prompt, coinDto);

        ApiResponse response = new ApiResponse();
        response.setMessage(explanation);
        return response;
    }

    @Override
    public String simpleChat(String prompt) {
        return callLLM(prompt);
    }

    /* ===================== INTENT ===================== */

    private String detectCoin(String prompt) {
        String p = prompt.toLowerCase();
        if (p.contains("bitcoin") || p.contains("btc")) return "bitcoin";
        if (p.contains("ethereum") || p.contains("eth")) return "ethereum";
        if (p.contains("solana") || p.contains("sol")) return "solana";
        return null;
    }

    /* ===================== LLM ===================== */

    private String callLLM(String content) {

        HttpHeaders headers = baseHeaders();

        JSONObject body = new JSONObject()
                .put("model", "meta-llama/llama-3.1-405b-instruct:free")
                .put("messages", new JSONArray().put(
                        new JSONObject()
                                .put("role", "user")
                                .put("content", content)
                ))
                .put("max_tokens", 150);

        ResponseEntity<String> response = new RestTemplate()
                .postForEntity(OPENROUTER_URL,
                        new HttpEntity<>(body.toString(), headers),
                        String.class);

        System.out.println("LLM RESPONSE: " + response.getBody());

        return JsonPath.read(response.getBody(),
                "$.choices[0].message.content");
    }

    private String explainWithLLM(String prompt, CoinDto coin) {

        String context = """
                User asked: %s

                Real market data:
                Name: %s
                Price (USD): %.2f
                Market Cap: %.2f
                Rank: %d

                Explain clearly and concisely.
                """.formatted(
                prompt,
                coin.getName(),
                coin.getCurrentPrice(),
                coin.getMarketCap(),
                coin.getMarketCapRank()
        );

        return callLLM(context);
    }

    /* ===================== COINGECKO ===================== */

    public CoinDto makeApiRequest(String coinId) throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;

        ResponseEntity<Map> response =
                new RestTemplate().getForEntity(url, Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null) throw new Exception("Coin not found");

        Map<String, Object> market =
                (Map<String, Object>) body.get("market_data");

        CoinDto dto = new CoinDto();
        dto.setId((String) body.get("id"));
        dto.setName((String) body.get("name"));
        dto.setSymbol((String) body.get("symbol"));
        dto.setMarketCapRank((Integer) market.get("market_cap_rank"));

        dto.setCurrentPrice(
                ((Number)((Map<?, ?>)market.get("current_price"))
                        .get("usd")).doubleValue()
        );

        dto.setMarketCap(
                ((Number)((Map<?, ?>)market.get("market_cap"))
                        .get("usd")).doubleValue()
        );

        System.out.println("COIN FETCHED: " + dto.getName());
        return dto;
    }

    /* ===================== HEADERS ===================== */

    private HttpHeaders baseHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.add("HTTP-Referer", "http://localhost:5454");
        headers.add("X-Title", "Crypto Trading Platform");
        return headers;
    }
}
