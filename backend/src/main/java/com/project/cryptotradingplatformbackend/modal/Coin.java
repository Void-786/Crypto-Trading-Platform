package com.project.cryptotradingplatformbackend.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Coin {

    @Id
    private String id;

    private String symbol;

    private String name;

    private String image;

    private double current_price;

    private long market_cap;

    private int market_cap_rank;

    private long fully_diluted_valuation;

    private long total_volume;

    private Double high_24h;

    private double low_24h;

    private double price_change_24h;

    private double price_change_percentage_24h;

    private long market_cap_change_24h;

    private double market_cap_change_percentage_24h;

    private long circulating_supply;

    private long total_supply;

    private double ath;

    private double ath_change_percentage;

    private Date ath_date;

    private double atl;

    private double atl_change_percentage;

    private Date atl_date;

    @JsonIgnore
    private String roi;

    private Date last_updated;
}
