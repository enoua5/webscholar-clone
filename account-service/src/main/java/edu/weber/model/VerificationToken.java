package edu.weber.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Entity
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @NotBlank
    private String token;

    public VerificationToken() {
        this.token = "";
    }

    public VerificationToken(String _token) {
        this.token = _token;
    }

    @Override
    public String toString() {
        return this.token;
    }
}
