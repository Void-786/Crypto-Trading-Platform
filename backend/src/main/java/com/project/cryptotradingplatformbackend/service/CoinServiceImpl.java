package com.project.cryptotradingplatformbackend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.cryptotradingplatformbackend.modal.Coin;
import com.project.cryptotradingplatformbackend.repository.CoinRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class CoinServiceImpl implements CoinService {

    private final CoinRepository coinRepo;
    private final ObjectMapper objectMapper;

    private final String baseUrl = "https://api.coingecko.com/api/v3";

    @Value("${coingecko.api.key}")
    private String apiKey;

    public CoinServiceImpl(CoinRepository coinRepo, ObjectMapper objectMapper) {
        this.coinRepo = coinRepo;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<Coin> getCoinList(int page) throws Exception {
        String url = baseUrl + "/coins/markets?vs_currency=usd&per_page=10&page=" + page;

        RestTemplate restTemplate = new RestTemplate();

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-cg-demo-api-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            List<Coin> coinList = objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {});

            return coinList;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {
        String url = baseUrl + "/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;

        RestTemplate restTemplate = new RestTemplate();

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-cg-demo-api-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getCoinDetails(String coinId) throws Exception {
        String url = baseUrl + "/coins/" + coinId;

        RestTemplate restTemplate = new RestTemplate();

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-cg-demo-api-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            Coin coin = new Coin();
            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());
            coin.setImage(jsonNode.get("image").get("large").asText());

            JsonNode marketData = jsonNode.get("market_data");
            coin.setCurrent_price(marketData.get("current_price").get("usd").asDouble());
            coin.setMarket_cap(marketData.get("market_cap").get("usd").asLong());
            coin.setMarket_cap_rank(marketData.get("market_cap_rank").asInt());
            coin.setTotal_volume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh_24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow_24h(marketData.get("low_24h").get("usd").asDouble());
            coin.setPrice_change_24h(marketData.get("price_change_24h").asDouble());
            coin.setPrice_change_percentage_24h(marketData.get("price_change_percentage_24h").asDouble());
            coin.setMarket_cap_change_24h(marketData.get("market_cap_change_24h").asLong());
            coin.setMarket_cap_change_percentage_24h(marketData.get("market_cap_change_percentage_24h").asDouble());
            coin.setTotal_supply(marketData.get("total_supply").asLong());

            coinRepo.save(coin);
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Coin findById(String coinId) throws Exception {
        Optional<Coin> coin = coinRepo.findById(coinId);
        if(coin.isEmpty()) {
            throw new Exception("Coin not found !");
        }
        return coin.get();
    }

    @Override
    public String searchCoin(String keyword) throws Exception {
        String url = baseUrl + "/search?query=" + keyword;

        RestTemplate restTemplate = new RestTemplate();

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-cg-demo-api-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception {
        String url = baseUrl + "/coins/markets?vs_currency=usd&per_page=50&page=1";

        RestTemplate restTemplate = new RestTemplate();

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-cg-demo-api-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTrendingCoins() throws Exception {
        String url = baseUrl + "/search/trending";

        RestTemplate restTemplate = new RestTemplate();

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-cg-demo-api-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }
}
