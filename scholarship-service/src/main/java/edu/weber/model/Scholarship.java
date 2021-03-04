package edu.weber.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * This is a data model. It helps us put data into the backend and send data
 * to the frontend in a standardized format. (Yes, I did just copy-pasta a comment XD)
 */

@Getter
@Setter
@Entity

public class Scholarship {

    //Here is me making a rough guess of what fields are needed

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    //Name of the scholarship
    @Column
    @NotBlank
    private String name;
    //Organization that offers the scholarship
    @Column
    @NotBlank
    private String organization;
    //Short description of the scholarship
    @Column
    @NotBlank
    private String description;
    //a list of requirements to have the scholarship
    @Column
    @NotBlank
    private String requirements;
    //amount of money the scholarship offers?
    @Column
    @NotBlank
    private double amount;

    public Scholarship (String name, String organization, String description, String requirements, double amount){

        this.name = name;
        this.organization = organization;
        this.description = description;
        this.requirements = requirements;
        this.amount = amount;

    }

}